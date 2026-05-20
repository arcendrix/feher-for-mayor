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

  volunteerForm.querySelectorAll('input[name^="_"], input[name="_honey"]').forEach((field) => field.remove());

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

    if (formNote) formNote.textContent = 'Sending your message to the campaign team...';

    try {
      await fetch(volunteerEndpoint, { method: 'POST', mode: 'no-cors', body: formData });
      volunteerForm.reset();
      if (formNote) formNote.textContent = 'Thank you. Your message has been sent to the campaign team.';
    } catch (error) {
      if (formNote) formNote.textContent = 'Something went wrong. Please email feherformayor@gmail.com directly.';
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText || 'Send';
      }
    }
  });
}

const volunteerSection = document.querySelector('#volunteer');

if (volunteerSection && !document.querySelector('.faq-section')) {
  const faqStyle = document.createElement('style');
  faqStyle.textContent = `
    .faq-section {
      padding: 4.8rem 5vw;
      background: #fff;
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    .faq-section .section-heading {
      max-width: 860px;
      margin-bottom: 2rem;
    }
    .faq-section h2 {
      font-family: var(--cond);
      font-size: clamp(2.8rem, 5.5vw, 5.8rem);
      line-height: 0.9;
      text-transform: uppercase;
      letter-spacing: -0.03em;
      color: #0d0d0d;
    }
    .faq-section .intro-copy {
      max-width: 720px;
      margin-top: 0.9rem;
      color: #4e4e4e;
      font-size: 1.05rem;
      line-height: 1.7;
    }
    .faq-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }
    .faq-card {
      padding: 1.25rem;
      border: 1px solid rgba(0,0,0,0.08);
      border-radius: 16px;
      background: #f7f4ee;
      box-shadow: 0 16px 38px rgba(0,0,0,0.06);
    }
    .faq-card h3 {
      margin: 0 0 0.55rem;
      color: #111;
      font-size: 1.08rem;
      line-height: 1.25;
      font-weight: 950;
    }
    .faq-card p {
      margin: 0;
      color: #4e4e4e;
      line-height: 1.65;
      font-size: 0.98rem;
    }
    @media (max-width: 900px) {
      .faq-section { padding: 3.8rem 4vw; }
      .faq-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(faqStyle);

  const faqSection = document.createElement('section');
  faqSection.id = 'faq';
  faqSection.className = 'faq-section';
  faqSection.innerHTML = `
    <div class="section-heading">
      <div class="section-label">FAQ</div>
      <h2>Frequently asked questions.</h2>
      <p class="intro-copy">Quick answers about John Feher, the campaign, and how Londoners can get involved.</p>
    </div>
    <div class="faq-grid">
      <article class="faq-card"><h3>Who is John Feher?</h3><p>John Feher is a London, Ontario mayoral candidate focused on practical leadership, accountability, stronger neighbourhoods, better infrastructure, public safety, and responsible city spending.</p></article>
      <article class="faq-card"><h3>What are John Feher’s main priorities?</h3><p>The campaign is focused on strong neighbourhoods, better infrastructure, safer communities, economic growth, housing progress, and making City Hall more accountable to residents.</p></article>
      <article class="faq-card"><h3>How can I volunteer?</h3><p>You can use the Get Involved form on this website to volunteer, request a lawn sign, host a neighbourhood conversation, or join campaign updates.</p></article>
      <article class="faq-card"><h3>How can I donate to the campaign?</h3><p>Donations can be sent by e-transfer to feherformayor@gmail.com. Donors should include their full name, address, phone number, and email so the campaign can confirm eligibility and issue the proper receipt.</p></article>
      <article class="faq-card"><h3>Where is the campaign based?</h3><p>The campaign is based in London, Ontario and is focused on the issues Londoners are dealing with every day across the city.</p></article>
      <article class="faq-card"><h3>How can businesses support the campaign?</h3><p>Local businesses can support the campaign by sharing the website, attending events, joining community conversations, and contacting the campaign team through the Get Involved form.</p></article>
    </div>
  `;

  volunteerSection.insertAdjacentElement('beforebegin', faqSection);
}

if (volunteerSection && !document.querySelector('.sponsor-section')) {
  const sponsorStyle = document.createElement('style');
  sponsorStyle.textContent = `
    .sponsor-section { padding: 4.5rem 5vw; background: #f5f0e7; border-bottom: 1px solid rgba(0,0,0,0.1); }
    .sponsor-section .section-heading { max-width: 820px; margin-bottom: 2rem; }
    .sponsor-section h2 { font-family: var(--cond); font-size: clamp(2.7rem, 5vw, 5.2rem); line-height: 0.9; text-transform: uppercase; letter-spacing: -0.03em; color: #0d0d0d; }
    .sponsor-section p { max-width: 720px; margin-top: 0.85rem; color: #4e4e4e; font-size: 1.05rem; line-height: 1.65; }
    .sponsor-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; }
    .sponsor-logo-card { min-height: 130px; display: flex; align-items: center; justify-content: center; text-align: center; padding: 1.3rem; border: 1px solid rgba(0,0,0,0.09); border-radius: 16px; background: #fff; box-shadow: 0 16px 38px rgba(0,0,0,0.07); overflow: hidden; }
    .sponsor-logo-card img { display: block; width: 100%; max-width: 110%; max-height: 121px; object-fit: contain; }
    @media (max-width: 900px) { .sponsor-section { padding: 3.4rem 4vw; } .sponsor-grid { grid-template-columns: 1fr; gap: 0.8rem; } .sponsor-logo-card { min-height: 150px; padding: 0.65rem; border-radius: 14px; } .sponsor-logo-card img { width: 96%; max-width: 96%; max-height: 132px; } }
    @media (max-width: 520px) { .sponsor-section { padding: 3rem 4vw; } .sponsor-logo-card { min-height: 148px; padding: 0.55rem; } .sponsor-logo-card img { width: 97%; max-width: 97%; max-height: 130px; } }
  `;
  document.head.appendChild(sponsorStyle);

  const sponsorSection = document.createElement('section');
  sponsorSection.id = 'sponsors';
  sponsorSection.className = 'sponsor-section';
  sponsorSection.innerHTML = `
    <div class="section-heading"><div class="section-label">Business supporters</div><h2>Local businesses backing John.</h2><p>Thank you to the businesses and community partners helping support the campaign across London.</p></div>
    <div class="sponsor-grid" aria-label="Business sponsor logos">
      <div class="sponsor-logo-card"><img src="assets/sponsor1.png" alt="Sponsor 1"></div>
      <div class="sponsor-logo-card"><img src="assets/sponsor2.png" alt="Sponsor 2"></div>
      <div class="sponsor-logo-card"><img src="assets/sponsor3.png" alt="Sponsor 3"></div>
      <div class="sponsor-logo-card"></div>
    </div>
  `;
  volunteerSection.insertAdjacentElement('afterend', sponsorSection);
}

const motionTargets = document.querySelectorAll('.hero h1, .mobile-hero h1, .lead, .mobile-hero-copy p, .section h2, .section-label, .updates-grid h3, .plan-grid h3, .sponsor-section h2, .faq-section h2');

motionTargets.forEach((element) => {
  if (element.dataset.motionProcessed) return;
  const text = element.innerHTML;
  const words = text.split(/(\s+)/);
  element.innerHTML = words.map((word, index) => word.trim() === '' ? word : `<span class="motion-word" style="--word-index:${index}">${word}</span>`).join('');
  element.dataset.motionProcessed = 'true';
  element.classList.add('motion-line');
});

const softMotionItems = document.querySelectorAll('.priority-strip article, .plan-grid article, .updates-grid article, .event-row div, .donate-box, .volunteer-form, .sponsor-logo-card, .faq-card');
softMotionItems.forEach((item) => item.classList.add('motion-soft'));

const revealElements = document.querySelectorAll('.motion-line, .motion-soft');

if ('IntersectionObserver' in window) {
  const motionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('motion-ready');
        motionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  revealElements.forEach((item) => motionObserver.observe(item));
} else {
  revealElements.forEach((item) => item.classList.add('motion-ready'));
}
