package server

import (
	"context"

	db "github.com/rahulmadduluri/raft-education/backend/app/db"
	models "github.com/rahulmadduluri/raft-education/backend/app/models"
)

func (r *queryResolver) Student(ctx context.Context, uuid string) (*models.Student, error) {
	student, err := db.Handler().SQL().GetStudent(uuid)
	if err != nil {
		return nil, err
	}
	return &student, err
}

func (r *mutationResolver) CreateStudent(ctx context.Context, studentInfo models.CreateStudentInput) (bool, error) {
	panic("not implemented")
}
func (r *mutationResolver) UpdateStudent(ctx context.Context, studentInfo models.UpdateStudentInput) (bool, error) {
	panic("not implemented")
}
