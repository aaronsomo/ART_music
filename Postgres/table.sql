\c pixie
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS bookings;

CREATE TABLE user_profiles (
    uid text not null primary key,
    group_id int [],
    data jsonb
    -- genres text[],
    -- artists text[],
    -- groupid int[],
    -- likes int[]
);
-- LIKES CORRESPONDS TO EVENTS
-- CREATE TABLE events (
--     id serial not null primary key,
--     eventname text,
--     eventaddress text,
--     eventtype text,
--     artists text[],
--     eventdate json,
--     eventtimes json,
--     priceRanges json,
--     images text[],
--     phonenumber text,
--     suggestedby int
-- );

-- CREATE TABLE events (
--     id serial not null primary key,
--     eventname text,
--     eventaddress text,
--     eventtype text,
--     artists text[],
--     eventdate json,
--     eventtimes json,
--     priceRanges json,
--     images text[],
--     phonenumber text,
--     suggestedby int
-- );

CREATE TABLE groups (
    group_id serial not null primary key,
    data jsonb
);

CREATE TABLE bookings (
    id serial not null primary key,
    bookingdates json,
    groupid int,
    eventid int,
    activites int[]
);

CREATE TABLE activities (
    id serial not null primary key,
    bookingid int,
    activityname text,
    activitytype text,
    activityaddress text,
    priceRanges int,
    activitydate json,
    activitytime json,
    images text[],
    phonenumber text,
    lasteditted int,
    suggestedby int
);
ß