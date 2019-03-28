DROP DATABASE IF EXISTS raft;
CREATE DATABASE raft;
USE raft;
CREATE TABLE IF NOT EXISTS schools (
	id 							int 			NOT NULL AUTO_INCREMENT,
	uuid						varchar(36)		NOT NULL,
	name 						varchar(200)	NOT NULL,
	avg_graduate_salary         int,
	acceptance_rate				double,
	job_placement_rate 			double,
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
	FOREIGN KEY (school_id) REFERENCES schools (id),
	FOREIGN KEY (location_id) REFERENCES locations (id)
);

CREATE TABLE IF NOT EXISTS tracks (
	id 							int 			NOT NULL AUTO_INCREMENT,
	uuid						varchar(36)		NOT NULL,
	name						varchar(200) 	NOT NULL,
	created_timestamp_server	int				NOT NULL,
	UNIQUE KEY (uuid),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS school_tracks (
	school_id  				int 			NOT NULL,
	track_id				int 			NOT NULL,
	FOREIGN KEY (school_id) REFERENCES schools (id),
	FOREIGN KEY (track_id) REFERENCES tracks (id)
);

INSERT INTO schools VALUES
	(NULL, 'uuid-1', 'Lambda School', 75920, 5.34, 75.32, 35, 1, 30000, 'ISA', 'lambda', 1000),
	(NULL, 'uuid-2', 'Holberton School', 68392, 12.90, 65.32, 30, 1, 20000, 'ISA', 'holberton', 1000),
	(NULL, 'uuid-3', 'Flatiron School', 56500, 15.80, 70.32, 30, 0, 35000, 'Upfront', 'flatiron', 1000),
	(NULL, 'uuid-4', 'Make School', 66500, 10.80, 72.18, 100, 0, 60000, 'ISA', 'make', 1000),
	(NULL, 'uuid-5', 'Rando School', 75920, 5.34, 75.32, 35, 1, 30000, 'ISA', 'lambda', 1000),
	(NULL, 'uuid-6', 'Big Bird School', 68392, 12.90, 65.32, 30, 1, 20000, 'ISA', 'holberton', 1000),
	(NULL, 'uuid-7', 'Popeye School', 56500, 15.80, 70.32, 30, 0, 35000, 'Upfront', 'flatiron', 1000),
	(NULL, 'uuid-8', 'Fake School', 66500, 10.80, 72.18, 100, 0, 60000, 'ISA', 'make', 1000),
	(NULL, 'uuid-9', 'Delta School', 75920, 5.34, 75.32, 35, 1, 30000, 'ISA', 'lambda', 1000),
	(NULL, 'uuid-10', 'Holy Moly School', 68392, 12.90, 65.32, 30, 1, 20000, 'ISA', 'holberton', 1000),
	(NULL, 'uuid-11', 'Circle Iron School', 56500, 15.80, 70.32, 30, 0, 35000, 'Upfront', 'flatiron', 1000),
	(NULL, 'uuid-12', 'Baking School', 66500, 10.80, 72.18, 100, 0, 60000, 'ISA', 'make', 1000);
INSERT INTO locations VALUES
	(NULL, 'uuid-1', 'San Francisco', 'USA', 500),
	(NULL, 'uuid-2', 'New York', 'USA', 500),
	(NULL, 'uuid-3', 'Los Angeles', 'USA', 500);
INSERT INTO campus_locations VALUES
	(3, 1),
	(3, 2),
	(3, 3),
	(4, 1),
	(7, 1),
	(7, 2),
	(7, 3),
	(8, 1),
	(11, 1),
	(11, 2),
	(11, 3),
	(12, 1);
INSERT INTO tracks VALUES
	(NULL, 'uuid-1', 'Web', 500),
	(NULL, 'uuid-2', 'iOS', 500),
	(NULL, 'uuid-3', 'Android', 500);
INSERT INTO school_tracks VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(2, 1),
	(2, 2),
	(2, 3),
	(3, 1),
	(3, 2),
	(3, 3),
	(4, 1),
	(4, 2),
	(4, 3),

	(5, 1),
	(5, 2),
	(5, 3),
	(6, 1),
	(6, 2),
	(6, 3),
	(7, 1),
	(7, 2),
	(7, 3),
	(8, 1),
	(8, 2),
	(8, 3),

	(9, 1),
	(9, 2),
	(9, 3),
	(10, 1),
	(10, 2),
	(10, 3),
	(11, 1),
	(11, 2),
	(11, 3),
	(12, 1),
	(12, 2),
	(12, 3);


