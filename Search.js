(function () {
  const targetElement = document.querySelector('.elementor-widget-container h2.header1.head1');

  if (targetElement) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.textContent.trim() === 'Search Results') {
            const urlParams = new URLSearchParams(window.location.search);
            const searchTerm = urlParams.get('q') || '';

            if (typeof utag !== 'undefined' && utag.link) {
              utag.link({
                event_name: 'search_results',
                type: 'search',
                search_term: searchTerm,
                action: 'Search'
              });
            }
          }
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(targetElement);
  }
})();
