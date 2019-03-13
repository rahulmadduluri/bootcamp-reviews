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
	panic("not implemented")
}
