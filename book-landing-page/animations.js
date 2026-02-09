/**
 * Als iemand dit bouwt, gaat iedereen dood - Landing Page Animations
 * Scroll-based animations, parallax effects, and interactive elements
 */

(function() {
    'use strict';

    // ==========================================================================
    // Intersection Observer for scroll animations
    // ==========================================================================

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
    });

    // ==========================================================================
    // Number counter animation
    // ==========================================================================

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.dataset.count);

                if (countTo && !target.classList.contains('counted')) {
                    target.classList.add('counted');
                    animateCounter(target, countTo);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => {
        counterObserver.observe(el);
    });

    function animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            element.textContent = current + '+';

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // ==========================================================================
    // Parallax effect for background glow
    // ==========================================================================

    const bgGlow = document.querySelector('.bg-glow');

    if (bgGlow) {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * 0.3;
                    bgGlow.style.transform = `translate(-50%, calc(-50% + ${rate}px))`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ==========================================================================
    // Book parallax on scroll
    // ==========================================================================

    const heroBook = document.querySelector('.hero-book');
    const bookImage = document.querySelector('.book-image');

    if (heroBook && bookImage) {
        let bookTicking = false;

        window.addEventListener('scroll', () => {
            if (!bookTicking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const heroHeight = document.querySelector('.hero').offsetHeight;

                    if (scrolled < heroHeight) {
                        const rate = scrolled * 0.15;
                        const rotation = scrolled * 0.02;
                        bookImage.style.transform = `translateY(${rate}px) rotateY(${-5 + rotation}deg)`;
                    }
                    bookTicking = false;
                });
                bookTicking = true;
            }
        });
    }

    // ==========================================================================
    // Navbar background on scroll
    // ==========================================================================

    const navbar = document.querySelector('.navbar');

    if (navbar) {
        let navTicking = false;

        window.addEventListener('scroll', () => {
            if (!navTicking) {
                requestAnimationFrame(() => {
                    if (window.pageYOffset > 100) {
                        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                        navbar.style.borderBottomColor = 'rgba(220, 38, 38, 0.3)';
                    } else {
                        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
                        navbar.style.borderBottomColor = '#222222';
                    }
                    navTicking = false;
                });
                navTicking = true;
            }
        });
    }

    // ==========================================================================
    // Floating particles in hero section
    // ==========================================================================

    const particlesContainer = document.getElementById('particles');

    if (particlesContainer) {
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(220, 38, 38, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * -20}s;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add float keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ==========================================================================
    // Mouse move parallax for hero section
    // ==========================================================================

    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent && window.innerWidth > 1024) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            if (bookImage) {
                bookImage.style.transform = `
                    translateY(0)
                    rotateY(${-5 + x * 10}deg)
                    rotateX(${y * -5}deg)
                `;
            }
        });

        hero.addEventListener('mouseleave', () => {
            if (bookImage) {
                bookImage.style.transform = 'translateY(0) rotateY(-5deg) rotateX(0deg)';
            }
        });
    }

    // ==========================================================================
    // Smooth scroll for anchor links
    // ==========================================================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================================================
    // Timeline animation on scroll
    // ==========================================================================

    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `all 0.6s ease ${index * 0.15}s`;
        timelineObserver.observe(item);
    });

    // ==========================================================================
    // Warning banner pause on hover
    // ==========================================================================

    const warningScroll = document.querySelector('.warning-scroll');

    if (warningScroll) {
        warningScroll.addEventListener('mouseenter', () => {
            warningScroll.style.animationPlayState = 'paused';
        });

        warningScroll.addEventListener('mouseleave', () => {
            warningScroll.style.animationPlayState = 'running';
        });
    }

    // ==========================================================================
    // Danger cards stagger animation
    // ==========================================================================

    const dangerCards = document.querySelectorAll('.danger-card');

    const dangerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    dangerCards.forEach(card => {
        dangerObserver.observe(card);
    });

    // ==========================================================================
    // Scroll progress indicator (optional - adds to navbar)
    // ==========================================================================

    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 2px;
            background: linear-gradient(90deg, #dc2626, #ef4444);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    createScrollProgress();

    // ==========================================================================
    // Glitch effect on title (subtle)
    // ==========================================================================

    const highlightLines = document.querySelectorAll('.title-line.highlight');

    highlightLines.forEach(line => {
        // Add occasional glitch effect
        setInterval(() => {
            if (Math.random() > 0.95) {
                line.style.textShadow = `
                    -2px 0 #00ffff,
                    2px 0 #ff00ff,
                    0 0 40px rgba(220, 38, 38, 0.5)
                `;
                setTimeout(() => {
                    line.style.textShadow = '0 0 40px rgba(220, 38, 38, 0.5)';
                }, 100);
            }
        }, 100);
    });

    // ==========================================================================
    // Preloader fade out (if content loads slowly)
    // ==========================================================================

    window.addEventListener('load', () => {
        document.body.classList.add('loaded');

        // Trigger initial animations
        setTimeout(() => {
            document.querySelectorAll('.hero .animate-on-scroll').forEach(el => {
                el.classList.add('visible');
            });
        }, 300);
    });

    // ==========================================================================
    // Intersection observer for stat lines
    // ==========================================================================

    const statCards = document.querySelectorAll('.stat-card');

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => {
        statObserver.observe(card);
    });

    // ==========================================================================
    // Quote section reveal animation
    // ==========================================================================

    const quoteSection = document.querySelector('.quote-section');
    const quoteText = document.querySelector('.quote-text');

    if (quoteSection && quoteText) {
        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    quoteText.style.opacity = '1';
                    quoteText.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });

        quoteText.style.opacity = '0';
        quoteText.style.transform = 'translateY(30px)';
        quoteText.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';

        quoteObserver.observe(quoteSection);
    }

    // ==========================================================================
    // Button ripple effect
    // ==========================================================================

    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 0;
                height: 0;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out forwards;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframes
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

})();
