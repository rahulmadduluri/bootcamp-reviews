package db

import (
	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

const (
	_GetLocationDBForID = "getLocationDBForID"
	_GetCityForID       = "getCityForID"
	_GetCountryForID    = "getCountryForID"
)

type LocationDB interface {
}

func (sql *sqlDB) getLocationForID(locationID int) (*models.Location, error) {
	var locationDB models.LocationDBModel
	var location models.Location

	rows, err := sql.db.NamedQuery(
		sql.queries.locationQueries[_GetLocationDBForID],
		map[string]interface{}{
			"location_id": locationID,
		},
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.StructScan(&locationDB)
		if err != nil {
			return nil, err
		}
		break
	}

	country, err := sql.getCountryForID(locationDB.CountryID)
	if err != nil {
		return nil, err
	}
	city, err := sql.getCityForID(locationDB.CityID)
	if err != nil {
		return nil, err
	}

	location = models.Location{
		UUID:    locationDB.UUID,
		Country: country,
		City:    city,
	}

	return &location, err
}

func (sql *sqlDB) getCityForID(cityID int) (models.City, error) {
	var city models.City

	rows, err := sql.db.NamedQuery(
		sql.queries.locationQueries[_GetCityForID],
		map[string]interface{}{
			"city_id": cityID,
		},
	)
	if err != nil {
		return city, err
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.StructScan(&city)
		if err != nil {
			return city, err
		}
		break
	}

	return city, err
}

func (sql *sqlDB) getCountryForID(countryID int) (models.Country, error) {
	var country models.Country

	rows, err := sql.db.NamedQuery(
		sql.queries.locationQueries[_GetCountryForID],
		map[string]interface{}{
			"country_id": countryID,
		},
	)
	if err != nil {
		return country, err
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.StructScan(&country)
		if err != nil {
			return country, err
		}
		break
	}

	return country, err
}
