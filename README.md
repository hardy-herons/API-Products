# ORDER OF DEVELOPMENT

### test on localmachine

### docker-compose

### reinitialize docker db (for now, subject to change)

#### migrate the db, load the database

- ONLY IF YOU DOWN YOUR DOCKER

### push to github when good

### ssh into aws ec2 instance and pull from github

### take down the docker-compose within the ec2

### redo whole process.

# API-Products

using python to "transform" my data from the csv files
./lib/transform.py
this file is changing all the breaks between columns with a pipe `|`

create the appropriate models for postgres using sequelize-cli
`npx sequelize-cli model:generate -- name Name --attributes firstName:string,lastName:string`

update the models and migrations for validations, relationship and etc.

`npx sequelize-cli db:migrate`

access your psql
connect to the corresponding database
run the command in POSTGRES
`COPY public."Related" FROM '/Users/danielkim/HR/SDC/transformed-data/transformedrelated.csv' WITH DELIMITER '|' CSV HEADER;`
CSV HEADER IS ONLY IF THERE IS A HEADER FOR COLUMN NAMES

NEED TO RUN INDEXES ON THE DATABASE

create index photo_style on public."Photos" ("styleId");  
create index product_style on public."Styles" ("productId");
create index sku_style on public."SKUs" ("styleId");

# INSTRUCTIONS FOR AWS EC2 AND DOCKER

COPY public."Related" FROM '/var/lib/postgresql/data/pgdata/transformedrelated.csv' WITH DELIMITER '|' CSV HEADER;  
COPY public."Photos" FROM '/var/lib/postgresql/data/pgdata/transformedphotos.csv' WITH DELIMITER '|' CSV HEADER;  
COPY public."SKUs" FROM '/var/lib/postgresql/data/pgdata/transformedskus.csv' WITH DELIMITER '|' CSV HEADER;  
COPY public."Products" FROM '/var/lib/postgresql/data/pgdata/transformedProduct.csv' WITH DELIMITER '|' CSV HEADER;  
COPY public."Styles" FROM '/var/lib/postgresql/data/pgdata/transformedstyles.csv' WITH DELIMITER '|' CSV HEADER;  
COPY public."Features" FROM '/var/lib/postgresql/data/pgdata/transformedfeatures.csv' WITH DELIMITER '|';

psql postgres://danielkim@localhost:35432/products
INSIDE AWS FOR DOCKERS pg
sudo docker-compose run postgres psql -h postgres -U postgres

http://18.216.155.150/
