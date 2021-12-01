# mad-todo-list

## Tech-es used

- PostgreSql
- Nodejs with express, express handlebars template, bcrypt for password encryption
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

### Create tables

```
drop table users cascade;

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

drop table todos cascade;
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

drop table tokens cascade;
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

### Insert

```

INSERT INTO todos(user_id,task_name,deadline_date) values($1,$2,$3)

```

### Update

```
INSERT INTO todos(user_id,task_name,deadline_date) values($1,$2,$3)

```

### Delete

```
INSERT INTO todos(user_id,task_name,deadline_date) values($1,$2,$3)

```

## REDIS

```
docker run -d redis -p 6379:6379
```


## Cloudflare temporary deployment 

```
cloudflared tunnel --url http://localhost:3000 
```