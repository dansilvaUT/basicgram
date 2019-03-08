create table posts (
    post_id serial primary key not null,
    user_id integer references users(user_id),
    post_privacy_level smallint,
    img_url text,
    post_rating integer,
    date_added varchar(50)
);

insert into posts (user_id, post_privacy_level, img_url, post_rating, date_added)
values (5, 0, 'https://source.unsplash.com/random/180x180', 0, 'today');

select * from posts;