# mad-todo-list by intern `Loi Luu`

## Technologies used

- PostgreSql
- Nodejs with express, express handlebars template, bcrypt for password encryption
- Authentication type: Session Based
- In-Memory store on Prod and In-Redis store on Dev for the session (Heroku does not allow `not on credit user`using Postgres and Redis at the same time :"( )

## Features need to be completed

- Login/ Sign up
- User profile: user information \*change avatar
- Homepage todo list with CRUD function support
- See todo on calendar
- Support `verify/reset` password using `code` sent to `user email`
- Extra task done: Implement cron service for remove `expired token/code`

## Nodejs module structure

Browser -> API -> Controller -> Service -> DAL

## Postgres table

check out helpful [postgres tutorial](https://www.postgresqltutorial.com/)

- ### Create tables

```
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
    deadline_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed boolean default FALSE,
	CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	  REFERENCES users(id)
);

CREATE TABLE tokens (
    id serial primary key NOT NULL,
    created_at timestamp without time zone NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    purpose character varying(20) NOT NULL,
    token character varying(255) NOT NULL unique,
    token_used_at timestamp without time zone,
    user_id int NOT NULL,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id)
	  REFERENCES users(id)
);

```

- ### Insert

```

INSERT INTO todos(user_id,task_name,deadline_date) values($1,$2,$3)

```

- ### Update

```
INSERT INTO todos(user_id,task_name,deadline_date) values($1,$2,$3)

```

- ### Delete

```
INSERT INTO todos(user_id,task_name,deadline_date) values($1,$2,$3)

```

## REDIS

```
docker run -d redis -p 6379:6379
```

## Dockerize project

May be update soon

## Cloudflare temporary deployment

```
cloudflared tunnel --url http://localhost:3000

```

## How to run?

- ### 1. Config the `.env` file with the following format

```
PROFILE=YOUR_ENV
DB_CONNECTION_STRING=YOUR_DB_CONNECTION_STRING

REDIS_STORE_HOST=YOUR_REDIS_STORE_HOST
REDIS_STORE_PORT=YOUR_REDIS_STORE_PORT
REDIS_STORE_PASSWORD=YOUR_REDIS_STORE_PASSWORD
REDIS_STORE_SECRET=YOUR_REDIS_STORE_SECRET

EMAIL_FROM=YOUR_EMAIL_FROM
EMAIL_HOST_PROVIDER=YOUR_EMAIL_HOST_PROVIDER
EMAIL_USERNAME=YOUR_EMAIL_USERNAME
EMAIL_PASSWORD=YOUR_EMAIL_PASSWORD

SESSION_SECRET=YOUR_SESSION_SECRET
```

- ### 2. Run `npm install`

- ### 3. Run `npm start` for `Prod` env and `npm run dev` for `Dev` Env

## Live demo 🔥🔥

So much thanks and appreciation for the strong valuable support and review by Mentor **@Tu Hoang** 🎉

[Demo](https://mad-todo-list.herokuapp.com)
