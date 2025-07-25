function pushToTealium(data) {
  if (typeof utag !== 'undefined' && typeof utag.link === 'function') {
    utag.link(data);
  }
}

const applyNowSelector1 = '#Main > div > div.elementor.elementor-109 > section.elementor-section.elementor-top-section.elementor-element.elementor-element-cc49110.elementor-section-full_width.elementor-section-height-default.elementor-section-height-default > div > div > div > div > div > div > div > section > div.elementor-container.elementor-column-gap-default > div > div > section > div > div.elementor-column.elementor-col-50.elementor-inner-column.elementor-element.elementor-element-1541c3f8.right-column.desktop-only > div > div.elementor-element.elementor-element-33100a5a.elementor-widget.elementor-widget-cf-program-field > div > div > a';
const applyNowElement1 = document.querySelector(applyNowSelector1);

if (applyNowElement1) {
  applyNowElement1.addEventListener('click', function() {
    pushToTealium({
      "tealium_event": "link_click",
      "type": "apply_now",
      "placement": "pagetab",
      "text": "Apply Now"
    });
  });
}

const applyNowSelector2 = 'body > footer > section > div > div > div > div > div > div > div > section.elementor-section.elementor-top-section.elementor-element.elementor-element-107594a1.elementor-section-full_width.desktop-fixed-footer.elementor-section-height-default.elementor-section-height-default.elementor-sticky.elementor-sticky--active.elementor-section--handles-inside.elementor-sticky--effects > div > div > div > div.elementor-element.elementor-element-27bd094.desktop-fixed-apply.elementor-widget.elementor-widget-text-editor > div';
const applyNowElement2 = document.querySelector(applyNowSelector2);

if (applyNowElement2) {
  applyNowElement2.addEventListener('click', function() {
    pushToTealium({
      "tealium_event": "link_click",
      "type": "apply_now",
      "placement": "pagetab",
      "text": "Apply Now"
    });
  });
}

const requestInfoSelector = '#menu-1-4361b0b > li.top-nav-link.menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-10068';
const requestInfoElement = document.querySelector(requestInfoSelector);

if (requestInfoElement) {
  requestInfoElement.addEventListener('click', function() {
    pushToTealium({
      "tealium_event": "element_click",
      "type": "request_info",
      "placement": "body",
      "text": "Request Info"
    });
  });
}
