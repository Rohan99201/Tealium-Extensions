(function () {
  const formName = 'Request Information Form';
  let formInitiated = false;

  const excludedSelectors = ['#fr-first-name', '#fr-last-name', '#fr-email', '#fr-phone', '#fr-zipcode', '#fr-how-heard'];

  function isExcludedElement(target) {
    return excludedSelectors.some(selector => {
      const el = document.querySelector(selector);
      return el && (target === el || el.contains(target));
    });
  }

  function fireFormInitiateEvent(e) {
    // Check if the event target is in the exclusion list
    if (isExcludedElement(e.target)) return;

    if (formInitiated) return;
    formInitiated = true;

    if (window.utag && typeof window.utag.link === 'function') {
      utag.link({
        event_name: 'form_initiate',
        type: 'Forms',
        form_name: formName
      });
    }
  }

  function bindToElements() {
    const dropdowns = document.querySelectorAll('select[name="fr-programs"]:not([data-form-init-bound])');
    dropdowns.forEach(dropdown => {
      dropdown.setAttribute('data-form-init-bound', 'true');
      dropdown.addEventListener('click', fireFormInitiateEvent);
      dropdown.addEventListener('focus', fireFormInitiateEvent);
    });

    const formSteps = document.querySelectorAll('div.fr-form-step:not([data-form-init-bound])');
    formSteps.forEach(container => {
      container.setAttribute('data-form-init-bound', 'true');
      container.addEventListener('click', fireFormInitiateEvent);
    });

    const customSelector = document.querySelectorAll(
      '#Main > div > div.elementor.elementor-343 > section > div > div.elementor-column.elementor-col-50.elementor-top-column.elementor-element.elementor-element-4bdb7eab.main > div > section > div > div > div > div > div > div > div > div:nth-child(1):not([data-form-init-bound])'
    );
    customSelector.forEach(el => {
      el.setAttribute('data-form-init-bound', 'true');
      el.addEventListener('click', fireFormInitiateEvent);
    });

    if (dropdowns.length > 0 || formSteps.length > 0 || customSelector.length > 0) {
      formInitiated = false;
    }
  }

  bindToElements();

  const observer = new MutationObserver(() => {
    bindToElements();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
