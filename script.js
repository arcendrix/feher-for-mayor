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
const volunteerEndpoint = 'https://script.google.com/macros/s/AKfycbwPadHpWHvkjTKsXihp4gpeBoK2Ltncp8nmNVtRfUd6e7gv8DZmSYQpyVny1vKVJejkuw/exec';

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

const volunteerSection = document.querySelector('#volunteer');

if (volunteerSection && !document.querySelector('.sponsor-section')) {
  const sponsorStyle = document.createElement('style');
  sponsorStyle.textContent = `
    .sponsor-section {
      padding: 4.5rem 5vw;
      background: #f5f0e7;
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    .sponsor-section .section-heading {
      max-width: 820px;
      margin-bottom: 2rem;
    }
    .sponsor-section h2 {
      font-family: var(--cond);
      font-size: clamp(2.7rem, 5vw, 5.2rem);
      line-height: 0.9;
      text-transform: uppercase;
      letter-spacing: -0.03em;
      color: #0d0d0d;
    }
    .sponsor-section p {
      max-width: 720px;
      margin-top: 0.85rem;
      color: #4e4e4e;
      font-size: 1.05rem;
      line-height: 1.65;
    }
    .sponsor-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1rem;
    }
    .sponsor-logo-card {
      min-height: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 1.3rem;
      border: 1px solid rgba(0,0,0,0.09);
      border-radius: 16px;
      background: #fff;
      box-shadow: 0 16px 38px rgba(0,0,0,0.07);
      color: #111;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: 0.08rem;
    }
    .sponsor-logo-card span {
      display: block;
      opacity: 0.72;
      font-size: 0.9rem;
    }
    .sponsor-note {
      margin-top: 1rem;
      color: #666;
      font-size: 0.86rem;
      line-height: 1.55;
    }
    @media (max-width: 900px) {
      .sponsor-section { padding: 3.8rem 4vw; }
      .sponsor-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 520px) {
      .sponsor-grid { grid-template-columns: 1fr; }
      .sponsor-logo-card { min-height: 104px; }
    }
  `;
  document.head.appendChild(sponsorStyle);

  const sponsorSection = document.createElement('section');
  sponsorSection.id = 'sponsors';
  sponsorSection.className = 'sponsor-section';
  sponsorSection.innerHTML = `
    <div class="section-heading">
      <div class="section-label">Business supporters</div>
      <h2>Local businesses backing John.</h2>
      <p>Thank you to the businesses and community partners helping support the campaign across London.</p>
    </div>
    <div class="sponsor-grid" aria-label="Business sponsor logos">
      <div class="sponsor-logo-card"><span>Sponsor Logo</span></div>
      <div class="sponsor-logo-card"><span>Sponsor Logo</span></div>
      <div class="sponsor-logo-card"><span>Sponsor Logo</span></div>
      <div class="sponsor-logo-card"><span>Sponsor Logo</span></div>
    </div>
    <p class="sponsor-note">Sponsor logos can be added here once approved artwork is provided by each business.</p>
  `;

  volunteerSection.insertAdjacentElement('afterend', sponsorSection);
}

const motionTargets = document.querySelectorAll(
  '.hero h1, .mobile-hero h1, .lead, .mobile-hero-copy p, .section h2, .section-label, .updates-grid h3, .plan-grid h3, .sponsor-section h2'
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
  '.priority-strip article, .plan-grid article, .updates-grid article, .event-row div, .donate-box, .volunteer-form, .sponsor-logo-card'
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
