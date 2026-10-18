// RoxIntel — shared site behavior

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Contact form — delivered by FormSubmit (temporary inbox until business email is set up)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      var button = form.querySelector('button[type="submit"]');
      var data = Object.fromEntries(new FormData(form));
      data._subject = 'RoxIntel website inquiry: ' + data.interest;
      data._template = 'table';

      button.disabled = true;
      status.style.color = '#c9a227';
      status.textContent = 'Sending…';

      fetch('https://formsubmit.co/ajax/rich.galero@yahoo.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (json.success !== 'true' && json.success !== true) throw new Error(json.message);
          form.reset();
          status.style.color = '#2e7d32';
          status.textContent = 'Thank you — your message has been sent. We\'ll be in touch shortly.';
        })
        .catch(function () {
          status.style.color = '#c62828';
          status.textContent = 'Sorry, your message could not be sent. Please try again in a moment.';
        })
        .then(function () { button.disabled = false; });
    });
  }
});
