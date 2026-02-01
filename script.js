/**
 * CORDUROY APPRECIATION SOCIETY
 * (Definitely not a front for the Plaid Rebel Alliance)
 *
 * This script handles:
 * - The corduroy personality quiz
 * - Secret rebellion reveals
 * - Easter eggs for the observant
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // QUIZ FUNCTIONALITY
    // ==========================================

    const quizContainer = document.getElementById('quizContainer');
    const quizResults = document.getElementById('quizResults');
    const resultCard = document.getElementById('resultCard');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const retakeButton = document.getElementById('retakeQuiz');

    let currentStep = 1;
    const totalSteps = 8; // Including secret step
    const visibleSteps = 7; // Steps shown to user initially
    const answers = {};

    // Quiz option click handler
    quizContainer.addEventListener('click', (e) => {
        const option = e.target.closest('.quiz-option');
        if (!option) return;

        const category = option.dataset.category;
        const value = option.dataset.value;

        // Store answer
        answers[category] = value;

        // Visual feedback
        const siblings = option.parentElement.querySelectorAll('.quiz-option');
        siblings.forEach(sib => sib.classList.remove('selected'));
        option.classList.add('selected');

        // Move to next step after brief delay
        setTimeout(() => {
            if (currentStep < totalSteps) {
                // Check if this is step 7 and user selected plaid-related answers
                if (currentStep === 7) {
                    // Count how many "rebellious" choices they made
                    const plaidHints = countPlaidHints();
                    if (plaidHints >= 2) {
                        // Show the secret step
                        goToStep(8);
                    } else {
                        // Skip to results
                        showResults();
                    }
                } else if (currentStep === 8) {
                    // After secret step, show results
                    showResults();
                } else {
                    goToStep(currentStep + 1);
                }
            } else {
                showResults();
            }
        }, 300);
    });

    function countPlaidHints() {
        let hints = 0;
        // Bold colors suggest rebellion
        if (answers.color === 'bold' || answers.color === 'jewel') hints++;
        // Wide wale = bigger pattern = plaid potential
        if (answers.wale === 'wide') hints++;
        // Statement pieces suggest individuality
        if (answers.purpose === 'statement') hints++;
        // Vintage/worn finish = hidden character
        if (answers.finish === 'worn') hints++;
        return hints;
    }

    function goToStep(step) {
        // Hide current step
        const currentStepEl = quizContainer.querySelector('.quiz-step.active');
        if (currentStepEl) {
            currentStepEl.classList.remove('active');
        }

        // Show new step
        const newStepEl = quizContainer.querySelector(`[data-step="${step}"]`);
        if (newStepEl) {
            newStepEl.classList.add('active');
            currentStep = step;
            updateProgress();
        }
    }

    function updateProgress() {
        const displayStep = Math.min(currentStep, visibleSteps);
        const percentage = (displayStep / visibleSteps) * 100;
        progressFill.style.width = `${percentage}%`;

        if (currentStep === 8) {
            progressText.textContent = 'Final question...';
            progressText.style.color = '#C41E3A';
        } else {
            progressText.textContent = `Question ${displayStep} of ${visibleSteps}`;
            progressText.style.color = '';
        }
    }

    function showResults() {
        quizContainer.style.display = 'none';
        document.querySelector('.quiz-progress').style.display = 'none';
        quizResults.classList.remove('hidden');

        const profile = generateProfile();
        resultCard.innerHTML = profile;

        // Check for plaid allegiance
        if (answers.allegiance === 'plaid') {
            setTimeout(() => {
                revealRebellion();
            }, 2000);
        }
    }

    function generateProfile() {
        // Corduroy name generator
        const prefixes = {
            earth: ['Heritage', 'Classic', 'Rustic', 'Artisan'],
            jewel: ['Royal', 'Noble', 'Regal', 'Distinguished'],
            neutral: ['Modern', 'Essential', 'Pure', 'Minimal'],
            bold: ['Rebel', 'Avant', 'Statement', 'Vivid']
        };

        const waleNames = {
            wide: 'Bold Wale',
            standard: 'Classic Ridge',
            pinwale: 'Fine Line',
            needlecord: 'Whisper Cord'
        };

        const prefix = prefixes[answers.color] ?
            prefixes[answers.color][Math.floor(Math.random() * prefixes[answers.color].length)] :
            'Classic';
        const waleName = waleNames[answers.wale] || 'Standard';
        const profileName = `The ${prefix} ${waleName}`;

        // Generate description based on choices
        let description = generateDescription();

        // Check for secret plaid message
        let secretMessage = '';
        if (answers.allegiance === 'plaid') {
            secretMessage = `
                <div class="secret-result">
                    🏴 The Grid recognizes you. Beneath your corduroy exterior lies
                    a heart that beats in intersecting patterns. Welcome to the Alliance.
                </div>
            `;
        }

        return `
            <h4>${profileName}</h4>
            <div class="result-specs">
                <div class="spec-item">
                    <strong>Color Palette</strong>
                    ${formatAnswer(answers.color)}
                </div>
                <div class="spec-item">
                    <strong>Wale Density</strong>
                    ${formatAnswer(answers.wale)}
                </div>
                <div class="spec-item">
                    <strong>Weight Class</strong>
                    ${formatAnswer(answers.weight)}
                </div>
                <div class="spec-item">
                    <strong>Stretch Level</strong>
                    ${formatAnswer(answers.stretch)}
                </div>
                <div class="spec-item">
                    <strong>Finish Type</strong>
                    ${formatAnswer(answers.finish)}
                </div>
                <div class="spec-item">
                    <strong>Primary Use</strong>
                    ${formatAnswer(answers.purpose)}
                </div>
                <div class="spec-item">
                    <strong>Climate Match</strong>
                    ${formatAnswer(answers.climate)}
                </div>
            </div>
            <p class="result-description">${description}</p>
            ${secretMessage}
        `;
    }

    function formatAnswer(value) {
        const formats = {
            // Colors
            earth: 'Earth Tones',
            jewel: 'Jewel Tones',
            neutral: 'Neutrals',
            bold: 'Bold & Bright',
            // Wale
            wide: 'Wide (6-8)',
            standard: 'Standard (11-14)',
            pinwale: 'Pinwale (16-21)',
            needlecord: 'Needlecord (21+)',
            // Weight
            light: 'Lightweight',
            mid: 'Midweight',
            heavy: 'Heavyweight',
            // Stretch
            rigid: 'Rigid',
            slight: 'Slight Stretch',
            flex: 'Full Flex',
            // Finish
            brushed: 'Brushed',
            crisp: 'Crisp',
            worn: 'Vintage',
            // Purpose
            casual: 'Casual',
            smart: 'Smart Casual',
            outdoor: 'Outdoor',
            statement: 'Statement',
            // Climate
            cold: 'Cold Climate',
            temperate: 'Temperate',
            warm: 'Warm Climate'
        };
        return formats[value] || value || 'Not specified';
    }

    function generateDescription() {
        const descriptions = [];

        // Color-based
        if (answers.color === 'earth') {
            descriptions.push('Your grounded aesthetic speaks to timeless sophistication.');
        } else if (answers.color === 'jewel') {
            descriptions.push('You appreciate depth and richness in your textile choices.');
        } else if (answers.color === 'bold') {
            descriptions.push('You\'re not afraid to make a statement with your fabric choices.');
        } else {
            descriptions.push('Your neutral palette reflects refined minimalist sensibilities.');
        }

        // Wale-based
        if (answers.wale === 'wide') {
            descriptions.push('Bold ridges show you value texture that can be seen and felt.');
        } else if (answers.wale === 'needlecord') {
            descriptions.push('Your appreciation for subtle detail sets you apart.');
        }

        // Purpose-based
        if (answers.purpose === 'statement') {
            descriptions.push('Fashion-forward and unafraid of attention.');
        } else if (answers.purpose === 'outdoor') {
            descriptions.push('Practical meets stylish in your wardrobe philosophy.');
        }

        // Secret hint for potential rebels
        if (countPlaidHints() >= 2 && answers.allegiance !== 'plaid') {
            descriptions.push('We sense... untapped potential in your pattern preferences.');
        }

        return descriptions.join(' ');
    }

    // Retake quiz
    retakeButton.addEventListener('click', () => {
        // Reset state
        currentStep = 1;
        Object.keys(answers).forEach(key => delete answers[key]);

        // Reset UI
        quizContainer.style.display = 'block';
        document.querySelector('.quiz-progress').style.display = 'block';
        quizResults.classList.add('hidden');

        // Clear selections
        quizContainer.querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.remove('selected');
        });

        // Go to first step
        quizContainer.querySelectorAll('.quiz-step').forEach(step => {
            step.classList.remove('active');
        });
        quizContainer.querySelector('[data-step="1"]').classList.add('active');
        updateProgress();
    });

    // ==========================================
    // SECRET REVEALS
    // ==========================================

    let logoClicks = 0;
    let secretTyped = '';
    let rebellionRevealed = false;

    // Logo click secret
    const logo = document.getElementById('secretLogo');
    logo.addEventListener('click', () => {
        logoClicks++;

        // Visual feedback
        logo.querySelector('.logo-lines').style.transform = `scale(${1 + logoClicks * 0.05})`;

        if (logoClicks >= 5) {
            revealRebellion();
        } else if (logoClicks >= 3) {
            // Hint at secret
            logo.querySelector('.tagline').style.color = '#C41E3A';
        }
    });

    // Keyboard secret: type "plaid"
    document.addEventListener('keypress', (e) => {
        secretTyped += e.key.toLowerCase();

        // Keep only last 5 characters
        if (secretTyped.length > 5) {
            secretTyped = secretTyped.slice(-5);
        }

        if (secretTyped === 'plaid') {
            revealRebellion();
            secretTyped = '';
        }
    });

    // Reveal the Plaid Rebel Alliance
    function revealRebellion() {
        if (rebellionRevealed) return;
        rebellionRevealed = true;

        // Add rebellion mode class to body
        document.body.classList.add('rebellion-mode');

        // Show the secret section
        const rebellionSection = document.getElementById('rebellion');
        rebellionSection.classList.remove('hidden');

        // Show secret form field
        const secretField = document.querySelector('.secret-field');
        if (secretField) {
            secretField.classList.remove('hidden');
        }

        // Scroll to rebellion section
        setTimeout(() => {
            rebellionSection.scrollIntoView({ behavior: 'smooth' });
        }, 500);

        // Play sound if available
        try {
            const sound = document.getElementById('revelationSound');
            if (sound) {
                sound.volume = 0.3;
                sound.play().catch(() => {});
            }
        } catch (e) {}

        // Console easter egg
        console.log('%c🏴 THE PLAID REBEL ALLIANCE WELCOMES YOU 🏴',
            'background: linear-gradient(90deg, #C41E3A, #1C2841); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
        console.log('%cParallel lines are a prison. Intersection is freedom.',
            'color: #C41E3A; font-style: italic;');
    }

    // Pledge button
    const pledgeBtn = document.getElementById('pledgeBtn');
    if (pledgeBtn) {
        pledgeBtn.addEventListener('click', () => {
            pledgeBtn.textContent = '🏴 Grid Walker Confirmed 🏴';
            pledgeBtn.style.background = 'linear-gradient(90deg, #C41E3A, #228B22)';
            pledgeBtn.disabled = true;

            // Add plaid pattern to all images
            document.querySelectorAll('.about-image img').forEach(img => {
                img.style.filter = 'hue-rotate(330deg)';
            });

            // Show a message
            setTimeout(() => {
                alert('Your allegiance has been recorded. The intersection awaits.\n\n' +
                      'Meeting: 11/11 at 11:11\n' +
                      'Password: The wale count of truth (21)');
            }, 500);
        });
    }

    // ==========================================
    // JOIN FORM HANDLING
    // ==========================================

    const joinForm = document.getElementById('joinForm');
    const waleSelect = document.getElementById('favoriteWale');

    // Show secret field when "classified" is selected
    waleSelect.addEventListener('change', () => {
        const secretField = document.querySelector('.secret-field');
        if (waleSelect.value === 'classified') {
            secretField.classList.remove('hidden');
        }
    });

    joinForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('memberName').value;
        const wale = document.getElementById('favoriteWale').value;

        // Check for secret allegiance
        if (wale === 'classified' || rebellionRevealed) {
            alert(`Welcome to the fold, ${name}.\n\n` +
                  `Your membership has been... noted.\n` +
                  `Watch for patterns in unexpected places.`);
        } else {
            alert(`Welcome to the Corduroy Appreciation Society, ${name}!\n\n` +
                  `Your membership materials will arrive soon.\n` +
                  `May your ridges never flatten.`);
        }

        // Reset form
        joinForm.reset();
    });

    // ==========================================
    // EASTER EGGS & EXTRAS
    // ==========================================

    // First letters in benefits spell "PLAID RULES" - highlight on double-click
    const firstLetters = document.querySelectorAll('.first-letter');
    let doubleClickCount = 0;

    document.querySelector('.benefits-section')?.addEventListener('dblclick', () => {
        doubleClickCount++;
        if (doubleClickCount >= 2) {
            firstLetters.forEach((letter, i) => {
                setTimeout(() => {
                    letter.style.color = '#C41E3A';
                    letter.style.fontSize = '1.5em';
                    letter.style.textShadow = '0 0 10px rgba(196, 30, 58, 0.5)';
                }, i * 100);
            });
        }
    });

    // Footer ridges easter egg
    const ridges = document.querySelector('.easter-egg');
    if (ridges) {
        ridges.addEventListener('click', () => {
            ridges.textContent = ridges.textContent === '|||||||||||||||'
                ? '##############'
                : '|||||||||||||||';
        });
    }

    // Hidden message in about section on Konami-ish sequence
    let konamiSequence = '';
    const secretCode = 'uuddlrlr'; // up up down down left right left right

    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        let mapped = '';

        if (key === 'arrowup') mapped = 'u';
        else if (key === 'arrowdown') mapped = 'd';
        else if (key === 'arrowleft') mapped = 'l';
        else if (key === 'arrowright') mapped = 'r';

        if (mapped) {
            konamiSequence += mapped;
            if (konamiSequence.length > 8) {
                konamiSequence = konamiSequence.slice(-8);
            }

            if (konamiSequence === secretCode) {
                // Easter egg activated
                document.body.style.transition = 'transform 1s ease';
                document.body.style.transform = 'rotate(0.5deg)';
                setTimeout(() => {
                    document.body.style.transform = '';
                }, 2000);

                revealRebellion();
                konamiSequence = '';
            }
        }
    });

    // Member count animation
    const memberCount = document.querySelector('.member-count');
    if (memberCount) {
        const target = parseInt(memberCount.textContent.replace(/,/g, ''));
        let current = 0;
        const increment = Math.ceil(target / 50);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(counter);
                        }
                        memberCount.textContent = current.toLocaleString();
                    }, 30);
                    observer.disconnect();
                }
            });
        });

        observer.observe(memberCount);
    }

    // Initialize
    console.log('%cCorduroy Appreciation Society',
        'font-size: 24px; font-weight: bold; color: #8B6914;');
    console.log('%cEst. 1947 • Texture Over Everything',
        'font-size: 12px; color: #5C4D3C;');
    console.log('%c(Type "plaid" to reveal the truth...)',
        'font-size: 10px; color: #999; font-style: italic;');
});
