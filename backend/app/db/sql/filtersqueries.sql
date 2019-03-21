-- name: getTracks
select
	tracks.uuid as uuid,
	tracks.name as name
from tracks
;

-- name: getCampusLocations
select
	locations.uuid as uuid,
	locations.city as city,
	locations.country as country
from locations
;

-- name: getPaymentTypes
select distinct
	schools.payment_type as paymentType
from schools
;
