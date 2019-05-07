package server

import (
	"context"

	db "github.com/rahulmadduluri/raft-education/backend/app/db"
	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

func (r *queryResolver) Companies(ctx context.Context, searchText string) ([]models.Company, error) {
	companies, err := db.Handler().SQL().GetCompanies(searchText)

	if err != nil {
		return nil, err
	}

	return companies, err
}

func (r *queryResolver) Company(ctx context.Context, uuid string) (*models.Company, error) {
	company, err := db.Handler().SQL().GetCompany(uuid)

	if err != nil {
		return nil, err
	}

	return company, err
}
