-- name: getLocationDBForID
select
	locations.id as id,
	locations.uuid as uuid,
	locations.city_id as cityid,
	locations.country_id as countryid
from locations
where locations.id = :location_id
;

-- name: getCityForID
select
	cities.uuid as uuid,
	cities.name as name
from cities
where cities.id = :city_id
;

-- name: getCountryForID
select
	countries.uuid as uuid,
	countries.name as name
from countries
where countries.id = :country_id
;
