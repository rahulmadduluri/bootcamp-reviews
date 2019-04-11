package db

import (
	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

const (
	_GetStudent = "getStudent"
)

type StudentDB interface {
	GetStudent(studentUUID string) (*models.Student, error)
}

func (sql *sqlDB) GetStudent(studentUUID string) (*models.Student, error) {
	var student *models.Student

	// get student
	rows, err := sql.db.NamedQuery(
		sql.queries.studentQueries[_GetStudent],
		map[string]interface{}{
			"student_uuid": studentUUID,
		},
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.StructScan(student)
		if err != nil {
			return nil, err
		}
		break
	}

	return student, err
}
