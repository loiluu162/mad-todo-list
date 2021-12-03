/* eslint-disable no-undef */

const noTodoInThisDate = "<h2 class='info'>You have no todo on this day 👋";

$(document).ready(() => {
  $('#selected-date').change((e) => {
    const date = e.target.value.toString();
    getTodoListByDate(date);
  });
});

const getTodoListByDate = (date) => {
  $.notify(
    'Loading the todo on ' + date + '. Please wait for a few seconds...',
    {
      position: 'top center',
      className: 'info',
      autoHideDelay: 800,
      hideDuration: 200,
    }
  );
  $.ajax({
    url: '/api/todos?date=' + date,
    headers: {
      //   [header]: token,
    },
    processData: false,
    contentType: false,
    type: 'GET',
    success: function ({ content }) {
      const allToDosContent = content.map(templateForAll);

      $('.all__list').html(
        allToDosContent.length ? allToDosContent : noTodoInThisDate
      );
    },
    error: function (err) {
      console.log(err);
    },
  });
};
