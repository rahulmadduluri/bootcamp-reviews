package server

import (
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
)

// Resolvers
type Resolver struct{}
type queryResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }

func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}

func New() Config {
	resolver := Resolver{}

	isAuthenticated := func(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {

		// validate token, if token fails
		if false {
			return nil, fmt.Errorf("Access denied")
		}

		return next(ctx)
	}
	directive := DirectiveRoot{
		IsAuthenticated: isAuthenticated,
	}

	return Config{
		Resolvers:  &resolver,
		Directives: directive,
	}
}
