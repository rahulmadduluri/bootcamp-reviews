package db

import (
	"log"

	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

const (
	_GetReviewsDB = "getReviewsDB"
)

type ReviewDB interface {
	GetReviews(schoolUUID string) ([]models.Review, error)
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

	log.Println(len(reviewsDB))

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
		// convert time from rdb.jobStartDate to timestamp
		test := 0
		review := models.Review{
			UUID:                      rdb.UUID,
			AllText:                   rdb.AllText,
			TeachingScore:             rdb.TeachingScore,
			CourseworkScore:           rdb.CourseworkScore,
			AtmosphereScore:           rdb.AtmosphereScore,
			CareerPreparationScore:    rdb.CareerPreparationScore,
			OverallScore:              rdb.OverallScore,
			HelpfulCount:              rdb.HelpfulCount,
			HasJob:                    rdb.HasJob,
			SalaryBefore:              rdb.SalaryBefore,
			SalaryAfter:               rdb.SalaryAfter,
			School:                    *school,
			SchoolLocation:            *schoolLocation,
			SchoolGraduationTimestamp: &test, // fix
			JobLocation:               jobLocation,
			JobStartTimestamp:         &test, // fix
			CreatedTimestamp:          rdb.CreatedTimestampServer,
		}
		reviews = append(reviews, review)
	}

	return reviews, err
}
