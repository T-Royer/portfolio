document.addEventListener('DOMContentLoaded', () => {
    initializeNavbar();
    initializeAnimations();
    initializeScrollSpy();
    initializeProjectImages();
    initializeHeroAnimations();
    handleNavbarScroll();


    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.querySelector('.theme-toggle').innerHTML = '☀️';
    }
});


function initializeNavbar() {
    const navbar = document.getElementById('navbar-main');
    if (!navbar) {
        console.error('Navbar element not found');
        return;
    }
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load navbar');
            }
            return response.text();
        })
        .then(content => {
            navbar.innerHTML = content;
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            navbar.innerHTML = '<div class="container">Error loading navigation bar</div>';
        });
}
document.addEventListener('DOMContentLoaded', () => {
    // Load the navbar
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        fetch('navbar.html')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load navbar');
                return response.text();
            })
            .then(html => {
                navbarPlaceholder.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading navbar:', error);
            });
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load footer');
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }
});

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .card').forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

function initializeScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initializeProjectImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading animation
        img.classList.add('loading');
        
        // Remove loading animation when image loads
        img.addEventListener('load', () => {
            img.classList.remove('loading');
        });
        
        // Handle image loading errors
        img.addEventListener('error', () => {
            img.classList.remove('loading');
            img.src = 'images/placeholder.png'; // Replace with your placeholder image
            img.alt = 'Image non disponible';
        });
    });
}

function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-danger mt-2';
    errorDiv.textContent = message;
    
    const existing = element.parentElement.querySelector('.error-message');
    if (existing) {
        existing.remove();
    }
    
    element.parentElement.appendChild(errorDiv);
    element.classList.add('is-invalid');
}

// function toggleTheme() {
//     document.body.classList.toggle('dark-theme');
//     localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
// }
//
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}
//
//   const toggle = document.getElementById('themeToggle');
//   const body = document.body;
//
//   toggle.addEventListener('click', () => {
//     body.classList.toggle('light-mode');
//     toggle.textContent = body.classList.contains('light-mode') ? '🌞' : '🌓';
//   });

//   function initializeThemeToggle() {
//     const navbar = document.querySelector('.navbar-nav');
//     const themeToggle = document.createElement('button');
//     themeToggle.className = 'theme-toggle ms-3';
//     themeToggle.innerHTML = document.body.classList.contains('dark') ? '☀️' : '🌙';
//     themeToggle.setAttribute('aria-label', 'Toggle dark mode');
//
//     themeToggle.addEventListener('click', () => {
//         document.body.classList.toggle('dark-theme');
//         themeToggle.innerHTML = document.body.classList.contains('dark') ? '☀️' : '🌙';
//         localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
//
//         document.body.style.display = 'none';
//         document.body.offsetHeight;
//         document.body.style.display = '';
//     });
//
//     navbar.appendChild(themeToggle);
// }

function initializeHeroAnimations() {
    // Typing animation
    const text = "Développeur & Passionné des arts";
    const typingText = document.querySelector('.typing-text');
    let i = 0;
    let j = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 70);
        }
        // if (i >= text.length) {
        //     typingText.innerHTML = text.substring(0, text.length - j);
        //     j++;
        //     setTimeout(typeWriter, 80);
        // }
    }

    typeWriter();
    const circles = document.querySelector('.circles');
    for (let i = 0; i < 5; i++) {
        const circle = document.createElement('div');
        circle.className = 'floating-circle';
        circles.appendChild(circle);
    }
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.custom-navbar');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}