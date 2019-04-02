INSERT INTO messages (room_id,message,user_id,date)
VALUES (${room_id},${message},${user_id},${date});

SELECT *
FROM messages
WHERE room_id = ${room_id}