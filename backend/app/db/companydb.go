package db

import (
	"log"

	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

const (
	_GetCompaniesWithSearchText = "getCompaniesWithSearchText"
	_GetCompanyDBWithUUID       = "getCompanyDBWithUUID"
	_GetCompanyLocationsDB      = "getCompanyLocationsDB"
)

type CompanyDB interface {
	GetCompanies(searchText string) ([]models.Company, error)
}

func (sql *sqlDB) GetCompanies(searchText string) ([]models.Company, error) {
	completeSearchText := "%" + searchText + "%"

	companies := []models.Company{}

	rows, err := sql.db.NamedQuery(
		sql.queries.companyQueries[_GetCompaniesWithSearchText],
		map[string]interface{}{
			"search_text": completeSearchText,
		},
	)
	if err != nil {
		return companies, err
	}
	defer rows.Close()

	for rows.Next() {
		var c models.Company
		err := rows.StructScan(&c)
		if err != nil {
			log.Println("scan error: ", err)
			continue
		}
		companies = append(companies, c)
	}

	for i, _ := range companies {
		company := companies[i]

		// get company locations
		locations, err := sql.getCompanyLocations(company.UUID)
		if err != nil {
			return companies, err
		}
		company.Locations = locations

		companies[i] = company
	}

	return companies, err
}

func (sql *sqlDB) getCompanyLocations(companyUUID string) ([]models.Location, error) {
	companyLocations := []models.Location{}
	companyLocationsDB := []models.CompanyLocationDBModel{}

	rows, err := sql.db.NamedQuery(
		sql.queries.companyQueries[_GetCompanyLocationsDB],
		map[string]interface{}{
			"company_uuid": companyUUID,
		},
	)
	if err != nil {
		return companyLocations, err
	}
	defer rows.Close()

	for rows.Next() {
		var l models.CompanyLocationDBModel
		err := rows.StructScan(&l)
		if err != nil {
			log.Println("scan error: ", err)
			continue
		}
		companyLocationsDB = append(companyLocationsDB, l)
	}

	for _, cl := range companyLocationsDB {
		l, err := sql.getLocationForID(cl.LocationID)
		if err != nil || l == nil {
			return companyLocations, err
		}
		companyLocations = append(companyLocations, *l)
	}

	return companyLocations, err
}

func (sql *sqlDB) getCompanyDBWithUUID(companyUUID string) (*models.CompanyDBModel, error) {
	var company *models.CompanyDBModel

	rows, err := sql.db.NamedQuery(
		sql.queries.reviewQueries[_GetCompanyDBWithUUID],
		map[string]interface{}{
			"company_uuid": companyUUID,
		},
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var temp models.CompanyDBModel
		err := rows.StructScan(&temp)
		if err != nil {
			return nil, err
		}
		company = &temp
		break
	}

	return company, err
}
