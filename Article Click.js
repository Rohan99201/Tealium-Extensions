(function() {
    function handleArticleLinkClick(event) {
        var clickedElement = event.currentTarget;
        var articleTitle = '';
        var clickedLinkText = '';
        var articleCategory = '';

        var elementorArticleCard = clickedElement.closest('.elementor-post__card');
        if (elementorArticleCard) {
            var titleElement = elementorArticleCard.querySelector('.elementor-post__title a');
            articleTitle = titleElement ? titleElement.innerText.trim() : '';
            clickedLinkText = clickedElement.innerText.trim();
            if (clickedLinkText.toLowerCase().includes('read more')) {
                clickedLinkText = 'Read More';
            }
        } else {
            var relatedNewsItem = clickedElement.closest('.related-news-item');
            if (relatedNewsItem) {
                var titleElement = relatedNewsItem.querySelector('.news-item-title');
                articleTitle = titleElement ? titleElement.innerText.trim() : '';
                var readMoreSpan = relatedNewsItem.querySelector('.news-item-link');
                if (readMoreSpan && readMoreSpan.innerText.trim().toLowerCase().includes('read more')) {
                    clickedLinkText = 'Read More';
                } else {
                    clickedLinkText = articleTitle;
                }
            } else {
                return;
            }
        }

        var breadcrumbsElement = document.querySelector('#breadcrumbs .breadcrumb_last');
        if (breadcrumbsElement) {
            var lastBreadcrumbText = breadcrumbsElement.innerText.trim();
            if (lastBreadcrumbText.toLowerCase() === 'articles' || lastBreadcrumbText.toLowerCase() === 'all articles') {
                var allBreadcrumbLinks = document.querySelectorAll('#breadcrumbs span a');
                if (allBreadcrumbLinks.length > 1) {
                    articleCategory = allBreadcrumbLinks[allBreadcrumbLinks.length - 2].innerText.trim();
                }
            } else {
                articleCategory = lastBreadcrumbText;
            }
        }

        var eventData = {
            'event_name': 'link_click',
            'type': 'article_click',
            'article_title': articleTitle,
            'text': clickedLinkText,
            'article_category': articleCategory
        };

        utag.link(eventData);
    }

    var elementorReadMoreLinks = document.querySelectorAll('.elementor-post__read-more');
    var elementorArticleTitleLinks = document.querySelectorAll('.elementor-post__title a');
    var relatedNewsItems = document.querySelectorAll('a.related-news-item');

    var allArticleLinks = Array.from(elementorReadMoreLinks)
                            .concat(Array.from(elementorArticleTitleLinks))
                            .concat(Array.from(relatedNewsItems));

    if (allArticleLinks.length > 0) {
        allArticleLinks.forEach(function(link) {
            link.addEventListener('click', handleArticleLinkClick);
        });
    }
})();
