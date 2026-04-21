/* Shared chrome: nav + footer + book() toast. Called from every page. */
(function () {
  function navHTML(activePage) {
    const links = [
      { id: 'home',   label: 'Home',          href: '/' },
      { id: 'how',    label: 'How it works',  href: '/#how-it-works' },
      { id: 'audit',  label: 'The Audit',     href: '/ops-audit.html' },
      { id: 'about',  label: 'About',         href: '/about.html' },
    ];
    const linkHTML = links.map(l =>
      `<a class="nav__link${l.id === activePage ? ' is-active' : ''}" href="${l.href}">${l.label}</a>`
    ).join('');
    return `
      <nav class="nav">
        <div class="nav__inner">
          <div class="nav__left">
            <a href="/"><img class="nav__logo" src="/assets/logo-icon-gold.svg" alt="ContractorServe"></a>
            <div class="nav__links">${linkHTML}</div>
          </div>
          <button class="btn btn--primary" onclick="book()">Book the Ops Audit</button>
        </div>
      </nav>
    `;
  }

  function footerHTML() {
    return `
      <footer class="footer">
        <div class="footer__grid">
          <div>
            <img class="footer__logo" src="/assets/logo-wordmark-cream.svg" alt="ContractorServe">
            <p class="footer__about">Fractional ops for trades. We find the leak, build the system, and run it every month.</p>
          </div>
          <div>
            <div class="footer__colhead">Offer</div>
            <ul class="footer__list">
              <li><a href="/ops-audit.html">The Ops Audit</a></li>
            </ul>
          </div>
          <div>
            <div class="footer__colhead">Company</div>
            <ul class="footer__list">
              <li><a href="/about.html">About</a></li>
              <li><a href="/case-studies/mid-missouri-plumbing.html">Case studies</a></li>
            </ul>
          </div>
          <div>
            <div class="footer__colhead">Contact</div>
            <ul class="footer__list">
              <li>Columbia, MO</li>
              <li><a href="mailto:hello@contractorserve.com">hello@contractorserve.com</a></li>
              <li><a href="#" data-todo="LinkedIn URL">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© 2026 ContractorServe</span>
          <span>Less Than One Employee. Does More Than Three.</span>
        </div>
      </footer>
    `;
  }

  window.renderChrome = function (activePage) {
    const navSlot = document.getElementById('nav-slot');
    const footSlot = document.getElementById('footer-slot');
    if (navSlot) navSlot.innerHTML = navHTML(activePage);
    if (footSlot) footSlot.innerHTML = footerHTML();
  };

  window.book = function () {
    const existing = document.getElementById('toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.id = 'toast';
    toast.innerHTML = `
      <button class="toast__close" onclick="this.parentElement.remove()">✕</button>
      <div class="toast__lbl">Audit request received</div>
      <div>We'll text you within the hour. No pitch on message 1.</div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => { if (toast.parentElement) toast.remove(); }, 6000);
  };
})();
