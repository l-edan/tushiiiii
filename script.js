/* ==========================================================================
   YOUR SAVIOR TUSHI IS HERE - SCRIPT
   Interactive Features, Real-Time Telemetry & Lightbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. REAL-TIME AGE & BIRTHDAY TELEMETRY
  // ==========================================
  const birthDate = new Date('2008-03-11T00:00:00');

  const ageYearsElem = document.getElementById('ageYears');
  const ageMonthsElem = document.getElementById('ageMonths');
  const ageDaysElem = document.getElementById('ageDays');
  const ageHoursElem = document.getElementById('ageHours');
  const ageSecondsElem = document.getElementById('ageSeconds');

  const bdayDaysElem = document.getElementById('bdayDays');
  const bdayHoursElem = document.getElementById('bdayHours');
  const bdayMinutesElem = document.getElementById('bdayMinutes');
  const bdaySecondsElem = document.getElementById('bdaySeconds');
  const currentYearElem = document.getElementById('currentYear');

  if (currentYearElem) {
    currentYearElem.textContent = new Date().getFullYear();
  }

  function updateAge() {
    const now = new Date();

    // Calculate years, months, days accurately
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      // Days in previous month
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    if (ageYearsElem) ageYearsElem.textContent = String(years).padStart(2, '0');
    if (ageMonthsElem) ageMonthsElem.textContent = String(months).padStart(2, '0');
    if (ageDaysElem) ageDaysElem.textContent = String(days).padStart(2, '0');
    if (ageHoursElem) ageHoursElem.textContent = String(hours).padStart(2, '0');
    if (ageSecondsElem) ageSecondsElem.textContent = String(seconds).padStart(2, '0');

    // Birthday Countdown
    let nextBday = new Date(now.getFullYear(), 2, 11); // March is index 2
    if (now > nextBday) {
      nextBday = new Date(now.getFullYear() + 1, 2, 11);
    }
    const diffMs = nextBday - now;

    if (diffMs > 0) {
      const cdDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const cdHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const cdMins = Math.floor((diffMs / (1000 * 60)) % 60);
      const cdSecs = Math.floor((diffMs / 1000) % 60);

      if (bdayDaysElem) bdayDaysElem.textContent = String(cdDays).padStart(2, '0');
      if (bdayHoursElem) bdayHoursElem.textContent = String(cdHours).padStart(2, '0');
      if (bdayMinutesElem) bdayMinutesElem.textContent = String(cdMins).padStart(2, '0');
      if (bdaySecondsElem) bdaySecondsElem.textContent = String(cdSecs).padStart(2, '0');
    } else {
      // It's her birthday today!
      if (bdayDaysElem) bdayDaysElem.textContent = "🎉";
      if (bdayHoursElem) bdayHoursElem.textContent = "HAPPY";
      if (bdayMinutesElem) bdayMinutesElem.textContent = "BIRTH";
      if (bdaySecondsElem) bdaySecondsElem.textContent = "DAY!";
    }
  }

  updateAge();
  setInterval(updateAge, 1000);


  // ==========================================
  // 2. DAILY Rx PRESCRIPTION DISPENSER
  // ==========================================
  const prescriptions = [
    {
      number: "#001: Pure Ambition",
      body: "Study hard, stay kind, and remember: every great dream begins with one determined step. You've got this!",
      sign: "Dr. Kashfi Haider Tushi, Future Pharmacist 🩺"
    },
    {
      number: "#002: Molecular Radiance",
      body: "Chemically speaking, happiness is a mix of serotonin and determination. Keep glowing and conquering your goals!",
      sign: "Savior Tushi, Healthcare Specialist 💊"
    },
    {
      number: "#003: Rx Healing Smile",
      body: "100mg of genuine laughter, taken whenever stress appears. Clinical trials confirm 100% cure rate!",
      sign: "Dr. Kashfi Haider Tushi, Master of Cures ✨"
    },
    {
      number: "#004: The Pharmacist's Edge",
      body: "Doctors may diagnose, but pharmacists unlock the chemistry of healing. Your future patients will be in blessed hands!",
      sign: "Savior Tushi, Medicine Guardian 🛡️"
    },
    {
      number: "#005: Unstoppable Focus",
      body: "Admission exams are just stepping stones to your white coat and pharmacy laboratory triumph. Keep charging forward!",
      sign: "Kashfi Haider Tushi, Top Candidate 🎯"
    },
    {
      number: "#006: Chittagong Pride",
      body: "From Garib-E-Newaz High School and Mohsin College to future pharmaceutical royalty. The whole city is rooting for you!",
      sign: "Your Savior Tushi, Chittagong Legend 🇧🇩"
    },
    {
      number: "#007: Infinite Compassion",
      body: "The world becomes brighter when passionate people dedicate their lives to healing others. Never forget how special you are!",
      sign: "Dr. Kashfi Haider Tushi, Life Savior 💖"
    }
  ];

  let currentRxIdx = 0;
  const dispenseBtn = document.getElementById('dispenseBtn');
  const capsuleGraphic = document.getElementById('capsuleGraphic');
  const rxTicket = document.getElementById('rxTicket');
  const rxTitle = document.getElementById('rxTitle');
  const rxBody = document.getElementById('rxBody');

  if (dispenseBtn && capsuleGraphic && rxTicket) {
    dispenseBtn.addEventListener('click', () => {
      // Trigger animation
      capsuleGraphic.classList.remove('animating');
      void capsuleGraphic.offsetWidth; // force reflow
      capsuleGraphic.classList.add('animating');

      rxTicket.style.opacity = '0.3';
      rxTicket.style.transform = 'scale(0.96)';

      setTimeout(() => {
        let newIdx;
        do {
          newIdx = Math.floor(Math.random() * prescriptions.length);
        } while (newIdx === currentRxIdx && prescriptions.length > 1);
        currentRxIdx = newIdx;

        const rx = prescriptions[currentRxIdx];
        rxTitle.textContent = `Prescription ${rx.number}`;
        rxBody.textContent = `"${rx.body}"`;

        rxTicket.style.opacity = '1';
        rxTicket.style.transform = 'scale(1)';
      }, 300);
    });
  }


  // ==========================================
  // 3. PHOTO GALLERY & LIGHTBOX MODAL
  // ==========================================
  const galleryData = [
    {
      src: "assets/images/tushi_photo_1.jpg",
      title: "Crimson Elegance",
      desc: "Gentle gaze, stylish round glasses, and pink hairclip in maroon attire.",
      badge: "Portrait 01"
    },
    {
      src: "assets/images/tushi_photo_2.jpg",
      title: "Kuromi Heart Chain",
      desc: "Iconic heart frame wrapped in silver chains with playful Kuromi characters.",
      badge: "Portrait 02 • Kuromi Style"
    },
    {
      src: "assets/images/tushi_photo_3.jpg",
      title: "Black Butterfly Mask",
      desc: "Aesthetic chic look with dramatic black butterfly eye filter.",
      badge: "Portrait 03 • Butterfly Filter"
    },
    {
      src: "assets/images/tushi_photo_4.jpg",
      title: "Round Frame Chic",
      desc: "Subtle head tilt with thin wire glasses, highlighting natural grace.",
      badge: "Portrait 04 • Modern Chic"
    },
    {
      src: "assets/images/tushi_photo_5.jpg",
      title: "Retro Scanline & Kaomoji",
      desc: "Vintage VHS scanline effect with Japanese kaomoji overlay ( ´ ▽ ` ).",
      badge: "Portrait 05 • Retro Kaomoji"
    },
    {
      src: "assets/images/tushi_photo_6.jpg",
      title: "Floating Heart Wall",
      desc: "Soft upward gaze captured against a background of miniature wall hearts.",
      badge: "Portrait 06 • Aesthetic Room"
    },
    {
      src: "assets/images/tushi_photo_7.jpg",
      title: "Pearl Beaded Heart",
      desc: "Sweet expression surrounded by an iridescent lavender pearl heart balloon.",
      badge: "Portrait 07 • Pearl Heart"
    }
  ];

  let currentGalleryIdx = 0;
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxBadge = document.getElementById('lightboxBadge');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  function openLightbox(index) {
    currentGalleryIdx = index;
    const item = galleryData[currentGalleryIdx];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;
    lightboxBadge.textContent = item.badge;
    lightboxCounter.textContent = `${currentGalleryIdx + 1} / ${galleryData.length}`;

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextPhoto() {
    currentGalleryIdx = (currentGalleryIdx + 1) % galleryData.length;
    openLightbox(currentGalleryIdx);
  }

  function prevPhoto() {
    currentGalleryIdx = (currentGalleryIdx - 1 + galleryData.length) % galleryData.length;
    openLightbox(currentGalleryIdx);
  }

  document.querySelectorAll('.gallery-item').forEach((elem) => {
    elem.addEventListener('click', () => {
      const idx = parseInt(elem.getAttribute('data-index'), 10);
      if (!isNaN(idx)) openLightbox(idx);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextPhoto);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevPhoto);

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  });

  // Touch Swipe Support for Lightbox
  let touchStartX = 0;
  let touchEndX = 0;
  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance < 0) {
        nextPhoto(); // Swipe left -> Next
      } else {
        prevPhoto(); // Swipe right -> Prev
      }
    }
  }


  // ==========================================
  // 4. MOBILE NAVIGATION DRAWER
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawer = document.getElementById('closeDrawer');

  function toggleMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.toggle('active');
      document.body.style.overflow = mobileDrawer.classList.contains('active') ? 'hidden' : '';
    }
  }

  if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
  if (closeDrawer) closeDrawer.addEventListener('click', toggleMenu);

  document.querySelectorAll('.drawer-item').forEach(item => {
    item.addEventListener('click', () => {
      if (mobileDrawer) {
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });


  // ==========================================
  // 5. TOAST NOTIFICATION & COPY BUTTONS
  // ==========================================
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimeout;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast("Copied to clipboard!");
        });
      }
    });
  });

  const shareSiteBtn = document.getElementById('shareSiteBtn');
  if (shareSiteBtn) {
    shareSiteBtn.addEventListener('click', () => {
      const shareData = {
        title: 'YOUR SAVIOR TUSHI IS HERE',
        text: 'Check out the official tribute & portfolio website for Kashfi Haider Tushi — Future Pharmacist from Chittagong, Bangladesh!',
        url: window.location.href
      };
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast("Website link copied to clipboard!");
        });
      }
    });
  }


  // ==========================================
  // 6. FLOATING SPARKLE & HEARTS CANVAS
  // ==========================================
  const canvas = document.getElementById('sparkleCanvas');
  const sparkleToggle = document.getElementById('sparkleToggle');
  let sparklesEnabled = true;

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(width < 768 ? 20 : 38, 45);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 3 + 1.5;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.type = Math.random() > 0.4 ? 'sparkle' : 'heart';
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.color = Math.random() > 0.5 ? '#ec4899' : '#06b6d4';
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y < -30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        if (this.type === 'sparkle') {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          // Draw 4-point star sparkle
          for (let i = 0; i < 4; i++) {
            ctx.lineTo(Math.cos((i * Math.PI) / 2) * this.size * 2, Math.sin((i * Math.PI) / 2) * this.size * 2);
            ctx.lineTo(Math.cos((i * Math.PI) / 2 + Math.PI / 4) * this.size * 0.6, Math.sin((i * Math.PI) / 2 + Math.PI / 4) * this.size * 0.6);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          // Draw cute mini heart
          ctx.fillStyle = '#f472b6';
          const s = this.size * 1.2;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-s, -s, -s * 1.6, s * 0.4, 0, s * 1.5);
          ctx.bezierCurveTo(s * 1.6, s * 0.4, s, -s, 0, 0);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      const p = new Particle();
      p.y = Math.random() * height; // initial distribution
      particles.push(p);
    }

    function animateParticles() {
      if (!sparklesEnabled) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animateParticles);
    }

    animateParticles();

    if (sparkleToggle) {
      sparkleToggle.addEventListener('click', () => {
        sparklesEnabled = !sparklesEnabled;
        sparkleToggle.classList.toggle('active', sparklesEnabled);
        if (sparklesEnabled) {
          animateParticles();
          showToast("Sparkles activated ✨");
        } else {
          ctx.clearRect(0, 0, width, height);
          showToast("Sparkles paused 💤");
        }
      });
    }
  }

});
