/* eslint-disable camelcase */
/* eslint-disable no-undef */
const changePasswordUrl = '/api/auth/resetPassword';

const changePasswordSuccessUrl = '/profile';

const goToSuccessPageAfter = 1500;

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
  if ($('#newPassword').val() !== $('#confirmNewPassword').val()) {
    // console.log($('#password').val(), )
    showError('confirm password not match');
    return;
  }

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
      $.notify('Successfully changed password', {
        position: 'top center',
        className: 'success',
      });
      setTimeout(
        () => (window.location.href = changePasswordSuccessUrl),
        goToSuccessPageAfter
      );
    },
    error: function (error) {
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
    content: 'Do you really want to reset password?',
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
  $('.hide-password').on('click', function () {
    const $this = $(this);
    const $password_field = $this.prev('input');
    $password_field.attr('type') === 'password'
      ? $password_field.attr('type', 'text')
      : $password_field.attr('type', 'password');
    $this.text() === 'Hide' ? $this.text('Show') : $this.text('Hide');
    // focus and move cursor to the end of input field
    $password_field.putCursorAtEnd();
  });
  jQuery.fn.putCursorAtEnd = function () {
    return this.each(function () {
      // If this function exists...
      if (this.setSelectionRange) {
        // ... then use it (Doesn't work in IE)
        // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
        var len = $(this).val().length * 2;
        this.setSelectionRange(len, len);
      } else {
        // ... otherwise replace the contents with itself
        // (Doesn't work in Google Chrome)
        $(this).val($(this).val());
      }
    });
  };
});
