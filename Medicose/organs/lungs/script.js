// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Quiz functionality
const quizData = {
    1: { answer: 'C', explanation: 'Correct! The right lung has 3 lobes: superior, middle, and inferior.' },
    2: { answer: 'B', explanation: 'Correct! Alveoli are tiny air sacs where gas exchange occurs.' },
    3: { answer: 'C', explanation: 'Correct! The diaphragm is the main muscle responsible for breathing.' },
    4: { answer: 'B', explanation: 'Correct! We breathe approximately 22,000 times per day.' },
    5: { answer: 'A', explanation: 'Correct! The left lung is smaller to make space for the heart which sits more on the left side.' }
};

// Handle quiz option clicks
document.querySelectorAll('.quiz-option').forEach(button => {
    button.addEventListener('click', function() {
        const questionNum = this.getAttribute('data-question');
        const correctAnswer = this.getAttribute('data-answer');
        const selectedOption = this.textContent.trim().charAt(0);
        const feedbackDiv = document.getElementById(`feedback-${questionNum}`);
        
        // Remove previous selections and feedback in this question
        const parentOptions = this.parentElement;
        parentOptions.querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.remove('correct', 'incorrect');
            opt.style.pointerEvents = 'none';
        });
        
        // Check if answer is correct
        if (selectedOption === correctAnswer) {
            this.classList.add('correct');
            feedbackDiv.className = 'quiz-feedback correct';
            feedbackDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${quizData[questionNum].explanation}`;
        } else {
            this.classList.add('incorrect');
            feedbackDiv.className = 'quiz-feedback incorrect';
            feedbackDiv.innerHTML = `<i class="fas fa-times-circle"></i> Not quite! The correct answer is option ${correctAnswer}. ${quizData[questionNum].explanation}`;
            
            // Highlight the correct answer
            parentOptions.querySelectorAll('.quiz-option').forEach(opt => {
                if (opt.textContent.trim().charAt(0) === correctAnswer) {
                    opt.classList.add('correct');
                }
            });
        }
        
        feedbackDiv.style.display = 'block';
    });
});

// Show answers button
document.getElementById('show-answers').addEventListener('click', function() {
    const answerKey = document.getElementById('answer-key');
    if (answerKey.style.display === 'none' || answerKey.style.display === '') {
        answerKey.style.display = 'block';
        this.textContent = 'Hide Answers';
    } else {
        answerKey.style.display = 'none';
        this.textContent = 'Show Correct Answers';
    }
});

// Scroll animations - fade in elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to various elements
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animation styles
    const animatedElements = document.querySelectorAll(
        '.structure-card, .function-card, .disease-card, .tip-card, .fact-card, .process-card, .exchange-card, .notes-category'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });
    
    // Animate statistics on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
});

// Animate numbers counting up
function animateNumber(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const steps = 50;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = text;
            clearInterval(timer);
        } else {
            const displayNum = Math.floor(current).toLocaleString();
            element.textContent = hasPlus ? displayNum + '+' : displayNum;
        }
    }, duration / steps);
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.opacity = '0.7';
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.style.opacity = '1';
            link.style.fontWeight = '700';
        } else {
            link.style.fontWeight = '500';
        }
    });
});

// Interactive breathing exercise (optional enhancement)
function createBreathingExercise() {
    const breathingIcon = document.querySelector('.breathing-icon');
    if (!breathingIcon) return;
    
    let isInhaling = true;
    
    setInterval(() => {
        if (isInhaling) {
            breathingIcon.style.transform = 'scale(1.15)';
            breathingIcon.style.color = '#4ecdc4';
        } else {
            breathingIcon.style.transform = 'scale(1)';
            breathingIcon.style.color = '#ff6b9d';
        }
        isInhaling = !isInhaling;
    }, 3000);
}

// Initialize breathing exercise
createBreathingExercise();

// Add hover effect to comparison rows
document.querySelectorAll('.comparison-row').forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    row.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Print functionality for exam notes
function addPrintButton() {
    const examNotesSection = document.getElementById('exam-notes');
    if (!examNotesSection) return;
    
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print Exam Notes';
    printBtn.style.cssText = `
        background: linear-gradient(135deg, #4ecdc4, #95e1d3);
        color: white;
        border: none;
        padding: 1rem 2rem;
        font-size: 1rem;
        border-radius: 25px;
        cursor: pointer;
        margin: 2rem auto;
        display: block;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    `;
    
    printBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    });
    
    printBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    const container = examNotesSection.querySelector('.container');
    if (container) {
        container.appendChild(printBtn);
    }
}

// Initialize print button
addPrintButton();

// Add tooltip functionality for medical terms (optional)
function addTooltips() {
    const terms = {
        'alveoli': 'Tiny air sacs in the lungs where gas exchange occurs',
        'diaphragm': 'The main breathing muscle located below the lungs',
        'bronchi': 'The main airways that branch from the trachea',
        'pleura': 'The protective membrane surrounding the lungs',
        'diffusion': 'Movement of molecules from high to low concentration'
    };
    
    // This is a placeholder - you could enhance this with actual tooltip implementation
    console.log('Tooltips available for:', Object.keys(terms));
}

// Lazy loading for better performance
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('.lazy-load');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #ff6b9d, #4ecdc4);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add keyboard navigation for quiz
document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '5') {
        const questionNum = e.key;
        const options = document.querySelectorAll(`[data-question="${questionNum}"]`);
        if (options.length > 0 && !options[0].style.pointerEvents) {
            // Focus on the first option of that question
            options[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Add copy code functionality for exam notes
function addCopyToClipboard() {
    const quickRevisionBox = document.querySelector('.quick-revision-box p');
    if (!quickRevisionBox) return;
    
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Quick Revision';
    copyBtn.style.cssText = `
        background: #f38181;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        border-radius: 15px;
        cursor: pointer;
        margin-top: 1rem;
        display: inline-block;
        transition: all 0.3s ease;
    `;
    
    copyBtn.addEventListener('click', function() {
        const text = quickRevisionBox.textContent;
        navigator.clipboard.writeText(text).then(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-copy"></i> Copy Quick Revision';
            }, 2000);
        });
    });
    
    quickRevisionBox.parentElement.appendChild(copyBtn);
}

// Initialize copy functionality
addCopyToClipboard();

// Console message for students
console.log('%cð« Organs Explorer - Lungs Page', 'color: #ff6b9d; font-size: 20px; font-weight: bold;');
console.log('%cKeep learning and stay curious! ð', 'color: #4ecdc4; font-size: 14px;');
console.log('%cTip: Use Ctrl+P to print exam notes for quick revision!', 'color: #95e1d3; font-size: 12px;');

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#overview';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #ff6b9d;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10001;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add aria-labels to interactive elements
    document.querySelectorAll('.quiz-option').forEach((option, index) => {
        option.setAttribute('aria-label', `Quiz option ${String.fromCharCode(65 + (index % 4))}`);
    });
});

// Easter egg: Konami code for fun fact
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        alert('ð Secret unlocked! Did you know? The left lung has a cardiac notch that\'s shaped like the letter "C" to hug the heart! ð');
        konamiCode = [];
    }
});

console.log('ð¡ Try the Konami code: â â â â â â â â B A for a surprise!');