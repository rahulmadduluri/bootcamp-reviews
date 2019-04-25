package db

import (
	"time"

	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

const (
	_GetStudent           = "getStudent"
	_GetStudentDBWithUUID = "getStudentDBWithUUID"
	_CreateStudent        = "createStudent"
)

type StudentDB interface {
	GetStudent(studentUUID string) (*models.Student, error)
	CreateStudent(studentUUID string, firstName string, lastName string, email string, linkedInPhotoURL string) error
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
		var temp models.Student
		err := rows.StructScan(&temp)
		if err != nil {
			return nil, err
		}
		student = &temp
		break
	}

	return student, err
}

func (sql *sqlDB) CreateStudent(studentUUID string, firstName string, lastName string, email string, linkedInPhotoURL string) error {
	createdTimestamp := int(time.Now().Unix())
	_, err := sql.db.NamedQuery(
		sql.queries.studentQueries[_CreateStudent],
		map[string]interface{}{
			"student_uuid":             studentUUID,
			"first_name":               firstName,
			"last_name":                lastName,
			"email":                    email,
			"linked_in_photo_url":      linkedInPhotoURL,
			"created_timestamp_server": createdTimestamp,
		},
	)
	if err != nil {
		return err
	}
	return nil
}

func (sql *sqlDB) getStudentDBWithUUID(studentUUID string) (*models.StudentDBModel, error) {
	var student *models.StudentDBModel

	rows, err := sql.db.NamedQuery(
		sql.queries.studentQueries[_GetStudentDBWithUUID],
		map[string]interface{}{
			"student_uuid": studentUUID,
		},
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var temp models.StudentDBModel
		err := rows.StructScan(&temp)
		if err != nil {
			return nil, err
		}
		student = &temp
		break
	}

	return student, err
}
