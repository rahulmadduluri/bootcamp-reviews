package models

import (
	"time"
)

// NOTE: These are models representing rows in MySQL database

type LocationDBModel struct {
	ID        int
	UUID      string
	CityID    int
	CountryID int
}

type CampusLocationDBModel struct {
	SchoolID   int
	LocationID int
}

type CompanyDBModel struct {
	ID                     int
	UUID                   string
	Name                   string
	PhotoURI               string
	CreatedTimestampServer int
}

type CompanyLocationDBModel struct {
	CompanyID  int
	LocationID int
}

type StudentDBModel struct {
	ID                     int
	UUID                   string
	FirstName              string
	LastName               string
	Email                  string
	LinkedInPhotoURL       *string
	LinkedInURL            *string
	PhotoURI               *string
	SchoolID               *int
	CompanyID              *int
	CreatedTimestampServer int
}

type SchoolDBModel struct {
	ID                     int
	UUID                   string
	Name                   string
	LengthInWeeks          *int
	StudentTeacherRatio    *int
	IsOnline               bool
	BasePrice              int
	PaymentType            string
	PhotoURI               string
	CreatedTimestampServer int
}

type ReviewDBModel struct {
	ID                     int
	UUID                   string
	Title                  string
	StudentExperience      string
	StudentAdvice          *string
	TeachingScore          int
	CourseworkScore        int
	AtmosphereScore        int
	CareerPreparationScore int
	OverallScore           int
	DidGraduate            bool
	HasJob                 bool
	SalaryBefore           *int
	SalaryAfter            *int
	StudentID              int
	SchoolID               int
	SchoolLocationID       int
	JobLocationID          *int
	SchoolGraduationDate   *time.Time
	JobFoundDate           *time.Time
	CreatedTimestampServer int
}
