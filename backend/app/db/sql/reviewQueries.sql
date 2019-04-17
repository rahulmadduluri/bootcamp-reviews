-- name: getReviewsDB
select
	reviews.uuid as uuid,
	reviews.all_text as alltext,
	reviews.teaching_score as teachingscore,
	reviews.coursework_score as courseworkscore,
	reviews.atmosphere_score as atmospherescore,
	reviews.career_preparation_score as careerpreparationscore,
	reviews.overall_score as overallscore,
	reviews.helpful_count as helpfulcount,
	reviews.has_job as hasjob,
	reviews.salary_before as salarybefore,
	reviews.salary_after as salaryafter,
	reviews.student_id as studentid,
	reviews.school_id as schoolid,
	reviews.school_location_id as schoollocationid,
	reviews.job_location_id as joblocationid,
	reviews.school_graduation_date as schoolgraduationdate,
	reviews.job_start_date as jobstartdate,
	reviews.created_timestamp_server as createdtimestampserver
from reviews
join schools
	on reviews.school_id = schools.id
where schools.uuid = :school_uuid
;
