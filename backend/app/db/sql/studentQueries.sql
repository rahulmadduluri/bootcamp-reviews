-- name: getStudent
select
	students.uuid as uuid,
	students.first_name as firstname,
	students.last_name as lastname,
	students.photo_uri as photouri,
	students.linked_in_photo_url as linkedinphotourl
from students
where students.uuid = :student_uuid
;

-- name: getStudentDBWithUUID
select
	students.id as id,
	students.uuid as uuid,
	students.first_name as firstname,
	students.last_name as lastname,
	students.email as email,
	students.linked_in_photo_url as linkedinphotourl,
	students.linked_in_url as linkedinurl,
	students.photo_uri as photouri,
	students.school_id as schoolid,
	students.companyid as companyid,
	students.created_timestamp_server as createdtimestampserver
from students
where students.uuid = :student_uuid
;

--name: createStudent
insert into students (uuid, first_name, last_name, email, linked_in_photo_url, created_timestamp_server)
	select
		:student_uuid,
		:first_name,
		:last_name,
		:email,
		:linked_in_photo_url,
		:created_timestamp_server
;
