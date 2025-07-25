const exitLinks = document.querySelectorAll("a");

exitLinks.forEach((link) => {
  link.addEventListener("mousedown", (e) => {
    try {
      const clickedHref = e.target.closest("a")?.href; // Handles nested elements inside <a>
      if (!clickedHref) return;

      const linkUrl = new URL(clickedHref, window.location.href); // Absolute URL
      const targetDomain = "onlinedegree.bgsu.edu";

      if (linkUrl.hostname !== targetDomain) {
        window.utag.link({
          event_name: "link_click",
          type: "exit link",
          link_url: linkUrl.href
        });
      }
    } catch (err) {
      // console.error("Exit link tracking error:", err);
    }
  });
});
