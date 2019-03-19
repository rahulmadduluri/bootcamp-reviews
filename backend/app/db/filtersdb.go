package db

import (
	"log"

	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

const (
	_GetTracks       = "getTracks"
	_GetLocations    = "getLocations"
	_GetPaymentTypes = "getPaymentTypes"
)

type FiltersDB interface {
	GetFilters() (models.Filters, error)
}

func (sql *sqlDB) GetFilters() (models.Filters, error) {
	var filters models.Filters

	// Get Tracks
	tracks := []models.Track{}
	rows, err := sql.db.NamedQuery(
		sql.queries.filtersQueries[_GetTracks],
		map[string]interface{}{},
	)
	if err != nil {
		return filters, err
	}
	defer rows.Close()

	for rows.Next() {
		var t models.Track
		err := rows.StructScan(&t)
		if err != nil {
			log.Fatal("scan error: ", err)
			return filters, err
		}
		tracks = append(tracks, t)
	}
	filters.Tracks = tracks

	// Get Locations
	locations := []models.Location{}
	rows, err = sql.db.NamedQuery(
		sql.queries.filtersQueries[_GetLocations],
		map[string]interface{}{},
	)
	if err != nil {
		return filters, err
	}
	defer rows.Close()

	for rows.Next() {
		var l models.Location
		err := rows.StructScan(&l)
		if err != nil {
			log.Fatal("scan error: ", err)
			return filters, err
		}
		locations = append(locations, l)
	}
	filters.Locations = locations

	// Get Payment Types
	paymentTypes := []string{}
	rows, err = sql.db.NamedQuery(
		sql.queries.filtersQueries[_GetPaymentTypes],
		map[string]interface{}{},
	)
	if err != nil {
		return filters, err
	}
	defer rows.Close()

	for rows.Next() {
		var p string
		err := rows.Scan(&p)
		if err != nil {
			log.Fatal("scan error: ", err)
			return filters, err
		}
		paymentTypes = append(paymentTypes, p)
	}
	filters.PaymentTypes = paymentTypes

	return filters, nil
}
