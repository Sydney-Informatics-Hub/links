// Search and filter state
let allLinks = [];
let filteredLinks = [];
let currentSearchTerm = '';

// Helper function to get URL from redirect entry
function getRedirectUrl(entry) {
  return typeof entry === 'string' ? entry : entry.url;
}

// Helper function to get description from redirect entry
function getRedirectDescription(entry) {
  return typeof entry === 'string' ? '' : (entry.description || '');
}

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
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Link copied to clipboard!');
    }).catch(() => {
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

function getSearchableTerms(shortcut, redirectEntry) {
    const url = getRedirectUrl(redirectEntry);
    const description = getRedirectDescription(redirectEntry);
    const domain = getDomainFromUrl(url);
    
    return [
        shortcut,
        description,
        url,
        domain
    ].filter(Boolean).join(' ').toLowerCase();
}

function searchLinks(searchTerm) {
    currentSearchTerm = searchTerm.toLowerCase().trim();
    
    if (!currentSearchTerm) {
        filteredLinks = [...allLinks];
    } else {
        filteredLinks = allLinks.filter(link => 
            link.searchableText.includes(currentSearchTerm)
        );
    }
    
    renderFilteredLinks();
    updateSearchStats();
}

//function generateFilterTags() {
//    const domains = [...new Set(allLinks.map(link => link.domain))];
//    const tagContainer = document.getElementById('filter-tags');
//    
//    if (domains.length <= 1) {
//        tagContainer.style.display = 'none';
//        return;
//    }
//    
//    tagContainer.style.display = 'block';
//    tagContainer.innerHTML = domains.map(domain => 
//        `<button class="filter-tag" data-domain="${domain}">${domain}</button>`
//    ).join('');
//    
//    // Add event listeners to filter tags
//    tagContainer.querySelectorAll('.filter-tag').forEach(tag => {
//        tag.addEventListener('click', () => {
//            const domain = tag.dataset.domain;
//            const searchInput = document.getElementById('search-input');
//            searchInput.value = domain;
//            searchLinks(domain);
//            
//            // Update active state
//            tagContainer.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
//            tag.classList.add('active');
//        });
//    });
//}

function clearSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';
    searchLinks('');
    
    // Clear active filter tags
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.classList.remove('active');
    });
}

function updateSearchStats() {
    const searchStats = document.getElementById('search-stats');
    const noResults = document.getElementById('no-results');
    const linksContainer = document.getElementById('links-container');
    
    if (currentSearchTerm) {
        if (filteredLinks.length === 0) {
            searchStats.innerHTML = `No results for "${currentSearchTerm}"`;
            noResults.style.display = 'block';
            linksContainer.style.display = 'none';
        } else {
            searchStats.innerHTML = `${filteredLinks.length} result${filteredLinks.length !== 1 ? 's' : ''} for "${currentSearchTerm}"`;
            noResults.style.display = 'none';
            linksContainer.style.display = 'grid';
        }
    } else {
        searchStats.innerHTML = '';
        noResults.style.display = 'none';
        linksContainer.style.display = 'grid';
    }
}

function renderFilteredLinks() {
    const container = document.getElementById('links-container');
    
    const linkCards = filteredLinks.map(link => {
        const faviconUrl = getFaviconUrl(link.url);
        
        return `
            <div class="link-card" title="${link.url}">
                <div class="link-header">
                    ${faviconUrl ? `<img src="${faviconUrl}" alt="" class="favicon" onerror="this.style.display='none'">` : ''}
                    <div class="link-shortcut">/${link.shortcut}</div>
                </div>
                <div class="link-destination">→ ${link.domain}</div>
                ${link.description ? `<div class="link-description">${link.description}</div>` : ''}
                <div class="link-actions">
                    <button class="copy-btn" onclick="copyToClipboard('${link.shortlinkUrl}')" title="Copy short link">
                        📋 Copy
                    </button>
                    <button class="visit-btn" onclick="window.open('${link.shortlinkUrl}', '_blank')" title="Visit ${link.url}">
                        🔗 Visit
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = linkCards;
}

function initializeLinks() {
    // Process all links into searchable format
    allLinks = Object.entries(REDIRECTS)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([shortcut, redirectEntry]) => {
            const url = getRedirectUrl(redirectEntry);
            const description = getRedirectDescription(redirectEntry);
            const domain = getDomainFromUrl(url);
            const shortlinkUrl = getShortlinkUrl(shortcut);
            const searchableText = getSearchableTerms(shortcut, redirectEntry);
            
            return {
                shortcut,
                url,
                description,
                domain,
                shortlinkUrl,
                searchableText
            };
        });
    
    filteredLinks = [...allLinks];
}

function renderLinks() {
    const linkCount = document.getElementById('link-count');
    const currentDomain = document.getElementById('current-domain');
    
    // Initialize links data
    initializeLinks();
    
    // Update domain info
    currentDomain.textContent = getCurrentDomain();
    
    // Update count
    const count = allLinks.length;
    linkCount.textContent = `${count} Link${count !== 1 ? 's' : ''} Available`;
    
    // Generate filter tags
    // generateFilterTags();
    
    // Render links
    renderFilteredLinks();
    updateSearchStats();
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-search');
    const resetBtn = document.getElementById('reset-search');
    
    // Search input event listeners
    searchInput.addEventListener('input', (e) => {
        searchLinks(e.target.value);
    });
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            clearSearch();
        }
    });
    
    // Clear button
    clearBtn.addEventListener('click', clearSearch);
    
    // Reset button in no results
    if (resetBtn) {
        resetBtn.addEventListener('click', clearSearch);
    }
    
    // Update clear button visibility
    searchInput.addEventListener('input', () => {
        clearBtn.style.display = searchInput.value ? 'block' : 'none';
    });
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderLinks();
    initializeSearch();
});
