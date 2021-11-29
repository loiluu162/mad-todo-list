# mad-todo-list

## Tech-es used

- PostgreSql
- Nodejs with express, express handlebars template, passport.js, bcrypt
- Authentication type: Session Based
- In-Memory session token store (may upgrade soon by using Redis)

## Features need to completed

- Login/ Sign up
- User profile: change avatar
- Homepage todo list with CRUD function support

## Nodejs module structure

Browser -> API -> Controller -> Service -> DAL

## Postgres table

check out helpful [postgres tutorial](https://www.postgresqltutorial.com/)

```
drop table users cascade;
drop table todos cascade;

CREATE TABLE if not exists users (
    id serial primary key,
    blocked boolean NOT NULL default false,
    email character varying(255) unique,
    enabled boolean NOT NULL default false,
    name character varying(255) NOT NULL,
    password character varying(255),
    photo_url character varying(255),
    provider character varying(20) NOT NULL DEFAULT 'local',
    provider_id character varying(255)
);

create table if not exists todos (
	id serial primary key,
	user_id int,
	task_name varchar(255),
	created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	  REFERENCES users(id)
);

```
