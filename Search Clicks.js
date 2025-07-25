(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('q') || '';

    const container = document.getElementById('search-results');
    if (!container) {
        console.warn('[Tealium] #search-results container not found');
        return;
    }

    container.addEventListener('click', function (event) {
        const clickedElement = event.target;

        const link = clickedElement.closest('a');
        if (!link || !container.contains(link)) return;

        const allLinks = Array.from(container.querySelectorAll('a'));
        const position = allLinks.indexOf(link) + 1;
        const text = link.textContent.trim();

        if (typeof utag !== 'undefined' && typeof utag.link === 'function') {
            utag.link({
                event_name: 'link_click',
                type: 'search_results_click',
                placement: 'Page tab',
                action: 'searched Clicks',
                search_term: searchTerm,
                result_position: position,
                text: text
            });
            console.log(`[Tealium] Fired link_click event for position ${position}: "${text}"`);
        } else {
            console.warn('[Tealium] utag.link not available.');
        }
    });
})();
