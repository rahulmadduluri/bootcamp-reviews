package models

import ()

// NOTE: These are models representing rows in MySQL database

type CampusLocationDBModel struct {
	SchoolID             int
	LocationID           int
	MedianGraduateSalary float64
	JobPlacementRate     float64
}
