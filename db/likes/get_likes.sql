select count(liked)
from likes
where liked = true AND post_id = ${post_id} 

