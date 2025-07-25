(function () {
  document.addEventListener("click", function (e) {
    const socialLink = e.target.closest(".elementor-social-icons-wrapper .elementor-icon");
    if (!socialLink) return;

    const platformSpan = socialLink.querySelector(".elementor-screen-only");
    let platform_name = platformSpan ? platformSpan.innerText.trim() : "Unknown";
    const link_url = socialLink.getAttribute("href");

    if (link_url && link_url.includes("twitter")) {
      platform_name = "X formerly Twitter";
    }

    const tealiumData = {
      event_name: "link_click",
      type: "social_click",
      placement: "Footer",
      platform_name: platform_name,
      link_url: link_url
    };

    if (typeof utag !== "undefined" && typeof utag.link === "function") {
      utag.link(tealiumData);
    }
  });
})();
