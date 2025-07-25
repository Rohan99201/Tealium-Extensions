(function () {
  const applyButton = document.querySelector('.elementor-element-27bd094 a');

  if (applyButton) {
    applyButton.addEventListener('click', function () {
      const linkText = applyButton.innerText.trim() || applyButton.getAttribute('aria-label') || 'Apply Now';

      utag.link({
        tealium_event: 'link_click',
        type: 'apply_now',
        placement: 'footer_sticky',
        text: linkText
      });
    });
  }
})();
