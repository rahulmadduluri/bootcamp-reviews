package db

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/nleof/goyesql"
)

const (
	_schoolQueriesPath = "db/sql/schoolQueries.sql"
)

type SQLDB interface {
	SchoolDB
}

type sqlQueries struct {
	schoolQueries goyesql.Queries
}

type sqlDB struct {
	db      *sqlx.DB
	queries sqlQueries
}

func generateQueries() sqlQueries {
	schoolQueries := goyesql.MustParseFile(_schoolQueriesPath)
	return sqlQueries{
		schoolQueries: schoolQueries,
	}
}
