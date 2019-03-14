package server

import (
	"context"

	db "github.com/rahulmadduluri/raft-education/backend/app/db"
	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

func (r *queryResolver) School(ctx context.Context, uuid string) (*models.School, error) {
	school, err := db.Handler().SQL().GetSchool(uuid)
	if err != nil {
		return nil, err
	}
	return &school, err
}

func (r *queryResolver) Schools(ctx context.Context, params models.SchoolSearchParams) ([]models.School, error) {
	allSchools, err := db.Handler().SQL().GetAllSchools()
	if err != nil {
		return allSchools, err
	}

	filteredSchools, err := r.filterSchools(allSchools, params)
	if err != nil {
		return filteredSchools, err
	}

	sortedSchools := r.sortSchools(filteredSchools, params)

	return sortedSchools, err
}

func (r *queryResolver) filterSchools(schools []models.School, params models.SchoolSearchParams) ([]models.School, error) {
	filteredSchools := schools

	if params.Country != nil {
		f, err := db.Handler().SQL().GetSchoolsWithCountry(*params.Country)
		if err != nil {
			return filteredSchools, err
		}
		filteredSchools = intersectionOfSchools(filteredSchools, f)

	}

	if params.TrackUUID != nil {
		f, err := db.Handler().SQL().GetSchoolsWithTrack(*params.TrackUUID)
		if err != nil {
			return filteredSchools, err
		}
		filteredSchools = intersectionOfSchools(filteredSchools, f)
	}

	if params.PaymentType != nil {
		f, err := db.Handler().SQL().GetSchoolsWithPaymentType(*params.PaymentType)
		if err != nil {
			return filteredSchools, err
		}
		filteredSchools = intersectionOfSchools(filteredSchools, f)
	}

	if params.MinLength != nil {
		f, err := db.Handler().SQL().GetSchoolsWithMinLength(*params.MinLength)
		if err != nil {
			return filteredSchools, err
		}
		filteredSchools = intersectionOfSchools(filteredSchools, f)
	}

	if params.IsOnline != nil {
		f, err := db.Handler().SQL().GetSchoolsWithOnlineStatus(*params.IsOnline)
		if err != nil {
			return filteredSchools, err
		}
		filteredSchools = intersectionOfSchools(filteredSchools, f)
	}

	return filteredSchools, nil
}

func intersectionOfSchools(groupA []models.School, groupB []models.School) []models.School {
	intersection := []models.School{}
	for _, a := range groupA {
		for _, b := range groupB {
			if a.UUID == b.UUID {
				intersection = append(intersection, a)
				break
			}
		}
	}
	return intersection
}

func (r *queryResolver) sortSchools(schools []models.School, params models.SchoolSearchParams) []models.School {
	return schools
}
