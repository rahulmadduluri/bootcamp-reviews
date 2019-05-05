-- name: getLocationsDB
select
	locations.id as id,
	locations.uuid as uuid,
	locations.city_id as cityid,
	locations.country_id as countryid
from locations
;

-- name: getPaymentTypes
select distinct
	schools.payment_type as paymentType
from schools
;
