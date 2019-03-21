delete from comments
where commenting_user_id = ${commenting_user_id } AND comment_id = ${comment_id}

select *
from comments
where post_id = ${post_id}
order by comment_id desc;

-- ${user_id, comment_id}



