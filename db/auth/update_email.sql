update users
set email = ${email}
where user_id = ${user_id};

select email
from users
where user_id = ${user_id};