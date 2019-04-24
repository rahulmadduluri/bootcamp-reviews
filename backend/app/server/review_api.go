package server

import (
	"context"
	"log"
	"math"
	"time"

	db "github.com/rahulmadduluri/raft-education/backend/app/db"
	models "github.com/rahulmadduluri/raft-education/backend/app/models"

	uuidGen "github.com/satori/go.uuid"
	// "github.com/sendgrid/sendgrid-go"
	// "github.com/sendgrid/sendgrid-go/helpers/mail"
)

const (
	_SendGridKey = "SENDGRID_API_KEY"
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
	log.Println(reviewParams)

	uuid := uuidGen.NewV4()
	var gradDate *time.Time
	if reviewParams.SchoolGraduationMonth != nil && reviewParams.SchoolGraduationYear != nil {
		t := time.Date(*reviewParams.SchoolGraduationYear, time.Month(*reviewParams.SchoolGraduationMonth), 15, 0, 0, 0, 0, time.UTC)
		gradDate = &t
	}
	var jobStartDate *time.Time
	if reviewParams.JobStartMonth != nil && reviewParams.JobStartYear != nil {
		t := time.Date(*reviewParams.JobStartYear, time.Month(*reviewParams.JobStartMonth), 15, 0, 0, 0, 0, time.UTC)
		jobStartDate = &t
	}

	err := db.Handler().SQL().CreateTempReview(
		uuid.String(),
		reviewParams.StudentUUID,
		reviewParams.SchoolUUID,
		reviewParams.SchoolLocationUUID,
		reviewParams.AllText,
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
		jobStartDate,
	)
	if err != nil {
		return false, err
	}
	return true, nil

	// from := mail.NewEmail("Reviews Sender", "reviews@raft.one")
	// subject := "Sending with SendGrid is Fun"
	// to := mail.NewEmail("Reviews Receiver", "reviews@raft.one")
	// plainTextContent := "and easy to do anywhere, even with Go"
	// htmlContent := "<strong>and easy to do anywhere, even with Go</strong>"
	// message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	// client := sendgrid.NewSendClient(os.Getenv(_SendGridKey))
	// response, err := client.Send(message)
	// if err != nil {
	// 	log.Println(err)
	// } else {
	// 	log.Println(response.StatusCode)
	// 	log.Println(response.Body)
	// 	log.Println(response.Headers)
	// }

	// take review parameters, create email and send to reviews@raft.one
}
