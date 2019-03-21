update comments
set comment = ${comment}
where comment_id = ${comment_id}

select *
from comments
where post_id = ${post_id}
order by comment_id desc;


-- ${comment_id, comment}