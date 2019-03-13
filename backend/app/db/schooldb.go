package db

import (
	"log"

	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

const (
	_GetSchool       = "getSchool"
	_GetSchoolTracks = "getSchoolTracks"
)

type SchoolDB interface {
	GetSchool(schoolUUID string) (models.School, error)
	GetSchoolTracks(schoolUUID string) ([]models.Track, error)
}

func (sql *sqlDB) GetSchool(schoolUUID string) (models.School, error) {
	var school models.School

	// get school
	rows, err := sql.db.NamedQuery(
		sql.queries.schoolQueries[_GetSchool],
		map[string]interface{}{
			"school_uuid": schoolUUID,
		},
	)
	if err != nil {
		return school, err
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.StructScan(&school)
		if err != nil {
			log.Fatal("scan error: ", err)
		}
		break
	}

	// get school tracks
	tracks, err := sql.GetSchoolTracks(schoolUUID)
	if err != nil {
		return school, err
	}
	school.Tracks = tracks

	return school, err
}

func (sql *sqlDB) GetSchoolTracks(schoolUUID string) ([]models.Track, error) {
	tracks := []models.Track{}

	rows, err := sql.db.NamedQuery(
		sql.queries.schoolQueries[_GetSchoolTracks],
		map[string]interface{}{
			"school_uuid": schoolUUID,
		},
	)
	if err != nil {
		return tracks, err
	}
	defer rows.Close()

	for rows.Next() {
		var t models.Track
		err := rows.StructScan(&t)
		if err != nil {
			log.Println("scan error: ", err)
			continue
		}
		tracks = append(tracks, t)
	}

	return tracks, err
}
