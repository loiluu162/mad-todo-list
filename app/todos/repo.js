const db = require('../db');

exports.getToDoById = async (id) => {
  const result = (await db.query('SELECT * FROM todos WHERE id=$1', [id])).rows;
  return result.length ? result[0] : null;
};
exports.updateToDo = async (id, newTaskName, newDeadline) => {
  return (
    await db.query(
      'UPDATE todos SET task_name=$1, deadline_date=$2 WHERE id=$3 returning todos.*',
      [newTaskName, newDeadline, id]
    )
  ).rows[0];
};
exports.toggleCompleted = async (id) => {
  return (
    await db.query(
      'UPDATE todos SET completed=NOT completed WHERE id=$1 returning id, completed',
      [id]
    )
  ).rows[0];
};
exports.deleteToDoById = async (id) => {
  return await db.query('DELETE FROM todos WHERE id=$1', [id]);
};
exports.createToDo = async (taskName, userId, deadline) => {
  return (
    await db.query(
      'INSERT INTO todos(user_id,task_name,deadline_date) values($1,$2,$3) returning todos.*',
      [userId, taskName, deadline]
    )
  ).rows[0];
};
exports.getAllToDos = async () => {
  return (await db.query('SELECT * FROM todos ORDER BY id DESC')).rows;
};
exports.getAllUserToDos = async (userId) => {
  return (
    await db.query(
      'SELECT * FROM todos where user_id=$1 ORDER BY deadline_date ASC',
      [userId]
    )
  ).rows;
};
exports.getToDosByStatus = async (userId, completed) => {
  return (
    await db.query(
      'SELECT * FROM todos where user_id=$1 AND completed=$2 ORDER BY deadline_date ASC',
      [userId, completed]
    )
  ).rows;
};

exports.isExistToDo = async (id) => {
  return (
    (await db.query('SELECT * FROM todos where id=$1', [id])).rows.length > 0
  );
};

exports.getAllToDosOnDay = async (userId, date) => {
  return (
    await db.query(
      "SELECT * FROM todos where user_id=$1 AND to_char(todos.deadline_date, 'YYYY-MM-DD')= $2 ORDER BY deadline_date ASC",
      [userId, date]
    )
  ).rows;
};
