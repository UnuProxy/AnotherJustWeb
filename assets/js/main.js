document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('.main-header');
    const topBarHeight = document.querySelector('.top-bar').offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > topBarHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Add sticky header styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .main-header.sticky {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            animation: slideDown 0.3s;
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(-100%);
            }
            to {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Language selector
    const languageLinks = document.querySelectorAll('.language-selector a');
    
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            languageLinks.forEach(el => el.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Here you would typically handle language change
            // This is just a placeholder
            console.log('Language changed to:', this.querySelector('img').alt);
        });
    });
});