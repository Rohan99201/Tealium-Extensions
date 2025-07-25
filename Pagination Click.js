function getPlacement(element) {
  if (element.closest('header')) {
      return 'header';
  } else if (element.closest('footer')) {
      return 'footer';
  } else if (element.closest('.cf-program-content')) {
      return 'program_content_full_card';
  } else if (element.closest('.elementor-tab-content')) {
      return 'program_tab';
  }
  return 'body';
}

function getProgramDetails(buttonElement) {
  const programContent = buttonElement.closest('.cf-program-content');
  if (!programContent) {
      return {};
  }

  const header = programContent.querySelector('h4.header5')?.innerText.trim() || '';
  const programTitle = header;

  let totalTuition = '';
  let programDuration = '';
  let creditHours = '';

  programContent.querySelectorAll('p.program-spec').forEach(p => {
      const text = p.innerText.trim();
      if (text.includes('Total Tuition:')) {
          totalTuition = text.replace('Total Tuition:', '').trim();
      } else if (text.includes('Duration:')) {
          programDuration = text.replace('Duration:', '').trim();
      } else if (text.includes('Credit Hours:')) {
          creditHours = text.replace('Credit Hours:', '').trim();
      }
  });

  return {
      header,
      program_title: programTitle,
      credit_hours: creditHours,
      program_duration,
      total_tuition: totalTuition
  };
}

document.querySelectorAll(
  'button.request-info-popup:not([aria-label="Request info from footer sticky"])'
).forEach(button => {
  button.addEventListener('click', function () {
    const placement = getPlacement(this);
    const text = this.innerText || this.getAttribute('title') || this.getAttribute('aria-label');
    const programDetails = getProgramDetails(this);

    utag.link({
      tealium_event: 'element_click',
      type: 'request_info',
      placement,
      text,
      ...programDetails
    });
  });
});

document.querySelector(
  'button.request-info-popup[aria-label="Request info from footer sticky"]'
)?.addEventListener('click', function () {
  const placement = getPlacement(this);
  const text = this.innerText || this.getAttribute('aria-label');
  const programDetails = getProgramDetails(this);

  utag.link({
    tealium_event: 'link_click',
    type: 'request_info',
    placement,
    text,
    ...programDetails
  });
});

document.querySelectorAll('a[href*="/apply/"]').forEach(link => {
  if (
    link.classList.contains('elementor-button') ||
    link.classList.contains('mega-menu-link') ||
    link.classList.contains('apply-now') ||
    link.classList.contains('apply-now-popup')
  ) {
    link.addEventListener('click', function () {
      const placement = getPlacement(this);
      const text = this.innerText || this.getAttribute('aria-label');
      const programDetails = getProgramDetails(this);

      utag.link({
        tealium_event: 'link_click',
        type: 'apply_now',
        placement,
        text,
        ...programDetails
      });
    });
  }
});

document.querySelector('.apply-now-popup')?.addEventListener('click', function () {
  utag.link({
    tealium_event: 'link_click',
    type: 'apply_now',
    placement: 'body',
    text: 'APPLY NOW'
  });
});

document.querySelectorAll(
  'a[href*="academicpartnerships.uta.edu"][href*="program"]'
).forEach(link => {
  if (
    link.innerText.includes('View Program') ||
    link.getAttribute('aria-label')?.includes('view program')
  ) {
    link.addEventListener('click', function () {
      const placement = getPlacement(this);
      const text = this.innerText || this.getAttribute('aria-label');
      const programDetails = getProgramDetails(this);

      utag.link({
        tealium_event: 'link_click',
        type: 'view_program',
        placement,
        text,
        ...programDetails
      });
    });
  }
});

document.querySelectorAll(
  '.elementor-widget-container a.button[href="/apply/"][aria-label="apply now from footer sticky"]'
).forEach(link => {
  link.addEventListener('click', function () {
    const placement = getPlacement(this);
    const text = this.innerText || this.getAttribute('aria-label');
    const programDetails = getProgramDetails(this);

    utag.link({
      tealium_event: 'link_click',
      type: 'apply_now',
      placement,
      text,
      ...programDetails
    });
  });
});
