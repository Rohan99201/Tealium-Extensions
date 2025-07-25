(function() {
    function handleArticleNavLinkClick(event) {
        var clickedLink = event.currentTarget;
        var linkText = clickedLink.textContent.replace(/\(\d+\)/g, '').trim();

        var headerText = '';
        var currentParentUl = clickedLink.closest('ul.children');

        if (currentParentUl) {
            var parentLi = currentParentUl.closest('li.list-element');

            if (parentLi) {
                var parentLink = parentLi.querySelector('a');
                if (parentLink) {
                    headerText = parentLink.textContent.replace(/\(\d+\)/g, '').trim();
                }
            } else {
                var headingSection = clickedLink.closest('.article-nav').querySelector('.heading-section.desktop-only p.header3 span');
                if (headingSection && headingSection.textContent.trim() === 'Categories') {
                    headerText = 'Categories';
                } else {
                    var tagHeader = clickedLink.closest('.show-content').querySelector('p.header3 span');
                    if(tagHeader && tagHeader.textContent.trim() === 'Tags') {
                        headerText = 'Tags';
                    }
                }
            }
        }

        var eventData = {
            'event_name': 'element_click',
            'type': 'filter_click',
            'placement': 'Side bar',
            'text': linkText,
            'text_header': headerText
        };

        utag.link(eventData);
    }

    var articleCategoryLinks = document.querySelectorAll('.article-nav ul.children li.list-element > a, .article-nav ul.children ul.children li.list-element > a');
    var articleTagLinks = document.querySelectorAll('.article-nav div.show-content > a[href*="/tag/"]');

    if (articleCategoryLinks.length > 0) {
        articleCategoryLinks.forEach(function(link) {
            link.addEventListener('click', handleArticleNavLinkClick);
        });
    }

    if (articleTagLinks.length > 0) {
        articleTagLinks.forEach(function(link) {
            link.addEventListener('click', handleArticleNavLinkClick);
        });
    }
})();
