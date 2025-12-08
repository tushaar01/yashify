// ========================
// Interactive Brain Diagram
// ========================
const brainParts = {
    'cerebrum-left': {
        title: 'Left Cerebrum',
        description: 'Left hemisphere controls right side of body. Important for logical thinking, analysis, language, mathematics, and sequential processing. Usually dominant in right-handed people.'
    },
    'cerebrum-right': {
        title: 'Right Cerebrum',
        description: 'Right hemisphere controls left side of body. Specializes in creativity, spatial awareness, artistic abilities, music, and holistic thinking. Processes visual and emotional information.'
    },
    'frontal-lobe': {
        title: 'Frontal Lobe',
        description: 'Controls personality, decision-making, planning, problem-solving, emotions, and voluntary movement. Motor cortex is here! This is what makes you "you".'
    },
    'parietal-lobe': {
        title: 'Parietal Lobe',
        description: 'Processes sensory information – touch, pain, temperature, pressure. Also handles spatial awareness and navigation (where you are in space).'
    },
    'temporal-lobe': {
        title: 'Temporal Lobe',
        description: 'Processes sounds and language. Contains hippocampus (memory formation) and is crucial for understanding speech and recognizing faces.'
    },
    'occipital-lobe': {
        title: 'Occipital Lobe',
        description: 'Primary visual cortex is located here. Processes everything you see – colors, shapes, movement, depth perception. Vision ka headquarters!'
    },
    'cerebellum': {
        title: 'Cerebellum',
        description: 'Fine-tunes movement, maintains balance and posture, and coordinates muscle activity. Has more neurons than rest of brain! Essential for smooth, coordinated movements.'
    },
    'brainstem': {
        title: 'Brainstem',
        description: 'Controls all basic survival functions – breathing, heart rate, blood pressure, digestion, swallowing. Connects brain to spinal cord. Without it, life cannot be sustained.'
    }
};

// Add hover and click interactions to brain diagram
document.addEventListener('DOMContentLoaded', function() {
    const brainPartElements = document.querySelectorAll('.brain-part');
    const diagramInfo = document.getElementById('diagram-info');
    
    if (brainPartElements.length && diagramInfo) {
        brainPartElements.forEach(part => {
            // Hover effect
            part.addEventListener('mouseenter', function() {
                const partId = this.id;
                if (brainParts[partId]) {
                    diagramInfo.innerHTML = `
                        <h3>${brainParts[partId].title}</h3>
                        <p>${brainParts[partId].description}</p>
                    `;
                    diagramInfo.style.animation = 'fadeIn 0.5s ease-out';
                }
            });
            
            // Click effect
            part.addEventListener('click', function() {
                // Remove active class from all parts
                brainPartElements.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked part
                this.classList.add('active');
                
                const partId = this.id;
                if (brainParts[partId]) {
                    diagramInfo.innerHTML = `
                        <h3 style="color: #6366f1;">${brainParts[partId].title}</h3>
                        <p style="font-weight: 500;">${brainParts[partId].description}</p>
                        <p style="margin-top: 15px; font-size: 0.9rem; color: #6b7280;"><em>Click other parts to explore more!</em></p>
                    `;
                    diagramInfo.style.animation = 'fadeIn 0.5s ease-out';
                }
            });
        });
        
        // Reset to default on mouse leave diagram
        const brainDiagram = document.querySelector('.brain-diagram');
        if (brainDiagram) {
            brainDiagram.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    if (!document.querySelector('.brain-part.active')) {
                        diagramInfo.innerHTML = `
                            <h3>Hover over different parts to learn more!</h3>
                            <p>Click on any brain region to see detailed information.</p>
                        `;
                    }
                }, 500);
            });
        }
    }
});

// ========================
// Quiz Functionality
// ========================
let score = 0;
let questionsAnswered = 0;
const totalQuestions = 5;

document.addEventListener('DOMContentLoaded', function() {
    const quizQuestions = document.querySelectorAll('.quiz-question');
    
    quizQuestions.forEach(question => {
        const options = question.querySelectorAll('.option');
        const feedback = question.querySelector('.feedback');
        
        options.forEach(option => {
            option.addEventListener('click', function() {
                // Disable all options in this question
                options.forEach(opt => opt.disabled = true);
                
                const isCorrect = this.dataset.answer === 'correct';
                
                if (isCorrect) {
                    this.classList.add('correct');
                    feedback.textContent = '✓ Correct! Great job!';
                    feedback.classList.add('correct', 'show');
                    score++;
                } else {
                    this.classList.add('wrong');
                    // Show the correct answer
                    options.forEach(opt => {
                        if (opt.dataset.answer === 'correct') {
                            opt.classList.add('correct');
                        }
                    });
                    feedback.textContent = '✗ Incorrect. The correct answer is highlighted above.';
                    feedback.classList.add('wrong', 'show');
                }
                
                questionsAnswered++;
                
                // Show results after all questions answered
                if (questionsAnswered === totalQuestions) {
                    setTimeout(showResults, 1000);
                }
            });
        });
    });
});

function showResults() {
    const quizResults = document.querySelector('.quiz-results');
    const scoreElement = document.getElementById('score');
    const messageElement = document.getElementById('result-message');
    
    scoreElement.textContent = score;
    
    let message = '';
    let percentage = (score / totalQuestions) * 100;
    
    if (percentage === 100) {
        message = '🎉 Perfect Score! You\'re a Brain Expert! Excellent work! 🧠';
    } else if (percentage >= 80) {
        message = '🌟 Great Job! You have a strong understanding of the brain! Keep it up!';
    } else if (percentage >= 60) {
        message = '👍 Good Effort! You\'re on the right track. Review the content and try again!';
    } else if (percentage >= 40) {
        message = '📚 Keep Learning! Read through the sections again to improve your score.';
    } else {
        message = '💪 Don\'t Give Up! Go through the content carefully and try again. You can do it!';
    }
    
    messageElement.textContent = message;
    
    // Hide all questions
    document.querySelectorAll('.quiz-question').forEach(q => q.style.display = 'none');
    
    // Show results
    quizResults.classList.add('show');
    quizResults.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ========================
// Smooth Scroll for Navigation
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ========================
// Intersection Observer for Animations
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll(`
        .structure-card,
        .function-category,
        .health-tip,
        .fact-card,
        .disorder-card,
        .brain-area-card,
        .info-item
    `);
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});

// ========================
// Active Navigation Highlight
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
});

// ========================
// Dynamic Stat Counter Animation
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const finalText = statElement.textContent;
                
                // Simple animation effect
                statElement.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    statElement.style.transform = 'scale(1)';
                }, 300);
                
                statsObserver.unobserve(statElement);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// ========================
// Mobile Menu Toggle (if needed)
// ========================
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality can be added here if needed
    // For now, nav links are hidden on mobile in CSS
});

// ========================
// Neuron Animation Enhancement
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const neuronSvg = document.querySelector('.neuron-svg');
    
    if (neuronSvg) {
        const observerOptions = {
            threshold: 0.3
        };
        
        const neuronObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Trigger enhanced animation when visible
                    neuronSvg.style.animation = 'fadeIn 1s ease-out';
                    neuronObserver.unobserve(neuronSvg);
                }
            });
        }, observerOptions);
        
        neuronObserver.observe(neuronSvg);
    }
});

// ========================
// Structure Card Interactions
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const structureCards = document.querySelectorAll('.structure-card');
    
    structureCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle pulse effect on click
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'fadeIn 0.5s ease-out';
            }, 10);
        });
    });
});

// ========================
// Fun Facts Random Highlight
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const factCards = document.querySelectorAll('.fact-card');
    
    // Add staggered animation delay
    factCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// ========================
// Health Tips Interactive Feedback
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const healthTips = document.querySelectorAll('.health-tip');
    
    healthTips.forEach(tip => {
        tip.addEventListener('click', function() {
            // Create a ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.background = 'rgba(99, 102, 241, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            width: 10px;
            height: 10px;
            opacity: 1;
        }
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================
// Brain Pulse Animation Control
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const brainAnimation = document.querySelector('.brain-animation');
    
    if (brainAnimation) {
        const observerOptions = {
            threshold: 0.2
        };
        
        const brainObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Enhance animation when in view
                    const pulseElements = brainAnimation.querySelectorAll('[class*="pulse-"]');
                    pulseElements.forEach(element => {
                        element.style.opacity = '0.7';
                    });
                } else {
                    // Dim animation when out of view
                    const pulseElements = brainAnimation.querySelectorAll('[class*="pulse-"]');
                    pulseElements.forEach(element => {
                        element.style.opacity = '0.3';
                    });
                }
            });
        }, observerOptions);
        
        brainObserver.observe(brainAnimation);
    }
});

// ========================
// Print Friendly NEET Notes
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const neetSection = document.querySelector('.neet-section');
    
    if (neetSection) {
        // Could add a print button here in future
        // For now, browser's print function will work well
    }
});

// ========================
// Disorder Cards Info Toggle
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const disorderCards = document.querySelectorAll('.disorder-card');
    
    disorderCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeft = '5px solid #f59e0b';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeft = 'none';
        });
    });
});

// ========================
// Accessibility Enhancements
// ========================
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation support
    const interactiveElements = document.querySelectorAll(`
        .brain-part,
        .option,
        .structure-card,
        .health-tip
    `);
    
    interactiveElements.forEach(element => {
        // Make keyboard accessible
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        
        // Add keyboard event listeners
        element.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// ========================
// Performance Optimization
// ========================
// Lazy load images if needed in future
document.addEventListener('DOMContentLoaded', function() {
    // Image lazy loading could be implemented here
    // Currently using inline SVGs which load instantly
});

// ========================
// Console Welcome Message
// ========================
console.log(`
%c🧠 Welcome to Organs Explorer - Brain Edition! 🧠
%cExplore the most complex organ in your body!
Made with ❤️ for students

%cHappy Learning! 📚
`, 
'color: #6366f1; font-size: 24px; font-weight: bold;',
'color: #8b5cf6; font-size: 16px;',
'color: #10b981; font-size: 14px; font-weight: bold;'
);

// ========================
// Error Handling
// ========================
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// ========================
// Page Load Performance Tracking
// ========================
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`%cPage loaded in ${loadTime.toFixed(2)}ms`, 'color: #10b981; font-weight: bold;');
});