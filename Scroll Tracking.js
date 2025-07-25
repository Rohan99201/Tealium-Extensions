(function() {
    window._scrollTracking = window._scrollTracking || {
      '25': false,
      '50': false,
      '75': false,
      '100': false
    };
  
    function trackScrollDepth() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrollPercent = Math.floor((scrollTop / docHeight) * 100);
  
      [25, 50, 75, 100].forEach(function(threshold) {
        if (scrollPercent >= threshold && !window._scrollTracking[threshold]) {
          window._scrollTracking[threshold] = true;
  
          utag.link({
            event_name: "scroll",
            type: "Scroll",
            percent_scrolled: threshold
          });
        }
      });
    }
  
    window.addEventListener("scroll", trackScrollDepth);
  })();
