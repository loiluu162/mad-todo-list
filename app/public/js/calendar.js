/* eslint-disable no-undef */
$(document).ready(() => {
  $('#selected-date').change((e) => {
    const date = e.target.value.toString();
    console.log(date);
    getTodoListByDate(date);
  });
});

const getTodoListByDate = (date) => {
  $.ajax({
    url: '/api/todos/date/' + date,
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
      $('.all__list').html(allToDos.map(templateForAll));
      $('.completed__list').html(completedToDos.map(templateForCompleted));
      $('.uncompleted__list').html(
        uncompletedToDos.map(templateForUncompleted)
      );
    },
    error: function (err) {
      console.log(err);
    },
  });
};
