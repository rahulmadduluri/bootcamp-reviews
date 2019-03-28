-- name: getSchool
select
	schools.uuid as uuid,
	schools.name as name,
	schools.avg_graduate_salary as avggraduatesalary,
	schools.acceptance_rate as acceptancerate,
	schools.job_placement_rate as jobplacementrate,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
where schools.uuid = :school_uuid
;

-- name: getSchoolTracks
select
	tracks.uuid as uuid,
	tracks.name as name
from tracks
join schools
	on schools.uuid = :school_uuid
join school_tracks
	on school_tracks.school_id = schools.id
where tracks.id = school_tracks.track_id
;

-- name: getSchoolCampusLocations
select
	locations.uuid as uuid,
	locations.city as city,
	locations.country as country
from locations
join schools
	on schools.uuid = :school_uuid
join campus_locations
	on campus_locations.school_id = schools.id
where locations.id = campus_locations.location_id
;

-- name: getAllSchools
select
	schools.uuid as uuid,
	schools.name as name,
	schools.avg_graduate_salary as avggraduatesalary,
	schools.acceptance_rate as acceptancerate,
	schools.job_placement_rate as jobplacementrate,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
;

-- name: getSchoolsWithSearchText
select
	schools.uuid as uuid,
	schools.name as name,
	schools.avg_graduate_salary as avggraduatesalary,
	schools.acceptance_rate as acceptancerate,
	schools.job_placement_rate as jobplacementrate,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
where schools.name like :search_text
;

-- name: getSchoolsWithCampusLocation
select
	schools.uuid as uuid,
	schools.name as name,
	schools.avg_graduate_salary as avggraduatesalary,
	schools.acceptance_rate as acceptancerate,
	schools.job_placement_rate as jobplacementrate,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
join campus_locations
	on campus_locations.school_id = schools.id
join locations
	on locations.id = campus_locations.location_id
where locations.uuid = :campus_location_uuid
;

-- name: getSchoolsWithTrack
select
	schools.uuid as uuid,
	schools.name as name,
	schools.avg_graduate_salary as avggraduatesalary,
	schools.acceptance_rate as acceptancerate,
	schools.job_placement_rate as jobplacementrate,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
join school_tracks
	on school_tracks.school_id = schools.id
join tracks
	on tracks.id = school_tracks.track_id
where tracks.uuid = :track_uuid
;

-- name: getSchoolsWithPaymentType
select
	schools.uuid as uuid,
	schools.name as name,
	schools.avg_graduate_salary as avggraduatesalary,
	schools.acceptance_rate as acceptancerate,
	schools.job_placement_rate as jobplacementrate,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
where schools.payment_type = :payment_type
;

-- name: getSchoolsWithMaxPrice
select
	schools.uuid as uuid,
	schools.name as name,
	schools.avg_graduate_salary as avggraduatesalary,
	schools.acceptance_rate as acceptancerate,
	schools.job_placement_rate as jobplacementrate,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
where schools.base_price <= :max_price
;

-- name: getSchoolsWithMinGraduateSalary
select
	schools.uuid as uuid,
	schools.name as name,
	schools.avg_graduate_salary as avggraduatesalary,
	schools.acceptance_rate as acceptancerate,
	schools.job_placement_rate as jobplacementrate,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
where schools.avg_graduate_salary >= :min_graduate_salary
;

-- name: getSchoolsWithMinJobPlacementRate
select
	schools.uuid as uuid,
	schools.name as name,
	schools.avg_graduate_salary as avggraduatesalary,
	schools.acceptance_rate as acceptancerate,
	schools.job_placement_rate as jobplacementrate,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
where schools.job_placement_rate >= :min_job_placement_rate
;

-- name: getSchoolsWithMinLength
select
	schools.uuid as uuid,
	schools.name as name,
	schools.avg_graduate_salary as avggraduatesalary,
	schools.acceptance_rate as acceptancerate,
	schools.job_placement_rate as jobplacementrate,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
where schools.length_in_weeks >= :min_length
;

-- name: getSchoolsWithOnlineStatus
select
	schools.uuid as uuid,
	schools.name as name,
	schools.avg_graduate_salary as avggraduatesalary,
	schools.acceptance_rate as acceptancerate,
	schools.job_placement_rate as jobplacementrate,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
where schools.is_online = :is_online
;
