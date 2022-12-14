--
-- syntax = "proto3";
--
-- // import archive
-- import "carrel/common/archive/v1/archive_v1.proto";
--
-- package carrel.common.project.v1;
--
--
-- message Project {
--   string uuid = 1;
-- // the name of the project
--   string name = 2;
-- // description of the project
--     optional string description = 3;
-- // the working folder of the project
--     optional string working_folder = 4;
--
--
-- // last time the project was modified in ISO 8601 format
--     string updated_at = 5;
-- // last time the project was opened in ISO 8601 format
--     string opened_at = 6;
-- // created
--     string created_at = 7;
-- // finished at
--   optional string finished_at = 8;
-- // the id of the archive associated with the project;
-- // the archive
--     repeated carrel.common.archive.v1.Archive archives = 9;
-- }
--
-- Use the above proto definition to generate a Create Table statement for the sqlite database schema
CREATE TABLE IF NOT EXISTS projectj (
                                       uuid TEXT PRIMARY KEY,
                                       name TEXT,
                                       description TEXT,
                                       working_folder TEXT,
                                       updated_at TEXT,
                                       opened_at TEXT,
                                       created_at TEXT,
                                       finished_at TEXT
);
-- Your SQL goes here
