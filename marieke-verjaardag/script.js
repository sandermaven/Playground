// ========================================
// Marieke's Verjaardag - Interactive Scripts
// ========================================

// Pitstop Database - Echte plekken in Leiden!
const pitstops = [
    // Koffie
    {
        name: "Bagels & Beans",
        description: "Heerlijke koffie en verse bagels aan de gracht. Perfect voor een snelle stop!",
        categories: ["koffie", "honger", "rust"],
        emoji: "☕",
        address: "Nieuwe Rijn 19",
        distance: 150,
        urgencyMin: 1
    },
    {
        name: "Koetjes en Kalfjes",
        description: "Gezellig koffietentje met huisgemaakte taart. Een Leidse favoriet!",
        categories: ["koffie", "zoet", "rust"],
        emoji: "🍰",
        address: "Kaiserstraat 13",
        distance: 300,
        urgencyMin: 1
    },
    {
        name: "Coffee Company",
        description: "Betrouwbaar goede koffie in een moderne setting. Snel en lekker.",
        categories: ["koffie", "warm"],
        emoji: "☕",
        address: "Breestraat 123",
        distance: 200,
        urgencyMin: 2
    },
    {
        name: "Doppio Espresso",
        description: "Voor de echte koffieliefhebber. Italiaanse kwaliteit in Leiden.",
        categories: ["koffie"],
        emoji: "☕",
        address: "Stationsweg 23",
        distance: 450,
        urgencyMin: 1
    },

    // Eten
    {
        name: "De Grote Beer",
        description: "Klassiek Leids eetcafé met uitstekende bitterballen en stamppot.",
        categories: ["honger", "dorst", "rust", "warm"],
        emoji: "🍽️",
        address: "Rembrandtstraat 27",
        distance: 250,
        urgencyMin: 1
    },
    {
        name: "Oudt Leyden",
        description: "Historisch restaurant in een prachtig pand. Voor een uitgebreide stop.",
        categories: ["honger", "rust", "cultuur"],
        emoji: "🏰",
        address: "Steenstraat 51",
        distance: 350,
        urgencyMin: 1
    },
    {
        name: "Humphrey's",
        description: "Gezellig restaurant met een uitgebreid menu. Kindvriendelijk!",
        categories: ["honger", "rust", "warm"],
        emoji: "🍝",
        address: "Lange Mare 78",
        distance: 280,
        urgencyMin: 2
    },
    {
        name: "Lot & de Walansen",
        description: "Creatieve lunch en diner met lokale ingrediënten. Hip en lekker.",
        categories: ["honger", "koffie"],
        emoji: "🥗",
        address: "Apothekersdijk 11",
        distance: 320,
        urgencyMin: 1
    },
    {
        name: "De Waag",
        description: "Eten in het historische waagebouw. Unieke sfeer gegarandeerd!",
        categories: ["honger", "dorst", "cultuur"],
        emoji: "⚖️",
        address: "Aalmarkt 21",
        distance: 180,
        urgencyMin: 1
    },
    {
        name: "Freddy's Frites",
        description: "De lekkerste friet van Leiden! Snel en perfect voor onderweg.",
        categories: ["honger"],
        emoji: "🍟",
        address: "Haarlemmerstraat 75",
        distance: 220,
        urgencyMin: 3
    },

    // Drinken
    {
        name: "Café de Uyl",
        description: "Gezellig bruin café met een groot terras aan het water.",
        categories: ["dorst", "rust", "warm"],
        emoji: "🍺",
        address: "Nieuwe Rijn 52",
        distance: 120,
        urgencyMin: 1
    },
    {
        name: "In de Blaauwe Hand",
        description: "Het oudste café van Leiden! Authentieke sfeer sinds 1494.",
        categories: ["dorst", "cultuur", "rust"],
        emoji: "🍻",
        address: "Turfmarkt 1",
        distance: 280,
        urgencyMin: 1
    },
    {
        name: "Proeflokaal Olivier",
        description: "Speciaalbiercafé in een oude kerk. Unieke beleving!",
        categories: ["dorst", "cultuur"],
        emoji: "⛪",
        address: "Hooglandse Kerkgracht 18",
        distance: 350,
        urgencyMin: 1
    },
    {
        name: "Café Einstein",
        description: "Groot café aan de Nieuwe Rijn. Perfecte mensen-kijk plek.",
        categories: ["dorst", "rust", "koffie"],
        emoji: "🧠",
        address: "Nieuwe Rijn 19",
        distance: 160,
        urgencyMin: 2
    },

    // Zoet
    {
        name: "Banketbakkerij Van Maanen",
        description: "Traditionele Leidse lekkernijen. Probeer de Leidse krakeling!",
        categories: ["zoet", "warm"],
        emoji: "🥨",
        address: "Haarlemmerstraat 160",
        distance: 380,
        urgencyMin: 1
    },
    {
        name: "Luciano IJs",
        description: "Het beste Italiaanse ijs van Leiden. Huisgemaakt en heerlijk.",
        categories: ["zoet"],
        emoji: "🍦",
        address: "Pieterskerkgracht 9",
        distance: 290,
        urgencyMin: 2
    },
    {
        name: "De Koekfabriek",
        description: "Verse koeken en taarten. Neem er ook eentje mee voor later!",
        categories: ["zoet", "koffie"],
        emoji: "🍪",
        address: "Steenstraat 31",
        distance: 260,
        urgencyMin: 1
    },
    {
        name: "Appeltje Eitje",
        description: "Ontbijt- en lunchtent met verrukkelijke pannenkoeken en wafels.",
        categories: ["zoet", "honger", "koffie"],
        emoji: "🥞",
        address: "Diefsteeg 8",
        distance: 200,
        urgencyMin: 2
    },

    // WC
    {
        name: "Hema",
        description: "Gratis toilet en altijd een rookworst als bonus. Win-win!",
        categories: ["wc"],
        emoji: "🚻",
        address: "Haarlemmerstraat 170",
        distance: 150,
        urgencyMin: 4
    },
    {
        name: "McDonald's",
        description: "Altijd open, altijd beschikbaar. In geval van nood!",
        categories: ["wc", "honger"],
        emoji: "🍔",
        address: "Stationsplein 6",
        distance: 420,
        urgencyMin: 5
    },
    {
        name: "V&D (voorheen)",
        description: "Nu Hudson's Bay - nog steeds goede sanitaire voorzieningen.",
        categories: ["wc", "rust"],
        emoji: "🏬",
        address: "Breestraat 100",
        distance: 180,
        urgencyMin: 3
    },
    {
        name: "Centraal Station",
        description: "Openbare toiletten bij het station. Klein bedrag, grote opluchting.",
        categories: ["wc"],
        emoji: "🚂",
        address: "Stationsplein",
        distance: 500,
        urgencyMin: 4
    },

    // Rust
    {
        name: "Hortus Botanicus",
        description: "Rust vinden in de oudste botanische tuin van Nederland. Prachtig!",
        categories: ["rust", "cultuur"],
        emoji: "🌿",
        address: "Rapenburg 73",
        distance: 320,
        urgencyMin: 1
    },
    {
        name: "Stadspark De Leidse Hout",
        description: "Groot stadspark met bankjes en speeltuinen. Even helemaal weg.",
        categories: ["rust"],
        emoji: "🌳",
        address: "Van der Werffstraat",
        distance: 800,
        urgencyMin: 1
    },
    {
        name: "Pieterskerk",
        description: "Historische kerk met een serene sfeer. Ideaal voor even bijkomen.",
        categories: ["rust", "cultuur", "warm"],
        emoji: "⛪",
        address: "Pieterskerkhof 1",
        distance: 240,
        urgencyMin: 1
    },
    {
        name: "Burcht van Leiden",
        description: "Beklim de burcht voor uitzicht en rust. Bankjes boven!",
        categories: ["rust", "cultuur"],
        emoji: "🏰",
        address: "Van der Sterrepad",
        distance: 220,
        urgencyMin: 1
    },

    // Cultuur
    {
        name: "Museum De Lakenhal",
        description: "Kunst en geschiedenis van Leiden. Inclusief Rembrandts!",
        categories: ["cultuur", "rust", "warm"],
        emoji: "🖼️",
        address: "Oude Singel 32",
        distance: 350,
        urgencyMin: 1
    },
    {
        name: "Rijksmuseum van Oudheden",
        description: "Egyptische mummies en Romeinse vondsten. Super interessant!",
        categories: ["cultuur", "rust", "warm"],
        emoji: "🏛️",
        address: "Rapenburg 28",
        distance: 280,
        urgencyMin: 1
    },
    {
        name: "Naturalis",
        description: "Dinosaurussen en een Australische expositie! Perfect uitstapje.",
        categories: ["cultuur", "rust", "warm"],
        emoji: "🦕",
        address: "Darwinweg 2",
        distance: 1200,
        urgencyMin: 1
    },
    {
        name: "Molen De Valk",
        description: "Beklim deze iconische molen voor een uniek uitzicht.",
        categories: ["cultuur"],
        emoji: "🌬️",
        address: "2e Binnenvestgracht 1",
        distance: 400,
        urgencyMin: 1
    },

    // Warm
    {
        name: "Bieb Leiden",
        description: "De bibliotheek is warm, gratis en heeft comfortabele stoelen.",
        categories: ["warm", "rust", "wc"],
        emoji: "📚",
        address: "Nieuwstraat 4",
        distance: 230,
        urgencyMin: 2
    },
    {
        name: "Primark",
        description: "Warm, groot en je kunt meteen handschoenen kopen als nodig.",
        categories: ["warm"],
        emoji: "🧤",
        address: "Haarlemmerstraat 168",
        distance: 190,
        urgencyMin: 3
    }
];

// Urgency texts
const urgencyTexts = [
    "Kan nog even wachten",
    "Zou wel fijn zijn",
    "Redelijk dringend",
    "Best wel nodig nu",
    "CODE ROOD! NU METEEN!"
];

// Current filter state
let currentFilter = 'all';
let currentUrgency = 3;

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initFilters();
    initUrgencySlider();
    initFindButton();
    initSmoothScroll();
});

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// Filter Buttons
// ========================================
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update current filter
            currentFilter = btn.dataset.filter;

            // Add click animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 100);
        });
    });
}

// ========================================
// Urgency Slider
// ========================================
function initUrgencySlider() {
    const slider = document.getElementById('urgency');
    const urgencyText = document.getElementById('urgency-text');

    slider.addEventListener('input', () => {
        currentUrgency = parseInt(slider.value);
        urgencyText.textContent = urgencyTexts[currentUrgency - 1];

        // Change color based on urgency
        const colors = ['#00b894', '#00cec9', '#fdcb6e', '#e17055', '#d63031'];
        urgencyText.style.color = colors[currentUrgency - 1];
    });
}

// ========================================
// Find Pitstop Button
// ========================================
function initFindButton() {
    const findBtn = document.getElementById('find-pitstop');
    const resultsContainer = document.getElementById('results');

    findBtn.addEventListener('click', () => {
        // Add loading animation
        resultsContainer.innerHTML = '<div class="loading"></div>';

        // Simulate search delay for effect
        setTimeout(() => {
            const results = findPitstops(currentFilter, currentUrgency);
            displayResults(results, resultsContainer);
        }, 800);

        // Scroll to results
        setTimeout(() => {
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 1000);
    });
}

// ========================================
// Find Matching Pitstops
// ========================================
function findPitstops(filter, urgency) {
    let matches = pitstops.filter(place => {
        // Filter by category
        if (filter !== 'all' && !place.categories.includes(filter)) {
            return false;
        }

        // Filter by urgency (higher urgency = closer places)
        if (urgency >= 4 && place.distance > 300) {
            return false;
        }
        if (urgency >= 5 && place.distance > 200) {
            return false;
        }

        return true;
    });

    // Sort by distance if urgent, otherwise randomize a bit
    if (urgency >= 4) {
        matches.sort((a, b) => a.distance - b.distance);
    } else {
        matches.sort(() => Math.random() - 0.5);
    }

    // Return top 3
    return matches.slice(0, 3);
}

// ========================================
// Display Results
// ========================================
function displayResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <p style="text-align: center; padding: 40px; color: #8e8d8a;">
                    😅 Geen resultaten gevonden voor deze combinatie.
                    Probeer een andere filter of verlaag de urgentie!
                </p>
            </div>
        `;
        return;
    }

    const categoryLabels = {
        koffie: 'Koffie',
        honger: 'Eten',
        dorst: 'Drinken',
        zoet: 'Zoet',
        wc: 'WC',
        rust: 'Rust',
        cultuur: 'Cultuur',
        warm: 'Warmte'
    };

    let html = '<h3 class="results-title">🎯 Jouw reddingsboeien:</h3>';

    results.forEach(place => {
        const tags = place.categories.map(cat =>
            `<span class="result-tag">${categoryLabels[cat] || cat}</span>`
        ).join('');

        html += `
            <div class="result-card">
                <div class="result-emoji">${place.emoji}</div>
                <div class="result-info">
                    <h4>${place.name}</h4>
                    <p>${place.description}</p>
                    <p style="font-size: 0.85rem; color: #666;">📍 ${place.address}</p>
                    <div class="result-tags">${tags}</div>
                </div>
                <div class="result-distance">
                    <div class="distance-value">${place.distance}m</div>
                    <div class="distance-label">afstand</div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ========================================
// Smooth Scroll for Navigation
// ========================================
function initSmoothScroll() {
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
}

// ========================================
// Parallax Effect on Scroll
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && scrolled < window.innerHeight) {
        // Parallax for hero background
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;

        // Fade out hero content on scroll
        if (heroContent) {
            heroContent.style.opacity = 1 - (scrolled / 600);
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

// ========================================
// Easter Egg: Konami Code
// ========================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s linear';
        setTimeout(() => {
            alert('🎉 G\'day Marieke! 🦘🎷 Gefeliciteerd van je geheime bewonderaars!');
            document.body.style.animation = '';
        }, 100);
    }
});

// Add rainbow animation to document
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ========================================
// Console Message
// ========================================
console.log('%c🎂 Gefeliciteerd Marieke! 🎂', 'font-size: 24px; color: #e85a4f; font-weight: bold;');
console.log('%cDeze website is met liefde gemaakt voor jouw verjaardag!', 'font-size: 14px; color: #764ba2;');
console.log('%c🎷 🦘 🌉 💝', 'font-size: 20px;');
