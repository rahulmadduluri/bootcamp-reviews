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
	created_timestamp_server	int				NOT NULL,
	UNIQUE KEY (uuid),
	PRIMARY KEY (id),
	FOREIGN KEY (school_id) REFERENCES schools (id)
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
	job_location_id 			int,
	school_graduation_date		timestamp,
	job_start_date				timestamp,
	created_timestamp_server    int 			NOT NULL,
	UNIQUE KEY (uuid),
	PRIMARY KEY (id),
	FOREIGN KEY (student_id) REFERENCES students (id),
	FOREIGN KEY (school_id) REFERENCES schools (id),
	FOREIGN KEY (school_location_id) REFERENCES locations (id),
	FOREIGN KEY (job_location_id) REFERENCES locations (id)
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
	job_location_id 			int,
	school_graduation_date		datetime,
	job_start_date				datetime,
	created_timestamp_server    int 			NOT NULL,
	UNIQUE KEY (uuid),
	PRIMARY KEY (id),
	FOREIGN KEY (student_id) REFERENCES students (id),
	FOREIGN KEY (school_id) REFERENCES schools (id),
	FOREIGN KEY (school_location_id) REFERENCES locations (id),
	FOREIGN KEY (job_location_id) REFERENCES locations (id)
);

CREATE TABLE IF NOT EXISTS reviews_helpful (
	review_id  				int 			NOT NULL,
	student_id				int 			NOT NULL,
	is_helpful				boolean			NOT NULL,
	UNIQUE KEY (review_id, student_id),
	FOREIGN KEY (review_id) REFERENCES reviews (id),
	FOREIGN KEY (student_id) REFERENCES students (id)
);

INSERT INTO schools VALUES
	(NULL, 'uuid-1', 'Bloc', NULL, 5, 1, 8500, 'Upfront', 'bloc', 1000),
	(NULL, 'uuid-2', 'Hack Reactor', 14, 5, 1, 17980, 'Upfront', 'hack_reactor', 1000),
	(NULL, 'uuid-3', 'Tech Elevator', 14, 5, 0, 15000, 'Upfront', 'tech_elevator', 1000),
	(NULL, 'uuid-4', 'Bottega', 14, 5, 0, 10000, 'Upfront', 'bottega', 1000),
	(NULL, 'uuid-5', 'The Software Guild', 12, 5, 0, 13875, 'Upfront', 'the_software_guild', 1000),
	(NULL, 'uuid-6', 'Byte Academy', 14, 5, 0, 14950, 'Upfront', 'byte_academy', 1000),
	(NULL, 'uuid-7', 'Codesmith', 13, 5, 0, 17700, 'Upfront', 'codesmith', 1000),
	(NULL, 'uuid-8', 'Eleven Fifty', 12, 5, 0, 13500, 'Upfront', 'eleven_fifty', 1000),
	(NULL, 'uuid-9', 'Lambda School', 32, 5, 0, 30000, 'ISA', 'lambda_school', 1000),
	(NULL, 'uuid-10', 'Epicodus', 30, 5, 0, 8500, 'Upfront', 'epicodus', 1000),
	(NULL, 'uuid-11', 'Launch Academy', 13, 5, 0, 17500, 'Upfront', 'launch_academy', 1000),
	(NULL, 'uuid-12', 'Turing School', 29, 5, 0, 20000, 'Upfront', 'turing_school', 1000),
	(NULL, 'uuid-13', 'Project Shift', 13, 5, 0, 12900, 'Upfront', 'project_shift', 1000);
INSERT INTO countries VALUES
	(NULL, 'uuid-1', 'Online'),
	(NULL, 'uuid-2', 'USA');
INSERT INTO cities VALUES
	(NULL, 'uuid-1', 'Online'),
	(NULL, 'uuid-2', 'San Francisco'),
	(NULL, 'uuid-3', 'Los Angeles'),
	(NULL, 'uuid-4', 'New York City'),
	(NULL, 'uuid-5', 'Cleveland'),
	(NULL, 'uuid-6', 'Columbus'),
	(NULL, 'uuid-7', 'Salt Lake City'),
	(NULL, 'uuid-8', 'Louisville'),
	(NULL, 'uuid-9', 'Minneapolis'),
	(NULL, 'uuid-10', 'Fishers'),
	(NULL, 'uuid-11', 'Portland'),
	(NULL, 'uuid-12', 'Boston'),
	(NULL, 'uuid-13', 'Seattle'),
	(NULL, 'uuid-14', 'Durham'),
	(NULL, 'uuid-15', 'Denver'),
	(NULL, 'uuid-16', 'Austin'),
	(NULL, 'uuid-17', 'Cincinnati');
INSERT INTO locations VALUES
	(NULL, 'uuid-1', 1, 1, 500),
	(NULL, 'uuid-2', 2, 2, 500),
	(NULL, 'uuid-3', 3, 2, 500),
	(NULL, 'uuid-4', 4, 2, 500),
	(NULL, 'uuid-5', 5, 2, 500),
	(NULL, 'uuid-6', 6, 2, 500),
	(NULL, 'uuid-7', 7, 2, 500),
	(NULL, 'uuid-8', 8, 2, 500),
	(NULL, 'uuid-9', 9, 2, 500),
	(NULL, 'uuid-10', 10, 2, 500),
	(NULL, 'uuid-11', 11, 2, 500),
	(NULL, 'uuid-12', 12, 2, 500),
	(NULL, 'uuid-13', 13, 2, 500),
	(NULL, 'uuid-14', 14, 2, 500),
	(NULL, 'uuid-15', 15, 2, 500),
	(NULL, 'uuid-16', 16, 2, 500),
	(NULL, 'uuid-17', 17, 2, 500);
INSERT INTO campus_locations VALUES
	(1, 1), # Block, Online
	(2, 3), # Hack Reactor Los Angeles
	(2, 4), # Hack Reactor Yew York
	(2, 1), # Hack Reactor Online
	(2, 2), # Hack Reactor San Francisco
	(2, 16), # Hack Reactor Austin
	(3, 5), # Tech Elevator Cleveland
	(3, 6), # Tech Elevator Columbus
	(3, 17), # Tech Elevator Cincinnati
	(4, 7), # Bottega Salt Lake City
	(5, 8), # The Software Guild Louisville
	(5, 9), # The Software Guild Minneapolis
	(6, 4), # Byte Academy New York City
	(7, 3), # Codesmith Los Angeles
	(7, 4), # Codesmith New York City
	(8, 10), # Eleven Fifty Fishers
	(9, 1), # Lambda School Online
	(10, 11), # Epicodus Portland
	(10, 13), # Epicodus Seattle
	(11, 12), # Launch Academy Boston
	(12, 15), # Turing School Denver
	(13, 14); # Project Shift Durham
INSERT INTO students VALUES
	(NULL, 'uuid-1', 'Rob', 'Vanderhoven', 'robisthebest@gmail.com', 'www.googleimages.com/test', 'www.linkedin.com/rob', 'uuid-1_rob', 1, 500),
	(NULL, 'uuid-2', 'Jessica', 'Lo', 'jessicaisthebest@gmail.com', 'www.googleimages.com/test', 'www.linkedin.com/jessica', 'uuid-2_jessica', 7, 500),
	(NULL, 'uuid-3', 'Mayuri', 'Ramasubramaniam', 'mayuristhebest@gmail.com', 'www.googleimages.com/test', 'www.linkedin.com/mayuri', 'uuid-3_mayuri', 8, 500),
	(NULL, 'uuid-4', 'Liam', 'Neeson', 'liamneeson@gmail.com', 'www.googleimages.com/test', 'www.linkedin.com/liam', 'uuid-4_liam', 4, 500);
INSERT INTO reviews VALUES
	(NULL, 'uuid-1',
	'An amazing experience from beginning to finish', 
	'1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to kMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-2',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-3',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-4',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-5',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-6',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-7',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-8',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-9',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-10',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-11',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-12',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-13',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-14',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-15',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-16',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-17',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	1,8,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	)
	;
