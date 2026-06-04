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

function getSimpleUrl(url) {
    try {
        const parsed = new URL(url);
        return parsed.hostname + parsed.pathname;
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

function createLinkCard(shortcut, redirectEntry, searchTerm = '') {
    const destinationUrl = getRedirectUrl(redirectEntry);
    const description = getRedirectDescription(redirectEntry) || '';
    const shortlinkUrl = getShortlinkUrl(shortcut);
    const faviconUrl = getFaviconUrl(destinationUrl);

    const displayShortcut = highlightMatch(shortcut, searchTerm);
    const displayDescription = highlightMatch(description, searchTerm);

    return `
        <tr title="${destinationUrl}"
            data-shortcut="${shortcut}"
            data-description="${description.toLowerCase()}"
            data-url="${destinationUrl.toLowerCase()}">
            <td class="col-shortcut">
                ${faviconUrl ? `<img src="${faviconUrl}" alt="" class="favicon" onerror="this.style.display='none'">` : ''}
                <a href="${shortlinkUrl}" target="_blank">/${displayShortcut}</a>
            </td>
            <td class="col-description">${displayDescription}</td>
            <td class="col-copy">
                <span class="copy-btn" onclick="copyToClipboard('${shortlinkUrl}')" title="Copy short link">
                    <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                        <path d="M22.6,4H21.55a3.89,3.89,0,0,0-7.31,0H13.4A2.41,2.41,0,0,0,11,6.4V10H25V6.4A2.41,2.41,0,0,0,22.6,4ZM23,8H13V6.25A.25.25,0,0,1,13.25,6h2.69l.12-1.11A1.24,1.24,0,0,1,16.61,4a2,2,0,0,1,3.15,1.18l.09.84h2.9a.25.25,0,0,1,.25.25Z"/>
                        <path d="M33.25,18.06H21.33l2.84-2.83a1,1,0,1,0-1.42-1.42L17.5,19.06l5.25,5.25a1,1,0,0,0,.71.29,1,1,0,0,0,.71-1.7l-2.84-2.84H33.25a1,1,0,0,0,0-2Z"/>
                        <path d="M29,16h2V6.68A1.66,1.66,0,0,0,29.35,5H27.08V7H29Z"/>
                        <path d="M29,31H7V7H9V5H6.64A1.66,1.66,0,0,0,5,6.67V31.32A1.66,1.66,0,0,0,6.65,33H29.36A1.66,1.66,0,0,0,31,31.33V22.06H29Z"/>
                    </svg>
                </span>
            </td>
        </tr>
    `;
}

function highlightMatch(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
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
        
        container.querySelector('tbody').innerHTML = linkCards;
        noResults.style.display = 'none';
        container.style.display = '';
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
            createLinkCard(shortcut, redirectEntry, searchTerm)
        ).join('');
        
        container.querySelector('tbody').innerHTML = linkCards;
        container.style.display = '';
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

    // Pre-fill search from URL param, e.g. ?bio or ?q=bio
    const params = new URLSearchParams(window.location.search);
    const prefill = params.get('q') || [...params.keys()][0] || '';
    if (prefill) {
        const searchInput = document.getElementById('search-input');
        searchInput.value = prefill;
        currentSearchTerm = prefill;
    }

    // Initial render (filtered if prefill set)
    filterLinks(currentSearchTerm);

    // Setup search functionality
    setupSearch();
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', renderLinks);
