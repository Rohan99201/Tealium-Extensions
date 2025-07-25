document.querySelector('a[href="https://onlinedegree.bgsu.edu"]').addEventListener("click", function (e) {
    utag.link({
      event_name: "link_click",
      type: "logo_click",
      placement: "header",
      text: "BGSU University"
    });
  });
  
