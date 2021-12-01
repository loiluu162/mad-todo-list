/* eslint-disable no-undef */
const changePasswordUrl = '/api/auth/verifyEmail';

const changePasswordSuccessUrl = '/';

const goToSuccessPageAfter = 500;

function getFormData($form) {
  const unindexedArray = $form.serializeArray();
  const indexedArray = {};

  $.map(unindexedArray, function (n, i) {
    indexedArray[n.name] = n.value;
  });

  return indexedArray;
}

function changePassword() {
  // check pw match
  const formData = getFormData($('form'));

  $.ajax({
    type: 'post',
    url: changePasswordUrl,
    data: JSON.stringify(formData),
    contentType: 'application/json; charset=utf-8',
    headers: {
      // [header]: resetPwToken,
    },
    traditional: true,
    success: function (data, textStatus, xhr) {
      $.notify('Successfully verified password', {
        position: 'top center',
        className: 'success',
      });
      setTimeout(
        () => (window.location.href = changePasswordSuccessUrl),
        goToSuccessPageAfter
      );
    },
    error: function (error) {
      console.log(error);
      $.notify(error.responseJSON.error, {
        position: 'top center',
        className: 'info',
      });
    },
  });
}

const confirmChangePassword = (e) => {
  e.preventDefault();
  $.confirm({
    title: 'Confirm',
    content: 'Do you really want to verify your email?',
    type: 'green',
    buttons: {
      ok: {
        text: 'YES',
        btnClass: 'btn-primary',
        keys: ['enter'],
        action: function () {
          changePassword();
        },
      },
      cancel: function () {},
    },
  });
};

$(document).ready(() => {
  $('form').submit(confirmChangePassword);
});
