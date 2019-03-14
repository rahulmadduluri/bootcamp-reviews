package db

import (
	"log"

	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

const (
	_GetSchool          = "getSchool"
	_GetSchoolTracks    = "getSchoolTracks"
	_GetSchoolLocations = "getSchoolLocations"
	_GetAllSchools      = "getAllSchools"
)

type SchoolDB interface {
	GetSchool(schoolUUID string) (models.School, error)
	GetAllSchools() ([]models.School, error)
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

	// get school locations
	locations, err := sql.GetSchoolLocations(schoolUUID)
	if err != nil {
		return school, err
	}
	school.Locations = locations

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

func (sql *sqlDB) GetSchoolLocations(schoolUUID string) ([]models.Location, error) {
	locations := []models.Location{}

	rows, err := sql.db.NamedQuery(
		sql.queries.schoolQueries[_GetSchoolLocations],
		map[string]interface{}{
			"school_uuid": schoolUUID,
		},
	)
	if err != nil {
		return locations, err
	}
	defer rows.Close()

	for rows.Next() {
		var l models.Location
		err := rows.StructScan(&l)
		if err != nil {
			log.Println("scan error: ", err)
			continue
		}
		locations = append(locations, l)
	}

	return locations, err
}

func (sql *sqlDB) GetAllSchools() ([]models.School, error) {
	schools := []models.School{}

	rows, err := sql.db.NamedQuery(
		sql.queries.schoolQueries[_GetAllSchools],
		map[string]interface{}{},
	)
	if err != nil {
		return schools, err
	}
	defer rows.Close()

	for rows.Next() {
		var s models.School
		err := rows.StructScan(&s)
		if err != nil {
			log.Println("scan error: ", err)
			continue
		}
		schools = append(schools, s)
	}

	for i, _ := range schools {
		school := schools[i]
		// get school tracks
		tracks, err := sql.GetSchoolTracks(school.UUID)
		if err != nil {
			return schools, err
		}
		school.Tracks = tracks

		// get school locations
		locations, err := sql.GetSchoolLocations(school.UUID)
		if err != nil {
			return schools, err
		}
		school.Locations = locations

		schools[i] = school
	}

	return schools, err
}
