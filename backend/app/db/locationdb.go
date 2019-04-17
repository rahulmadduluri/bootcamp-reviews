package db

import (
	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

const (
	_GetLocationForID = "getLocationForID"
)

type LocationDB interface {
}

func (sql *sqlDB) getLocationForID(locationID int) (*models.Location, error) {
	var location models.Location

	// get school
	rows, err := sql.db.NamedQuery(
		sql.queries.locationQueries[_GetLocationForID],
		map[string]interface{}{
			"location_id": locationID,
		},
	)
	if err != nil {
		return &location, err
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.StructScan(&location)
		if err != nil {
			return nil, err
		}
		break
	}

	return &location, err
}
