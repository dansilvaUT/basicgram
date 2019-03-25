update users
set username = ${username}
where user_id = ${user_id};

select username
from users
where user_id = ${user_id};