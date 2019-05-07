DROP DATABASE IF EXISTS raft;
CREATE DATABASE raft;
USE raft;

CREATE TABLE IF NOT EXISTS schools (
	id 							int 			NOT NULL AUTO_INCREMENT,
	uuid						varchar(36)		NOT NULL,
	name 						varchar(200)	NOT NULL,
	length_in_weeks 			int,
	student_teacher_ratio		int,
	is_online 					boolean 		NOT NULL,
	base_price                 	int				NOT NULL,
	payment_type				varchar(200)    NOT NULL,
	photo_uri 					varchar(200)	NOT NULL,
	created_timestamp_server	int				NOT NULL,
	UNIQUE KEY (uuid),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS countries (
	id 							int 			NOT NULL AUTO_INCREMENT,
	uuid						varchar(36)		NOT NULL,
	name 						varchar(200)	NOT NULL,
	UNIQUE KEY (uuid),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS cities (
	id 							int 			NOT NULL AUTO_INCREMENT,
	uuid						varchar(36)		NOT NULL,
	name 						varchar(200)	NOT NULL,
	UNIQUE KEY (uuid),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS locations (
	id 							int 			NOT NULL AUTO_INCREMENT,
	uuid						varchar(36)		NOT NULL,
	city_id						int				NOT NULL,
	country_id					int 			NOT NULL,
	created_timestamp_server	int				NOT NULL,
	UNIQUE KEY (uuid),
	PRIMARY KEY (id),
	FOREIGN KEY (country_id) REFERENCES countries (id),
	FOREIGN KEY (city_id) REFERENCES cities (id)
);

CREATE TABLE IF NOT EXISTS campus_locations (
	school_id  				int 			NOT NULL,
	location_id				int 			NOT NULL,
	FOREIGN KEY (school_id) REFERENCES schools (id),
	FOREIGN KEY (location_id) REFERENCES locations (id)
);

CREATE TABLE IF NOT EXISTS companies (
	id 							int 			NOT NULL AUTO_INCREMENT,
	uuid						varchar(36)		NOT NULL,
	name 						varchar(200)	NOT NULL,
	photo_uri 					varchar(200)	NOT NULL,
	created_timestamp_server	int				NOT NULL,
	UNIQUE KEY (uuid),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS company_locations (
	company_id  			int 			NOT NULL,
	location_id				int 			NOT NULL,
	FOREIGN KEY (company_id) REFERENCES companies (id),
	FOREIGN KEY (location_id) REFERENCES locations (id)
);

CREATE TABLE IF NOT EXISTS students (
	id 							int 			NOT NULL AUTO_INCREMENT,
	uuid						varchar(36)		NOT NULL,
	first_name 					varchar(200)	NOT NULL,
	last_name 					varchar(200)	NOT NULL,
	email						varchar(200)	NOT NULL,
	linked_in_photo_url			varchar(500),
	linked_in_url				varchar(500),
	photo_uri 					varchar(200),
	school_id					int,
	company_id 					int,
	created_timestamp_server	int				NOT NULL,
	UNIQUE KEY (uuid),
	PRIMARY KEY (id),
	FOREIGN KEY (school_id) REFERENCES schools (id),
	FOREIGN KEY (company_id) REFERENCES companies (id)
);

CREATE TABLE IF NOT EXISTS reviews (
	id 							int 			NOT NULL AUTO_INCREMENT,
	uuid						varchar(36)		NOT NULL,
	title                       varchar(200)    NOT NULL,
	student_experience			varchar(6000)   NOT NULL,
	student_advice 				varchar(6000),
	teaching_score				int				NOT NULL,
	coursework_score			int				NOT NULL,
	atmosphere_score			int				NOT NULL,
	career_preparation_score 	int			    NOT NULL,
	overall_score				int				NOT NULL,
	did_graduate 				boolean			NOT NULL,
	has_job						boolean			NOT NULL,
	salary_before				int,
	salary_after 				int,
	student_id					int 			NOT NULL,
	school_id 					int 			NOT NULL,
	school_location_id			int 			NOT NULL,
	company_id 					int,
	company_location_id 		int,
	school_graduation_date		timestamp,
	job_found_date				timestamp,
	created_timestamp_server    int 			NOT NULL,
	UNIQUE KEY (uuid),
	PRIMARY KEY (id),
	FOREIGN KEY (student_id) REFERENCES students (id),
	FOREIGN KEY (school_id) REFERENCES schools (id),
	FOREIGN KEY (school_location_id) REFERENCES locations (id),
	FOREIGN KEY (company_id) REFERENCES companies (id),
	FOREIGN KEY (company_location_id) REFERENCES locations (id)
);

# exact copy of reviews table -- will be transferred after moderation
CREATE TABLE IF NOT EXISTS reviews_pre_processed (
	id 							int 			NOT NULL AUTO_INCREMENT,
	uuid						varchar(36)		NOT NULL,
	title                       varchar(200)    NOT NULL,
	student_experience			varchar(6000)   NOT NULL,
	student_advice 				varchar(6000),
	teaching_score				int				NOT NULL,
	coursework_score			int				NOT NULL,
	atmosphere_score			int				NOT NULL,
	career_preparation_score 	int			    NOT NULL,
	overall_score				int				NOT NULL,
	did_graduate 				boolean			NOT NULL,
	has_job						boolean			NOT NULL,
	salary_before				int,
	salary_after 				int,
	student_id					int 			NOT NULL,
	school_id 					int 			NOT NULL,
	school_location_id			int 			NOT NULL,
	company_id 					int,
	company_location_id 		int,
	school_graduation_date		timestamp,
	job_found_date				timestamp,
	created_timestamp_server    int 			NOT NULL,
	UNIQUE KEY (uuid),
	PRIMARY KEY (id),
	FOREIGN KEY (student_id) REFERENCES students (id),
	FOREIGN KEY (school_id) REFERENCES schools (id),
	FOREIGN KEY (school_location_id) REFERENCES locations (id),
	FOREIGN KEY (company_id) REFERENCES companies (id),
	FOREIGN KEY (company_location_id) REFERENCES locations (id)
);

CREATE TABLE IF NOT EXISTS reviews_helpful (
	review_id  				int 			NOT NULL,
	student_id				int 			NOT NULL,
	is_helpful				boolean			NOT NULL,
	UNIQUE KEY (review_id, student_id),
	FOREIGN KEY (review_id) REFERENCES reviews (id),
	FOREIGN KEY (student_id) REFERENCES students (id)
);
