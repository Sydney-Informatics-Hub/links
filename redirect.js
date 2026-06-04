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
        return pathname.substring(1).replace(/\/$/, '').toLowerCase();
    }

    // If accessing via GitHub Pages (my-org.github.io)
    if (hostname.includes('github.io')) {
        // Path is /links/shortlink, so remove /links/ prefix
        const parts = pathname.split('/');
        if (parts.length >= 3 && parts[1] === 'links') {
            return parts[2].replace(/\/$/, '').toLowerCase();
        }
        // If somehow accessing /links/ directly, redirect to catch-all
        return '';
    }

    // Fallback
    return pathname.substring(1).replace(/\/$/, '').toLowerCase();
}

const shortlink = getShortlink();
const redirectEntry = REDIRECTS[shortlink];

let redirectUrl;
if (redirectEntry) {
    redirectUrl = getRedirectUrl(redirectEntry);
} else {
    // No match — send to directory search so user can find what they wanted
    const base = window.location.hostname.includes('github.io')
        ? `/${window.location.pathname.split('/')[1]}/`
        : '/';
    redirectUrl = `${window.location.protocol}//${window.location.hostname}${base}?q=${encodeURIComponent(shortlink)}`;
}

window.location.replace(redirectUrl);