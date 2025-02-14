package db

import (
	"log"

	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

const (
	_GetLocationsDB  = "getLocationsDB"
	_GetPaymentTypes = "getPaymentTypes"
)

type FiltersDB interface {
	GetFilters() (models.Filters, error)
}

func (sql *sqlDB) GetFilters() (models.Filters, error) {
	var filters models.Filters

	// Get Locations
	locations := []models.Location{}
	locationsDB := []models.LocationDBModel{}

	rows, err := sql.db.NamedQuery(
		sql.queries.filtersQueries[_GetLocationsDB],
		map[string]interface{}{},
	)
	if err != nil {
		return filters, err
	}
	defer rows.Close()

	for rows.Next() {
		var l models.LocationDBModel
		err := rows.StructScan(&l)
		if err != nil {
			log.Fatal("scan error: ", err)
			return filters, err
		}
		locationsDB = append(locationsDB, l)
	}
	for _, locDB := range locationsDB {
		l, err := sql.getLocationForID(locDB.ID)
		if err != nil {
			return filters, err
		}
		locations = append(locations, *l)
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
