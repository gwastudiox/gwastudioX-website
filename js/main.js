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
    revealPortfolio();
});

// Photography Section Logic
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const reelsContainer = document.getElementById('reels-container');
    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Handle Reels Visibility
            if (filterValue === 'reels') {
                galleryGrid.style.display = 'none';
                reelsContainer.style.display = 'grid';
            } else {
                galleryGrid.style.display = 'block';
                reelsContainer.style.display = 'none';

                // Filter Gallery Items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // Add animation class if needed
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });

    // Lightbox
    const openLightbox = (src, type = 'image') => {
        if (type === 'video') {
            lightboxImg.style.display = 'none';
            lightboxVideo.style.display = 'block';
            lightboxVideo.src = src;
            lightboxVideo.play();
        } else {
            lightboxVideo.style.display = 'none';
            lightboxVideo.pause();
            lightboxVideo.src = ''; // Clear source
            lightboxImg.style.display = 'block';
            lightboxImg.src = src;
        }
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable scroll
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable scroll
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxVideo.pause();
            lightboxVideo.src = '';
        }, 300);
    };

    // Add click event to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                openLightbox(img.src, 'image');
            }
        });
    });

    // Add click event to reel items
    const reelItems = document.querySelectorAll('.reel-item');
    reelItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.getAttribute('data-video-src');
            if (videoSrc) {
                openLightbox(videoSrc, 'video');
            }
        });
    });

    // Close lightbox events
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
