-- ${post_id}

select *
from comments
where post_id = ${post_id}
order by comment_id desc;