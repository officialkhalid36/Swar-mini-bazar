/* ===========================
   ANIMATION UTILITIES
   =========================== */

const AnimationUtils = {
  // Add animation class
  addAnimation(element, animationName, duration = 300) {
    element.classList.add(`animate-${animationName}`);
    element.style.animationDuration = `${duration}ms`;
    
    return new Promise(resolve => {
      element.addEventListener('animationend', () => {
        element.classList.remove(`animate-${animationName}`);
        resolve();
      }, { once: true });
    });
  },

  // Fade in
  fadeIn(element, duration = 300) {
    return this.addAnimation(element, 'fade-in', duration);
  },

  // Fade out
  fadeOut(element, duration = 300) {
    return this.addAnimation(element, 'fade-out', duration);
  },

  // Slide in from left
  slideInLeft(element, duration = 300) {
    return this.addAnimation(element, 'slide-in-left', duration);
  },

  // Slide in from right
  slideInRight(element, duration = 300) {
    return this.addAnimation(element, 'slide-in-right', duration);
  },

  // Slide in from top
  slideInUp(element, duration = 300) {
    return this.addAnimation(element, 'slide-in-up', duration);
  },

  // Slide in from bottom
  slideInDown(element, duration = 300) {
    return this.addAnimation(element, 'slide-in-down', duration);
  },

  // Scale in
  scaleIn(element, duration = 300) {
    return this.addAnimation(element, 'scale-in', duration);
  },

  // Scale out
  scaleOut(element, duration = 300) {
    return this.addAnimation(element, 'scale-out', duration);
  },

  // Bounce
  bounce(element, duration = 1000) {
    return this.addAnimation(element, 'bounce', duration);
  },

  // Pulse
  pulse(element, duration = 2000) {
    return this.addAnimation(element, 'pulse', duration);
  },

  // Smooth scroll
  smoothScroll(target, duration = 1000) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    
    const start = window.scrollY;
    const end = element.getBoundingClientRect().top + window.scrollY;
    const distance = end - start;
    let startTime = null;
    
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, start, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    
    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };
    
    requestAnimationFrame(animation);
  },

  // Parallax effect
  parallax(element, speed = 0.5) {
    window.addEventListener('scroll', () => {
      const yPos = window.scrollY * speed;
      element.style.transform = `translateY(${yPos}px)`;
    });
  },

  // Typewriter effect
  typewriter(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    };
    
    type();
  },

  // Count up animation
  countUp(element, target, duration = 1000) {
    let start = 0;
    const startTime = Date.now();
    
    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (target - start) * progress);
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    };
    
    requestAnimationFrame(update);
  },

  // Progress bar animation
  animateProgress(element, targetPercent, duration = 1000) {
    const startPercent = parseInt(element.style.width) || 0;
    const startTime = Date.now();
    
    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(startPercent + (targetPercent - startPercent) * progress);
      element.style.width = `${current}%`;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.style.width = `${targetPercent}%`;
      }
    };
    
    requestAnimationFrame(update);
  }
};
