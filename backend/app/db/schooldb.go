package db

import (
	"log"

	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

const (
	_GetSchool = "getSchool"
)

type SchoolDB interface {
	GetSchool(schoolUUID string) (models.School, error)
}

func (sql *sqlDB) GetSchool(schoolUUID string) (models.School, error) {
	var obj models.School

	rows, err := sql.db.NamedQuery(
		sql.queries.schoolQueries[_GetSchool],
		map[string]interface{}{
			"school_uuid": schoolUUID,
		},
	)
	if err != nil {
		return obj, err
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.StructScan(&obj)
		if err != nil {
			log.Fatal("scan error: ", err)
		}
		return obj, err
	}
	return obj, err
}
