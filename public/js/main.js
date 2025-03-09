/**
 * Wanderlust Travel Website
 * Main JavaScript file
 * Implements 4 JavaScript libraries:
 * 1. Glide.js - For destination carousel
 * 2. Leaflet - For interactive map
 * 3. AOS (Animate on Scroll) - For scroll animations
 * 4. Lightbox2 - For image gallery
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize AOS (Animate on Scroll)
    initAOS();
    
    // Initialize Glide.js carousel
    initGlideCarousel();
    
    // Initialize Leaflet map
    initLeafletMap();
    
    // Initialize Lightbox
    initLightbox();
});

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

/**
 * Initialize AOS (Animate on Scroll) library
 * Library #1
 */
function initAOS() {
    // Initialize with default options
    AOS.init({
        duration: 800,     // Animation duration in ms
        easing: 'ease',    // Animation timing function
        once: true,        // Whether animation should happen only once
        offset: 100,       // Offset (in px) from the original trigger point
        delay: 0,          // Animation delay in ms
        anchorPlacement: 'top-bottom' // Define which position of the element regarding to window should trigger the animation
    });
    
    console.log('AOS initialized successfully');
}

/**
 * Initialize Glide.js carousel
 * Library #2
 */
function initGlideCarousel() {
    // Check if Glide carousel element exists
    const glideElement = document.querySelector('.glide');
    
    if (glideElement) {
        // Create new Glide instance
        const glide = new Glide('.glide', {
            type: 'carousel',     // Type of the slider
            startAt: 0,           // Start at first slide
            perView: 3,           // Number of slides per view
            gap: 20,              // Gap between slides in px
            autoplay: 4000,       // Autoplay interval in ms
            hoverpause: true,     // Pause on hover
            bound: true,          // Don't allow going beyond the last slide
            animationDuration: 800, // Animation duration in ms
            animationTimingFunc: 'ease', // Animation timing function
            breakpoints: {
                992: {
                    perView: 2    // 2 slides per view on tablets
                },
                576: {
                    perView: 1    // 1 slide per view on mobile
                }
            }
        });
        
        // Mount the Glide instance
        glide.mount();
        console.log('Glide.js carousel initialized successfully');
    }
}

/**
 * Initialize Leaflet map
 * Library #3
 */
function initLeafletMap() {
    // Check if map element exists
    const mapElement = document.getElementById('map');
    
    if (mapElement) {
        // Initialize map centered at [20, 0] with zoom level 2
        const map = L.map('map').setView([20, 0], 2);
        
        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(map);
        
        // Add destination markers
        addDestinationMarkers(map);
        
        console.log('Leaflet map initialized successfully');
    }
}

/**
 * Add destination markers to the Leaflet map
 * @param {L.Map} map - Leaflet map instance
 */
function addDestinationMarkers(map) {
    // Define destination coordinates
    const destinations = [
        { name: 'Bali, Indonesia', coords: [-8.409518, 115.188919], rating: '4.8' },
        { name: 'Paris, France', coords: [48.856614, 2.352222], rating: '4.7' },
        { name: 'Santorini, Greece', coords: [36.393154, 25.461510], rating: '4.9' },
        { name: 'Kyoto, Japan', coords: [35.011665, 135.768326], rating: '4.6' },
        { name: 'New York, USA', coords: [40.712776, -74.005974], rating: '4.5' }
    ];
    
    // Create custom marker icon
    const customIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    
    // Add markers for each destination
    destinations.forEach(dest => {
        L.marker(dest.coords, { icon: customIcon })
            .addTo(map)
            .bindPopup(`
                <div class="map-popup">
                    <h3>${dest.name}</h3>
                    <p><i class="fas fa-star" style="color: gold;"></i> ${dest.rating}/5.0</p>
                    <button class="btn-small">View Details</button>
                </div>
            `);
    });
}

/**
 * Initialize Lightbox2 for the gallery
 * Library #4
 */
function initLightbox() {
    // Configure Lightbox options
    lightbox.option({
        'resizeDuration': 300,      // Duration of the resize animation
        'wrapAround': true,         // Loop back to the first image
        'disableScrolling': true,   // Prevent page scrolling when lightbox is open
        'albumLabel': 'Image %1 of %2', // Customize image count text
        'fadeDuration': 300,        // Duration of the fade animation
        'fitImagesInViewport': true, // Fit images in viewport
        'maxWidth': 1000,           // Maximum width of the image
        'maxHeight': 800            // Maximum height of the image
    });
    
    console.log('Lightbox initialized successfully');
}