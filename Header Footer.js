(function () {
    function fireTealiumLinkClick(text, type, placement, bannerName) {
        var eventData = {
            event_name: 'link_click',
            type: type,
            placement: placement,
            text: text,
        };

        if (bannerName) {
            eventData.banner_name = bannerName;
        }

        utag.link(eventData);
    }

    document.addEventListener('click', function (e) {
        var anchor = e.target.closest('a');
        if (!anchor) return;

        var href = anchor.getAttribute('href') || '';
        var text = anchor.textContent.trim().replace(/\s+/g, ' ');

        const footerHrefs = [
            '/programs/',
            '/programs/undergraduate/',
            'https://www.bgsu.edu/online#online-programs',
            '/programs/business/',
            '/healthcare-nursing-online-programs/',
            '/online-programs/',
            '/online-programs/undergraduate/',
            'https://my.astate.edu/'
        ];
        if (footerHrefs.includes(href)) {
            e.stopPropagation();
            fireTealiumLinkClick(text, 'header_links', 'header');
            return;
        }

        if (href === 'https://stephenrush.org'||href === '/programs/business/mba/general/'|| href === '/online-experience/') {
            fireTealiumLinkClick(text, 'page_tab_link', 'Page tab');
            return;
        }

        const footerPolicyLinks = [
            'https://policies.risepoint.com/privacy-partner/',
            'https://policies.risepoint.com/terms-partner/',
            'https://policies.risepoint.com/privacy-partner/',
            'https://onlinedegree.bgsu.edu/accessibility/',
            'https://risepoint.com/student/about/',
            'https://policies.risepoint.com/terms-partner/',
            '/terms-partner/',
            '/privacy-partner/'
        ];
        if (footerPolicyLinks.includes(anchor.href)) {
            fireTealiumLinkClick(text, 'footer_links', 'footer');
            return;
        }

        if (href === '/programs/' && anchor.classList.contains('gold')) {
            fireTealiumLinkClick(
                'View Program',
                'hero_banner_click',
                'Page tab',
                'Arkansas State University'
            );
            return;
        }
    });
})();
