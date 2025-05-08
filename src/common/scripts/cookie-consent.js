// Cookie Consent Manager

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the cookie consent manager
    initCookieConsent();
    
    // Listen for language changes to update the cookie consent text
    document.addEventListener('languageChanged', function(e) {
        // Update the text if the cookie consent popup is visible
        updateCookieConsentText();
    });
});

// Function to initialize cookie consent
function initCookieConsent() {
    // Check if user has already made a cookie choice
    if (!getCookie('cookie_consent')) {
        // If no cookie found, show the popup after a short delay
        setTimeout(function() {
            showCookieConsent();
        }, 1500);
    }
}

// Function to check if cookies are accepted
function areCookiesAccepted() {
    return getCookie('cookie_consent') === 'accepted';
}

// Function to display the cookie consent popup
function showCookieConsent() {
    const cookieConsentElement = document.getElementById('cookie-consent');
    
    if (cookieConsentElement) {
        // Add the show class to fade in the popup
        cookieConsentElement.classList.add('show');
    } else {
        // If the element doesn't exist, create it
        createCookieConsentElement();
    }
}

// Function to create the cookie consent element
function createCookieConsentElement() {
    // Get the current language
    const currentLang = localStorage.getItem('language') || 'en';
    
    // Get translations
    const translations = window.i18n && window.i18n[currentLang] ? window.i18n[currentLang] : window.i18n.en;
    const cookieTexts = translations.common.cookies;
    
    // Create the main container
    const cookieConsent = document.createElement('div');
    cookieConsent.id = 'cookie-consent';
    cookieConsent.className = 'cookie-consent';
    
    // Create the content
    cookieConsent.innerHTML = `
        <div class="cookie-consent-header">
            <span class="cookie-consent-icon">🍪</span>
            <h3 data-i18n="common.cookies.title">${cookieTexts.title}</h3>
        </div>
        <div class="cookie-consent-body">
            <p data-i18n="common.cookies.message">${cookieTexts.message}</p>
        </div>
        <div class="cookie-consent-actions">
            <button id="customize-cookies" class="cookie-consent-btn customize" data-i18n="common.cookies.customize">${cookieTexts.customize}</button>
            <button id="accept-cookies" class="cookie-consent-btn accept" data-i18n="common.cookies.acceptAll">${cookieTexts.acceptAll}</button>
        </div>
    `;
    
    // Append to the body
    document.body.appendChild(cookieConsent);
    
    // Add the show class with a slight delay for animation
    setTimeout(function() {
        cookieConsent.classList.add('show');
    }, 100);
    
    // Add event listeners
    document.getElementById('accept-cookies').addEventListener('click', function() {
        acceptAllCookies();
    });
    
    document.getElementById('customize-cookies').addEventListener('click', function() {
        // Redirect to the privacy policy page with correct path
        // Need to handle different paths based on where the script is called from
        const isHomePage = window.location.pathname.endsWith('/') 
            || window.location.pathname.endsWith('/index.html');
        
        if (isHomePage) {
            window.location.href = 'src/common/privacy.html';
        } else {
            // We're likely in a subpage, so use the relative path
            window.location.href = '../common/privacy.html';
        }
    });
}

// Function to update the cookie consent text when language changes
function updateCookieConsentText() {
    const cookieConsentElement = document.getElementById('cookie-consent');
    
    if (cookieConsentElement) {
        const currentLang = localStorage.getItem('language') || 'en';
        const translations = window.i18n && window.i18n[currentLang] ? window.i18n[currentLang] : window.i18n.en;
        const cookieTexts = translations.common.cookies;
        
        // Update the text elements
        const titleElement = cookieConsentElement.querySelector('[data-i18n="common.cookies.title"]');
        const messageElement = cookieConsentElement.querySelector('[data-i18n="common.cookies.message"]');
        const customizeElement = cookieConsentElement.querySelector('[data-i18n="common.cookies.customize"]');
        const acceptElement = cookieConsentElement.querySelector('[data-i18n="common.cookies.acceptAll"]');
        
        if (titleElement) titleElement.textContent = cookieTexts.title;
        if (messageElement) messageElement.textContent = cookieTexts.message;
        if (customizeElement) customizeElement.textContent = cookieTexts.customize;
        if (acceptElement) acceptElement.textContent = cookieTexts.acceptAll;
    }
}

// Function to accept all cookies
function acceptAllCookies() {
    // Set the cookie to store user's consent
    setCookie('cookie_consent', 'accepted', 365); // Cookie lasts for 365 days
    
    // Hide the popup
    hideCookieConsent();
    
    // You can implement additional logic here to enable various cookies or tracking
    console.log('All cookies accepted');
}

// Function to hide the cookie consent popup
function hideCookieConsent() {
    const cookieConsentElement = document.getElementById('cookie-consent');
    
    if (cookieConsentElement) {
        cookieConsentElement.classList.remove('show');
        
        // Remove the element after animation completes
        setTimeout(function() {
            cookieConsentElement.classList.add('hide');
        }, 300);
    }
}

// Helper function to set a cookie
function setCookie(name, value, days) {
    let expires = '';
    
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    
    document.cookie = name + '=' + value + expires + '; path=/; SameSite=Lax';
}

// Helper function to get a cookie value
function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    
    return null;
}

// Helper function to delete a cookie
function deleteCookie(name) {
    setCookie(name, '', -1);
}

// Export functions for use in other scripts if needed
window.cookieConsent = {
    show: showCookieConsent,
    hide: hideCookieConsent,
    accept: acceptAllCookies,
    areCookiesAccepted: areCookiesAccepted
}; 