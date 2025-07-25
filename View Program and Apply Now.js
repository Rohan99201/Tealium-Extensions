document.querySelectorAll('.cf-program-item').forEach(programItem => {
  const viewBtn = programItem.querySelector('a[title="View Program"]');
  const applyBtn = programItem.querySelector('a[title="Apply Now"]');

  const header = programItem.querySelector('.cf-program-title')?.innerText?.trim();
  const title = programItem.querySelector('h3.headline5')?.innerText?.trim();
  const tuition = programItem.querySelector('p.program-spec:nth-of-type(1)')?.innerText?.replace('Tuition:', '').trim().replace('*', '');
  const duration = programItem.querySelector('p.program-spec:nth-of-type(2)')?.innerText?.replace('Complete Coursework:', '').trim();
  const creditHours = programItem.querySelector('p.program-spec:nth-of-type(3)')?.innerText?.replace('Credit Hours:', '').trim();

  const programDetails = {
    program_title: title,
    total_tuition: tuition,
    program_duration: duration,
    credit_hours: creditHours,
    header: header
  };

  if (viewBtn) {
    viewBtn.addEventListener('click', () => {
      window.utag?.link?.({
        tealium_event: 'link_click',
        type: 'view_program',
        placement: 'body',
        text: viewBtn.innerText.trim(),
        ...programDetails
      });
    });
  }

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      window.utag?.link?.({
        tealium_event: 'link_click',
        type: 'apply_now',
        placement: 'body',
        text: applyBtn.innerText.trim(),
        ...programDetails
      });
    });
  }
});
