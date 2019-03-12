select *, u.username, u.profile_pic
from posts p
join users u on p.user_id = u.user_id
where post_privacy_level = 0
order by post_id desc;