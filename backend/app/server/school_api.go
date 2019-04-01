package server

import (
	"context"
	"math"

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

func (r *queryResolver) Schools(ctx context.Context, params models.SchoolSearchParams) (*models.SchoolQueryResult, error) {
	queryResults := models.SchoolQueryResult{}

	allSchools, err := db.Handler().SQL().GetAllSchools()

	if err != nil {
		return nil, err
	}

	filteredSchools, err := r.filterSchools(allSchools, params)
	if err != nil {
		return nil, err
	}
	queryResults.PageNumber = params.PageNumber
	queryResults.TotalNumResults = len(filteredSchools)

	lowerBound := params.PageNumber * 10
	upperBound := int(math.Min(float64(lowerBound+10), float64(len(filteredSchools))))

	if upperBound <= lowerBound {
		queryResults.SchoolResults = []models.School{}
		return &queryResults, err
	}

	queryResults.SchoolResults = filteredSchools[lowerBound:upperBound]
	return &queryResults, err

}

func (r *queryResolver) filterSchools(schools []models.School, params models.SchoolSearchParams) ([]models.School, error) {
	filteredSchools := schools

	if params.SearchText != nil {
		f, err := db.Handler().SQL().GetSchoolsWithSearchText(*params.SearchText)
		if err != nil {
			return filteredSchools, err
		}
		filteredSchools = intersectionOfSchools(filteredSchools, f)
	}

	if params.LocationUUID != nil {
		f, err := db.Handler().SQL().GetSchoolsWithLocation(*params.LocationUUID)
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

	if params.MaxPrice != nil {
		f, err := db.Handler().SQL().GetSchoolsWithMaxPrice(*params.MaxPrice)
		if err != nil {
			return filteredSchools, err
		}
		filteredSchools = intersectionOfSchools(filteredSchools, f)
	}

	if params.MinGraduateSalary != nil {
		f, err := db.Handler().SQL().GetSchoolsWithMinGraduateSalary(*params.MinGraduateSalary)
		if err != nil {
			return filteredSchools, err
		}
		filteredSchools = intersectionOfSchools(filteredSchools, f)
	}

	if params.MinJobPlacementRate != nil {
		f, err := db.Handler().SQL().GetSchoolsWithMinJobPlacementRate(*params.MinJobPlacementRate)
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

func (r *queryResolver) Filters(ctx context.Context) (*models.Filters, error) {
	filters, err := db.Handler().SQL().GetFilters()
	if err != nil {
		return nil, err
	}
	return &filters, err
}
