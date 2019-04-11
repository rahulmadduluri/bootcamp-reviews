package db

import (
	"log"

	models "github.com/rahulmadduluri/raft-education/backend/app/models"

	goyesql "github.com/nleof/goyesql"
)

const (
	_GetSchool                  = "getSchool"
	_GetSchoolCampusLocationsDB = "getSchoolCampusLocationsDB"
	_GetAllSchools              = "getAllSchools"

	_GetSchoolsWithSearchText          = "getSchoolsWithSearchText"
	_GetSchoolsWithLocation            = "getSchoolsWithLocation"
	_GetSchoolsWithPaymentType         = "getSchoolsWithPaymentType"
	_GetSchoolsWithMaxPrice            = "getSchoolsWithMaxPrice"
	_GetSchoolsWithMinGraduateSalary   = "getSchoolsWithMinGraduateSalary"
	_GetSchoolsWithMinJobPlacementRate = "getSchoolsWithMinJobPlacementRate"
	_GetSchoolsWithMinLength           = "getSchoolsWithMinLength"
)

type SchoolDB interface {
	GetSchool(schoolUUID string) (*models.School, error)
	GetAllSchools() ([]models.School, error)

	GetSchoolsWithSearchText(searchText string) ([]models.School, error)
	GetSchoolsWithLocation(locationUUID string) ([]models.School, error)
	GetSchoolsWithPaymentType(paymentType string) ([]models.School, error)
	GetSchoolsWithMaxPrice(maxPrice int) ([]models.School, error)
	GetSchoolsWithMinGraduateSalary(minGraduateSalary float64) ([]models.School, error)
	GetSchoolsWithMinJobPlacementRate(minJobPlacementRate float64) ([]models.School, error)
	GetSchoolsWithMinLength(minLength int) ([]models.School, error)
}

func (sql *sqlDB) GetSchool(schoolUUID string) (*models.School, error) {
	var school *models.School

	// get school
	rows, err := sql.db.NamedQuery(
		sql.queries.schoolQueries[_GetSchool],
		map[string]interface{}{
			"school_uuid": schoolUUID,
		},
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.StructScan(school)
		if err != nil {
			return nil, err
		}
		break
	}

	if school == nil {
		return nil, nil
	}

	// get school locations
	locations, err := sql.getSchoolCampusLocations(schoolUUID)
	if err != nil {
		return school, err
	}
	school.CampusLocations = locations

	return school, err
}

func (sql *sqlDB) getSchoolCampusLocations(schoolUUID string) ([]models.CampusLocation, error) {
	campusLocations := []models.CampusLocation{}
	campusLocationsDB := []models.CampusLocationDBModel{}

	rows, err := sql.db.NamedQuery(
		sql.queries.schoolQueries[_GetSchoolCampusLocationsDB],
		map[string]interface{}{
			"school_uuid": schoolUUID,
		},
	)
	if err != nil {
		return campusLocations, err
	}
	defer rows.Close()

	for rows.Next() {
		var l models.CampusLocationDBModel
		err := rows.StructScan(&l)
		if err != nil {
			log.Println("scan error: ", err)
			continue
		}
		campusLocationsDB = append(campusLocationsDB, l)
	}

	for _, cl := range campusLocationsDB {
		l, err := sql.getLocationForID(cl.LocationID)
		if err != nil {
			return campusLocations, err
		}
		ags := cl.MedianGraduateSalary
		jpr := cl.JobPlacementRate
		campusLocation := models.CampusLocation{
			Location:             l,
			MedianGraduateSalary: &ags,
			JobPlacementRate:     &jpr,
		}
		campusLocations = append(campusLocations, campusLocation)
	}

	return campusLocations, err
}

func (sql *sqlDB) GetAllSchools() ([]models.School, error) {
	schools, err := sql.getSchools(_GetAllSchools, map[string]interface{}{})
	return schools, err
}

func (sql *sqlDB) GetSchoolsWithSearchText(searchText string) ([]models.School, error) {
	completeSearchText := "%" + searchText + "%"
	schools, err := sql.getSchools(_GetSchoolsWithSearchText, map[string]interface{}{
		"search_text": completeSearchText,
	})
	return schools, err
}

func (sql *sqlDB) GetSchoolsWithLocation(locationUUID string) ([]models.School, error) {
	schools, err := sql.getSchools(_GetSchoolsWithLocation, map[string]interface{}{
		"location_uuid": locationUUID,
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
		// get school locations
		locations, err := sql.getSchoolCampusLocations(school.UUID)
		if err != nil {
			return schools, err
		}
		school.CampusLocations = locations

		schools[i] = school
	}

	return schools, err
}
