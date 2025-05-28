    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.innerHTML =
            type === 'password'
                ? '<i class="fa-solid fa-eye"></i>'
                : '<i class="fa-solid fa-eye-slash"></i>';
    });

// Function to handle scroll animations
function handleScrollAnimations() {
    // Elements to animate
    const elements = {
        // Left fade-in elements
        leftFade: [
            ...document.querySelectorAll('.benefit-card:nth-child(odd)'),
            ...document.querySelectorAll('.coursescard:nth-child(odd)'),
            ...document.querySelectorAll('.testimonialcard:nth-child(odd)'),
            document.querySelector('.free-plan')
        ],
        // Right fade-in elements
        rightFade: [
            ...document.querySelectorAll('.benefit-card:nth-child(even)'),
            ...document.querySelectorAll('.coursescard:nth-child(even)'),
            ...document.querySelectorAll('.testimonialcard:nth-child(even)'),
            document.querySelector('.pro-plan')
        ]
    };

    // Add initial classes
    elements.leftFade.forEach(el => {
        if (el) {
            el.classList.add('fade-in-left');
            el.style.opacity = '0';
            el.style.transform = 'translateX(-50px)';
        }
    });

    elements.rightFade.forEach(el => {
        if (el) {
            el.classList.add('fade-in-right');
            el.style.opacity = '0';
            el.style.transform = 'translateX(50px)';
        }
    });

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements
    [...elements.leftFade, ...elements.rightFade].forEach(el => {
        if (el) observer.observe(el);
    });
}

// Add styles dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-left, .fade-in-right {
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .benefit-card, .coursescard, .testimonialcard, .free-plan, .pro-plan {
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addAnimationStyles();
    handleScrollAnimations();
});
