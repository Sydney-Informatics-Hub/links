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
        .map(([shortcut, destination]) => {
            const shortlinkUrl = getShortlinkUrl(shortcut);
            const destinationDomain = getDomainFromUrl(destination);
            
            return `
                <div class="link-card">
                    <div class="link-shortcut">/${shortcut}</div>
                    <div class="link-destination">→ ${destinationDomain}</div>
                    <button class="copy-btn" onclick="copyToClipboard('${shortlinkUrl}')" data-tooltip="Copy short link">
                        📋 Copy Link
                    </button>
                    <a href="${shortlinkUrl}" target="_blank" role="button" class="outline" style="margin-left: 0.5rem;">
                        🔗 Visit
                    </a>
                </div>
            `;
        }).join('');
    
    container.innerHTML = linkCards;
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', renderLinks);