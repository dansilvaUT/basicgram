-- ${post_id}

select *, u.username
from comments c
join users u on c.commenting_user_id = u.user_id
where post_id = ${post_id}
order by comment_id desc;
