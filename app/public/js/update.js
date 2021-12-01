/* eslint-disable no-undef */
const UPDATE_TODO_API_URL = '/api/todos/';
$(document).ready(() => {
  console.log('object');
  $('form').submit(confirmSave);
});
function getFormData($form) {
  const unindexedArray = $form.serializeArray();
  const indexedArray = {};

  $.map(unindexedArray, function (n, i) {
    indexedArray[n.name] = n.value;
  });

  return indexedArray;
}
const confirmSave = (e) => {
  e.preventDefault();
  $.confirm({
    title: 'Confirm',
    content: 'Do you really want to update this todo?',
    type: 'green',
    buttons: {
      ok: {
        text: 'YES',
        btnClass: 'btn-primary',
        keys: ['enter'],
        action: function () {
          handleSave(e);
        },
      },
      cancel: function () {},
    },
  });
};

const handleSave = () => {
  const formData = getFormData($('form'));
  $.ajax({
    type: 'put',
    url: UPDATE_TODO_API_URL,
    data: JSON.stringify(formData),
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
      setTimeout(() => {
        window.history.back();
      }, 500);
    },
    error: function (error) {
      $.notify(error.responseText, {
        position: 'top center',
        className: 'warn',
      });
    },
  });
};
