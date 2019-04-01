DROP DATABASE IF EXISTS raft;
CREATE DATABASE raft;
USE raft;
CREATE TABLE IF NOT EXISTS schools (
	id 							int 			NOT NULL AUTO_INCREMENT,
	uuid						varchar(36)		NOT NULL,
	name 						varchar(200)	NOT NULL,
	length_in_weeks 			int,
	is_online 					boolean 		NOT NULL,
	base_price                 	int				NOT NULL,
	payment_type				varchar(200)    NOT NULL,
	photo_uri 					varchar(200)	NOT NULL,
	created_timestamp_server	int				NOT NULL,
	UNIQUE KEY (uuid),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS locations (
	id 							int 			NOT NULL AUTO_INCREMENT,
	uuid						varchar(36)		NOT NULL,
	city						varchar(200)	NOT NULL,
	country						varchar(200) 	NOT NULL,
	created_timestamp_server	int				NOT NULL,
	UNIQUE KEY (uuid),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS campus_locations (
	school_id  				int 			NOT NULL,
	location_id				int 			NOT NULL,
	avg_graduate_salary     double,
	job_placement_rate 		double,
	FOREIGN KEY (school_id) REFERENCES schools (id),
	FOREIGN KEY (location_id) REFERENCES locations (id)
);

INSERT INTO schools VALUES
	(NULL, 'uuid-1', 'Lambda School', 35, 1, 30000, 'ISA', 'lambda', 1000),
	(NULL, 'uuid-2', 'Holberton School', 30, 1, 20000, 'ISA', 'holberton', 1000),
	(NULL, 'uuid-3', 'Flatiron School', 30, 0, 35000, 'Upfront', 'flatiron', 1000),
	(NULL, 'uuid-4', 'Make School', 100, 0, 60000, 'ISA', 'make', 1000);
INSERT INTO locations VALUES
	(NULL, 'uuid-1', 'Online', 'Online', 500),
	(NULL, 'uuid-2', 'San Francisco', 'USA', 500),
	(NULL, 'uuid-3', 'New York', 'USA', 500),
	(NULL, 'uuid-4', 'Los Angeles', 'USA', 500);
INSERT INTO campus_locations VALUES
	(1, 1, 95090, 90.13),
	(2, 1, 88203, 85.28),
	(3, 2, 78000, 83.12),
	(3, 3, 83029, 65.34),
	(3, 4, 98389, 73.18),
	(4, 2, 55092, 88.11);
