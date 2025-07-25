(function () {
  document.addEventListener("click", function (e) {
    const mainContainer = e.target.closest('.elementor-widget-wrap.elementor-element-populated');

    if (!mainContainer) return;

    const clickedLink = e.target.closest('a');

    if (!clickedLink || !mainContainer.contains(clickedLink)) return;

    const excludedSelectors = ["#Main > div > div.elementor.elementor-109 > section.elementor-section.elementor-top-section.elementor-element.elementor-element-259ea364.middle.home-section.featured-program.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default > div.elementor-container.elementor-column-gap-default > div > div > section > div > div.elementor-column.elementor-col-50.elementor-inner-column.elementor-element.elementor-element-6533c90.fp-content-right > div > div.elementor-element.elementor-element-1f7b118.elementor-widget.elementor-widget-cf-program-field > div > div > divuta","#Main > div > div.elementor.elementor-109 > section.elementor-section.elementor-top-section.elementor-element.elementor-element-18fee44.middle.home-section.oe.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default > div.elementor-container.elementor-column-gap-default > div > div > section > div > div.elementor-column.elementor-col-50.elementor-inner-column.elementor-element.elementor-element-d96b3f1.oe-content-left > div > div.elementor-element.elementor-element-add0dcc.desktop-only.elementor-widget.elementor-widget-text-editor > div > div","body > footer > div.elementor-section.elementor-top-section.elementor-element.elementor-element-615553ec.footer.elementor-section-full_width.elementor-section-height-default.elementor-section-height-default > div > div > div > section > div > div > div > div.elementor-element.elementor-element-a525bdf.elementor-widget.elementor-widget-text-editor > div > div","#mega-menu-item-148","body > footer > div.elementor-section.elementor-top-section.elementor-element.elementor-element-451811a.footer.elementor-section-full_width.elementor-section-height-default.elementor-section-height-default > div > div > div > div > div > div > footer > section > div > div > div > div.elementor-element.elementor-element-5e440870.footer-address.elementor-widget.elementor-widget-cf-about-brands > div > div > div","body > footer > div.elementor-section.elementor-top-section.elementor-element.elementor-element-451811a.footer.elementor-section-full_width.elementor-section-height-default.elementor-section-height-default > div > div > div > div > div > div > footer > section > div > div > div > div.elementor-element.elementor-element-523cebe.footer-address.elementor-widget.elementor-widget-cf-about-brands > div > div > div > p > a", "#mega-menu-item-153", "#mega-menu-item-156", "#menu-1-4361b0b > li.top-nav-link.menu-item.menu-item-type-custom.menu-item-object-custom.menu-item-10009", "#mega-menu-item-164"];
    for (const selector of excludedSelectors) {
      if (e.target.closest(selector)) {
        return;
      }
    }

    const href = clickedLink.href;
    if (href.includes("onlinedegree.bgsu.edu/request-info/") || href === "https://onlinedegree.bgsu.edu/" || href.includes("onlinedegree.bgsu.edu/apply/")) {
      return;
    }

    let clickedText = clickedLink.innerText.trim();
    if (!clickedText) {
      clickedText = clickedLink.getAttribute('aria-label') || clickedLink.getAttribute('title') || clickedLink.href;
    }

    const tealiumData = {
      event_name: "link_click",
      type: "card_click",
      placement: "Program Cards",
      text: clickedText,
      title: "Program Card"
    };

    if (typeof utag !== "undefined" && typeof utag.link === "function") {
      utag.link(tealiumData);
    }
  });
})();
