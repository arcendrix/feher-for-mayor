const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const volunteerForm = document.querySelector('.volunteer-form');
const volunteerEndpoint = 'https://script.google.com/macros/s/AKfycbwIt5iLfDGrT1NBYEEBXMuH_6NmOauUbyQdayV0oOppGvrIUFmcYvEgNiCKV26T5TvgQA/exec';

if (volunteerForm) {
  volunteerForm.setAttribute('action', volunteerEndpoint);
  volunteerForm.setAttribute('method', 'POST');

  volunteerForm.querySelectorAll('input[name^="_"], input[name="_honey"]').forEach((field) => {
    field.remove();
  });

  volunteerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = volunteerForm.querySelector('button[type="submit"]');
    const formNote = volunteerForm.querySelector('.form-note');
    const originalButtonText = submitButton ? submitButton.textContent : '';
    const formData = new FormData(volunteerForm);

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    if (formNote) {
      formNote.textContent = 'Sending your message to the campaign team...';
    }

    try {
      await fetch(volunteerEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

      volunteerForm.reset();

      if (formNote) {
        formNote.textContent = 'Thank you. Your message has been sent to the campaign team.';
      }
    } catch (error) {
      if (formNote) {
        formNote.textContent = 'Something went wrong. Please email feherformayor@gmail.com directly.';
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText || 'Send';
      }
    }
  });
}

const motionTargets = document.querySelectorAll(
  '.hero h1, .mobile-hero h1, .lead, .mobile-hero-copy p, .section h2, .section-label, .updates-grid h3, .plan-grid h3'
);

motionTargets.forEach((element) => {
  if (element.dataset.motionProcessed) return;

  const text = element.innerHTML;
  const words = text.split(/(\s+)/);

  element.innerHTML = words
    .map((word, index) => {
      if (word.trim() === '') return word;
      return `<span class="motion-word" style="--word-index:${index}">${word}</span>`;
    })
    .join('');

  element.dataset.motionProcessed = 'true';
  element.classList.add('motion-line');
});

const softMotionItems = document.querySelectorAll(
  '.priority-strip article, .plan-grid article, .updates-grid article, .event-row div, .donate-box, .volunteer-form'
);

softMotionItems.forEach((item) => {
  item.classList.add('motion-soft');
});

const revealElements = document.querySelectorAll('.motion-line, .motion-soft');

if ('IntersectionObserver' in window) {
  const motionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('motion-ready');
          motionObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealElements.forEach((item) => motionObserver.observe(item));
} else {
  revealElements.forEach((item) => item.classList.add('motion-ready'));
}
