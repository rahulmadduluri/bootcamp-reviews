package auth

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"os"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	jwt "github.com/dgrijalva/jwt-go"
)

type Jwks struct {
	Keys []JSONWebKeys `json:"keys"`
}

type JSONWebKeys struct {
	Kty string   `json:"kty"`
	Kid string   `json:"kid"`
	Use string   `json:"use"`
	N   string   `json:"n"`
	E   string   `json:"e"`
	X5c []string `json:"x5c"`
}

func JWTMiddleware() *jwtmiddleware.JWTMiddleware {
	return jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			// Verify 'aud' claim
			aud := os.Getenv("JWT_AUDIENCE")
			checkAud := token.Claims.(jwt.MapClaims).VerifyAudience(aud, false)
			if !checkAud {
				return token, errors.New("Invalid audience.")
			}
			// Verify 'iss' claim
			iss := "https://" + os.Getenv("AUTH0_DOMAIN") + "/"
			checkIss := token.Claims.(jwt.MapClaims).VerifyIssuer(iss, false)
			if !checkIss {
				return token, errors.New("Invalid issuer.")
			}

			cert, err := getPemCert(token)
			if err != nil {
				panic(err.Error())
			}

			result, _ := jwt.ParseRSAPublicKeyFromPEM([]byte(cert))
			return result, nil
		},
		SigningMethod: jwt.SigningMethodRS256,
	})
}

func getPemCert(token *jwt.Token) (string, error) {
	cert := ""
	resp, err := http.Get("https://" + os.Getenv("AUTH0_DOMAIN") + "/.well-known/jwks.json")

	if err != nil {
		return cert, err
	}
	defer resp.Body.Close()

	var jwks = Jwks{}
	err = json.NewDecoder(resp.Body).Decode(&jwks)

	if err != nil {
		return cert, err
	}

	x5c := jwks.Keys[0].X5c
	for k, v := range x5c {
		if token.Header["kid"] == jwks.Keys[k].Kid {
			cert = "-----BEGIN CERTIFICATE-----\n" + v + "\n-----END CERTIFICATE-----"
		}
	}

	if cert == "" {
		err := errors.New("Unable to find appropriate key.")
		return cert, err
	}

	return cert, nil
}

type contextKey struct {
	name string
}

// Add ID Token to Context to be parsed in GraphQL

var uuidCtxKey = &contextKey{"uuid"}
var jwtCtxKey = &contextKey{"jwt"}

// Add JWT to context for isAuthenticated function to parse
func AddJWTToContext(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	// jwt
	tokenString := r.Header.Get("Authorization")
	ctx := context.WithValue(r.Context(), jwtCtxKey, tokenString)
	r = r.WithContext(ctx)

	// claims -- uuid
	token, _ := jwt.ParseWithClaims(tokenString, &jwt.MapClaims{}, nil)
	claims, _ := token.Claims.(*jwt.MapClaims)
	if claims != nil {
		if uuidFromClaim, ok := (*claims)["https://raft.one/uuid"]; ok {
			ctx = context.WithValue(r.Context(), uuidCtxKey, uuidFromClaim)
			r = r.WithContext(ctx)
		}
	}

	next(w, r)
}

// UUIDFromContext finds the uuid for context
func UUIDFromContext(ctx context.Context) string {
	uuid, _ := ctx.Value(uuidCtxKey).(string)
	return uuid
}

// JWTFromContext finds the uuid for context
func JWTFromContext(ctx context.Context) string {
	jwt, _ := ctx.Value(jwtCtxKey).(string)
	return jwt
}
