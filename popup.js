(function () {
 
  // ── CUSTOMISE HERE ──────────────────────────────────────
  const CONFIG = {
    // Image shown in the popup.
    // Use your own school photo URL or a relative path e.g. "images/school.jpg"
    imageSrc: "pix/Popups/001.jpeg",
 
    imageAlt: "Kings & Queenies Schools — students in class",
 
    // Small label above the heading
    badge: "🇳🇬 Happy Democracy Day!",

    heading: "Kings & Queenies Zenith Schools Celebrates With You!",
 
    // Body message — edit freely
    message: "June 12th, 2026 — This day is not merely an annual celebration; it is a               powerful reminder of the importance and essence of democracy in our society. " +
         "It is a day to remind every Nigerian of the strength we the citizens hold in a democratic government, and the responsibility to exercise that power judiciously and effectively. " +
         "As we celebrate today, don't forget — your vote is your voice. Exercise this power wisely in the upcoming elections. " +
         "Get your PVC now. Your vote counts! 🗳️ " +
         "God bless Nigeria. 🇳🇬",
 
    // CTA button text + link
    ctaText: "Visit Our Website",
    ctaLink: "https://www.kingsandqueeniesschools.com",
 
    // How many seconds after page load before the popup appears
    delaySeconds: 1.5,
 
    // If true, popup won't show again for 24 hours once dismissed
    rememberDismiss: false,
    rememberHours: 24,
  };
  // ────────────────────────────────────────────────────────
 
 
  // Don't show again if user dismissed recently
  if (CONFIG.rememberDismiss) {
    const lastDismissed = localStorage.getItem('kq_popup_dismissed');
    if (lastDismissed) {
      const hoursAgo = (Date.now() - parseInt(lastDismissed)) / 3600000;
      if (hoursAgo < CONFIG.rememberHours) return;
    }
  }
 
  // Build popup HTML
  const overlay = document.createElement('div');
  overlay.className = 'kq-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'School announcement');
 
  overlay.innerHTML = `
    <div class="kq-popup">
      <button class="kq-close" aria-label="Close announcement">&times;</button>
 
      <div class="kq-image-wrap">
        <img src="${CONFIG.imageSrc}" alt="${CONFIG.imageAlt}" />
      </div>
 
      <div class="kq-strip"></div>
 
      <div class="kq-body">
        <span class="kq-badge">${CONFIG.badge}</span>
        <h2>${CONFIG.heading}</h2>
        <p>${CONFIG.message}</p>
        <a class="kq-cta" href="${CONFIG.ctaLink}" target="_blank" rel="noopener">
          ${CONFIG.ctaText}
        </a>
        <button class="kq-dismiss">Dismiss</button>
      </div>
    </div>
  `;
 
  document.body.appendChild(overlay);
 
  // ── Open / Close helpers ─────────────────────────────────
 
  function openPopup() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
 
  function closePopup() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (CONFIG.rememberDismiss) {
      localStorage.setItem('kq_popup_dismissed', Date.now().toString());
    }
  }
 
  // Close on × button
  overlay.querySelector('.kq-close').addEventListener('click', closePopup);
 
  // Close on "Dismiss" text link
  overlay.querySelector('.kq-dismiss').addEventListener('click', closePopup);
 
  // Close when clicking the dark background
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePopup();
  });
 
  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopup();
  });
 
  // Auto-open after delay
  setTimeout(openPopup, CONFIG.delaySeconds * 1000);
 
})();