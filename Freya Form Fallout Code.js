(function () {
    const formName = 'Request Information Form';
    const formFields = [
        { id: 'fr-programs', placeholder: 'Program of Interest' },
        { id: 'fr-first-name', placeholder: 'First Name' },
        { id: 'fr-email', placeholder: 'Email' },
        { id: 'fr-phone', placeholder: 'Phone' },
        { id: 'fr-zipcode', placeholder: 'ZIP Code' },
        { id: 'fr-last-name', placeholder: 'Last Name' },
        { id: 'fr-how-heard', placeholder: 'How did you hear about us?' }
    ];

    let lastFocusedField = null;
    let lastFocusedFieldName = null;

    function sendTealiumEvent(eventName, data) {
        if (typeof utag !== 'undefined' && typeof utag.link === 'function') {
            utag.link({
                event_name: eventName,
                ...data
            });
        }
    }

    function attachFormFalloutListeners() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes) {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) {
                            formFields.forEach(fieldConfig => {
                                const el = node.querySelector(`#${fieldConfig.id}`);
                                if (el && !el.hasAttribute('data-tealium-fallout-listener-added')) {
                                    addFocusAndBlurListeners(el, fieldConfig);
                                }
                            });
                        }
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        formFields.forEach(fieldConfig => {
            const el = document.getElementById(fieldConfig.id);
            if (el && !el.hasAttribute('data-tealium-fallout-listener-added')) {
                addFocusAndBlurListeners(el, fieldConfig);
            }
        });
    }

    function addFocusAndBlurListeners(el, fieldConfig) {
        el.addEventListener('focus', () => {
            if (lastFocusedField && lastFocusedField !== el) {
                const previousFieldValue = (lastFocusedField.value || '').toString().trim();
                sendTealiumEvent('form_fallout', {
                    form_name: formName,
                    field_name: lastFocusedFieldName,
                    type: 'Forms',
                    field_value: previousFieldValue
                });
            }

            lastFocusedField = el;
            lastFocusedFieldName = fieldConfig.placeholder;
        });

        el.addEventListener('blur', () => {
            setTimeout(() => {
                if (document.activeElement !== el && !formFields.some(f => document.activeElement && document.activeElement.id === f.id)) {
                    const currentValue = (el.value || '').toString().trim();
                    sendTealiumEvent('form_fallout', {
                        form_name: formName,
                        field_name: fieldConfig.placeholder,
                        type: 'Forms',
                        field_value: currentValue
                    });
                    lastFocusedField = null;
                    lastFocusedFieldName = null;
                }
            }, 50);
        });

        el.setAttribute('data-tealium-fallout-listener-added', 'true');
    }

    attachFormFalloutListeners();

})();
