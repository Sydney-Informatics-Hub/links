// Helper function to get URL from redirect entry
function getRedirectUrl(entry) {
  return typeof entry === 'string' ? entry : entry.url;
}

// Helper function to get description from redirect entry
function getRedirectDescription(entry) {
  return typeof entry === 'string' ? '' : (entry.description || '');
}

// Global variables for search
let allLinks = [];
let currentSearchTerm = '';

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

function createLinkCard(shortcut, redirectEntry) {
    const destinationUrl = getRedirectUrl(redirectEntry);
    const description = getRedirectDescription(redirectEntry);
    const shortlinkUrl = getShortlinkUrl(shortcut);
    const destinationDomain = getDomainFromUrl(destinationUrl);
    const faviconUrl = getFaviconUrl(destinationUrl);
    
    return `
        <div class="link-card" title="${destinationUrl}" data-shortcut="${shortcut}" data-description="${description.toLowerCase()}" data-url="${destinationUrl.toLowerCase()}" data-domain="${destinationDomain.toLowerCase()}">
            <div class="link-header">
                ${faviconUrl ? `<img src="${faviconUrl}" alt="" class="favicon" onerror="this.style.display='none'">` : ''}
                <div class="link-shortcut">/${shortcut}</div>
            </div>
            <div class="link-destination">→ ${destinationDomain}</div>
            ${description ? `<div class="link-description">${description}</div>` : ''}
            <div class="link-actions" role="group">
                <button onclick="copyToClipboard('${shortlinkUrl}')" title="Copy short link">
                    📋 Copy
                </button>
                <button class="secondary" onclick="window.open('${shortlinkUrl}', '_blank')" title="Visit ${destinationUrl}">
                    🔗 Visit
                </button>
            </div>
        </div>
    `;
}

function highlightMatch(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function createLinkCardWithHighlight(shortcut, redirectEntry, searchTerm) {
    const destinationUrl = getRedirectUrl(redirectEntry);
    const description = getRedirectDescription(redirectEntry);
    const shortlinkUrl = getShortlinkUrl(shortcut);
    const destinationDomain = getDomainFromUrl(destinationUrl);
    const faviconUrl = getFaviconUrl(destinationUrl);
    
    // Highlight matches in displayed text
    const highlightedShortcut = highlightMatch(shortcut, searchTerm);
    const highlightedDescription = highlightMatch(description, searchTerm);
    const highlightedDomain = highlightMatch(destinationDomain, searchTerm);
    
    return `
        <div class="link-card" title="${destinationUrl}" data-shortcut="${shortcut}" data-description="${description.toLowerCase()}" data-url="${destinationUrl.toLowerCase()}" data-domain="${destinationDomain.toLowerCase()}">
            <div class="link-header">
                ${faviconUrl ? `<img src="${faviconUrl}" alt="" class="favicon" onerror="this.style.display='none'">` : ''}
                <div class="link-shortcut">/${highlightedShortcut}</div>
            </div>
            <div class="link-destination">→ ${highlightedDomain}</div>
            ${description ? `<div class="link-description">${highlightedDescription}</div>` : ''}
            <div class="link-actions">
                <button onclick="copyToClipboard('${shortlinkUrl}')" title="Copy short link">
                    📋 Copy
                </button>
                <button class="secondary" onclick="window.open('${shortlinkUrl}', '_blank')" title="Visit ${destinationUrl}">
                    🔗 Visit
                </button>
            </div>
        </div>
    `;
}

function filterLinks(searchTerm) {
    const container = document.getElementById('links-container');
    const noResults = document.getElementById('no-results');
    const searchResultsCount = document.getElementById('search-results-count');
    
    if (!searchTerm.trim()) {
        // Show all links
        const linkCards = allLinks.map(([shortcut, redirectEntry]) => 
            createLinkCard(shortcut, redirectEntry)
        ).join('');
        
        container.innerHTML = linkCards;
        noResults.style.display = 'none';
        container.style.display = 'grid';
        searchResultsCount.textContent = '';
        return;
    }
    
    // Filter links
    const filteredLinks = allLinks.filter(([shortcut, redirectEntry]) => {
        const destinationUrl = getRedirectUrl(redirectEntry);
        const description = getRedirectDescription(redirectEntry);
        const destinationDomain = getDomainFromUrl(destinationUrl);
        
        const searchLower = searchTerm.toLowerCase();
        return (
            shortcut.toLowerCase().includes(searchLower) ||
            description.toLowerCase().includes(searchLower) ||
            destinationUrl.toLowerCase().includes(searchLower) ||
            destinationDomain.toLowerCase().includes(searchLower)
        );
    });
    
    if (filteredLinks.length === 0) {
        container.style.display = 'none';
        noResults.style.display = 'block';
        searchResultsCount.textContent = 'No results found';
    } else {
        const linkCards = filteredLinks.map(([shortcut, redirectEntry]) => 
            createLinkCardWithHighlight(shortcut, redirectEntry, searchTerm)
        ).join('');
        
        container.innerHTML = linkCards;
        container.style.display = 'grid';
        noResults.style.display = 'none';
        
        const resultText = filteredLinks.length === 1 ? 'result' : 'results';
        searchResultsCount.textContent = `${filteredLinks.length} ${resultText} found`;
    }

}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
 
    // Real-time search as user types
    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value;
        filterLinks(currentSearchTerm);
    });
    
    // Handle Enter key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Maybe focus first result or do something else
        }
    });
    
    // Handle Escape key to clear search
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            currentSearchTerm = '';
            filterLinks('');
        }
    });
}

function renderLinks() {
    // Store all links for searching
    allLinks = Object.entries(REDIRECTS).sort(([a], [b]) => a.localeCompare(b));
    
    // Initial render of all links
    filterLinks('');
    
    // Setup search functionality
    setupSearch();
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', renderLinks);
