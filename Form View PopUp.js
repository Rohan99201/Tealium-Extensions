(function () {
  function checkPopupVisibility() {
    var popup = document.querySelector('#elementor-popup-modal-255 > div');
    if (popup) {
      if (popup.offsetParent !== null) {
        if (!popup.dataset.tealiumFired) {
          popup.dataset.tealiumFired = 'true'; 
          utag.link({
            event_name: 'form_view',
            type:'Forms',
            form_name: 'Request Information PopUp'
          });
        }
      } else {
        delete popup.dataset.tealiumFired;
      }
    }
  }

  var observer = new MutationObserver(function () {
    checkPopupVisibility();
  });

  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });

  checkPopupVisibility();
})();
