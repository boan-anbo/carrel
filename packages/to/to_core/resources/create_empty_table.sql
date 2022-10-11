CREATE TABLE IF NOT EXISTS textual_objects
(
--     Numerical id primary key autoincrement
    id                      INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid                   TEXT UNIQUE NOT NULL,
    ticket_id               TEXT                 NOT NULL,
    ticket_minimal          TEXT    DEFAULT ''   NOT NULL,

    source_id               TEXT                 NOT NULL,
    source_name             TEXT    DEFAULT ''   NOT NULL,
    source_id_type          TEXT    DEFAULT ''   NOT NULL,
    source_path             TEXT    DEFAULT ''   NOT NULL,

    store_info              TEXT    DEFAULT ''   NOT NULL,
    store_url               TEXT    DEFAULT ''   NOT NULL,

    created                 TEXT                 NOT NULL,
    updated                 TEXT                 NOT NULL,

    json                    TEXT    DEFAULT '{}' NOT NULL,

    card                    TEXT    DEFAULT NULL,
    card_map                TEXT    DEFAULT ''   NOT NULL,
    context                 TEXT    DEFAULT ''   NOT NULL,
    ticket_index_in_context INTEGER DEFAULT 0    NOT NULL
);
