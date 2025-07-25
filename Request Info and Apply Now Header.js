(function() {
  function handleHeaderClick(event, type) {
    var linkText = event.target.textContent.trim();
    utag.link({
      tealium_event: 'link_click',
      type: type,
      placement: 'header',
      text: linkText
    });
  }

  var checkInterval = setInterval(function() {
    var requestInfoLink = document.querySelector('li.menu-item-624 a[href*="/request-info/"]');
    var applyNowLink = document.querySelector('li.menu-item-623 a[href*="/apply/"]');

    if (requestInfoLink && applyNowLink) {
      requestInfoLink.addEventListener('click', function(e) {
        handleHeaderClick(e, 'request_info');
      });

      applyNowLink.addEventListener('click', function(e) {
        handleHeaderClick(e, 'apply_now');
      });

      clearInterval(checkInterval);
    }
  }, 300);
})();
