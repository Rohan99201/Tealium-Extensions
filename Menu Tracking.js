document.addEventListener("click", function (e) {
    var target = e.target;
    while (target && target !== document) {
      if (target.matches && target.matches("a.mega-menu-link")) {
        var href = target.getAttribute("href") || "";
        var linkText = target.textContent.trim();
        var excludedHrefs = [
          '/programs/',
          '/programs/undergraduate/',
          '/programs/business/'
        ];
        if (excludedHrefs.includes(href)) return;
        var isSubMenu = target.closest("ul.mega-sub-menu") !== null;
        var isFinalProgramLink = isSubMenu && href.startsWith("https://");
        var eventName = "menu_nav";
        if (isFinalProgramLink) {
          eventName = "menu_click";
        } else if (isSubMenu) {
          eventName = "sub_menu_nav";
        }
        window.utag && utag.link({
          event_name: eventName,
          text: linkText,
          type: "navigation"
        });
        break;
      }
      target = target.parentNode;
    }
  });
  
