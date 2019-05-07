-- name: getReviewsDB
select
	reviews.id as id,
	reviews.uuid as uuid,
	reviews.title as title,
	reviews.student_experience as studentexperience,
	reviews.student_advice as studentadvice,
	reviews.teaching_score as teachingscore,
	reviews.coursework_score as courseworkscore,
	reviews.atmosphere_score as atmospherescore,
	reviews.career_preparation_score as careerpreparationscore,
	reviews.overall_score as overallscore,
	reviews.did_graduate as didgraduate,
	reviews.has_job as hasjob,
	reviews.salary_before as salarybefore,
	reviews.salary_after as salaryafter,
	reviews.student_id as studentid,
	reviews.school_id as schoolid,
	reviews.school_location_id as schoollocationid,
	reviews.job_location_id as joblocationid,
	reviews.school_graduation_date as schoolgraduationdate,
	reviews.job_found_date as jobfounddate,
	reviews.created_timestamp_server as createdtimestampserver
from reviews
join schools
	on reviews.school_id = schools.id
where schools.uuid = :school_uuid
order by reviews.created_timestamp_server
;

-- name: getReviewDBWithUUID
select
	reviews.id as id,
	reviews.uuid as uuid,
	reviews.title as title,
	reviews.student_experience as studentexperience,
	reviews.student_advice as studentadvice,
	reviews.teaching_score as teachingscore,
	reviews.coursework_score as courseworkscore,
	reviews.atmosphere_score as atmospherescore,
	reviews.career_preparation_score as careerpreparationscore,
	reviews.overall_score as overallscore,
	reviews.did_graduate as didgraduate,
	reviews.has_job as hasjob,
	reviews.salary_before as salarybefore,
	reviews.salary_after as salaryafter,
	reviews.student_id as studentid,
	reviews.school_id as schoolid,
	reviews.school_location_id as schoollocationid,
	reviews.job_location_id as joblocationid,
	reviews.school_graduation_date as schoolgraduationdate,
	reviews.job_found_date as jobfounddate,
	reviews.created_timestamp_server as createdtimestampserver
from reviews
where reviews.uuid = :review_uuid

-- name: getHelpfulUpvotes
select count(*)
from reviews_helpful
join reviews
	on reviews.id = reviews_helpful.review_id
where reviews.uuid = ? and reviews_helpful.is_helpful = 1
;

-- name: getHelpfulDownvotes
select count(*)
from reviews_helpful
join reviews
	on reviews.id = reviews_helpful.review_id
where reviews.uuid = ? and reviews_helpful.is_helpful = 0
;

-- name: submitHelpfulVote
insert into reviews_helpful (
	review_id,
	student_id,
	is_helpful
)
	select
		:review_id,
		:student_id,
		:is_helpful
;

-- name: createTempReview
insert into reviews_pre_processed (
	uuid,
	school_id,
	title,
	student_experience,
	student_advice,
	teaching_score,
	coursework_score,
	atmosphere_score,
	career_preparation_score,
	overall_score,
	has_job,
	did_graduate,
	salary_before,
	salary_after,
	student_id,
	school_location_id,
	company_id,
	company_location_id,
	school_graduation_date,
	job_found_date,
	created_timestamp_server
)
	select
		:review_uuid,
		:school_id,
		:title,
		:student_experience,
		:student_advice,
		:teaching_score,
		:coursework_score,
		:atmosphere_score,
		:career_preparation_score,
		:overall_score,
		:has_job,
		:did_graduate,
		:salary_before,
		:salary_after,
		:student_id,
		:school_location_id,
		:company_id,
		:company_location_id,
		:school_graduation_date,
		:job_found_date,
		:created_timestamp_server
;
