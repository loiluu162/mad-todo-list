const db = require('../db');

exports.getToDoById = async (id) => {
  const result = (await db.query('SELECT * FROM todos WHERE id=$1', [id])).rows;
  return result.length ? result[0] : null;
};
exports.updateToDo = async (id, newTaskName, newDeadline) => {
  return await db.query(
    'UPDATE todos SET task_name=$1, deadline_date=$2 WHERE id=$3',
    [newTaskName, newDeadline, id]
  );
};
exports.deleteToDoById = async (id) => {
  return await db.query('DELETE FROM todos WHERE id=$1', [id]);
};
exports.createToDo = async (taskName, userId, deadline) => {
  return await db.query(
    'INSERT INTO todos(user_id,task_name,deadline_date) values($1,$2,$3)',
    [userId, taskName, deadline]
  );
};
exports.getAllToDos = async () => {
  return (await db.query('SELECT * FROM todos ORDER BY id ASC')).rows;
};
exports.getAllUserToDos = async (userId) => {
  return (await db.query(
    'SELECT * FROM todos where user_id=$1 ORDER BY id ASC'
  ),
  [userId]).rows;
};

exports.isExistToDo = async (id) => {
  return (
    (await db.query('SELECT * FROM todos where id=$1', [id])).rows.length > 0
  );
};
