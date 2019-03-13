-- name: getSchool
select
	schools.uuid as uuid,
	schools.name as name,
	schools.avg_graduate_salary as avggraduatesalary,
	schools.acceptance_rate as acceptancerate,
	schools.job_placement_rate as jobplacementrate,
	schools.length_in_weeks as lengthinweeks,
	schools.is_online as isonline,
	schools.city as city,
	schools.country as country,
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
