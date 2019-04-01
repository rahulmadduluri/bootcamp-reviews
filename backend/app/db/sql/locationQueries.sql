-- name: getLocationForID
select
	locations.uuid as uuid,
	locations.city as city,
	locations.country as country
from locations
where locations.id = :location_id
;
