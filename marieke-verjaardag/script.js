// ========================================
// Marieke's Verjaardag - Interactive Scripts
// ========================================

// User location state
let userLocation = null;
let locationStatus = 'unknown'; // 'unknown', 'requesting', 'granted', 'denied'

// Pitstop Database - Echte plekken in Leiden met GPS coördinaten!
const pitstops = [
    // Koffie
    {
        name: "Bagels & Beans",
        description: "Heerlijke koffie en verse bagels aan de gracht. Perfect voor een snelle stop!",
        categories: ["koffie", "honger", "rust"],
        emoji: "☕",
        address: "Nieuwe Rijn 19",
        lat: 52.1583,
        lng: 4.4897,
        urgencyMin: 1
    },
    {
        name: "Koetjes en Kalfjes",
        description: "Gezellig koffietentje met huisgemaakte taart. Een Leidse favoriet!",
        categories: ["koffie", "zoet", "rust"],
        emoji: "🍰",
        address: "Kaiserstraat 13",
        lat: 52.1572,
        lng: 4.4856,
        urgencyMin: 1
    },
    {
        name: "Coffee Company",
        description: "Betrouwbaar goede koffie in een moderne setting. Snel en lekker.",
        categories: ["koffie", "warm"],
        emoji: "☕",
        address: "Breestraat 123",
        lat: 52.1601,
        lng: 4.4891,
        urgencyMin: 2
    },
    {
        name: "Doppio Espresso",
        description: "Voor de echte koffieliefhebber. Italiaanse kwaliteit in Leiden.",
        categories: ["koffie"],
        emoji: "☕",
        address: "Stationsweg 23",
        lat: 52.1660,
        lng: 4.4815,
        urgencyMin: 1
    },

    // Eten
    {
        name: "De Grote Beer",
        description: "Klassiek Leids eetcafé met uitstekende bitterballen en stamppot.",
        categories: ["honger", "dorst", "rust", "warm"],
        emoji: "🍽️",
        address: "Rembrandtstraat 27",
        lat: 52.1568,
        lng: 4.4823,
        urgencyMin: 1
    },
    {
        name: "Oudt Leyden",
        description: "Historisch restaurant in een prachtig pand. Voor een uitgebreide stop.",
        categories: ["honger", "rust", "cultuur"],
        emoji: "🏰",
        address: "Steenstraat 51",
        lat: 52.1594,
        lng: 4.4876,
        urgencyMin: 1
    },
    {
        name: "Humphrey's",
        description: "Gezellig restaurant met een uitgebreid menu. Kindvriendelijk!",
        categories: ["honger", "rust", "warm"],
        emoji: "🍝",
        address: "Lange Mare 78",
        lat: 52.1623,
        lng: 4.4912,
        urgencyMin: 2
    },
    {
        name: "Lot & de Walansen",
        description: "Creatieve lunch en diner met lokale ingrediënten. Hip en lekker.",
        categories: ["honger", "koffie"],
        emoji: "🥗",
        address: "Apothekersdijk 11",
        lat: 52.1612,
        lng: 4.4935,
        urgencyMin: 1
    },
    {
        name: "De Waag",
        description: "Eten in het historische waagebouw. Unieke sfeer gegarandeerd!",
        categories: ["honger", "dorst", "cultuur"],
        emoji: "⚖️",
        address: "Aalmarkt 21",
        lat: 52.1590,
        lng: 4.4893,
        urgencyMin: 1
    },
    {
        name: "Freddy's Frites",
        description: "De lekkerste friet van Leiden! Snel en perfect voor onderweg.",
        categories: ["honger"],
        emoji: "🍟",
        address: "Haarlemmerstraat 75",
        lat: 52.1618,
        lng: 4.4872,
        urgencyMin: 3
    },

    // Drinken
    {
        name: "Café de Uyl",
        description: "Gezellig bruin café met een groot terras aan het water.",
        categories: ["dorst", "rust", "warm"],
        emoji: "🍺",
        address: "Nieuwe Rijn 52",
        lat: 52.1585,
        lng: 4.4905,
        urgencyMin: 1
    },
    {
        name: "In de Blaauwe Hand",
        description: "Het oudste café van Leiden! Authentieke sfeer sinds 1494.",
        categories: ["dorst", "cultuur", "rust"],
        emoji: "🍻",
        address: "Turfmarkt 1",
        lat: 52.1578,
        lng: 4.4888,
        urgencyMin: 1
    },
    {
        name: "Proeflokaal Olivier",
        description: "Speciaalbiercafé in een oude kerk. Unieke beleving!",
        categories: ["dorst", "cultuur"],
        emoji: "⛪",
        address: "Hooglandse Kerkgracht 18",
        lat: 52.1604,
        lng: 4.4862,
        urgencyMin: 1
    },
    {
        name: "Café Einstein",
        description: "Groot café aan de Nieuwe Rijn. Perfecte mensen-kijk plek.",
        categories: ["dorst", "rust", "koffie"],
        emoji: "🧠",
        address: "Nieuwe Rijn 19",
        lat: 52.1583,
        lng: 4.4898,
        urgencyMin: 2
    },

    // Zoet
    {
        name: "Banketbakkerij Van Maanen",
        description: "Traditionele Leidse lekkernijen. Probeer de Leidse krakeling!",
        categories: ["zoet", "warm"],
        emoji: "🥨",
        address: "Haarlemmerstraat 160",
        lat: 52.1632,
        lng: 4.4855,
        urgencyMin: 1
    },
    {
        name: "Luciano IJs",
        description: "Het beste Italiaanse ijs van Leiden. Huisgemaakt en heerlijk.",
        categories: ["zoet"],
        emoji: "🍦",
        address: "Pieterskerkgracht 9",
        lat: 52.1575,
        lng: 4.4851,
        urgencyMin: 2
    },
    {
        name: "De Koekfabriek",
        description: "Verse koeken en taarten. Neem er ook eentje mee voor later!",
        categories: ["zoet", "koffie"],
        emoji: "🍪",
        address: "Steenstraat 31",
        lat: 52.1592,
        lng: 4.4871,
        urgencyMin: 1
    },
    {
        name: "Appeltje Eitje",
        description: "Ontbijt- en lunchtent met verrukkelijke pannenkoeken en wafels.",
        categories: ["zoet", "honger", "koffie"],
        emoji: "🥞",
        address: "Diefsteeg 8",
        lat: 52.1598,
        lng: 4.4884,
        urgencyMin: 2
    },

    // WC
    {
        name: "Hema",
        description: "Gratis toilet en altijd een rookworst als bonus. Win-win!",
        categories: ["wc"],
        emoji: "🚻",
        address: "Haarlemmerstraat 170",
        lat: 52.1635,
        lng: 4.4852,
        urgencyMin: 4
    },
    {
        name: "McDonald's",
        description: "Altijd open, altijd beschikbaar. In geval van nood!",
        categories: ["wc", "honger"],
        emoji: "🍔",
        address: "Stationsplein 6",
        lat: 52.1663,
        lng: 4.4818,
        urgencyMin: 5
    },
    {
        name: "Hudson's Bay",
        description: "Voorheen V&D - nog steeds goede sanitaire voorzieningen.",
        categories: ["wc", "rust"],
        emoji: "🏬",
        address: "Breestraat 100",
        lat: 52.1598,
        lng: 4.4885,
        urgencyMin: 3
    },
    {
        name: "Centraal Station",
        description: "Openbare toiletten bij het station. Klein bedrag, grote opluchting.",
        categories: ["wc"],
        emoji: "🚂",
        address: "Stationsplein",
        lat: 52.1664,
        lng: 4.4820,
        urgencyMin: 4
    },

    // Rust
    {
        name: "Hortus Botanicus",
        description: "Rust vinden in de oudste botanische tuin van Nederland. Prachtig!",
        categories: ["rust", "cultuur"],
        emoji: "🌿",
        address: "Rapenburg 73",
        lat: 52.1573,
        lng: 4.4890,
        urgencyMin: 1
    },
    {
        name: "Stadspark De Leidse Hout",
        description: "Groot stadspark met bankjes en speeltuinen. Even helemaal weg.",
        categories: ["rust"],
        emoji: "🌳",
        address: "Van der Werffstraat",
        lat: 52.1510,
        lng: 4.4720,
        urgencyMin: 1
    },
    {
        name: "Pieterskerk",
        description: "Historische kerk met een serene sfeer. Ideaal voor even bijkomen.",
        categories: ["rust", "cultuur", "warm"],
        emoji: "⛪",
        address: "Pieterskerkhof 1",
        lat: 52.1572,
        lng: 4.4856,
        urgencyMin: 1
    },
    {
        name: "Burcht van Leiden",
        description: "Beklim de burcht voor uitzicht en rust. Bankjes boven!",
        categories: ["rust", "cultuur"],
        emoji: "🏰",
        address: "Van der Sterrepad",
        lat: 52.1587,
        lng: 4.4918,
        urgencyMin: 1
    },

    // Cultuur
    {
        name: "Museum De Lakenhal",
        description: "Kunst en geschiedenis van Leiden. Inclusief Rembrandts!",
        categories: ["cultuur", "rust", "warm"],
        emoji: "🖼️",
        address: "Oude Singel 32",
        lat: 52.1610,
        lng: 4.4932,
        urgencyMin: 1
    },
    {
        name: "Rijksmuseum van Oudheden",
        description: "Egyptische mummies en Romeinse vondsten. Super interessant!",
        categories: ["cultuur", "rust", "warm"],
        emoji: "🏛️",
        address: "Rapenburg 28",
        lat: 52.1585,
        lng: 4.4883,
        urgencyMin: 1
    },
    {
        name: "Naturalis",
        description: "Dinosaurussen en een Australische expositie! Perfect uitstapje.",
        categories: ["cultuur", "rust", "warm"],
        emoji: "🦕",
        address: "Darwinweg 2",
        lat: 52.1688,
        lng: 4.4713,
        urgencyMin: 1
    },
    {
        name: "Molen De Valk",
        description: "Beklim deze iconische molen voor een uniek uitzicht.",
        categories: ["cultuur"],
        emoji: "🌬️",
        address: "2e Binnenvestgracht 1",
        lat: 52.1620,
        lng: 4.4807,
        urgencyMin: 1
    },

    // Warm
    {
        name: "Bieb Leiden",
        description: "De bibliotheek is warm, gratis en heeft comfortabele stoelen.",
        categories: ["warm", "rust", "wc"],
        emoji: "📚",
        address: "Nieuwstraat 4",
        lat: 52.1607,
        lng: 4.4905,
        urgencyMin: 2
    },
    {
        name: "Primark",
        description: "Warm, groot en je kunt meteen handschoenen kopen als nodig.",
        categories: ["warm"],
        emoji: "🧤",
        address: "Haarlemmerstraat 168",
        lat: 52.1634,
        lng: 4.4853,
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
    initLocationButton();
});

// ========================================
// Geolocation Functions
// ========================================

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000; // Earth's radius in meters
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
}

function toRad(deg) {
    return deg * (Math.PI / 180);
}

// Request user location
function requestLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation wordt niet ondersteund door je browser'));
            return;
        }

        locationStatus = 'requesting';
        updateLocationUI();

        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                locationStatus = 'granted';
                updateLocationUI();
                resolve(userLocation);
            },
            (error) => {
                locationStatus = 'denied';
                updateLocationUI();
                let message;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        message = 'Je hebt locatietoegang geweigerd. We gebruiken een standaardlocatie.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = 'Locatie niet beschikbaar. We gebruiken een standaardlocatie.';
                        break;
                    case error.TIMEOUT:
                        message = 'Locatieverzoek duurde te lang. We gebruiken een standaardlocatie.';
                        break;
                    default:
                        message = 'Onbekende fout. We gebruiken een standaardlocatie.';
                }
                reject(new Error(message));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    });
}

// Default location (centrum Leiden - Burcht)
function getDefaultLocation() {
    return { lat: 52.1587, lng: 4.4900 };
}

// Get distance to a pitstop
function getDistanceToPitstop(pitstop) {
    const location = userLocation || getDefaultLocation();
    return calculateDistance(location.lat, location.lng, pitstop.lat, pitstop.lng);
}

// Update location UI
function updateLocationUI() {
    const locationIndicator = document.getElementById('location-indicator');
    if (!locationIndicator) return;

    switch (locationStatus) {
        case 'requesting':
            locationIndicator.innerHTML = '<span class="location-dot requesting"></span> Locatie ophalen...';
            break;
        case 'granted':
            locationIndicator.innerHTML = '<span class="location-dot granted"></span> Locatie actief';
            break;
        case 'denied':
            locationIndicator.innerHTML = '<span class="location-dot denied"></span> Standaardlocatie (centrum)';
            break;
        default:
            locationIndicator.innerHTML = '<span class="location-dot"></span> Klik om locatie te delen';
    }
}

// Initialize location button
function initLocationButton() {
    // Add location indicator to the noodstop app
    const noodstopApp = document.querySelector('.noodstop-filters');
    if (noodstopApp) {
        const locationDiv = document.createElement('div');
        locationDiv.className = 'location-request';
        locationDiv.innerHTML = `
            <button id="request-location-btn" class="location-btn">
                <span class="location-icon">📍</span>
                <span>Deel je locatie voor echte afstanden</span>
            </button>
            <p id="location-indicator" class="location-indicator">
                <span class="location-dot"></span> Klik om locatie te delen
            </p>
        `;
        noodstopApp.insertBefore(locationDiv, noodstopApp.firstChild);

        // Add event listener
        document.getElementById('request-location-btn').addEventListener('click', async () => {
            try {
                await requestLocation();
            } catch (error) {
                console.log(error.message);
                // Use default location, already set in the error handler
            }
        });
    }

    // Add CSS for location elements
    const style = document.createElement('style');
    style.textContent = `
        .location-request {
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #667eea15, #764ba215);
            border-radius: 16px;
            text-align: center;
        }

        .location-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 14px 28px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 30px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .location-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .location-icon {
            font-size: 1.3rem;
        }

        .location-indicator {
            margin-top: 12px;
            font-size: 0.9rem;
            color: #666;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .location-dot {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #ccc;
        }

        .location-dot.requesting {
            background: #fdcb6e;
            animation: pulse 1s infinite;
        }

        .location-dot.granted {
            background: #00b894;
        }

        .location-dot.denied {
            background: #e17055;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .distance-live {
            position: relative;
        }

        .distance-live::after {
            content: '📍';
            position: absolute;
            top: -8px;
            right: -8px;
            font-size: 0.7rem;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Scroll Animations
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
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
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;

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

    findBtn.addEventListener('click', async () => {
        resultsContainer.innerHTML = '<div class="loading"></div>';

        // Try to get location if we don't have it yet
        if (!userLocation && locationStatus === 'unknown') {
            try {
                await requestLocation();
            } catch (error) {
                console.log('Gebruikt standaardlocatie:', error.message);
            }
        }

        // Small delay for effect
        setTimeout(() => {
            const results = findPitstops(currentFilter, currentUrgency);
            displayResults(results, resultsContainer);
        }, 600);

        setTimeout(() => {
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 800);
    });
}

// ========================================
// Find Matching Pitstops
// ========================================
function findPitstops(filter, urgency) {
    // Calculate distances for all pitstops
    let matches = pitstops.map(place => ({
        ...place,
        distance: getDistanceToPitstop(place)
    }));

    // Filter by category
    if (filter !== 'all') {
        matches = matches.filter(place => place.categories.includes(filter));
    }

    // Filter by urgency (higher urgency = closer places)
    if (urgency >= 4) {
        matches = matches.filter(place => place.distance <= 400);
    }
    if (urgency >= 5) {
        matches = matches.filter(place => place.distance <= 250);
    }

    // Always sort by distance
    matches.sort((a, b) => a.distance - b.distance);

    // If not urgent, add some randomization to top results
    if (urgency < 3) {
        const topN = Math.min(6, matches.length);
        const top = matches.slice(0, topN);
        const rest = matches.slice(topN);
        for (let i = top.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [top[i], top[j]] = [top[j], top[i]];
        }
        matches = [...top, ...rest];
    }

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

    const isLiveLocation = userLocation !== null;
    const locationNote = isLiveLocation
        ? '📍 Afstanden gebaseerd op jouw locatie'
        : '📍 Afstanden vanaf centrum Leiden';

    let html = `
        <h3 class="results-title">🎯 Jouw reddingsboeien:</h3>
        <p class="results-location-note" style="font-size: 0.85rem; color: #666; margin-bottom: 20px; text-align: center;">
            ${locationNote}
        </p>
    `;

    results.forEach(place => {
        const tags = place.categories.map(cat =>
            `<span class="result-tag">${categoryLabels[cat] || cat}</span>`
        ).join('');

        // Format distance nicely
        const distanceDisplay = place.distance >= 1000
            ? `${(place.distance / 1000).toFixed(1)} km`
            : `${place.distance} m`;

        // Walking time estimate (assuming 5 km/h = 83m per minute)
        const walkingMinutes = Math.ceil(place.distance / 83);
        const walkingTime = walkingMinutes <= 1 ? '< 1 min' : `~${walkingMinutes} min`;

        const distanceClass = isLiveLocation ? 'distance-live' : '';

        // Google Maps link for navigation
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}&travelmode=walking`;

        html += `
            <div class="result-card">
                <div class="result-emoji">${place.emoji}</div>
                <div class="result-info">
                    <h4>${place.name}</h4>
                    <p>${place.description}</p>
                    <p style="font-size: 0.85rem; color: #666;">📍 ${place.address}</p>
                    <div class="result-tags">${tags}</div>
                </div>
                <div class="result-distance ${distanceClass}">
                    <div class="distance-value">${distanceDisplay}</div>
                    <div class="distance-label">🚶 ${walkingTime}</div>
                    <a href="${mapsUrl}" target="_blank" rel="noopener" class="navigate-link" style="font-size: 0.75rem; color: #667eea; text-decoration: none; margin-top: 8px; display: block;">
                        Navigeer →
                    </a>
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
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;

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
