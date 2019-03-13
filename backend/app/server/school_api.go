package server

import (
	"context"

	"github.com/rahulmadduluri/raft-education/backend/app/models"
)

func (r *queryResolver) School(ctx context.Context, uuid string) (*models.School, error) {
	panic("not implemented")
}
func (r *queryResolver) Schools(ctx context.Context, params models.SchoolSearchParams) ([]models.School, error) {
	panic("not implemented")
}
