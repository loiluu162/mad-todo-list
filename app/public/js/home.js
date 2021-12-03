/* eslint-disable no-undef */
// call api
const TODO_API_URL = '/api/todos/';
const TOGGLE_COMPLETED_TODO_URL = '/api/todos/complete/';

const completedEmpty = "<h2 class='info'>You had not done any task 😒😒";
const uncompletedEmpty =
  "<h2 class='info'>Congratulations. You had done all the task 🎉🎉";
const allEmpty =
  "<h2 class='info'>You currently have no task to do. Let's begin add the first task 💖";

$(document).ready(() => {
  getTodoList();
  $('form').submit(handleAddNewTodo);
  let timeOutToggle;
  $(document).on('click', '.deleteTodo', confirmDelete);
  $(document).on('click', '.toggleTodo', (e) => {
    clearTimeout(timeOutToggle);
    timeOutToggle = setTimeout(function () {
      handleToggleCompleted(e);
    }, 500);
  });
});

const getTodoList = () => {
  $.ajax({
    url: TODO_API_URL,
    headers: {
      //   [header]: token,
    },
    processData: false,
    contentType: false,
    type: 'GET',
    success: function ({ content }) {
      const completedToDos = content.filter((todo) => todo.completed);
      const uncompletedToDos = content.filter((todo) => !todo.completed);
      const allToDos = content;

      const allToDosContent = allToDos.map(templateForAll);
      const completedToDosContent = completedToDos.map(templateForCompleted);
      const uncompletedToDosContent = uncompletedToDos.map(
        templateForUncompleted
      );

      $('.all__list').html(allToDosContent.length ? allToDosContent : allEmpty);
      $('.completed__list').html(
        completedToDosContent.length ? completedToDosContent : completedEmpty
      );
      $('.uncompleted__list').html(
        uncompletedToDosContent.length
          ? uncompletedToDosContent
          : uncompletedEmpty
      );
    },
    error: function (err) {
      console.log(err);
    },
  });
};

const templateForAll = (todo) => {
  return `<li id='todo-${todo.id}' class=${todo.completed ? 'completed' : ''}>
  <span class='task-name'>${todo.task_name}</span>
  <span class='task-deadline'>end at ${dateString(
    new Date(todo.deadline_date)
  )}</span>
  ${
    todo.completed
      ? `<span><button id='toggle-${todo.id}' class='toggleTodo'>Uncompleted</button></span>`
      : `<span><button id='toggle-${todo.id}' class='toggleTodo'>Completed</button></span>`
  }
  <span><button id='deleteTodo-${
    todo.id
  }' class='deleteTodo'>Delete</button></span>
  <span><button class='updateTodo'><a href="/update/${
    todo.id
  }">Update</a></button></span>
  </li>
  `;
};
const templateForCompleted = (todo) => {
  return `<li id='todo-${todo.id}'><span class='task-name'>${
    todo.task_name
  }</span>
  <span class='task-deadline'>end at ${dateString(
    new Date(todo.deadline_date)
  )}</span>
  <span><button id='deleteTodo-${
    todo.id
  }' class='deleteTodo'>Delete</button></span>
  <span><button id='deleteTodo-${
    todo.id
  }' class='updateTodo'><a href="/update/${todo.id}">Update</a></button></span>
  </li>
  `;
};
const templateForUncompleted = (todo) => {
  return `<li id='todo-${todo.id}'><span class='task-name'>${
    todo.task_name
  }</span>
  <span class='task-deadline'>end at ${dateString(
    new Date(todo.deadline_date)
  )}</span>
  <span><button id='deleteTodo-${
    todo.id
  }' class='deleteTodo'>Delete</button></span>
  <span><button id='deleteTodo-${
    todo.id
  }' class='updateTodo'><a href="/update/${todo.id}">Update</a></button></span>
  </li>
  `;
};

const handleAddNewTodo = (e) => {
  e.preventDefault();
  const formData = getFormData($('form'));
  $.ajax({
    type: 'post',
    url: TODO_API_URL,
    data: JSON.stringify(formData),
    contentType: 'application/json; charset=utf-8',
    headers: {
      // [header]: token,
    },
    traditional: true,
    success: function (data, textStatus, xhr) {
      $('form').trigger('reset');
      $.notify(data.message, {
        position: 'top center',
        className: 'success',
      });
      $('.all__list').prepend(templateForAll(data.content));
    },
    error: function (error) {
      $.notify(error.responseText, {
        position: 'top center',
        className: 'warn',
      });
    },
  });
};

function getFormData($form) {
  const unindexedArray = $form.serializeArray();
  const indexedArray = {};

  $.map(unindexedArray, function (n, i) {
    indexedArray[n.name] = n.value;
  });

  return indexedArray;
}

const handleToggleCompleted = (e) => {
  const todoId = e.target.id.split('-')[1];
  $.ajax({
    type: 'put',
    url: TOGGLE_COMPLETED_TODO_URL + todoId,
    contentType: 'application/json; charset=utf-8',
    headers: {
      // [header]: token,
    },
    traditional: true,
    success: function (data, textStatus, xhr) {
      data.content.completed
        ? $(`#${e.target.id}`).text('Uncompleted')
        : $(`#${e.target.id}`).text('Completed');
      $(`#todo-${todoId}`).toggleClass('completed');
      $.notify(data.message, {
        autoHideDelay: 800,
        hideDuration: 200,
        position: 'top center',
        className: 'success',
      });
    },
    error: function (error) {
      $.notify(error.responseText, {
        position: 'top center',
        className: 'warn',
      });
    },
  });
};
const handleDeleteTodo = (e) => {
  const todoId = e.target.id.split('-')[1];
  $.ajax({
    type: 'delete',
    url: TODO_API_URL + todoId,
    contentType: 'application/json; charset=utf-8',
    headers: {
      // [header]: token,
    },
    traditional: true,
    success: function (data, textStatus, xhr) {
      $.notify(data.message, {
        position: 'top center',
        className: 'success',
      });
      $(`#todo-${todoId}`).hide();
    },
    error: function (error) {
      $.notify(error.responseText, {
        position: 'top center',
        className: 'warn',
      });
    },
  });
};

const confirmDelete = (e) => {
  $.confirm({
    title: 'Confirm',
    content: 'Do you really want to delete this todo?',
    type: 'green',
    buttons: {
      ok: {
        text: 'YES',
        btnClass: 'btn-primary',
        keys: ['enter'],
        action: function () {
          handleDeleteTodo(e);
        },
      },
      cancel: function () {},
    },
  });
};

const dateString = (date) => {
  return (
    ('0' + date.getDate()).slice(-2) +
    '/' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    date.getFullYear() +
    ' ' +
    ('0' + date.getHours()).slice(-2) +
    ':' +
    ('0' + date.getMinutes()).slice(-2)
  );
};
