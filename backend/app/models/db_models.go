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
	SchoolID             int
	LocationID           int
	MedianGraduateSalary *float64
	JobPlacementRate     *float64
}

type ReviewDBModel struct {
	ID                     int
	UUID                   string
	AllText                string
	TeachingScore          int
	CourseworkScore        int
	AtmosphereScore        int
	CareerPreparationScore int
	OverallScore           float64
	HelpfulUpvotes         int
	HelpfulDownvotes       int
	HasJob                 bool
	SalaryBefore           *int
	SalaryAfter            *int
	StudentID              int
	SchoolID               int
	SchoolLocationID       int
	JobLocationID          *int
	SchoolGraduationDate   *time.Time
	JobStartDate           *time.Time
	CreatedTimestampServer int
}
