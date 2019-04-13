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
