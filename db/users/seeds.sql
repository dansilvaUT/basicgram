create table users (
    user_id serial primary key not null,
    email varchar(255) not null unique,
    username varchar(20),
    password varchar(128),
    first_name varchar(255),
    last_name varchar(255),
    privacy_level smallint,
    profile_pic text,
    facebook_url text,
    twitter_url text,
    user_age smallint,
    account_creation_date varchar(50)
);

insert into users (email, username, password, first_name, last_name, privacy_level, profile_pic, facebook_url, twitter_url, user_age, account_creation_date)
values ('test@gmail.com', 'testusername', 'testpassword', 'testfirstname', 'testlastname', 0 , 'profile_pic', 'facebook_url', 'twitter_url', 25, 'today');

select * from users;