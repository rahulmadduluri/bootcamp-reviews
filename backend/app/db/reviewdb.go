package db

import (
	"time"

	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

const (
	_GetReviewsDB     = "getReviewsDB"
	_CreateTempReview = "createTempReview"
)

type ReviewDB interface {
	GetReviews(schoolUUID string) ([]models.Review, error)
	CreateTempReview(
		reviewUUID string,
		studentUUID string,
		schoolUUID string,
		schoolLocationUUID string,
		allText string,
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
		// get student, school, school location, job location create review object
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

		review := models.Review{
			UUID:                      rdb.UUID,
			AllText:                   rdb.AllText,
			TeachingScore:             rdb.TeachingScore,
			CourseworkScore:           rdb.CourseworkScore,
			AtmosphereScore:           rdb.AtmosphereScore,
			CareerPreparationScore:    rdb.CareerPreparationScore,
			OverallScore:              rdb.OverallScore,
			HelpfulUpvotes:            rdb.HelpfulUpvotes,
			HelpfulDownvotes:          rdb.HelpfulDownvotes,
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
	allText string,
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
			"all_text":                 allText,
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
