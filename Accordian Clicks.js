(function () {
    function fireAccordionClickEvent(target, action, viewText, headerText) {
        var tealiumData = {
            event_name: "element_click",
            action: action,
            placement: "Page Tab",
            type: "accordion click",
            text: viewText
        };

        if (headerText) {
            tealiumData.header = headerText;
        }

        if (typeof utag !== "undefined" && typeof utag.link === "function") {
            utag.link(tealiumData);
        }
    }

    function handleCustomAccordionClick(e) {
        var target = e.currentTarget;
        if (target.hasAttribute("data-tealium-tracked")) return;
        target.setAttribute("data-tealium-tracked", "true");

        setTimeout(function () {
            var isExpanded = target.getAttribute("aria-expanded") === "true";
            var action = isExpanded ? "Open" : "Close";
            var viewText = "Unknown";
            var headerText = "";

            if (target.classList.contains("cf-degree-levels-title")) {
                var linkEl = target.querySelector("a");
                if (linkEl) viewText = linkEl.innerText.trim();

                var headerEl = target.closest(".cf-programs-accordion-elementor-widget")?.querySelector("h2, h3");
                if (headerEl) {
                    headerText = headerEl.innerText.trim();
                }
            } else if (target.classList.contains("cf-industry-title")) {
                var linkEl = target.querySelector("a");
                if (linkEl) viewText = linkEl.innerText.trim();

                var container = target.closest(".cf-degree-levels-content");
                if (container) {
                    var h5 = container.querySelector(".cf-program-item h5");
                    if (h5) {
                        let text = h5.innerText.trim();
                        let parts = text.split(" ");
                        if (parts.length > 1) {
                            headerText = parts[parts.length - 1] + " Program";
                        }
                    }
                }
            }

            fireAccordionClickEvent(target, action, viewText, headerText);
            setTimeout(() => target.removeAttribute("data-tealium-tracked"), 100);
        }, 100);
    }

    function handleAccordionClick(e) {
        e.preventDefault();
        var target = e.currentTarget;
        if (target.hasAttribute("data-tealium-tracked")) return;
        target.setAttribute("data-tealium-tracked", "true");

        var action = "Open";
        var viewText = "Unknown";

        var isCourseGroupAccordion = target.closest(".show-link-parent") && target.querySelector(".course-group-title");
        if (isCourseGroupAccordion) {
            var labelEl = target.querySelector(".course-group-title");
            if (labelEl) viewText = labelEl.innerText.trim();

            var expandText = target.querySelector(".expand-close")?.innerText || "";
            action = expandText.toLowerCase().includes("close") ? "Close" : "Open";
        } else if (target.classList.contains("show-link")) {
            var elClone = target.cloneNode(true);
            var plusMinus = elClone.querySelector(".plus-minus");
            if (plusMinus) plusMinus.remove();
            viewText = elClone.innerText.trim();
            action = target.classList.contains("active") ? "Close" : "Open";
        } else if (target.classList.contains("linkbox")) {
            var labelEl2 = target.querySelector(".vertical-title");
            if (labelEl2) viewText = labelEl2.innerText.trim();
            action = target.classList.contains("active") ? "Close" : "Open";
        }

        fireAccordionClickEvent(target, action, viewText);
        setTimeout(() => target.removeAttribute("data-tealium-tracked"), 100);
    }

    function handleElementorAccordionClick(e) {
        var target = e.currentTarget;
        if (target.hasAttribute("data-tealium-tracked")) return;
        target.setAttribute("data-tealium-tracked", "true");

        setTimeout(function () {
            var isExpanded = target.getAttribute("aria-expanded") === "true";
            var action = isExpanded ? "Open" : "Close";
            var viewText = target.innerText.trim();
            var headerEl = document.querySelector(".elementor-widget-container h2.header2");
            var headerText = headerEl ? headerEl.innerText.trim() : "";

            fireAccordionClickEvent(target, action, viewText, headerText);
            setTimeout(() => target.removeAttribute("data-tealium-tracked"), 100);
        }, 100);
    }

    document.querySelectorAll(".cf-degree-levels-title").forEach(el =>
        el.addEventListener("click", handleCustomAccordionClick)
    );

    document.querySelectorAll(".cf-industry-title").forEach(el =>
        el.addEventListener("click", handleCustomAccordionClick)
    );

    document.querySelectorAll("a.show-link, a.linkbox").forEach(el =>
        el.addEventListener("click", handleAccordionClick)
    );

    document.querySelectorAll(".elementor-tab-title").forEach(el =>
        el.addEventListener("click", handleElementorAccordionClick)
    );
})();
