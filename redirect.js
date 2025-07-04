// Helper function to get URL from redirect entry
function getRedirectUrl(entry) {
  return typeof entry === 'string' ? entry : entry.url;
}

// Helper function to get description from redirect entry
function getRedirectDescription(entry) {
  return typeof entry === 'string' ? '' : (entry.description || '');
}

// Get address in url bar
function getShortlink() {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    // If accessing via custom domain
    if (hostname === 'sih.tools') {
        // Path is /shortlink, so remove leading slash
        return pathname.substring(1).toLowerCase();
    }
    
    // If accessing via GitHub Pages (my-org.github.io)
    if (hostname.includes('github.io')) {
        // Path is /links/shortlink, so remove /links/ prefix
        const parts = pathname.split('/');
        if (parts.length >= 3 && parts[1] === 'links') {
            return parts[2].toLowerCase();
        }
        // If somehow accessing /links/ directly, redirect to catch-all
        return '';
    }
    
    // Fallback
    return pathname.substring(1).toLowerCase();
}

const shortlink = getShortlink();
const redirectEntry = REDIRECTS[shortlink];
const redirectUrl = redirectEntry ? getRedirectUrl(redirectEntry) : CATCH_ALL_URL;

// Redirect immediately
window.location.replace(redirectUrl);