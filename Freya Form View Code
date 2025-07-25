(function () {
  const trackedForms = new Set();
  const observerMap = new Map();

  const formsToTrack = [
    {
      selector: '#Main > div > div.elementor.elementor-343 > section > div > div.elementor-column.elementor-col-50.elementor-top-column.elementor-element.elementor-element-4bdb7eab.main > div > div > div',
      formName: 'Request Information Main Page'
    },
    {
      selector: '.elementor-popup-modal',
      formName: 'Request Information Popup'
    },
    {
      selector: '#Main > div > div.elementor.elementor-109 > section.elementor-section.elementor-top-section.elementor-element.elementor-element-cc49110.elementor-section-full_width.elementor-section-height-default.elementor-section-height-default > div > div > div > div > div > div > div > section > div.elementor-container.elementor-column-gap-default > div > div > section > div > div.elementor-column.elementor-col-50.elementor-inner-column.elementor-element.elementor-element-3d3ef31f.left-column > div > div.elementor-element.elementor-element-97569b9.elementor-widget.elementor-widget-text-editor',
      formName: 'Request Information Bottom Section'
    }
  ];

  function fireTealiumFormView(formName) {
    if (!trackedForms.has(formName)) {
      trackedForms.add(formName);

      window.utag && window.utag.link({
        event_name: 'form_view',
        form_name: 'Request Information Form'
      });
      console.log(`Tealium event fired: form_view, form_name: ${formName}`);
    }
  }

  function createAndObserveForm(form) {
    const element = document.querySelector(form.selector);
    if (element && !observerMap.has(element)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            fireTealiumFormView(form.formName);
          }
        });
      }, {
        threshold: 0.1
      });

      observer.observe(element);
      observerMap.set(element, observer);
    }
  }

  function initViewTracking() {
    formsToTrack.forEach(form => {
      createAndObserveForm(form);
    });
  }

  jQuery(document).on('elementor/popup/show', (event, popupId) => {
    const popupFormDefinition = formsToTrack.find(f => f.formName === 'Request Information Popup');
    if (popupFormDefinition) {
        fireTealiumFormView(popupFormDefinition.formName);
    }
  });

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0) {
        formsToTrack.forEach(form => {
          const element = document.querySelector(form.selector);
          if (element && !observerMap.has(element)) {
            createAndObserveForm(form);
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  const pageReady = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(pageReady);
      setTimeout(initViewTracking, 500);
    }
  }, 100);
})();
