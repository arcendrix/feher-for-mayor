const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const campaignEndpoint = 'https://script.google.com/macros/s/AKfycbwPadHpWHvkjTKsXihp4gpeBoK2Ltncp8nmNVtRfUd6e7gv8DZmSYQpyVny1vKVJejkuw/exec';

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

if (nav && !nav.querySelector('a[href="#have-your-say"]')) {
  const donateLink = nav.querySelector('.donate-link');
  const haveSayNavLink = document.createElement('a');
  haveSayNavLink.href = '#have-your-say';
  haveSayNavLink.textContent = 'Have Your Say';

  if (donateLink) {
    nav.insertBefore(haveSayNavLink, donateLink);
  } else {
    nav.appendChild(haveSayNavLink);
  }

  haveSayNavLink.addEventListener('click', () => {
    nav.classList.remove('is-open');
    if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
  });
}

const heroActions = document.querySelector('.hero-actions');
if (heroActions && !heroActions.querySelector('a[href="#have-your-say"]')) {
  const shareIdeaButton = document.createElement('a');
  shareIdeaButton.className = 'button secondary';
  shareIdeaButton.href = '#have-your-say';
  shareIdeaButton.textContent = 'Share an Idea';
  heroActions.insertBefore(shareIdeaButton, heroActions.firstElementChild ? heroActions.firstElementChild.nextSibling : null);

  const commentButton = document.createElement('a');
  commentButton.className = 'button secondary mobile-hide';
  commentButton.href = '#resident-comment';
  commentButton.textContent = 'Leave a Comment';
  heroActions.appendChild(commentButton);
}

const mobileHeroActions = document.querySelector('.mobile-hero-actions');
if (mobileHeroActions && !mobileHeroActions.querySelector('a[href="#have-your-say"]')) {
  const mobileHaveSay = document.createElement('a');
  mobileHaveSay.className = 'button secondary';
  mobileHaveSay.href = '#have-your-say';
  mobileHaveSay.textContent = 'Have Your Say';
  mobileHeroActions.insertBefore(mobileHaveSay, mobileHeroActions.firstElementChild ? mobileHeroActions.firstElementChild.nextSibling : null);
}

const volunteerSection = document.querySelector('#volunteer');

if (volunteerSection && !document.querySelector('#have-your-say')) {
  const haveSayStyle = document.createElement('style');
  haveSayStyle.textContent = `
    .have-say-section {
      padding: 5.2rem 5vw;
      background: #fff;
      border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    .have-say-intro {
      display: grid;
      grid-template-columns: minmax(0, 0.9fr) minmax(320px, 0.7fr);
      gap: 3rem;
      align-items: end;
      margin-bottom: 2rem;
    }
    .have-say-section h2 {
      font-family: var(--cond);
      font-size: clamp(3rem, 5.7vw, 6rem);
      line-height: 0.88;
      text-transform: uppercase;
      letter-spacing: -0.025em;
      color: var(--navy);
    }
    .have-say-section .intro-copy {
      color: #4e5a66;
      font-size: 1.08rem;
      line-height: 1.75;
      margin: 0;
    }
    .have-say-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }
    .have-say-card {
      background: #f7f4ee;
      border: 1px solid var(--darkline);
      border-radius: 18px;
      padding: 1.35rem;
      box-shadow: 0 18px 45px rgba(0,0,0,0.06);
    }
    .have-say-card h3 {
      color: #000;
      font-size: 1.35rem;
      line-height: 1.1;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      font-weight: 950;
      margin-bottom: 0.55rem;
    }
    .have-say-card p {
      color: #4e5a66;
      line-height: 1.65;
      margin-bottom: 1rem;
    }
    .campaign-submit-form {
      display: grid;
      gap: 0.85rem;
      margin-top: 1rem;
    }
    .campaign-submit-form label {
      display: grid;
      gap: 0.35rem;
      font-size: 0.88rem;
      font-weight: 900;
      color: var(--ink);
    }
    .campaign-submit-form input,
    .campaign-submit-form textarea,
    .campaign-submit-form select,
    .volunteer-form textarea {
      width: 100%;
      font: inherit;
      padding: 0.9rem;
      border: 1px solid #cfd6dd;
      border-radius: 4px;
      background: #fff;
      color: var(--ink);
    }
    .campaign-submit-form textarea,
    .volunteer-form textarea {
      min-height: 126px;
      resize: vertical;
    }
    .campaign-submit-form .button {
      width: fit-content;
      cursor: pointer;
    }
    .campaign-submit-form .form-note {
      font-size: 0.85rem !important;
      margin: 0 !important;
      color: #5d6671 !important;
    }
    @media (max-width: 900px) {
      .have-say-section { padding: 4rem 4vw; }
      .have-say-intro, .have-say-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(haveSayStyle);

  const haveSaySection = document.createElement('section');
  haveSaySection.id = 'have-your-say';
  haveSaySection.className = 'have-say-section';
  haveSaySection.innerHTML = `
    <div class="have-say-intro">
      <div>
        <div class="section-label">Have your say</div>
        <h2>Londoners should be heard.</h2>
      </div>
      <p class="intro-copy">Share an idea, raise a concern, or leave a comment for John and the campaign team. The best campaign input comes from people living with London’s problems every day.</p>
    </div>
    <div class="have-say-grid">
      <article class="have-say-card" id="share-an-idea">
        <h3>Share an idea</h3>
        <p>Have an idea to improve London, your neighbourhood, city services, infrastructure, safety, housing, or local business? Send it directly to the campaign team.</p>
        <form class="campaign-submit-form" action="${campaignEndpoint}" method="POST">
          <input type="hidden" name="submissionType" value="Idea">
          <label><span>Name</span><input type="text" name="name" placeholder="Your name" required></label>
          <label><span>Email</span><input type="email" name="email" placeholder="you@example.com" required></label>
          <label><span>Neighbourhood / Area</span><input type="text" name="area" placeholder="Old South, Byron, Argyle, downtown..."></label>
          <label><span>Your idea</span><textarea name="message" placeholder="Tell John your idea for London" required></textarea></label>
          <button class="button primary" type="submit">Submit Idea</button>
          <p class="form-note">Your idea will be sent to the campaign team.</p>
        </form>
      </article>
      <article class="have-say-card" id="resident-comment">
        <h3>Leave a comment</h3>
        <p>Want to share a concern, story, or message about what you are seeing in London? Leave a comment so your voice is part of the conversation.</p>
        <form class="campaign-submit-form" action="${campaignEndpoint}" method="POST">
          <input type="hidden" name="submissionType" value="Comment">
          <label><span>Name</span><input type="text" name="name" placeholder="Your name" required></label>
          <label><span>Email</span><input type="email" name="email" placeholder="you@example.com" required></label>
          <label><span>Neighbourhood / Area</span><input type="text" name="area" placeholder="Where in London are you from?"></label>
          <label><span>Your comment</span><textarea name="message" placeholder="Tell John what you want him to hear" required></textarea></label>
          <button class="button primary" type="submit">Send Comment</button>
          <p class="form-note">Your comment will be sent to the campaign team.</p>
        </form>
      </article>
    </div>
  `;

  volunteerSection.insertAdjacentElement('beforebegin', haveSaySection);
}

function wireCampaignForm(form) {
  form.setAttribute('action', campaignEndpoint);
  form.setAttribute('method', 'POST');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const formNote = form.querySelector('.form-note');
    const originalButtonText = submitButton ? submitButton.textContent : '';
    const formData = new FormData(form);

    if (!formData.get('submittedAt')) {
      formData.append('submittedAt', new Date().toISOString());
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    if (formNote) formNote.textContent = 'Sending your message to the campaign team...';

    try {
      await fetch(campaignEndpoint, { method: 'POST', mode: 'no-cors', body: formData });
      form.reset();
      const type = formData.get('submissionType');
      if (formNote) formNote.textContent = type === 'Idea'
        ? 'Thank you. Your idea has been sent to the campaign team.'
        : type === 'Comment'
          ? 'Thank you. Your comment has been sent to the campaign team.'
          : 'Thank you. Your message has been sent to the campaign team.';
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

const volunteerForm = document.querySelector('.volunteer-form');
if (volunteerForm) {
  volunteerForm.querySelectorAll('input[name^="_"], input[name="_honey"]').forEach((field) => field.remove());
  if (!volunteerForm.querySelector('input[name="submissionType"]')) {
    const hiddenType = document.createElement('input');
    hiddenType.type = 'hidden';
    hiddenType.name = 'submissionType';
    hiddenType.value = 'Get Involved';
    volunteerForm.prepend(hiddenType);
  }
  wireCampaignForm(volunteerForm);
}

document.querySelectorAll('.campaign-submit-form').forEach(wireCampaignForm);

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

const motionTargets = document.querySelectorAll('.hero h1, .mobile-hero h1, .lead, .mobile-hero-copy p, .section h2, .section-label, .updates-grid h3, .plan-grid h3, .sponsor-section h2, .faq-section h2, .have-say-section h2, .have-say-card h3');

motionTargets.forEach((element) => {
  if (element.dataset.motionProcessed) return;
  const text = element.innerHTML;
  const words = text.split(/(\s+)/);
  element.innerHTML = words.map((word, index) => word.trim() === '' ? word : `<span class="motion-word" style="--word-index:${index}">${word}</span>`).join('');
  element.dataset.motionProcessed = 'true';
  element.classList.add('motion-line');
});

const softMotionItems = document.querySelectorAll('.priority-strip article, .plan-grid article, .updates-grid article, .event-row div, .donate-box, .volunteer-form, .sponsor-logo-card, .faq-card, .have-say-card');
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
