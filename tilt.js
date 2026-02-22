// small, dependency-free tilt effect for .about-img
(function () {
  const elems = document.querySelectorAll('.about-img');
  const maxTilt = 8; // degrees
  const scale = 1.03;

  elems.forEach((el) => {
    let rect = null;
    let rafId = null;
    let mouseX = 0, mouseY = 0;

    function updateRect() { rect = el.getBoundingClientRect(); }

    function handleEnter() {
      el.classList.add('about-img--tilt-active');
      updateRect();
    }
    function handleMove(e) {
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);
      if (clientX == null || clientY == null) return;
      mouseX = (clientX - rect.left) / rect.width;   // 0..1
      mouseY = (clientY - rect.top) / rect.height;   // 0..1
      if (!rafId) rafId = requestAnimationFrame(render);
    }
    function render() {
      rafId = null;
      const x = (mouseX - 0.5) * 2; // -1..1
      const y = (mouseY - 0.5) * 2; // -1..1
      const ry = -x * maxTilt;
      const rx = y * maxTilt;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
    }
    function handleLeave() {
      el.classList.remove('about-img--tilt-active');
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      el.style.transform = ''; // fall back to CSS transform (rotate(-2deg))
    }

    el.addEventListener('mouseenter', handleEnter);
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    el.addEventListener('touchstart', handleEnter, { passive: true });
    el.addEventListener('touchmove', handleMove, { passive: true });
    el.addEventListener('touchend', handleLeave);
    window.addEventListener('resize', updateRect);
  });
})();


  document.querySelectorAll('.focus-block').forEach(block => {
    block.addEventListener('click', function() {
      document.querySelectorAll('.focus-block').forEach(b => {
        if (b !== block) b.classList.remove('expanded');
      });
      block.classList.toggle('expanded');
    });
  });

  const track = document.querySelector('.testimonial-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let currentIndex = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  });

  
  setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  }, 6000);


// Lightbox functionality for gallery images
  const images = document.querySelectorAll(".gallery-grid img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");

  images.forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.style.display = "none";
    }
  });
