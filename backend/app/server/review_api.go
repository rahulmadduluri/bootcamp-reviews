package server

import (
	"context"

	db "github.com/rahulmadduluri/raft-education/backend/app/db"
	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

func (r *queryResolver) Reviews(ctx context.Context, schoolUUID string, offset int) ([]models.Review, error) {
	reviews, err := db.Handler().SQL().GetReviews(schoolUUID)
	if err != nil {
		return nil, err
	}
	return reviews, err
}
