document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navigation Collapse & Hamburger Logic ---
    const navList = document.getElementById('main-nav');
    const navItems = navList.querySelectorAll('li');
    const toggleBtn = document.getElementById('nav-toggle');

    function handleNavCollapse() {
        // If list is more than 4 items AND screen is tablet/mobile size
        if (navItems.length > 4 && window.innerWidth <= 992) {
            toggleBtn.style.display = 'block'; 
            navList.classList.add('collapse-active');
        } else {
            // Desktop view: show normal horizontal list
            toggleBtn.style.display = 'none'; 
            navList.classList.remove('collapse-active');
            navList.classList.remove('show-menu'); 
            toggleBtn.classList.remove('active'); 
        }
    }

    // Handle hamburger click
    toggleBtn.addEventListener('click', () => {
        navList.classList.toggle('show-menu');
        toggleBtn.classList.toggle('active'); 
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navList.classList.contains('show-menu')) {
                navList.classList.remove('show-menu');
                toggleBtn.classList.remove('active');
            }
        });
    });

    // Run on load and resize
    handleNavCollapse();
    window.addEventListener('resize', handleNavCollapse);


    // --- 2. Header Scroll Shadow Effect ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });


    // --- 3. Apple-Signature Scroll Animations ---
    const revealElements = document.querySelectorAll('.apple-reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
    
    // Force reveal elements in view on page load
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);

});