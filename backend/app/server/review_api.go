package server

import (
	"bytes"
	"context"
	"html/template"
	"log"
	"math"
	"time"

	auth "github.com/rahulmadduluri/raft-education/backend/app/auth"
	db "github.com/rahulmadduluri/raft-education/backend/app/db"
	models "github.com/rahulmadduluri/raft-education/backend/app/models"

	uuidGen "github.com/satori/go.uuid"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

func (r *queryResolver) Reviews(ctx context.Context, schoolUUID string, offset int) ([]models.Review, error) {
	reviews, err := db.Handler().SQL().GetReviews(schoolUUID)
	if err != nil {
		return nil, err
	}

	lowerBound := int(math.Min(float64(offset), float64(len(reviews))))
	upperBound := int(math.Min(float64(offset)+9, float64(len(reviews))))

	return reviews[lowerBound:upperBound], err
}

func (r *mutationResolver) SubmitReview(ctx context.Context, reviewParams models.NewReviewParams) (bool, error) {
	uuid := uuidGen.NewV4().String()
	var gradDate *time.Time
	if reviewParams.SchoolGraduationMonth != nil && reviewParams.SchoolGraduationYear != nil {
		t := time.Date(*reviewParams.SchoolGraduationYear, time.Month(*reviewParams.SchoolGraduationMonth), 15, 0, 0, 0, 0, time.UTC)
		gradDate = &t
	}
	var jobFoundDate *time.Time
	if reviewParams.JobFoundMonth != nil && reviewParams.JobFoundYear != nil {
		t := time.Date(*reviewParams.JobFoundYear, time.Month(*reviewParams.JobFoundMonth), 15, 0, 0, 0, 0, time.UTC)
		jobFoundDate = &t
	}

	err := db.Handler().SQL().CreateTempReview(
		uuid,
		reviewParams.StudentUUID,
		reviewParams.SchoolUUID,
		reviewParams.SchoolLocationUUID,
		reviewParams.Title,
		reviewParams.StudentExperience,
		reviewParams.StudentAdvice,
		reviewParams.TeachingScore,
		reviewParams.CourseworkScore,
		reviewParams.AtmosphereScore,
		reviewParams.CareerPreparationScore,
		reviewParams.OverallScore,
		gradDate,
		reviewParams.DidGraduate,
		reviewParams.HasJob,
		reviewParams.JobLocationUUID,
		reviewParams.SalaryBefore,
		reviewParams.SalaryAfter,
		jobFoundDate,
	)
	if err != nil {
		return false, err
	}

	// take review parameters, create email and send to reviews@raft.one

	from := mail.NewEmail("Review Bot", "review-bot@raft.one")
	subject := "School Review UUID: " + uuid
	to := mail.NewEmail("Review Receiver", "reviews@raft.one")
	htmlContent := reviewHTMLTemplate(uuid, reviewParams)
	message := mail.NewSingleEmail(from, subject, to, "Review", htmlContent)
	_, err = db.Handler().SendGrid().Send(message)
	if err != nil {
		log.Println(err)
	}

	return true, nil
}

func (r *mutationResolver) SubmitHelpfulVote(ctx context.Context, reviewUUID string, helpful bool) (bool, error) {
	studentUUID := auth.UUIDFromContext(ctx)
	err := db.Handler().SQL().SubmitHelpfulVote(studentUUID, reviewUUID, helpful)
	if err != nil {
		return false, err
	}
	return true, nil
}

type ReviewEmailData struct {
	ReviewUUID   string
	ReviewParams models.NewReviewParams
}

func reviewHTMLTemplate(reviewUUID string, reviewParams models.NewReviewParams) string {
	tmpl := template.Must(template.ParseFiles("tempReviewTemplate.html"))
	v := ReviewEmailData{
		ReviewUUID:   reviewUUID,
		ReviewParams: reviewParams,
	}

	var buf bytes.Buffer
	if err := tmpl.Execute(&buf, v); err != nil {
		return "Error: Could not parse html template"
	}

	return buf.String()
}
