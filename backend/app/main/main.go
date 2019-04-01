package main

import (
	"html/template"
	"log"
	"net/http"
	"os"

	auth "github.com/rahulmadduluri/raft-education/backend/app/auth"
	db "github.com/rahulmadduluri/raft-education/backend/app/db"
	server "github.com/rahulmadduluri/raft-education/backend/app/server"

	"github.com/99designs/gqlgen/handler"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/urfave/negroni"
)

const (
	_PortKey = "PORT"
)

func main() {
	// load env from file is env is not production
	if auth.IsEnvProd() == false {
		err := godotenv.Load()
		if err != nil {
			log.Print("Error loading .env file")
		}
	}

	// config MySQL
	log.Println("Starting application")
	db.ConfigHandler()
	defer db.Handler().Close()

	// configure AWS
	auth.ConfigureAWSSession(auth.IsEnvPlayground())

	// Set up Router to route to landing page & playground
	r := mux.NewRouter()
	r.HandleFunc("/", landingPage)

	if auth.IsEnvPlayground() == true {
		r.HandleFunc("/playground", handler.Playground("GraphQL playground", "/api"))
	}

	// create API router & middleware (additional auth middleware for prod mode)
	api := mux.NewRouter()
	api.HandleFunc("/api", handler.GraphQL(
		server.NewExecutableSchema(server.New()),
	))

	// serve images from s3
	s3router := mux.NewRouter()
	s3router.PathPrefix("/s3/").Handler(http.StripPrefix("/s3/", http.HandlerFunc(serveFromS3)))

	if auth.IsEnvPlayground() == true {
		r.PathPrefix("/api").Handler(negroni.New(negroni.Wrap(api)))
	} else {
		jwtMiddleware := auth.JWTMiddleware()
		r.PathPrefix("/api").Handler(negroni.New(
			negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
			negroni.HandlerFunc(auth.AddUUIDToContext),
			negroni.Wrap(api),
		))
	}

	r.PathPrefix("/api").Handler(negroni.New(negroni.Wrap(api)))
	r.PathPrefix("/s3/").Handler(negroni.New(negroni.Wrap(s3router)))

	// Run Server
	port := os.Getenv(_PortKey)
	if port == "" {
		log.Fatal("Could not find PORT in env variables")
	}
	n := negroni.Classic()
	n.UseHandler(r)
	n.Run(":" + port)
}

func landingPage(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles(
		"../../web/public/index.html",
	)
	if err != nil {
		log.Println("template parsing error: ", err)
	}
	err = t.Execute(w, nil)
	if err != nil {
		log.Print("template executing error: ", err)
	}

}

func serveResource(w http.ResponseWriter, req *http.Request) {
	path := "../../web" + req.URL.Path
	http.ServeFile(w, req, path)
}

func serveFromS3(w http.ResponseWriter, req *http.Request) {
	downloader := s3manager.NewDownloader(auth.AWSSession())

	buff := &aws.WriteAtBuffer{}
	bucket := auth.AWSBucket()

	_, err := downloader.Download(buff,
		&s3.GetObjectInput{
			Bucket: aws.String(bucket),
			Key:    aws.String(req.URL.Path),
		},
	)
	if err != nil {
		log.Println("Failed to download image")
	}

	if _, err = w.Write(buff.Bytes()); err != nil {
		log.Println("unable to write image.")
	}
}
