package db

import (
	"time"

	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

const (
	_GetReviewsDB     = "getReviewsDB"
	_CreateTempReview = "createTempReview"

	_SubmitHelpfulVote   = "submitHelpfulVote"
	_GetHelpfulUpvotes   = "getHelpfulUpvotes"
	_GetHelpfulDownvotes = "getHelpfulDownvotes"

	_GetReviewDBWithUUID = "getReviewDBWithUUID"
)

type ReviewDB interface {
	GetReviews(schoolUUID string) ([]models.Review, error)
	SubmitHelpfulVote(studentUUID string, reviewUUID string, helpful bool) error
	CreateTempReview(
		reviewUUID string,
		studentUUID string,
		schoolUUID string,
		schoolLocationUUID string,
		title string,
		studentExperience string,
		studentAdvice *string,
		teachingScore int,
		courseworkScore int,
		atmosphereScore int,
		careerPreparationScore int,
		overallScore int,
		schoolGraduationDate *time.Time,
		didGraduate bool,
		hasJob bool,
		jobLocationUUID *string,
		salaryBefore *int,
		salaryAfter *int,
		jobStartDate *time.Time,
	) error
}

func (sql *sqlDB) GetReviews(schoolUUID string) ([]models.Review, error) {
	reviews := []models.Review{}
	reviewsDB := []models.ReviewDBModel{}

	rows, err := sql.db.NamedQuery(
		sql.queries.reviewQueries[_GetReviewsDB],
		map[string]interface{}{
			"school_uuid": schoolUUID,
		},
	)
	if err != nil {
		return reviews, err
	}
	defer rows.Close()

	for rows.Next() {
		var r models.ReviewDBModel
		err := rows.StructScan(&r)
		if err != nil {
			return reviews, err
		}
		reviewsDB = append(reviewsDB, r)
	}

	for _, rdb := range reviewsDB {
		// get student, school, school location, job location
		school, err := sql.getSchoolWithID(rdb.SchoolID)
		if err != nil {
			return reviews, err
		}
		schoolLocation, err := sql.getLocationForID(rdb.SchoolLocationID)
		if err != nil {
			return reviews, err
		}
		var jobLocation *models.Location
		if rdb.JobLocationID != nil {
			jobLocation, err = sql.getLocationForID(*rdb.JobLocationID)
			if err != nil {
				return reviews, err
			}
		}

		// get school grad + job star ttimestamp
		var graduationTimestamp *int
		if rdb.SchoolGraduationDate != nil {
			t := int((*rdb.SchoolGraduationDate).Unix())
			graduationTimestamp = &t
		}
		var jobStartTimestamp *int
		if rdb.JobStartDate != nil {
			t := int((*rdb.JobStartDate).Unix())
			jobStartTimestamp = &t
		}

		// get helpful upvotes
		helpfulUpvotes, _ := sql.getReviewHelpfulUpvotes(rdb.UUID)
		helpfulDownvotes, _ := sql.getReviewHelpfulDownvotes(rdb.UUID)

		review := models.Review{
			UUID:                      rdb.UUID,
			Title:                     rdb.Title,
			StudentExperience:         rdb.StudentExperience,
			StudentAdvice:             rdb.StudentAdvice,
			TeachingScore:             rdb.TeachingScore,
			CourseworkScore:           rdb.CourseworkScore,
			AtmosphereScore:           rdb.AtmosphereScore,
			CareerPreparationScore:    rdb.CareerPreparationScore,
			OverallScore:              rdb.OverallScore,
			HelpfulUpvotes:            helpfulUpvotes,
			HelpfulDownvotes:          helpfulDownvotes,
			DidGraduate:               rdb.DidGraduate,
			HasJob:                    rdb.HasJob,
			SalaryBefore:              rdb.SalaryBefore,
			SalaryAfter:               rdb.SalaryAfter,
			School:                    *school,
			SchoolLocation:            *schoolLocation,
			SchoolGraduationTimestamp: graduationTimestamp,
			JobLocation:               jobLocation,
			JobStartTimestamp:         jobStartTimestamp,
			CreatedTimestamp:          rdb.CreatedTimestampServer,
		}
		reviews = append(reviews, review)
	}

	return reviews, err
}

func (sql *sqlDB) CreateTempReview(
	reviewUUID string,
	studentUUID string,
	schoolUUID string,
	schoolLocationUUID string,
	title string,
	studentExperience string,
	studentAdvice *string,
	teachingScore int,
	courseworkScore int,
	atmosphereScore int,
	careerPreparationScore int,
	overallScore int,
	schoolGraduationDate *time.Time,
	didGraduate bool,
	hasJob bool,
	jobLocationUUID *string,
	salaryBefore *int,
	salaryAfter *int,
	jobStartDate *time.Time,
) error {
	// student
	student, err := sql.getStudentDBWithUUID(studentUUID)
	if err != nil {
		return err
	}
	// school
	school, err := sql.getSchoolDBWithUUID(schoolUUID)
	if err != nil {
		return err
	}
	// locations
	schoolLocation, err := sql.getLocationDBForUUID(schoolLocationUUID)
	if err != nil {
		return err
	}
	var jobLocationID *int
	if jobLocationUUID != nil {
		jobLocation, err := sql.getLocationDBForUUID(*jobLocationUUID)
		if err != nil {
			return err
		}
		jobLocationID = &jobLocation.ID
	}

	createdTimestamp := int(time.Now().Unix())
	_, err = sql.db.NamedQuery(
		sql.queries.reviewQueries[_CreateTempReview],
		map[string]interface{}{
			"review_uuid":              reviewUUID,
			"student_id":               student.ID,
			"school_id":                school.ID,
			"school_location_id":       schoolLocation.ID,
			"title":                    title,
			"student_experience":       studentExperience,
			"student_advice":           studentAdvice,
			"teaching_score":           teachingScore,
			"coursework_score":         courseworkScore,
			"atmosphere_score":         atmosphereScore,
			"career_preparation_score": careerPreparationScore,
			"overall_score":            overallScore,
			"school_graduation_date":   schoolGraduationDate,
			"did_graduate":             didGraduate,
			"has_job":                  hasJob,
			"job_location_id":          jobLocationID,
			"salary_before":            salaryBefore,
			"salary_after":             salaryAfter,
			"job_start_date":           jobStartDate,
			"helpful_upvotes":          0,
			"helpful_downvotes":        0,
			"created_timestamp_server": createdTimestamp,
		},
	)

	return err
}

func (sql *sqlDB) SubmitHelpfulVote(
	studentUUID string,
	reviewUUID string,
	helpful bool,
) error {
	// student
	student, err := sql.getStudentDBWithUUID(studentUUID)
	if err != nil {
		return err
	}
	// school
	review, err := sql.getReviewDBWithUUID(reviewUUID)
	if err != nil {
		return err
	}

	_, err = sql.db.NamedQuery(
		sql.queries.reviewQueries[_SubmitHelpfulVote],
		map[string]interface{}{
			"review_id":  review.ID,
			"student_id": student.ID,
			"is_helpful": helpful,
		},
	)

	return err
}

func (sql *sqlDB) getReviewDBWithUUID(reviewUUID string) (*models.ReviewDBModel, error) {
	var review *models.ReviewDBModel

	rows, err := sql.db.NamedQuery(
		sql.queries.reviewQueries[_GetReviewDBWithUUID],
		map[string]interface{}{
			"review_uuid": reviewUUID,
		},
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var temp models.ReviewDBModel
		err := rows.StructScan(&temp)
		if err != nil {
			return nil, err
		}
		review = &temp
		break
	}

	return review, err
}

func (sql *sqlDB) getReviewHelpfulUpvotes(reviewUUID string) (int, error) {
	helpfulUpvotes := 0

	row := sql.db.QueryRowx(
		sql.queries.reviewQueries[_GetHelpfulUpvotes], reviewUUID)
	err := row.Scan(&helpfulUpvotes)
	if err != nil {
		return 0, err
	}

	return helpfulUpvotes, err
}

func (sql *sqlDB) getReviewHelpfulDownvotes(reviewUUID string) (int, error) {
	helpfulDownvotes := 0

	row := sql.db.QueryRowx(
		sql.queries.reviewQueries[_GetHelpfulDownvotes], reviewUUID)
	err := row.Scan(&helpfulDownvotes)
	if err != nil {
		return 0, err
	}

	return helpfulDownvotes, err
}
