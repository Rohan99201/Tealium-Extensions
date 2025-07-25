(function () {
    document.addEventListener("click", function (e) {
        const link = e.target.closest("#breadcrumbs a");
        if (!link) return;

        const text = link.innerText.trim();
        const texturl = link.getAttribute("href");

        const trailParts = Array.from(document.querySelectorAll("#breadcrumbs span > a"))
            .map(el => el.innerText.trim());
        const breadcrumb_trail = trailParts.join(" / ");

        const tealiumData = {
            event_name: "element_click",
            type: "breadcrumb click",
            placement: "Page Tab",
            text: text,
            texturl: texturl,
            breadcrumb_name: text,
            breadcrumb_url: texturl,
            breadcrumb_trail: breadcrumb_trail
        };

        if (typeof utag !== "undefined" && typeof utag.link === "function") {
            utag.link(tealiumData);
        }
    });
})();
