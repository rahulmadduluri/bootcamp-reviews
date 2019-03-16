package db

import (
	"log"

	models "github.com/rahulmadduluri/raft-education/backend/app/models"

	goyesql "github.com/nleof/goyesql"
)

const (
	_GetSchool                         = "getSchool"
	_GetSchoolTracks                   = "getSchoolTracks"
	_GetSchoolLocations                = "getSchoolLocations"
	_GetAllSchools                     = "getAllSchools"
	_GetSchoolsWithLocation            = "getSchoolsWithLocation"
	_GetSchoolsWithTrack               = "getSchoolsWithTrack"
	_GetSchoolsWithPaymentType         = "getSchoolsWithPaymentType"
	_GetSchoolsWithMaxPrice            = "getSchoolsWithMaxPrice"
	_GetSchoolsWithMinGraduateSalary   = "getSchoolsWithMinGraduateSalary"
	_GetSchoolsWithMinJobPlacementRate = "getSchoolsWithMinJobPlacementRate"
	_GetSchoolsWithMinLength           = "getSchoolsWithMinLength"
	_GetSchoolsWithOnlineStatus        = "getSchoolsWithOnlineStatus"
)

type SchoolDB interface {
	GetSchool(schoolUUID string) (models.School, error)
	GetAllSchools() ([]models.School, error)
	GetSchoolsWithLocation(country string) ([]models.School, error)
	GetSchoolsWithTrack(trackUUID string) ([]models.School, error)
	GetSchoolsWithPaymentType(paymentType string) ([]models.School, error)
	GetSchoolsWithMaxPrice(maxPrice int) ([]models.School, error)
	GetSchoolsWithMinGraduateSalary(minGraduateSalary float64) ([]models.School, error)
	GetSchoolsWithMinJobPlacementRate(minJobPlacementRate float64) ([]models.School, error)
	GetSchoolsWithMinLength(minLength int) ([]models.School, error)
	GetSchoolsWithOnlineStatus(isOnline bool) ([]models.School, error)
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
	schools, err := sql.getSchools(_GetAllSchools, map[string]interface{}{})
	return schools, err
}

func (sql *sqlDB) GetSchoolsWithLocation(locationUUID string) ([]models.School, error) {
	schools, err := sql.getSchools(_GetSchoolsWithLocation, map[string]interface{}{
		"location_uuid": locationUUID,
	})
	return schools, err
}
func (sql *sqlDB) GetSchoolsWithTrack(trackUUID string) ([]models.School, error) {
	schools, err := sql.getSchools(_GetSchoolsWithTrack, map[string]interface{}{
		"track_uuid": trackUUID,
	})
	return schools, err
}
func (sql *sqlDB) GetSchoolsWithPaymentType(paymentType string) ([]models.School, error) {
	schools, err := sql.getSchools(_GetSchoolsWithPaymentType, map[string]interface{}{
		"payment_type": paymentType,
	})
	return schools, err
}
func (sql *sqlDB) GetSchoolsWithMaxPrice(maxPrice int) ([]models.School, error) {
	schools, err := sql.getSchools(_GetSchoolsWithMaxPrice, map[string]interface{}{
		"max_price": maxPrice,
	})
	return schools, err
}
func (sql *sqlDB) GetSchoolsWithMinGraduateSalary(minGraduateSalary float64) ([]models.School, error) {
	schools, err := sql.getSchools(_GetSchoolsWithMinGraduateSalary, map[string]interface{}{
		"min_graduate_salary": minGraduateSalary,
	})
	return schools, err
}
func (sql *sqlDB) GetSchoolsWithMinJobPlacementRate(minJobPlacementRate float64) ([]models.School, error) {
	schools, err := sql.getSchools(_GetSchoolsWithMinJobPlacementRate, map[string]interface{}{
		"min_job_placement_rate": minJobPlacementRate,
	})
	return schools, err
}
func (sql *sqlDB) GetSchoolsWithMinLength(minLength int) ([]models.School, error) {
	schools, err := sql.getSchools(_GetSchoolsWithMinLength, map[string]interface{}{
		"min_length": minLength,
	})
	return schools, err
}
func (sql *sqlDB) GetSchoolsWithOnlineStatus(isOnline bool) ([]models.School, error) {
	schools, err := sql.getSchools(_GetSchoolsWithOnlineStatus, map[string]interface{}{
		"is_online": isOnline,
	})
	return schools, err
}

func (sql *sqlDB) getSchools(queryName goyesql.Tag, params map[string]interface{}) ([]models.School, error) {
	schools := []models.School{}

	rows, err := sql.db.NamedQuery(
		sql.queries.schoolQueries[queryName],
		params,
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
