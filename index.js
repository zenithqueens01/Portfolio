document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Unilag-Style Mobile Menu Toggle (Hamburger to X)
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        // Toggles the 'active' class which triggers the CSS transforms
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        if(mobileMenuBtn.classList.contains('active')){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 2. Header Scroll Effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '0 0';
            header.style.boxShadow = 'none';
        }
    });

    // 3. Apple-Signature Scroll Reveal Animation
    // Using IntersectionObserver to trigger animations only when elements enter the viewport
    const revealElements = document.querySelectorAll('.apple-reveal');

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Add the visible class to trigger the CSS cubic-bezier transition
                entry.target.classList.add('visible');
                // Stop observing once revealed so it doesn't repeat on every scroll
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
    
    // Force reveal elements that are already in view on page load (like Hero)
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);
});