-- name: getSchool
select
	schools.uuid as uuid,
	schools.name as name,
	schools.length_in_weeks as lengthinweeks,
	schools.student_teacher_ratio as studentteacherratio,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.website_url as websiteurl,
	schools.photo_uri as photouri
from schools
where schools.uuid = :school_uuid
order by schools.uuid
;

-- name: getSchoolWithID
select
	schools.uuid as uuid,
	schools.name as name,
	schools.length_in_weeks as lengthinweeks,
	schools.student_teacher_ratio as studentteacherratio,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.website_url as websiteurl,
	schools.photo_uri as photouri
from schools
where schools.id = :school_id
order by schools.uuid
;

-- name: getSchoolDBWithUUID
select
	schools.id as id,
	schools.uuid as uuid,
	schools.name as name,
	schools.length_in_weeks as lengthinweeks,
	schools.student_teacher_ratio as studentteacherratio,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.website_url as websiteurl,
	schools.photo_uri as photouri,
	schools.created_timestamp_server as createdtimestampserver
from schools
where schools.uuid = :school_uuid
;

-- name: getSchoolCampusLocationsDB
select
	campus_locations.school_id as schoolid,
	campus_locations.location_id as locationid
from schools
join campus_locations
	on campus_locations.school_id = schools.id
where schools.uuid = :school_uuid
order by schools.uuid
;

-- name: getAllSchools
select
	schools.uuid as uuid,
	schools.name as name,
	schools.length_in_weeks as lengthinweeks,
	schools.student_teacher_ratio as studentteacherratio,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.website_url as websiteurl,
	schools.photo_uri as photouri
from schools
order by schools.uuid
;

-- name: getSchoolsWithSearchText
select
	schools.uuid as uuid,
	schools.name as name,
	schools.length_in_weeks as lengthinweeks,
	schools.student_teacher_ratio as studentteacherratio,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.website_url as websiteurl,
	schools.photo_uri as photouri
from schools
where schools.name like :search_text
order by schools.uuid
;

-- name: getSchoolsWithLocation
select
	schools.uuid as uuid,
	schools.name as name,
	schools.length_in_weeks as lengthinweeks,
	schools.student_teacher_ratio as studentteacherratio,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.website_url as websiteurl,
	schools.photo_uri as photouri
from schools
join campus_locations
	on campus_locations.school_id = schools.id
join locations
	on locations.id = campus_locations.location_id
where locations.uuid = :location_uuid
order by schools.uuid
;

-- name: getSchoolsWithMaxPrice
select
	schools.uuid as uuid,
	schools.name as name,
	schools.length_in_weeks as lengthinweeks,
	schools.student_teacher_ratio as studentteacherratio,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.website_url as websiteurl,
	schools.photo_uri as photouri
from schools
where schools.base_price <= :max_price
order by schools.uuid
;

-- name: getSchoolsWithMinLength
select
	schools.uuid as uuid,
	schools.name as name,
	schools.length_in_weeks as lengthinweeks,
	schools.student_teacher_ratio as studentteacherratio,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.website_url as websiteurl,
	schools.photo_uri as photouri
from schools
where schools.length_in_weeks >= :min_length
order by schools.uuid
;
