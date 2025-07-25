(function () {
  if (!location.pathname.endsWith('/accessibility/')) return;

  const formName = 'Accessibility form';
  let formViewSent = false;
  let formInitiated = false;
  let formSubmitSent = false;
  const falloutFields = {
    'input_3_1': 'Name',
    'input_3_2': 'Email',
    'input_3_3': 'Message'
  };
  const falloutSent = new Set();

  function sendTealiumEvent(eventName, data) {
    if (typeof utag !== 'undefined' && typeof utag.link === 'function') {
      console.log(`[Tealium] Sending ${eventName}`, data);
      utag.link({
        event_name: eventName,
        ...data
      });
    }
  }

  const confirmationEl = document.querySelector('#gform_confirmation_message_3');
  const confirmationVisible = confirmationEl &&
    confirmationEl.offsetParent !== null &&
    confirmationEl.offsetHeight > 0 &&
    confirmationEl.offsetWidth > 0;

  const formEl = document.querySelector('#gform_3');

  // FORM VIEW
  if (formEl && !confirmationVisible) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !formViewSent && !confirmationVisible) {
          formViewSent = true;
          sendTealiumEvent('form_view', { form_name: formName });
        }
      });
    }, { threshold: 0.3 });
    observer.observe(formEl);
  }

  // FORM INITIATE on first field interaction
  formEl?.addEventListener('focusin', (e) => {
    if (!formInitiated && e.target.matches('input, textarea, select')) {
      formInitiated = true;
      sendTealiumEvent('form_initiate', {
        event_name: 'form_initiate',
        type: 'Forms',
        form_name: formName
      });
    }
  });

  // FORM FALLOUT: on focus of next field, send event for previous
  const inputIds = Object.keys(falloutFields);
  for (let i = 0; i < inputIds.length - 1; i++) {
    const currentId = inputIds[i];
    const nextId = inputIds[i + 1];
    const nextInput = document.getElementById(nextId);

    if (nextInput) {
      nextInput.addEventListener('focus', () => {
        if (!falloutSent.has(currentId)) {
          falloutSent.add(currentId);
          sendTealiumEvent('form_fallout', {
            event_name: 'form_fallout',
            type: 'Forms',
            form_name: formName,
            field_name: falloutFields[currentId]
          });
        }
      });
    }
  }

  // FORM SUBMIT
  const checkConfirmation = setInterval(() => {
    const confirmation = document.querySelector('#gform_confirmation_message_3');

    const isVisible = confirmation &&
      confirmation.offsetParent !== null &&
      confirmation.offsetHeight > 0 &&
      confirmation.offsetWidth > 0;

    if (isVisible && !formSubmitSent) {
      formSubmitSent = true;
      clearInterval(checkConfirmation);
      sendTealiumEvent('form_submit', {
        event_name: 'form_submit',
        form_name: formName
      });
    }
  }, 500);
  setTimeout(() => clearInterval(checkConfirmation), 10000);
})();
