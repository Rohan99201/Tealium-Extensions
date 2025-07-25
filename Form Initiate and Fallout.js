(function () {
  const popupSelector = '#elementor-popup-modal-255';
  const formName = 'Request Information PopUp';
  let formInitiated = false;

  const fields = [
    '#input_6_1',
    '#input_6_2',
    '#input_6_3',
    '#input_6_4',
    '#input_6_5',
    '#input_6_6',
    '#input_6_7'
  ];

  function getReadableFieldName(selector) {
    const map = {
      '#input_6_1': 'Program of Interest',
      '#input_6_2': 'First Name',
      '#input_6_3': 'Last Name',
      '#input_6_4': 'Phone',
      '#input_6_5': 'Zip Code',
      '#input_6_6': 'Email',
      '#input_6_7': 'How did you hear about us'
    };
    return map[selector] || selector;
  }

  function fireFormInitiate() {
    if (!formInitiated) {
      formInitiated = true;
      console.log('[Tealium] form_initiate');
      utag.link({
        event_name: 'form_initiate',
        type:'Forms',
        form_name: formName
      });
    }
  }

  function setupTracking() {
    fields.forEach(selector => {
      const field = document.querySelector(selector);
      if (!field || field.dataset.tealiumBound === 'true') return;

      field.dataset.tealiumBound = 'true';

      let fieldInteracted = false;
      const fieldName = getReadableFieldName(selector);

      if (selector === '#input_6_1') {
        const handleInteraction = () => {
          fireFormInitiate();
          fieldInteracted = true;
        };
        field.addEventListener('click', handleInteraction, { once: true });
        field.addEventListener('keydown', handleInteraction, { once: true });
        field.addEventListener('touchstart', handleInteraction, { once: true });
        field.addEventListener('input', () => { fieldInteracted = true; });
      } else {
        field.addEventListener('input', () => { fieldInteracted = true; });
      }

      // Fallout for all fields (if interacted)
      field.addEventListener('blur', () => {
        if (fieldInteracted) {
          console.log('[Tealium] form_fallout on', fieldName);
          utag.link({
            event_name: 'form_fallout',
            form_name: formName,
            type:'Forms',
            field_name: fieldName
          });
        }
      });
    });
  }

  function waitForFields() {
    const maxAttempts = 40;
    let attempts = 0;

    const interval = setInterval(() => {
      const popup = document.querySelector(popupSelector);
      const isVisible = popup && popup.style.display !== 'none';

      if (isVisible && fields.every(sel => document.querySelector(sel))) {
        clearInterval(interval);
        setupTracking();
      }

      if (++attempts >= maxAttempts) {
        clearInterval(interval);
        console.warn('[Tealium] Fields not found in time');
      }
    }, 300);
  }

  function observePopup() {
    const popup = document.querySelector(popupSelector);
    if (!popup) return;

    if (popup.style.display !== 'none') {
      console.log('[Tealium] Popup opened (initial)');
      formInitiated = false;
      waitForFields();
    }

    const observer = new MutationObserver(() => {
      const isVisible = popup.style.display !== 'none';
      if (isVisible) {
        console.log('[Tealium] Popup opened (observed)');
        formInitiated = false;
        waitForFields();
      }
    });

    observer.observe(popup, { attributes: true, attributeFilter: ['style'] });
    console.log('[Tealium] Observing popup...');
  }

  const popupInit = setInterval(() => {
    const popup = document.querySelector(popupSelector);
    if (popup) {
      clearInterval(popupInit);
      observePopup();
    }
  }, 300);
})();
