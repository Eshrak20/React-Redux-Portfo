// Smooth scroll for nav links
export const smoothScrollTo = (elementId, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

// Toggle body scroll lock
export const toggleBodyScroll = (lock) => {
  if (lock) {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${window.innerWidth - document.body.offsetWidth}px`;
  } else {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
};

// Ripple effect for buttons
export const createRipple = (event) => {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.classList.add("ripple-effect");

  const ripple = button.querySelector(".ripple-effect");
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
};

// Debounce scroll events
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Parallax effect for background
export const createParallax = (element, speed = 0.5) => {
  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  };

  window.addEventListener("scroll", updateParallax);
  return () => window.removeEventListener("scroll", updateParallax);
};

// Typewriter effect for text
export const typeWriter = (element, text, speed = 50) => {
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
};

// Stagger animation for multiple elements
export const staggerAnimation = (elements, animationClass, delay = 100) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add(animationClass);
    }, index * delay);
  });
};

// Mobile detection
export const isMobile = () => {
  return window.innerWidth < 768;
};

// Viewport detection
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Navbar scroll behavior
export const setupNavbarScroll = () => {
  let lastScroll = 0;
  const navbar = document.querySelector("nav");

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 50) {
      navbar.classList.remove("hidden");
      navbar.classList.add("visible");
    } else if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.classList.remove("visible");
      navbar.classList.add("hidden");
    } else {
      navbar.classList.remove("hidden");
      navbar.classList.add("visible");
    }
    
    lastScroll = currentScroll;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
};

// Add ripple effect to all buttons
export const initializeRippleButtons = () => {
  const buttons = document.querySelectorAll(".btn-ripple");
  buttons.forEach(button => {
    button.addEventListener("click", createRipple);
  });
};