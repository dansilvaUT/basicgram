SELECT username, profile_pic FROM users 
WHERE user_id IN ( SELECT user_id FROM posts WHERE post_id = ${post_id} );