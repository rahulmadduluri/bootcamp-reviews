package server

import (
	"context"
	"math"

	db "github.com/rahulmadduluri/raft-education/backend/app/db"
	models "github.com/rahulmadduluri/raft-education/backend/app/models"
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
