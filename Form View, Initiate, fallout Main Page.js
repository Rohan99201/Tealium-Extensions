(function () {
  const formName = 'Request Information Main Page';

  const falloutFields = {
    'input_2_1': 'Program of Interest',
    'input_2_2': 'First Name',
    'input_2_3': 'Last Name',
    'input_2_4': 'Phone',
    'input_2_5': 'ZIP Code',
    'input_2_6': 'Email',
    'input_2_7': 'How did you hear about us?'
  };

  const sentFalloutEvents = new Set();

  function sendTealiumEvent(eventName, data) {
    if (typeof utag !== 'undefined' && typeof utag.link === 'function') {
      console.log(`[Tealium] Sending ${eventName}`, data);
      utag.link({
        event_name: eventName,
        ...data
      });
    } else {
      console.warn('[Tealium] utag.link not available', eventName);
    }
  }

  function triggerFormFallout(fieldId, value, type) {
    const label = falloutFields[fieldId];
    if (label && !sentFalloutEvents.has(fieldId)) {
      sendTealiumEvent('form_fallout', {
        form_name: formName,
        field_name: label,
        field_value: value,
        type: type
      });
      sentFalloutEvents.add(fieldId);
    }
  }

  const excludedPaths = [
    '/confirmation/',
    '/apply/',
    '/apply2/'
  ];

  const currentPath = window.location.pathname;

  // Fire form_view only if not on excluded paths and .form-title is present
  if (
    document.querySelector('.form-title') &&
    !excludedPaths.includes(currentPath)
  ) {
    console.log('[Tealium] Sending form_view event');
    sendTealiumEvent('form_view', { form_name: formName });
  }

  let formInitiateFired = false;

  document.addEventListener('focusin', function (event) {
    const target = event.target;
    if (!target) return;

    if (!formInitiateFired && target.id === 'input_2_1') {
      formInitiateFired = true;
      sendTealiumEvent('form_initiate', {
        form_name: formName,
        type: 'Forms'
      });
    }
  });

  document.addEventListener('blur', function (event) {
    const target = event.target;
    if (!target) return;

    const fieldId = target.id;
    const label = falloutFields[fieldId];

    if (label) {
      const value = (target.value || '').trim();
      if (value) {
        setTimeout(() => {
          if (target.value.trim() === value && !sentFalloutEvents.has(fieldId)) {
            triggerFormFallout(fieldId, value, 'Forms (Manual Entry)');
          }
        }, 50);
      }
    }
  }, true);

  function checkAutofill() {
    Object.keys(falloutFields).forEach((id) => {
      const el = document.getElementById(id);
      if (el && !sentFalloutEvents.has(id)) {
        const value = (el.value || '').trim();
        if (value) {
          setTimeout(() => {
            if ((el.value || '').trim() === value && !sentFalloutEvents.has(id)) {
              triggerFormFallout(id, value, 'Forms (Autofill)');
            }
          }, 100);
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', checkAutofill);
  setTimeout(checkAutofill, 1000);
})();
