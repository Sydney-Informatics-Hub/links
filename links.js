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
  'gpu': {
    url: 'https://sydneyuni.atlassian.net/wiki/x/AYBd1Q',
    description: 'SIH GPU cluster information and specifications'
  },
  'hpc-chat': {
    url: 'https://app.cogniti.ai/agents/68099883ab29fb8c2af4154d/chat?k=e8f0C6vSYYuEh40obfkH3IRxlwGDrM6T1bCYXyknfm4', 
    description: 'University of Sydney High Performance Computing AI Chat Assistant'
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
  },
  'ref-check': {
    url: 'https://github.com/Sydney-Informatics-Hub/RefCheckAI',
    description: 'SIH AI Reference Checker: Automated citation validation for AI-generated and academic content.'
  },
  'research-pulse': {
    url: 'https://github.com/Sydney-Informatics-Hub/ResearchPulseAI',
    description: 'ResearchPulseAI: AI-driven Research Impact Assessment Tool and Case Study Generator for NSW Health'
  },  
  'aigis': {
    url: 'https://github.com/Sydney-Informatics-Hub/aigis/blob/main/README.md',
    description: 'Geospatial data with Gen-AI - Sydney Informatics Hub'
  },
  'navigator': {
    url: 'https://app.cogniti.ai/agents/6539de2436d0b628561cad9c/chat?k=tz0LR06KDQMgOaq507-pvaSrCzGwfCHjo829dJLTM4s',
    description: 'University of Sydney Core Research Facility Navigator Chatbot'
  },
  'youtube': {
    url: 'https://www.youtube.com/@sydneyinformaticshub',
    description: 'Sydney Informatics Hub - YouTube'
  },
  'mailing-list': {
    url: 'https://signup.e2ma.net/signup/1945889/1928048/',
    description: 'Sydney Informatics Hub News + Training Mailing lists signup page'
  }
};


// Catch-all URL for unmatched paths
const CATCH_ALL_URL = 'https://informatics.sydney.edu.au';
