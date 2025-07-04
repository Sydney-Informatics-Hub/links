// Main application functions
function getCurrentDomain() {
    const hostname = window.location.hostname;
    if (hostname.includes('github.io')) {
        return hostname + '/links';
    }
    return hostname;
}

function getShortlinkUrl(shortcut) {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    if (hostname.includes('github.io')) {
        return `${protocol}//${hostname}/links/${shortcut}`;
    }
    return `${protocol}//${hostname}/${shortcut}`;
}

function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide and remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Link copied to clipboard!');
    }).catch(() => {
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Link copied to clipboard!');
    });
}

function getDomainFromUrl(url) {
    try {
        return new URL(url).hostname;
    } catch {
        return url;
    }
}

function getFaviconUrl(url) {
    try {
        const domain = new URL(url).origin;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
        return null;
    }
}

// Helper function to get URL from redirect entry
function getRedirectUrl(entry) {
  return typeof entry === 'string' ? entry : entry.url;
}

// Helper function to get description from redirect entry
function getRedirectDescription(entry) {
  return typeof entry === 'string' ? '' : (entry.description || '');
}

function renderLinks() {
    const container = document.getElementById('links-container');
    const linkCount = document.getElementById('link-count');
    const currentDomain = document.getElementById('current-domain');
    
    // Update domain info
    currentDomain.textContent = getCurrentDomain();
    
    // Update count
    const count = Object.keys(REDIRECTS).length;
    linkCount.textContent = `${count} Link${count !== 1 ? 's' : ''} Available`;
    
    // Generate link cards
    const linkCards = Object.entries(REDIRECTS)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([shortcut, redirectEntry]) => {
            const destinationUrl = getRedirectUrl(redirectEntry);
            const description = getRedirectDescription(redirectEntry);
            const shortlinkUrl = getShortlinkUrl(shortcut);
            const destinationDomain = getDomainFromUrl(destinationUrl);
            const faviconUrl = getFaviconUrl(destinationUrl);
            
            // In the renderLinks function, replace the link-actions div with:
            return `
                <div class="link-card" title="${destinationUrl}">
                    <div class="link-header">
                        ${faviconUrl ? `<img src="${faviconUrl}" alt="" class="favicon" onerror="this.style.display='none'">` : ''}
                        <div class="link-shortcut">/${shortcut}</div>
                    </div>
                    <div class="link-destination">→ ${destinationDomain}</div>
                    ${description ? `<div class="link-description">${description}</div>` : ''}
                    <div class="link-actions">
                        <button class="copy-btn" onclick="copyToClipboard('${shortlinkUrl}')" title="Copy link ${shortlinkUrl}">
                            📋 Copy
                        </button>
                        <button class="visit-btn" onclick="window.open('${shortlinkUrl}', '_blank')" title="Visit ${destinationUrl}">
                            🔗 Visit
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    
    container.innerHTML = linkCards;
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', renderLinks);