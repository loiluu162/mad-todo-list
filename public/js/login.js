/* eslint-disable camelcase */
/* eslint-disable no-var */
/* eslint-disable no-undef */

const LOGIN_API_URL = '/api/auth/login';
const SIGNUP_API_URL = '/api/auth/signup';
const FORGOT_PASSWORD_API_URL = '/api/auth/requestForgotPassword';

$(document).ready(function () {
  var $form_modal = $('.cd-user-modal');
  var $form_login = $form_modal.find('#cd-login');
  var $form_signup = $form_modal.find('#cd-signup');
  var $form_forgot_password = $form_modal.find('#cd-reset-password');
  var $form_modal_tab = $('.cd-switcher');
  var $tab_login = $form_modal_tab.children('li').eq(0).children('a');
  var $tab_signup = $form_modal_tab.children('li').eq(1).children('a');
  var $forgot_password_link = $form_login.find('.cd-form-bottom-message a');
  var $back_to_login_link = $form_forgot_password.find(
    '.cd-form-bottom-message a'
  );
  var $main_nav = $('.main-nav');

  // open modal
  $main_nav.on('click', function (event) {
    if ($(event.target).is($main_nav)) {
      // on mobile open the submenu
      $(this).children('ul').toggleClass('is-visible');
    } else {
      // on mobile close submenu
      $main_nav.children('ul').removeClass('is-visible');
      // show modal layer
      $form_modal.addClass('is-visible');
      // show the selected form
      $(event.target).is('.cd-signup') ? signup_selected() : login_selected();
    }
  });

  // close modal
  $('.cd-user-modal').on('click', function (event) {
    if (
      $(event.target).is($form_modal) ||
      $(event.target).is('.cd-close-form')
    ) {
      $form_modal.removeClass('is-visible');
    }
  });
  // close modal when clicking the esc keyboard button
  $(document).keyup(function (event) {
    if (event.which === '27') {
      $form_modal.removeClass('is-visible');
    }
  });

  // switch from a tab to another
  $form_modal_tab.on('click', function (event) {
    event.preventDefault();
    $(event.target).is($tab_login) ? login_selected() : signup_selected();
  });

  // hide or show password
  $('.hide-password').on('click', function () {
    var $this = $(this);
    var $password_field = $this.prev('input');

    $password_field.attr('type') === 'password'
      ? $password_field.attr('type', 'text')
      : $password_field.attr('type', 'password');
    $this.text() === 'Hide' ? $this.text('Show') : $this.text('Hide');
    // focus and move cursor to the end of input field
    $password_field.putCursorAtEnd();
  });

  // show forgot-password form
  $forgot_password_link.on('click', function (event) {
    event.preventDefault();
    forgot_password_selected();
  });

  // back to login from the forgot-password form
  $back_to_login_link.on('click', function (event) {
    event.preventDefault();
    login_selected();
  });

  function login_selected() {
    $form_login.addClass('is-selected');
    $form_signup.removeClass('is-selected');
    $form_forgot_password.removeClass('is-selected');
    $tab_login.addClass('selected');
    $tab_signup.removeClass('selected');
  }

  function signup_selected() {
    $form_login.removeClass('is-selected');
    $form_signup.addClass('is-selected');
    $form_forgot_password.removeClass('is-selected');
    $tab_login.removeClass('selected');
    $tab_signup.addClass('selected');
  }

  function forgot_password_selected() {
    $form_login.removeClass('is-selected');
    $form_signup.removeClass('is-selected');
    $form_forgot_password.addClass('is-selected');
  }

  $('#cd-login form').submit(handleLogin);
  $('#cd-signup form').submit(handleSignup);
  $('#cd-reset-password form').submit(handleForgotPassword);
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

const handleLogin = (e) => {
  e.preventDefault();
  $.notify('Logging in. Please wait for a few seconds...', {
    position: 'top center',
    className: 'info',
  });
  const formData = getFormData($('#cd-login form'));
  $.ajax({
    type: 'post',
    url: LOGIN_API_URL,
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
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    },
    error: function (error) {
      $.notify(error.responseJSON.error, {
        position: 'top center',
        className: 'warn',
      });
    },
  });
};
const handleForgotPassword = (e) => {
  e.preventDefault();
  $.notify(
    'Requesting new forgot password email confirmation. Please wait for a few seconds...',
    {
      position: 'top center',
      className: 'info',
    }
  );
  const formData = getFormData($('#cd-reset-password form'));
  $.ajax({
    type: 'post',
    url: FORGOT_PASSWORD_API_URL,
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
      setTimeout(() => {
        window.location.href = '/requestForgotPasswordSuccess';
      }, 10);
    },
    error: function (error) {
      $.notify(error.responseJSON.error, {
        position: 'top center',
        className: 'warn',
      });
    },
  });
};

const handleSignup = (e) => {
  $.notify('Signing up. Please wait for a few seconds...', {
    position: 'top center',
    className: 'info',
  });
  e.preventDefault();
  const formData = getFormData($('#cd-signup form'));
  $.ajax({
    type: 'post',
    url: SIGNUP_API_URL,
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
        window.location.href = '/signup-success';
      }, 10);
    },
    error: function (error) {
      $.notify(error.responseJSON.error, {
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
