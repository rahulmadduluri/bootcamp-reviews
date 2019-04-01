package db

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/nleof/goyesql"
)

const (
	_schoolQueriesPath   = "db/sql/schoolQueries.sql"
	_filtersQueriesPath  = "db/sql/filtersQueries.sql"
	_locationQueriesPath = "db/sql/locationQueries.sql"
)

type SQLDB interface {
	SchoolDB
	FiltersDB
	LocationDB
}

type sqlQueries struct {
	schoolQueries   goyesql.Queries
	filtersQueries  goyesql.Queries
	locationQueries goyesql.Queries
}

type sqlDB struct {
	db      *sqlx.DB
	queries sqlQueries
}

func generateQueries() sqlQueries {
	schoolQueries := goyesql.MustParseFile(_schoolQueriesPath)
	filtersQueries := goyesql.MustParseFile(_filtersQueriesPath)
	locationQueries := goyesql.MustParseFile(_locationQueriesPath)
	return sqlQueries{
		schoolQueries:   schoolQueries,
		filtersQueries:  filtersQueries,
		locationQueries: locationQueries,
	}
}
