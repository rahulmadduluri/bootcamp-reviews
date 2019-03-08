package auth

import (
	"encoding/base64"
	"log"
	"os"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

const (
	// only relevant to local
	_AWSAccessKey = "AWS_ACCESS_KEY"
	_AWSSecretKey = "AWS_SECRET_KEY"

	_AWSRegionKey = "AWS_REGION"
	_S3BucketKey  = "AWS_S3_BUCKET"
)

var _awsSession *session.Session

func AWSSession() *session.Session {
	return _awsSession
}

func ConfigureAWSSession(isProd bool) {
	awsRegion := os.Getenv(_AWSRegionKey)
	if awsRegion == "" {
		log.Panic("Couldn't find AWS Region")
		return
	}
	var err error
	if isProd {
		_awsSession, err = session.NewSession(&aws.Config{
			Region: aws.String(awsRegion),
		})
		if err != nil {
			log.Panic("Failed to create AWS session")
			return
		}
	} else {
		accessKey := os.Getenv(_AWSAccessKey)
		if accessKey == "" {
			log.Panic("couldn't get AWS access key")
			return
		}
		secretKey := os.Getenv(_AWSSecretKey)
		if secretKey == "" {
			log.Panic("Coudln't get AWS secret key")
			return
		}
		_awsSession, err = session.NewSession(&aws.Config{
			Region:      aws.String("us-west-2"),
			Credentials: credentials.NewStaticCredentials(accessKey, secretKey, ""),
		})
		if err != nil {
			log.Panic("Failed to create AWS session")
			return
		}
	}
}

func AWSBucket() string {
	return os.Getenv(_S3BucketKey)
}

func UploadImageToAWS(folder string, photoURI string, base64Photo string) error {
	r := base64.NewDecoder(base64.StdEncoding, strings.NewReader(base64Photo))
	path := folder + "/" + photoURI
	params := &s3manager.UploadInput{
		Bucket:      aws.String(AWSBucket()),
		Key:         aws.String(path),
		Body:        r,
		ContentType: aws.String("image/png"),
	}

	// S3 service client the Upload manager will use.
	svc := s3.New(_awsSession)
	// Create an uploader with S3 client and default options
	uploader := s3manager.NewUploaderWithClient(svc)
	// Perform upload
	_, err := uploader.Upload(params)
	return err
}
