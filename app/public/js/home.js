/* eslint-disable no-undef */
// call api
const TODO_API_URL = '/api/todos/';
const TOGGLE_COMPLETED_TODO_URL = '/api/todos/complete/';

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
      $('.all__list').append(allToDos.map(templateForAll));
      $('.completed__list').append(completedToDos.map(templateForCompleted));
      $('.uncompleted__list').append(
        uncompletedToDos.map(templateForUncompleted)
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
  <span class='task-deadline'>Deadline: ${dateString(
    new Date(todo.deadline_date)
  )}</span>
  ${
    todo.completed
      ? `<span><button id='toggle-${todo.id}' class='toggleTodo'>Mark as uncompleted</button></span>`
      : `<span><button id='toggle-${todo.id}' class='toggleTodo'>Mark as completed</button></span>`
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
  <span class='task-deadline'>Deadline: ${dateString(
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
  <span class='task-deadline'>Deadline: ${dateString(
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
  console.log('submitting a new todo');
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
      console.log(data);
      $('form').trigger('reset');
      $.notify(data.message, {
        position: 'top center',
        className: 'success',
      });
      $('.all__list').prepend(templateForAll(data.newTodo));
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
  console.log('TODO: ' + todoId);
  $.ajax({
    type: 'put',
    url: TOGGLE_COMPLETED_TODO_URL + todoId,
    contentType: 'application/json; charset=utf-8',
    headers: {
      // [header]: token,
    },
    traditional: true,
    success: function (data, textStatus, xhr) {
      console.log(e.target.id);
      data.content.completed
        ? $(`#${e.target.id}`).text('Mark as uncompleted')
        : $(`#${e.target.id}`).text('Mark as completed');
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
  console.log('TODO: ' + todoId);
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
