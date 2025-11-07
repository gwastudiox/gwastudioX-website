document.addEventListener('DOMContentLoaded', () => {
    // --- Animated Counters ---
    const animateCounters = () => {
        const counters = [
            { id: 'clients-count', target: 250, increment: 5, interval: 20 },
            { id: 'projects-count', target: 480, increment: 10, interval: 20 },
            { id: 'team-count', target: 10, increment: 1, interval: 50 },
           
        ];
        counters.forEach(counterInfo => {
            const element = document.getElementById(counterInfo.id);
            if (element && !element.hasAttribute('data-animated')) {
                let current = 0;
                element.setAttribute('data-animated', 'true');
                const interval = setInterval(() => {
                    current += counterInfo.increment;
                    if (current >= counterInfo.target) {
                        element.textContent = counterInfo.target + '+';
                        clearInterval(interval);
                    } else {
                        element.textContent = current;
                    }
                }, counterInfo.interval);
            }
        });
    };

    // Intersection Observer for counter animation
    const statsSection = document.querySelector('.stat-box');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.1 });
        observer.observe(statsSection.closest('section'));
    }

    // --- Active Nav Link on Scroll ---
    // Bootstrap's ScrollSpy is now handling this via data attributes in the <body> tag.
    // The nav-link.active class will be automatically applied.
});

// Video handling for hero section
document.addEventListener('DOMContentLoaded', () => {
  const heroVideo = document.getElementById('heroVideo');
  const heroFallback = document.getElementById('heroFallback');

  if (heroVideo && heroFallback) {
    // Handle video load success
    heroVideo.addEventListener('canplaythrough', () => {
      heroVideo.style.opacity = '1';
      heroFallback.style.opacity = '0';
    });

    // Handle error or timeout
    let videoLoadTimeout = setTimeout(() => {
      console.warn("Video load timeout, showing fallback image.");
      heroFallback.style.opacity = '1';
      heroVideo.style.display = 'none';
    }, 6000); // 6 seconds timeout

    heroVideo.addEventListener('loadeddata', () => clearTimeout(videoLoadTimeout));
    heroVideo.addEventListener('error', () => {
      console.error("Video failed to load, showing fallback.");
      heroFallback.style.opacity = '1';
      heroVideo.style.display = 'none';
    });
  }
});

// Portfolio reveal animation
document.addEventListener('DOMContentLoaded', () => {
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const revealPortfolio = () => {
    portfolioCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.classList.add('reveal');
      }
    });
  };
  window.addEventListener('scroll', revealPortfolio);
  revealPortfolio();
});