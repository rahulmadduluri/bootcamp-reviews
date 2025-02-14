package server

import (
	"context"
	"errors"

	auth "github.com/rahulmadduluri/raft-education/backend/app/auth"
	db "github.com/rahulmadduluri/raft-education/backend/app/db"
	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

func (r *queryResolver) Student(ctx context.Context, uuid string) (*models.Student, error) {
	if auth.UUIDFromContext(ctx) == uuid {
		student, err := db.Handler().SQL().GetStudent(uuid)
		if err != nil {
			return nil, err
		}
		return student, err
	} else {
		return nil, errors.New("Access Denied: auth info is incorrect")
	}
}

func (r *mutationResolver) CreateStudent(ctx context.Context, studentInfo models.CreateStudentInput) (bool, error) {
	err := db.Handler().SQL().CreateStudent(studentInfo.UUID, studentInfo.FirstName, studentInfo.LastName, studentInfo.Email, studentInfo.LinkedInPhotoURL)
	if err != nil {
		return false, err
	}
	return true, nil
}
func (r *mutationResolver) UpdateStudent(ctx context.Context, studentInfo models.UpdateStudentInput) (bool, error) {
	panic("not implemented")
}
