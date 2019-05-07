package db

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/nleof/goyesql"
)

const (
	_schoolQueriesPath   = "db/sql/schoolQueries.sql"
	_companyQueriesPath  = "db/sql/companyQueries.sql"
	_filtersQueriesPath  = "db/sql/filtersQueries.sql"
	_locationQueriesPath = "db/sql/locationQueries.sql"
	_studentQueriesPath  = "db/sql/studentQueries.sql"
	_reviewQueriesPath   = "db/sql/reviewQueries.sql"
)

type SQLDB interface {
	SchoolDB
	CompanyDB
	FiltersDB
	LocationDB
	StudentDB
	ReviewDB
}

type sqlQueries struct {
	schoolQueries   goyesql.Queries
	companyQueries  goyesql.Queries
	filtersQueries  goyesql.Queries
	locationQueries goyesql.Queries
	studentQueries  goyesql.Queries
	reviewQueries   goyesql.Queries
}

type sqlDB struct {
	db      *sqlx.DB
	queries sqlQueries
}

func generateQueries() sqlQueries {
	schoolQueries := goyesql.MustParseFile(_schoolQueriesPath)
	companyQueries := goyesql.MustParseFile(_companyQueriesPath)
	filtersQueries := goyesql.MustParseFile(_filtersQueriesPath)
	locationQueries := goyesql.MustParseFile(_locationQueriesPath)
	studentQueries := goyesql.MustParseFile(_studentQueriesPath)
	reviewQueries := goyesql.MustParseFile(_reviewQueriesPath)
	return sqlQueries{
		schoolQueries:   schoolQueries,
		companyQueries:  companyQueries,
		filtersQueries:  filtersQueries,
		locationQueries: locationQueries,
		studentQueries:  studentQueries,
		reviewQueries:   reviewQueries,
	}
}
