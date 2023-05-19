# Bow Cards Website
This is the code for the Bow Cards website, a class project.

## Information
This is a project by Blast Off Waters.
This was made for our Sales Project in Creativity.

## Setup
To use this site's code, add an environment variable to your server called ``BOWCARDS_POSTGRES_URL``. 
This uses a PostgreSQL database. You need to set the value of the environment variable to a database connection URL.
The URL's format is postgres://(username):(password)@(host)/(database name).
There is only one table, called general_data.
The table needs 3 columns, the first called code (TEXT), second called type (TEXT), and a third one called animation_id (INT).
