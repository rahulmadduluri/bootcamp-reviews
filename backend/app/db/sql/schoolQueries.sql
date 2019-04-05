-- name: getSchool
select
	schools.uuid as uuid,
	schools.name as name,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
where schools.uuid = :school_uuid
order by schools.uuid
;

-- name: getSchoolCampusLocationsDB
select
	campus_locations.school_id as schoolid,
	campus_locations.location_id as locationid,
	campus_locations.median_graduate_salary as mediangraduatesalary,
	campus_locations.job_placement_rate as jobplacementrate
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
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
order by schools.uuid
;

-- name: getSchoolsWithSearchText
select
	schools.uuid as uuid,
	schools.name as name,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
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
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
join campus_locations
	on campus_locations.school_id = schools.id
join locations
	on locations.id = campus_locations.location_id
where locations.uuid = :location_uuid
order by schools.uuid
;

-- name: getSchoolsWithPaymentType
select
	schools.uuid as uuid,
	schools.name as name,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
where schools.payment_type = :payment_type
order by schools.uuid
;

-- name: getSchoolsWithMaxPrice
select
	schools.uuid as uuid,
	schools.name as name,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
where schools.base_price <= :max_price
order by schools.uuid
;

-- name: getSchoolsWithMinGraduateSalary
select
	schools.uuid as uuid,
	schools.name as name,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
where schools.median_graduate_salary >= :min_graduate_salary
order by schools.uuid
;

-- name: getSchoolsWithMinJobPlacementRate
select
	schools.uuid as uuid,
	schools.name as name,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
where schools.job_placement_rate >= :min_job_placement_rate
order by schools.uuid
;

-- name: getSchoolsWithMinLength
select
	schools.uuid as uuid,
	schools.name as name,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.base_price as baseprice,
	schools.payment_type as paymenttype,
	schools.photo_uri as photouri
from schools
where schools.length_in_weeks >= :min_length
order by schools.uuid
;
