package auth

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
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

var jwtCtxKey = &contextKey{"jwt"}
var uuidCtxKey = &contextKey{"uuid"}

// Add JWT to context for isAuthenticated function to parse
func AddJWTToContext(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	// jwt
	tokenString := r.Header.Get("Authorization")
	ctx := context.WithValue(r.Context(), jwtCtxKey, tokenString)
	r = r.WithContext(ctx)

	next(w, r)
}

func JWTFromContext(ctx context.Context) string {
	jwt, _ := ctx.Value(jwtCtxKey).(string)
	return jwt
}

func UUIDFromContext(ctx context.Context) string {
	uuid, _ := ctx.Value(uuidCtxKey).(string)
	return uuid
}

func ContextWithUUID(ctx context.Context, uuid string) context.Context {
	return context.WithValue(ctx, uuidCtxKey, uuid)
}

// Check validity of JWT token
func ValidateToken(m *jwtmiddleware.JWTMiddleware, token string) (bool, error) {
	// If the token is empty...
	if token == "" {
		// If we get here, the required token is missing
		errorMsg := "Required authorization token not found"
		return false, errors.New(errorMsg)
	}

	// Now parse the token
	parsedToken, err := jwt.Parse(token, m.Options.ValidationKeyGetter)

	// Check if there was an error in parsing...
	if err != nil {
		return false, fmt.Errorf("Error parsing token: %v", err)
	}

	if m.Options.SigningMethod != nil && m.Options.SigningMethod.Alg() != parsedToken.Header["alg"] {
		message := fmt.Sprintf("Expected %s signing method but token specified %s",
			m.Options.SigningMethod.Alg(),
			parsedToken.Header["alg"])
		return false, fmt.Errorf("Error validating token algorithm: %s", message)
	}

	// Check if the parsed token is valid...
	if !parsedToken.Valid {
		return false, errors.New("Token is invalid")
	}

	return true, nil
}

// Extract uuid from validated token
func GetUUIDFromValidatedToken(tokenString string) string {
	// claims -- uuid
	token, _ := jwt.ParseWithClaims(tokenString, &jwt.MapClaims{}, nil)
	claims, _ := token.Claims.(*jwt.MapClaims)
	if claims != nil {
		if uuidFromClaim, ok := (*claims)["https://raft.one/uuid"]; ok {
			return uuidFromClaim.(string)
		}
	}
	return ""
}
