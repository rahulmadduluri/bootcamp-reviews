package db

import (
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var _dbh *dbHandler

const (
	_MySQLPort   = "RDS_PORT"
	_MySQLUser   = "RDS_USERNAME"
	_MySQLPwd    = "RDS_PASSWORD"
	_MySQLHost   = "RDS_HOSTNAME"
	_MYSQLDBName = "RDS_DB_NAME"
)

type DbHandler interface {
	SQL() SQLDB
	Close()
}

type dbHandler struct {
	sqldb *sqlDB
}

func (dbh *dbHandler) SQL() SQLDB {
	return dbh.sqldb
}

func newDbHandler() *dbHandler {

	// MySQL

	username := os.Getenv(_MySQLUser)
	if username == "" {
		log.Panic("Couldn't find MySQL username")
	}
	pwd := os.Getenv(_MySQLPwd)
	if pwd == "" {
		log.Panic("Couldn't find MySQL password")
	}
	mySQLPort := os.Getenv(_MySQLPort)
	if mySQLPort == "" {
		log.Panic("Couldn't find MySQL port")
	}
	mySQLHostName := os.Getenv(_MySQLHost)
	if mySQLHostName == "" {
		log.Panic("Couldn't find MYSQL hostname")
	}
	mySQLDBName := os.Getenv(_MYSQLDBName)
	if mySQLDBName == "" {
		log.Panic("Couldn't find MYSQL DB name")
	}
	dbPath := username + ":" + pwd + "@tcp(" + mySQLHostName + ":" + mySQLPort + ")/" + mySQLDBName
	// add parse time arg
	dbPath = dbPath + "?parseTime=true"
	db, err := sqlx.Open("mysql", dbPath)
	if err != nil {
		log.Fatal(err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatal("No ping %v", err)
	}
	sqlQueries := generateQueries()

	dbh := &dbHandler{
		sqldb: &sqlDB{
			db:      db,
			queries: sqlQueries,
		},
	}
	return dbh
}

func Handler() DbHandler {
	return _dbh
}

func ConfigHandler() {
	_dbh = newDbHandler()
}

func (dbh *dbHandler) Close() {
	dbh.sqldb.db.Close()
}
