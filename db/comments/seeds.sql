create table comments (
    comment_id serial primary key not null,
    commenting_user_id integer,
    post_id integer,
    comment varchar(2080),
    date_added varchar(50)
);


insert into comments (commenting_user_id, post_id, comment, date_added)
values(14, 16, 'Such a beautiful beach! It reminds of Themyscira');

select * from comments;