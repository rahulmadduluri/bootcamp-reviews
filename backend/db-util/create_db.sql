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
	median_graduate_salary     double,
	job_placement_rate 		double,
	FOREIGN KEY (school_id) REFERENCES schools (id),
	FOREIGN KEY (location_id) REFERENCES locations (id)
);

INSERT INTO schools VALUES
	(NULL, 'uuid-1', 'Bloc', NULL, 1, 8500, 'Upfront', 'bloc', 1000),
	(NULL, 'uuid-2', 'Hack Reactor', 14, 1, 17980, 'Upfront', 'hack_reactor', 1000),
	(NULL, 'uuid-3', 'Tech Elevator', 14, 0, 15000, 'Upfront', 'tech_elevator', 1000),
	(NULL, 'uuid-4', 'Bottega', 14, 0, 10000, 'Upfront', 'bottega', 1000),
	(NULL, 'uuid-5', 'The Software Guild', 12, 0, 13875, 'Upfront', 'the_software_guild', 1000),
	(NULL, 'uuid-6', 'Byte Academy', 14, 0, 14950, 'Upfront', 'byte_academy', 1000),
	(NULL, 'uuid-7', 'Codesmith', 13, 0, 17700, 'Upfront', 'codesmith', 1000),
	(NULL, 'uuid-8', 'Eleven Fifty', 12, 0, 13500, 'Upfront', 'eleven_fifty', 1000),
	(NULL, 'uuid-9', 'Lambda School', 32, 0, 30000, 'ISA', 'lambda_school', 1000),
	(NULL, 'uuid-10', 'Epicodus', 30, 0, 8500, 'Upfront', 'epicodus', 1000),
	(NULL, 'uuid-11', 'Launch Academy', 13, 0, 17500, 'Upfront', 'launch_academy', 1000),
	(NULL, 'uuid-12', 'Turing School', 29, 0, 20000, 'Upfront', 'turing_school', 1000),
	(NULL, 'uuid-13', 'Project Shift', 13, 0, 12900, 'Upfront', 'project_shift', 1000);
INSERT INTO locations VALUES
	(NULL, 'uuid-1', 'Online', 'Online', 500),
	(NULL, 'uuid-2', 'San Francisco', 'USA', 500),
	(NULL, 'uuid-3', 'Los Angeles', 'USA', 500),
	(NULL, 'uuid-4', 'New York City', 'USA', 500),
	(NULL, 'uuid-5', 'Cleveland', 'USA', 500),
	(NULL, 'uuid-6', 'Columbus', 'USA', 500),
	(NULL, 'uuid-7', 'Salt Lake City', 'USA', 500),
	(NULL, 'uuid-8', 'Louisville', 'USA', 500),
	(NULL, 'uuid-9', 'Minneapolis', 'USA', 500),
	(NULL, 'uuid-10', 'Fishers', 'USA', 500),
	(NULL, 'uuid-11', 'Portland', 'USA', 500),
	(NULL, 'uuid-12', 'Boston', 'USA', 500),
	(NULL, 'uuid-13', 'Seattle', 'USA', 500),
	(NULL, 'uuid-14', 'Durham', 'USA', 500),
	(NULL, 'uuid-15', 'Denver', 'USA', 500),
	(NULL, 'uuid-16', 'Austin', 'USA', 500),
	(NULL, 'uuid-17', 'Cincinnati', 'USA', 500);
INSERT INTO campus_locations VALUES
	(1, 1, 57500, 62.30), # Block, Online
	(2, 3, 80000, 38.10), # Hack Reactor Los Angeles
	(2, 4, 100000, 37.60), # Hack Reactor Yew York
	(2, 1, 80000, 50.00), # Hack Reactor Online
	(2, 2, 110000, 35.50), # Hack Reactor San Francisco
	(2, 16, 79250, 40.00), # Hack Reactor Austin
	(3, 5, 57000, 85.30), # Tech Elevator Cleveland
	(3, 6, 56000, 94.10), # Tech Elevator Columbus
	(3, 17, 53500, 76.90), # Tech Elevator Cincinnati
	(4, 7, 45000, 63.70), # Bottega Salt Lake City
	(5, 8, 61250, 50.00), # The Software Guild Louisville
	(5, 9, 59000, 79.20), # The Software Guild Minneapolis
	(6, 4, 62000, 60.00), # Byte Academy New York City
	(7, 3, 109080, 44.90), # Codesmith Los Angeles
	(7, 4, 115000, 51.60), # Codesmith New York City
	(8, 10, 53500, 73.70), # Eleven Fifty Fishers
	(9, 1, 55000, 60.90), # Lambda School Online
	(10, 11, 60000, 41.20), # Epicodus Portland
	(10, 13, 49000, 29.60), # Epicodus Seattle
	(11, 12, 70000, 77.80), # Launch Academy Boston
	(12, 15, 75000, 73.90), # Turing School Denver
	(13, 14, 48000, 71.40); # Project Shift Durham




