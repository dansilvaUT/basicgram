select count(liked)
from likes
where post_id = ${post_id} AND user_id = ${user_id};