create table likes (
    like_id serial primary key not null
    user_id integer,
    post_id integer,
    liked boolean,
);
