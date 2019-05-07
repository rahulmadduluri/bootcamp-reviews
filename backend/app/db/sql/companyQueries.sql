-- name: getCompaniesWithSearchText
select
	companies.uuid as uuid,
	companies.name as name,
	companies.photo_uri as photouri
from companies
where companies.name like :search_text
order by companies.uuid
;

-- name: getCompanyWithUUID
select
	companies.uuid as uuid,
	companies.name as name,
	companies.photo_uri as photouri
from companies
where companies.uuid = :company_uuid
;

-- name: getCompanyDBWithUUID
select
	companies.id as id,
	companies.uuid as uuid,
	companies.name as name,
	companies.photo_uri as photouri,
	companies.created_timestamp_server as createdtimestampserver
from companies
where companies.uuid = :company_uuid
;

-- name: getCompanyLocationsDB
select
	company_locations.company_id as companyid,
	company_locations.location_id as locationid
from companies
join company_locations
	on company_locations.company_id = companies.id
where companies.uuid = :company_uuid
;
