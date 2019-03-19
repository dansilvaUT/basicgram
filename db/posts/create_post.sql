-- insert into posts (user_id, img_url, date_added, post_privacy_level, post_rating, username)
-- values (${user_id}, ${img_url}, ${date_added}, ${post_privacy_level}, ${post_rating}, ${username})


insert into posts (user_id, img_url, date_added, post_privacy_level, post_rating, caption)
values ($1, $2, $3, $4, $5, $6)
