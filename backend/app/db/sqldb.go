package db

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/nleof/goyesql"
)

const (
	_schoolQueriesPath     = "db/sql/schoolQueries.sql"
	_occupationQueriesPath = "db/sql/occupationQueries.sql"
)

type SQLDB interface {
	// SchoolDB
	// OccupationDB
}

type sqlQueries struct {
	schoolQueries     goyesql.Queries
	occupationQueries goyesql.Queries
}

type sqlDB struct {
	db      *sqlx.DB
	queries sqlQueries
}

func generateQueries() sqlQueries {
	schoolQueries := goyesql.MustParseFile(_schoolQueriesPath)
	occupationQueries := goyesql.MustParseFile(_occupationQueriesPath)
	return sqlQueries{
		schoolQueries:     schoolQueries,
		occupationQueries: occupationQueries,
	}
}
