package server

import (
	"context"

	"github.com/rahulmadduluri/raft-education/backend/app/models"
)

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct{}

func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) School(ctx context.Context, uuid string) (*models.School, error) {
	panic("not implemented")
}
func (r *queryResolver) Occupation(ctx context.Context, uuid string) (*models.Occupation, error) {
	panic("not implemented")
}

func New() Config {
	resolver := Resolver{}

	return Config{
		Resolvers: &resolver,
	}
}
