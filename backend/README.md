For Local Development:

To add app environment
export APP_ENV=playground

To start MySQL database:
mysql -u {user} -p {password}
use raft-education;

To populate MySQL:
source {GOPATH}/src/Raft/db-util/create_db.sql

To Run Server: 
go run app/main/main.go

To generate GraphQL code from schema
cd server
rm resolver.go
gqlgen -v
