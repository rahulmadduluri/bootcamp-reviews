package server

import (
	"context"
	"log"

	auth "github.com/rahulmadduluri/raft-education/backend/app/auth"

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
		log.Println("LOL3")
		jwt := auth.JWTFromContext(ctx)
		log.Println(jwt)
		// if authorization isn't available
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
