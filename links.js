// Redirect links
const REDIRECTS = {
  'aigis': {
    url: 'https://github.com/Sydney-Informatics-Hub/aigis/blob/main/README.md',
    description: 'Geospatial data with Gen-AI - Sydney Informatics Hub'
  },
  'bio': {
    url: 'https://github.com/Sydney-Informatics-Hub/Bioinformatics',
    description: 'SIH Bioinformatics resources and tools'
  },
  'chat': {
    url: 'http://10.122.246.109:3000',
    description: 'Internal OpenWebUI chat server  (needs VPN to access)'
  },
  'client-dashboard': {
    url: 'https://app.powerbi.com/groups/6d62871b-a2c5-4c79-bb85-75eb03e90a2d/reports/700a9b42-6a01-44ce-ac7f-a7e0eeeffc35?ctid=82b3e37e-8171-485d-b10b-38dae7ed14a8',
    description: 'SIH Client Dashboard'
  },
  'collections-eoi': {
    url: 'https://forms.cloud.microsoft/r/hAs6drJ3xQ',
    description: 'Curated Collections platform expression of interest form'
  },
  'forwards-plan': {
    url: 'https://unisyd.sharepoint.com/:x:/r/teams/SydneyInformaticsHub2/Shared Documents/1 SIH Central Document Repository/Team Folders/Informatics/Group Leads/Team management/TeamForwardPlanning2025onwards.xlsx?web=1',
    description: 'SIH Informatics Team Forwards Plan'
  },
  'github-external': {
    url: 'https://github.com/Sydney-Informatics-Hub',
    description: 'Public SIH GitHub organization'
  },
  'github-internal': {
    url: 'https://github.sydney.edu.au/informatics',
    description: 'Internal SIH GitHub organization'
  },
  'gpu': {
    url: 'https://sydneyuni.atlassian.net/wiki/x/AYBd1Q',
    description: 'SIH GPU cluster information and specifications'
  },
  'gpu-eoi': {
    url: 'https://forms.office.com/r/kmn4P1WNjq',
    description: 'GPU access expression of interest form'
  },
  'hf': {
    url: 'https://huggingface.co/SIH',
    description: 'SIH Hugging Face organization page'
  },
  'hpc-chat': {
    url: 'https://app.cogniti.ai/agents/68099883ab29fb8c2af4154d/chat?k=e8f0C6vSYYuEh40obfkH3IRxlwGDrM6T1bCYXyknfm4',
    description: 'University of Sydney High Performance Computing AI Chat Assistant'
  },
  'jira': {
    url: 'https://ctdshub.atlassian.net/jira/software/c/projects/PIPE/boards/27',
    description: 'SIH JIRA Project management and issue tracking'
  },
  'label': {
    url: 'http://10.122.246.109:8080/',
    description: 'Labelstudio deployment (needs VPN to access)'
  },
  'leave': {
    url: 'https://unisyd.sharepoint.com/:x:/r/teams/SydneyInformaticsHub2/Shared Documents/1 SIH Central Document Repository/Admin/Leave and Travel Schedule/SIH_Annual_Leave_and_Business_Travel_Schedule_2025.xlsx?web=1',
    description: 'SIH Leave Calendar 2025'
  },
  'mailing-list': {
    url: 'https://signup.e2ma.net/signup/1945889/1928048/',
    description: 'Sydney Informatics Hub News + Training Mailing lists signup page'
  },
  'materials': {
    url: 'https://unisyd.sharepoint.com/teams/SydneyInformaticsHub2/Share',
    description: 'SIH shared training materials and other university-wide shared documents'
  },
  'monday-update': {
    url: 'https://ctdshub.atlassian.net/wiki/spaces/INFRA/pages/602537987/Monday+Meeting+Project+Update+Presentation+Roster',
    description: 'SIH Monday fortnightly meeting 5-min Project Update Calendar'
  },
  'navigator': {
    url: 'https://app.cogniti.ai/agents/6539de2436d0b628561cad9c/chat?k=tz0LR06KDQMgOaq507-pvaSrCzGwfCHjo829dJLTM4s',
    description: 'University of Sydney Core Research Facility Navigator Chatbot'
  },
  'ref-check': {
    url: 'https://github.com/Sydney-Informatics-Hub/RefCheckAI',
    description: 'SIH AI Reference Checker: Automated citation validation for AI-generated and academic content.'
  },
  'research-pulse': {
    url: 'https://github.com/Sydney-Informatics-Hub/ResearchPulseAI',
    description: 'ResearchPulseAI: AI-driven Research Impact Assessment Tool and Case Study Generator for NSW Health'
  },
  'sharepoint': {
    url: 'https://unisyd.sharepoint.com/:f:/r/teams/SydneyInformaticsHub2/Shared Documents/1 SIH Central Document Repository',
    description: 'SIH Central document repository'
  },
  'skill': {
    url: 'https://github.sydney.edu.au/informatics/trainingmaterials/tree/master/CrossSkilling',
    description: 'SIH Cross-skilling calendar + materials'
  },
  'stats': {
    url: 'https://sydney-informatics-hub.github.io/stats-resources/',
    description: 'SIH Statistics and data analysis resources'
  },
  'team-guides': {
    url: 'https://unisyd.sharepoint.com/:f:/r/teams/SydneyInformaticsHub2/Shared Documents/1 SIH Central Document Repository/Team Folders/Informatics/Team Guides',
    description: 'SIH Informatics Team Guides'
  },
  'things': {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Important things'
  },
  'training-dashboard': {
    url: 'https://app.powerbi.com/groups/6d62871b-a2c5-4c79-bb85-75eb03e90a2d/reports/19d2fbe9-de61-4ea1-bac0-773db6a07aa2?ctid=82b3e37e-8171-485d-b10b-38dae7ed14a8&pbi_source=linkShare',
    description: 'SIH Training Dashboard'
  },
  'upcoming': {
    url: 'https://unisyd.sharepoint.com/:l:/r/teams/SydneyInformaticsHub2/Lists/Upcoming Informatics Team Events?e=cdJqwB',
    description: 'Upcoming Informatics Team Events'
  },
  'vm-register': {
    url: 'https://unisyd.sharepoint.com/:x:/r/teams/SydneyInformaticsHub2/Shared Documents/1 SIH Central Document Repository/Team Folders/Informatics/VM and asset management/VM register.xlsx?web=1',
    description: 'SIH team VM register'
  },
  'youtube': {
    url: 'https://www.youtube.com/@sydneyinformaticshub',
    description: 'Sydney Informatics Hub - YouTube'
  }
};

// Template:
//,
//  'shortlink': {
//    url:'',
//    description:''
//     }
//


// Catch-all URL for unmatched paths
const CATCH_ALL_URL = 'https://informatics.sydney.edu.au';
