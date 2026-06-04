// Import the original script functionality
let allLinks = [];
let currentSearchTerm = '';
let editingShortcut = null;
let pendingChanges = {};

// Initialize edit mode
function initEditMode() {
    // Copy all links for editing
    allLinks = Object.entries(REDIRECTS).sort(([a], [b]) => a.localeCompare(b));
    pendingChanges = { ...REDIRECTS };
    
    // Render links in edit mode
    renderEditLinks();
    
    // Setup search functionality
    setupSearch();
    
    // Setup modal handlers
    setupModals();
}

// Render links with edit controls
function renderEditLinks() {
    filterEditLinks('');
}

function filterEditLinks(searchTerm) {
    const container = document.getElementById('links-container');
    const noResults = document.getElementById('no-results');
    const searchResultsCount = document.getElementById('search-results-count');
    
    if (!searchTerm.trim()) {
        // Show all links
        const linkCards = allLinks.map(([shortcut, redirectEntry]) => 
            createEditLinkCard(shortcut, redirectEntry)
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
            createEditLinkCard(shortcut, redirectEntry, searchTerm)
        ).join('');
        
        container.innerHTML = linkCards;
        container.style.display = 'grid';
        noResults.style.display = 'none';
        
        const resultText = filteredLinks.length === 1 ? 'result' : 'results';
        searchResultsCount.textContent = `${filteredLinks.length} ${resultText} found`;
    }
}

function createEditLinkCard(shortcut, redirectEntry, searchTerm = '') {
    const destinationUrl = getRedirectUrl(redirectEntry);
    const description = getRedirectDescription(redirectEntry) || '';
    const shortlinkUrl = getShortlinkUrl(shortcut);
    const destinationDomain = getDomainFromUrl(destinationUrl);
    const faviconUrl = getFaviconUrl(destinationUrl);

    const displayShortcut = highlightMatch(shortcut, searchTerm);
    const displayDescription = highlightMatch(description, searchTerm);
    const displayUrl = highlightMatch(getSimpleUrl(destinationUrl), searchTerm);

    return `
        <article title="${destinationUrl}" 
             data-shortcut="${shortcut}" 
             data-description="${description.toLowerCase()}" 
             data-url="${destinationUrl.toLowerCase()}" 
             data-domain="${destinationDomain.toLowerCase()}">
             
            <header>
                ${faviconUrl ? `<img src="${faviconUrl}" alt="" class="favicon" onerror="this.style.display='none'">` : ''}
                /${displayShortcut}
                <br>
                <small>→ ${displayUrl}</small>
            </header>
            
            ${description ? `<div class="link-description">${displayDescription}</div>` : ''}
            
            <footer>
                <button onclick="copyToClipboard('${shortlinkUrl}')" title="Copy short link" class="secondary">
                    📋 Copy
                </button>
                <button onclick="window.open('${shortlinkUrl}', '_blank')" title="Visit ${destinationUrl}" class="secondary">
                    🔗 Visit
                </button>
                <button onclick="editLink('${shortcut}')" title="Edit this link">
                    ✏️ Edit
                </button>
                <button onclick="deleteLink('${shortcut}')" title="Delete this link" class="secondary">
                    🗑️ Delete
                </button>
            </footer>
        </article>
    `;
}

// Modal setup
function setupModals() {
    const addLinkBtn = document.getElementById('add-link-btn');
    const linkModal = document.getElementById('link-modal');
    const deleteModal = document.getElementById('delete-modal');
    const previewModal = document.getElementById('preview-modal');
    const linkForm = document.getElementById('link-form');
    
    // Add link button
    addLinkBtn.addEventListener('click', () => {
        openLinkModal();
    });
    
    // Modal close buttons
    document.getElementById('modal-close').addEventListener('click', () => {
        linkModal.close();
    });
    
    document.getElementById('modal-cancel').addEventListener('click', () => {
        linkModal.close();
    });
    
    document.getElementById('delete-cancel').addEventListener('click', () => {
        deleteModal.close();
    });
    
    document.getElementById('preview-close').addEventListener('click', () => {
        previewModal.close();
    });
    
    document.getElementById('preview-cancel').addEventListener('click', () => {
        previewModal.close();
    });
    
    // Form submission
    linkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveLinkChanges();
    });
    
    // Delete confirmation
    document.getElementById('delete-confirm').addEventListener('click', () => {
        confirmDelete();
    });
    
    // Preview submission
    document.getElementById('preview-submit').addEventListener('click', () => {
        submitToGitHub();
    });
}

// Link editing functions
function openLinkModal(shortcut = null) {
    const modal = document.getElementById('link-modal');
    const title = document.getElementById('modal-title');
    const shortcutInput = document.getElementById('shortcut');
    const urlInput = document.getElementById('url');
    const descriptionInput = document.getElementById('description');
    
    editingShortcut = shortcut;
    
    if (shortcut) {
        // Edit existing link
        title.textContent = 'Edit Link';
        const redirectEntry = pendingChanges[shortcut];
        shortcutInput.value = shortcut;
        shortcutInput.disabled = true; // Don't allow changing shortcut when editing
        urlInput.value = getRedirectUrl(redirectEntry);
        descriptionInput.value = getRedirectDescription(redirectEntry);
    } else {
        // Add new link
        title.textContent = 'Add New Link';
        shortcutInput.disabled = false;
        shortcutInput.value = '';
        urlInput.value = '';
        descriptionInput.value = '';
    }
    
    modal.showModal();
    shortcutInput.focus();
}

function editLink(shortcut) {
    openLinkModal(shortcut);
}

function deleteLink(shortcut) {
    const modal = document.getElementById('delete-modal');
    const linkName = document.getElementById('delete-link-name');
    
    linkName.textContent = shortcut;
    editingShortcut = shortcut;
    modal.showModal();
}

function confirmDelete() {
    if (editingShortcut) {
        delete pendingChanges[editingShortcut];
        allLinks = Object.entries(pendingChanges).sort(([a], [b]) => a.localeCompare(b));
        renderEditLinks();
        document.getElementById('delete-modal').close();
        showToast(`Link "${editingShortcut}" deleted`);
        editingShortcut = null;
    }
}

function saveLinkChanges() {
    const shortcut = document.getElementById('shortcut').value.trim();
    const url = document.getElementById('url').value.trim();
    const description = document.getElementById('description').value.trim();
    
    if (!shortcut || !url) {
        showToast('Shortcut and URL are required');
        return;
    }
    
    // Check for duplicate shortcuts (only if adding new or changing shortcut)
    if ((!editingShortcut || editingShortcut !== shortcut) && pendingChanges[shortcut]) {
        showToast('A link with this shortcut already exists');
        return;
    }
    
    // Remove old entry if editing and shortcut changed
    if (editingShortcut && editingShortcut !== shortcut) {
        delete pendingChanges[editingShortcut];
    }
    
    // Add/update link
    pendingChanges[shortcut] = {
        url: url,
        description: description
    };
    
    // Update allLinks array
    allLinks = Object.entries(pendingChanges).sort(([a], [b]) => a.localeCompare(b));
    
    // Re-render
    renderEditLinks();
    
    // Close modal
    document.getElementById('link-modal').close();
    
    // Show success message
    const action = editingShortcut ? 'updated' : 'added';
    showToast(`Link "${shortcut}" ${action} successfully`);
    
    editingShortcut = null;
}

// Preview and submit functions
function previewChanges() {
    const modal = document.getElementById('preview-modal');
    const previewCode = document.getElementById('preview-code');
    
    const newContent = generateLinksJsContent();
    previewCode.textContent = newContent;
    
    modal.showModal();
}

function generateLinksJsContent() {
    const redirectsContent = Object.entries(pendingChanges)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([shortcut, entry]) => {
            const url = getRedirectUrl(entry);
            const description = getRedirectDescription(entry);
            return `  '${shortcut}': {
    url: '${url}',
    description: '${description}'
  }`;
        }).join(',\n');
    
    return `// Redirect links
const REDIRECTS = {
${redirectsContent}
};

// Template:
//,
//  'shortlink': {
//    url:'',
//    description:''
//     }
//


// Catch-all URL for unmatched paths
const CATCH_ALL_URL = 'https://informatics.sydney.edu.au';`;
}

function submitToGitHub() {
    const newContent = generateLinksJsContent();
    const encodedContent = encodeURIComponent(newContent);
    
    // Create GitHub edit URL
    const githubEditUrl = `https://github.com/Sydney-Informatics-Hub/links/edit/main/links.js`;
    
    // Open GitHub edit page
    window.open(githubEditUrl, '_blank');
    
    // Close preview modal
    document.getElementById('preview-modal').close();
    
    // Show instructions
    showToast('Opening GitHub editor. Copy the generated content and paste it into the editor.');
    
    // Copy content to clipboard for convenience
    navigator.clipboard.writeText(newContent).then(() => {
        setTimeout(() => {
            showToast('Content copied to clipboard for easy pasting!');
        }, 2000);
    });
}

// Search functionality (reuse from original script)
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value;
        filterEditLinks(currentSearchTerm);
    });
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            currentSearchTerm = '';
            filterEditLinks('');
        }
    });
}

// Helper functions (reuse from original script)
function getRedirectUrl(entry) {
    return typeof entry === 'string' ? entry : entry.url;
}

function getRedirectDescription(entry) {
    return typeof entry === 'string' ? '' : (entry.description || '');
}

function getShortlinkUrl(shortcut) {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    if (hostname.includes('github.io')) {
        return `${protocol}//${hostname}/links/${shortcut}`;
    }
    return `${protocol}//${hostname}/${shortcut}`;
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

function highlightMatch(text, searchTerm) {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
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
    }, 3000);
}

// Add a button to the main page to show preview
function addPreviewButton() {
    const header = document.querySelector('header');
    const previewBtn = document.createElement('button');
    previewBtn.textContent = '👁️ Preview Changes';
    previewBtn.className = 'contrast';
    previewBtn.style.marginLeft = '1rem';
    previewBtn.addEventListener('click', previewChanges);
    
    const addBtn = document.getElementById('add-link-btn');
    addBtn.parentNode.insertBefore(previewBtn, addBtn.nextSibling);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initEditMode();
    addPreviewButton();
});