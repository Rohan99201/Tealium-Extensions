(function () {
    const selector1 = '#Main > div > div.elementor.elementor-347 > section.elementor-section.elementor-top-section.elementor-element.elementor-element-3b365d29.elementor-section-full_width.middle.mid-confirmation-section.elementor-section-height-default.elementor-section-height-default > div > div > div > section > div > div > div > div > div';
    const selector2 = '#Main > div > div.elementor.elementor-345 > section > div > div > div > section > div > div > div';
    const formName = 'Request Information Form';
    const maxAttempts = 30;
    let attempts = 0;

    if (window.__tealiumFormEventFired || history.state?.tealiumFormFired) {
        return;
    }

    function fireEventOnce() {
        if (typeof utag !== 'undefined' && typeof utag.link !== 'undefined') {
            utag.link({
                event_name: 'form_submit',
                type: 'Forms',
                form_name: formName
            });
        }

        window.__tealiumFormEventFired = true;

        const newState = Object.assign({}, history.state, { tealiumFormFired: true });
        history.replaceState(newState, '');
    }

    function observeWhenVisible(element) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !window.__tealiumFormEventFired) {
                    fireEventOnce();
                    obs.disconnect();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    }

    function waitForElements() {
        const el1 = document.querySelector(selector1);
        const el2 = document.querySelector(selector2);

        if (el1) {
            observeWhenVisible(el1);
        }

        if (el2) {
            observeWhenVisible(el2);
        }

        if (!el1 && !el2 && attempts < maxAttempts) {
            attempts++;
            setTimeout(waitForElements, 300);
        }
    }

    waitForElements();
})();
