delete from reviews;
delete from campus_locations;
delete from company_locations;
delete from locations;
delete from countries;
delete from cities;
delete from schools;
delete from companies;
delete from students;
delete from reviews;

INSERT INTO schools VALUES
	(NULL, 'uuid-1', 'Bloc', NULL, 5, 8500, 'Upfront', 'https://www.bloc.io', 'bloc', 1000),
	(NULL, 'uuid-2', 'Hack Reactor', 14, 5, 17980, 'Upfront', 'https://www.hackreactor.com', 'hack_reactor', 1000),
	(NULL, 'uuid-3', 'Tech Elevator', 14, 5, 15000, 'Upfront', 'https://www.techelevator.com', 'tech_elevator', 1000),
	(NULL, 'uuid-4', 'Bottega', 14, 5, 10000, 'Upfront', 'https://bottega.tech', 'bottega', 1000),
	(NULL, 'uuid-5', 'The Software Guild', 12, 5, 13875, 'Upfront', 'https://www.thesoftwareguild.com', 'the_software_guild', 1000),
	(NULL, 'uuid-6', 'Byte Academy', 14, 5, 14950, 'Upfront', 'https://byteacademy.co', 'byte_academy', 1000),
	(NULL, 'uuid-7', 'Codesmith', 13, 5, 17700, 'Upfront', 'https://www.codesmith.io', 'codesmith', 1000),
	(NULL, 'uuid-8', 'Eleven Fifty', 12, 5, 13500, 'Upfront', 'https://elevenfifty.org', 'eleven_fifty', 1000),
	(NULL, 'uuid-9', 'Lambda School', 32, 5, 30000, 'ISA', 'https://lambdaschool.com', 'lambda_school', 1000),
	(NULL, 'uuid-10', 'Epicodus', 30, 5, 8500, 'Upfront', 'https://www.epicodus.com', 'epicodus', 1000),
	(NULL, 'uuid-11', 'Launch Academy', 13, 5, 17500, 'Upfront', 'https://launchacademy.com', 'launch_academy', 1000),
	(NULL, 'uuid-12', 'Turing School', 29, 5, 20000, 'Upfront', 'https://turing.io', 'turing_school', 1000),
	(NULL, 'uuid-13', 'Project Shift', 13, 5, 12900, 'Upfront', 'https://www.projectshift.io', 'project_shift', 1000),
	(NULL, 'uuid-14', 'App Academy', 12, 5, 12900, 'Placement', 'https://www.appacademy.io', 'app_academy', 1000),
	(NULL, 'uuid-15', 'Coding Dojo', 14, 5, 13995, 'Upfront', 'https://www.codingdojo.com', 'coding_dojo', 1000);
INSERT INTO countries VALUES
	(NULL, 'uuid-1', 'Other'),
	(NULL, 'uuid-2', 'Online'),
	(NULL, 'uuid-3', 'USA');
INSERT INTO cities VALUES
	(NULL, 'uuid-1', 'Other'),
	(NULL, 'uuid-2', 'Online'),
	(NULL, 'uuid-3', 'San Francisco'),
	(NULL, 'uuid-4', 'Los Angeles'),
	(NULL, 'uuid-5', 'New York City'),
	(NULL, 'uuid-6', 'Cleveland'),
	(NULL, 'uuid-7', 'Columbus'),
	(NULL, 'uuid-8', 'Salt Lake City'),
	(NULL, 'uuid-9', 'Louisville'),
	(NULL, 'uuid-10', 'Minneapolis'),
	(NULL, 'uuid-11', 'Fishers'),
	(NULL, 'uuid-12', 'Portland'),
	(NULL, 'uuid-13', 'Boston'),
	(NULL, 'uuid-14', 'Seattle'),
	(NULL, 'uuid-15', 'Durham'),
	(NULL, 'uuid-16', 'Denver'),
	(NULL, 'uuid-17', 'Austin'),
	(NULL, 'uuid-18', 'Cincinnati'),
	(NULL, 'uuid-19', 'Berkeley'),
	(NULL, 'uuid-20', 'San Jose'),
	(NULL, 'uuid-21', 'Chicago'),
	(NULL, 'uuid-22', 'Dallas'),
	(NULL, 'uuid-23', 'Boise'),
	(NULL, 'uuid-24', 'Tulsa'),
	(NULL, 'uuid-25', 'Costa Mesa'),
	(NULL, 'uuid-26', 'Tyson''s Corner');
INSERT INTO locations VALUES
	(NULL, 'uuid-1', 1, 1, 500),
	(NULL, 'uuid-2', 2, 2, 500),
	(NULL, 'uuid-3', 3, 3, 500),
	(NULL, 'uuid-4', 4, 3, 500),
	(NULL, 'uuid-5', 5, 3, 500),
	(NULL, 'uuid-6', 6, 3, 500),
	(NULL, 'uuid-7', 7, 3, 500),
	(NULL, 'uuid-8', 8, 3, 500),
	(NULL, 'uuid-9', 9, 3, 500),
	(NULL, 'uuid-10', 10, 3, 500),
	(NULL, 'uuid-11', 11, 3, 500),
	(NULL, 'uuid-12', 12, 3, 500),
	(NULL, 'uuid-13', 13, 3, 500),
	(NULL, 'uuid-14', 14, 3, 500),
	(NULL, 'uuid-15', 15, 3, 500),
	(NULL, 'uuid-16', 16, 3, 500),
	(NULL, 'uuid-17', 17, 3, 500),
	(NULL, 'uuid-18', 18, 3, 500),
	(NULL, 'uuid-19', 19, 3, 500),
	(NULL, 'uuid-20', 20, 3, 500),
	(NULL, 'uuid-21', 21, 3, 500),
	(NULL, 'uuid-22', 22, 3, 500),
	(NULL, 'uuid-23', 23, 3, 500),
	(NULL, 'uuid-24', 24, 3, 500),
	(NULL, 'uuid-25', 25, 3, 500),
	(NULL, 'uuid-26', 26, 3, 500);
INSERT INTO campus_locations VALUES
	(1, 2), # Block, Online
	(2, 4), # Hack Reactor Los Angeles
	(2, 5), # Hack Reactor Yew York
	(2, 2), # Hack Reactor Online
	(2, 3), # Hack Reactor San Francisco
	(2, 17), # Hack Reactor Austin
	(3, 6), # Tech Elevator Cleveland
	(3, 7), # Tech Elevator Columbus
	(3, 18), # Tech Elevator Cincinnati
	(4, 8), # Bottega Salt Lake City
	(5, 9), # The Software Guild Louisville
	(5, 10), # The Software Guild Minneapolis
	(6, 5), # Byte Academy New York City
	(7, 4), # Codesmith Los Angeles
	(7, 5), # Codesmith New York City
	(8, 11), # Eleven Fifty Fishers
	(9, 2), # Lambda School Online
	(10, 12), # Epicodus Portland
	(10, 14), # Epicodus Seattle
	(11, 13), # Launch Academy Boston
	(12, 16), # Turing School Denver
	(13, 15), # Project Shift Durham
	(14, 2), # App Academy Online
	(14, 3), # App Academy San Francisco
	(14, 5), # App Academy New York City
	(15, 1), # Coding Dojo Online
	(15, 4), # Coding Dojo Los Angeles
	(15, 19), # Coding Dojo Berkeley
	(15, 20), # Coding Dojo San Jose
	(15, 14), # Coding Dojo Seattle
	(15, 21), # Coding Dojo Chicago
	(15, 22), # Coding Dojo Dallas
	(15, 23), # Coding Dojo Boise
	(15, 24), # Coding Dojo Tulsa
	(15, 25), # Coding Dojo Costa Mesa
	(15, 26); # Coding Dojo Tyson's Corner
INSERT INTO companies VALUES
	(NULL, 'uuid-1', 'Other', 'other', 1000),
	(NULL, 'uuid-2', 'Google', 'google', 1000),
	(NULL, 'uuid-3', 'Amazon', 'amazon', 1000),
	(NULL, 'uuid-4', 'Apple', 'apple', 1000),
	(NULL, 'uuid-5', 'Cisco', 'cisco', 1000);
INSERT INTO company_locations VALUES
	(2, 1), # Google, Other
	(2, 2), # Google, Online
	(2, 3), # Google, San Francisco
	(2, 5), # Google, New York
	(3, 1), # Amazon, Other
	(3, 2), # Amazon, Online
	(3, 3), # Amazon, San Francisco
	(3, 5), # Amazon, New York
	(4, 1), # Apple, Other
	(4, 2), # Apple, Online
	(4, 3), # Apple, San Francisco
	(4, 5), # Apple, New York
	(5, 1), # Cisco, Other
	(5, 2), # Cisco, Online
	(5, 3), # Cisco, San Francisco
	(5, 5); # Cisco, New York
INSERT INTO students VALUES
	(NULL, 'uuid-1', 'Rob', 'Vanderhoven', 'robisthebest@gmail.com', 'www.googleimages.com/test', 'www.linkedin.com/rob', 'uuid-1_rob', 1, 3, 500),
	(NULL, 'uuid-2', 'Jessica', 'Lo', 'jessicaisthebest@gmail.com', 'www.googleimages.com/test', 'www.linkedin.com/jessica', 'uuid-2_jessica', 7, 3, 500),
	(NULL, 'uuid-3', 'Mayuri', 'Ramasubramaniam', 'mayuristhebest@gmail.com', 'www.googleimages.com/test', 'www.linkedin.com/mayuri', 'uuid-3_mayuri', 8, 3, 500),
	(NULL, 'uuid-4', 'Liam', 'Neeson', 'liamneeson@gmail.com', 'www.googleimages.com/test', 'www.linkedin.com/liam', 'uuid-4_liam', 4, 3, 500);
INSERT INTO reviews VALUES
	(NULL, 'uuid-1',
	'An amazing experience from beginning to finish', 
	'1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to kMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	8,2,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, company_id=2 company_location = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-2',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	9,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, company_id=2 company_location = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-3',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	2,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, company_id=2 company_location = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-4',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	4,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, company_id=2 company_location = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-5',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, company_id=2 company_location = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-6',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, company_id=2 company_location = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-7',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, company_id=2 company_location = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-8',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, company_id=2 company_location = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-9',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, company_id=2 company_location = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-10',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, company_id=2 company_location = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-11',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, company_id=2 company_location = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-12',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-13',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-14',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-15',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-16',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-17',
	'An amazing experience from beginning to finish', '1I cannot say enough about Bloc School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Bloc goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,1, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),

	(NULL, 'uuid-18',
	'An amazing experience from beginning to finish', 
	'1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to kMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep upMy biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	8,2,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-19',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	9,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-20',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	2,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-21',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	4,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-22',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-23',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-24',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-25',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-26',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-27',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-28',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-29',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-30',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-31',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-32',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-33',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	),
	(NULL, 'uuid-34',
	'An amazing experience from beginning to finish', '1I cannot say enough about Lambda School. I graduated in 07 with a degree in marketing and have been struggling lately to make ends meet. I got a job straight out of college that paid ~$30,000, but I do not see a promising path to make a high wage. Since the risk for Lambda is so low, I took the plunge, and I am incredibly glad I did. Calling Lambda life-altering would legitimately be an understatement.',
	'My biggest advice for prospective students is to do your homework in advance. Lambda goes from 0 to 60 really quickly and if you do not have any CS experience beforehand, it will frankly be hard to keep up',
	7,9,6,10,8.0, # scores = 7,9,6,10, overall 8.0
	1,1,30000,90000,1,9, # has_job=true, salary before = 30000, salary after = 90000, student=1, school=9
	2,3,9,'2017-05-09 00:00:01','2017-09-20 00:00:01',1000 # school location=1, job lcoation = 8, grad-date = 5/17, job-start = 9/17
	)
	;
