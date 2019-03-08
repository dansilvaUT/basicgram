insert into users (username, password, email, first_name, last_name, facebook_url, twitter_url, user_age, privacy_level, profile_pic, account_creation_date)
values (${username}, ${password}, ${email}, ${first_name}, ${last_name}, ${facebook_url}, ${twitter_url}, ${user_age}, ${privacy_level}, ${profile_pic}, ${account_creation_date})

returning *