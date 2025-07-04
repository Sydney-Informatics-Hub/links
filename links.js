// Redirect links
const REDIRECTS = {
  'jira': {
    url: 'https://ctdshub.atlassian.net/jira/software/c/projects/PIPE/boards/27',
    description: 'SIH JIRA Project management and issue tracking'
  },
  'sharepoint': {
    url: 'https://unisyd.sharepoint.com/:f:/r/teams/SydneyInformaticsHub2/Shared%20Documents/1%20SIH%20Central%20Document%20Repository',
    description: 'SIH Central document repository'
  },
  'chat': {
    url: 'http://10.122.246.109:3000',
    description: 'Internal OpenWebUI chat server  (needs VPN to access)'
  },
  'label': {
    url: 'http://10.167.67.78:8080',
    description: 'Labelstudio deployment (needs VPN to access)'
  },
  'gpu-eoi': {
    url: 'https://forms.office.com/r/kmn4P1WNjq',
    description: 'GPU access expression of interest form'
  },
  'collections-eoi': {
    url: 'https://forms.cloud.microsoft/r/hAs6drJ3xQ',
    description: 'Curated Collections platform expression of interest form'
  },
  'github-internal': {
    url: 'https://github.sydney.edu.au/informatics',
    description: 'Internal SIH GitHub organization'
  },
  'github-external': {
    url: 'https://github.com/Sydney-Informatics-Hub',
    description: 'Public SIH GitHub organization'
  },
  'stats': {
    url: 'https://sydney-informatics-hub.github.io/stats-resources/',
    description: 'SIH Statistics and data analysis resources'
  },
  'hf': {
    url: 'https://huggingface.co/SIH',
    description: 'SIH Hugging Face organization page'
  },
  'bio': {
    url: 'https://github.com/Sydney-Informatics-Hub/Bioinformatics',
    description: 'SIH Bioinformatics resources and tools'
  }
};


// Catch-all URL for unmatched paths
const CATCH_ALL_URL = 'https://informatics.sydney.edu.au';