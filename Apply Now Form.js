(function () {
  var formInitiated = false;
  var formViewed = false;
  var formSubmittedFlag = false;

  var fieldMap = {
    "#input_1_2": "First Name",
    "#input_1_3": "Last Name",
    "#input_1_4": "Email",
    "#input_1_5": "Phone",
    "#input_1_6": "Zip code",
    "#input_1_7": "How did you hear about us"
  };

  function attachFormViewObserver() {
    var formContainer = document.querySelector(
      "#Main > div > div.elementor.elementor-343 > section > div > div.elementor-column.elementor-col-50.elementor-top-column.elementor-element.elementor-element-4bdb7eab.main > div > div.elementor-element.elementor-element-1f620451.elementor-widget.elementor-widget-text-editor"
    );

    if (formContainer) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !formViewed) {
            formViewed = true;
            utag.link({
              event_name: "form_view",
              type:'Forms',
              form_category: "apply now"
            });
          }
        });
      }, { threshold: 0.5 });

      observer.observe(formContainer);
    }
  }

  var mo = new MutationObserver(function () {
    var formExists = document.querySelector(
      "#Main > div > div.elementor.elementor-343 > section > div > div.elementor-column.elementor-col-50.elementor-top-column.elementor-element.elementor-element-4bdb7eab.main > div > div.elementor-element.elementor-element-1f620451.elementor-widget.elementor-widget-text-editor"
    );
    if (formExists) {
      attachFormViewObserver();
      mo.disconnect();
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  var initEl = document.querySelector("#field_1_1 > div");
  if (initEl) {
    initEl.addEventListener("click", function () {
      if (!formInitiated) {
        formInitiated = true;
        utag.link({
          event_name: "form_initiate",
          form_category: "apply now"
        });
      }
    });
  }

  Object.keys(fieldMap).forEach(function (selector) {
    var el = document.querySelector(selector);
    if (el) {
      el.addEventListener("focus", function () {
        if (formInitiated) {
          utag.link({
            event_name: "form_fallout",
            form_category: "apply now",
            field_name: fieldMap[selector]
          });
        }
      });
    }
  });

  var confirmationSelector = "#Main > div > div.elementor.elementor-345 > section > div > div > div > section > div > div.elementor-column.elementor-col-50.elementor-inner-column.elementor-element.elementor-element-2de9ef96 > div > div.elementor-element.elementor-element-375b1cc6.elementor-widget.elementor-widget-text-editor";

  var submissionObserver = new MutationObserver(function () {
    var confirmationEl = document.querySelector(confirmationSelector);
    if (confirmationEl && !formSubmittedFlag) {
      if (performance.navigation.type !== 1) {
        formSubmittedFlag = true;
        utag.link({
          event_name: "form_submit",
          form_category: "apply now"
        });
      }
    }
  });

  submissionObserver.observe(document.body, { childList: true, subtree: true });
})();
