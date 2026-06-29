// Redirect links
const REDIRECTS = {
  'CBI-R': {
    url: 'https://sydney-informatics-hub.github.io/cbir-screening-tool/',
    description: 'Online Screening Tool for the Cambridge Behavioural Inventory-Revised (CBI-R)'
  },
  'wordflow': {
    url: 'https://milysun.github.io/wordflow-workshop/',
    description: 'Wordflow Workshops Landing Page'
  },
  'ldaca': {
    url: 'https://australian-text-analytics-platform.github.io/LDaCa_Text_Analytics_Tools/',
    description: 'LDaCA Wordflow Landing Page'
  },
  'aigis': {
    url: 'https://github.com/Sydney-Informatics-Hub/aigis/blob/main/README.md',
    description: 'Geospatial data with Gen-AI - Sydney Informatics Hub'
  },
  'bio': {
    url: 'https://github.com/Sydney-Informatics-Hub/Bioinformatics',
    description: 'SIH bioinformatics resources and tools'
  },
  'bio-training': {
    url: 'https://sydney-informatics-hub.github.io/bioinformatics-training/',
    description: 'SIH bioinformatics training'
  },
  'blockparty': {
    url: 'https://sydney-informatics-hub.github.io/blockparty/',
    description: 'Unicode drawing tool'
  },
  'chat': {
    url: 'https://rds-core-sih4hpc-rw-openwebui.gpu.sydney.edu.au',
    description: 'Internal OpenWebUI chat server  (needs VPN to access)'
  },
  'client-dashboard': {
    url: 'https://app.powerbi.com/groups/6d62871b-a2c5-4c79-bb85-75eb03e90a2d/reports/700a9b42-6a01-44ce-ac7f-a7e0eeeffc35?ctid=82b3e37e-8171-485d-b10b-38dae7ed14a8',
    description: 'SIH Client Dashboard'
  },
  'nhmrc-grants-2026': {
    url: 'https://sydney.au1.qualtrics.com/jfe/form/SV_6lFIfPlKRKplg3A',
    description: 'USyd Collaborative Equipment Grants and NHMRC Equipment Grants Scheme'
  },
  'collections-eoi': {
    url: 'https://forms.cloud.microsoft/r/hAs6drJ3xQ',
    description: 'Curated Collections platform expression of interest form'
  },
  'cc': {
    url: 'http://160.250.232.94:8000',
    description: 'Curated Collections platform development deployment of Omeka S'
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
  'gpu/docs': {
    url: 'https://sydneyuni.atlassian.net/wiki/x/AYBd1Q',
    description: 'Sydney GPU cluster documentation, information and specifications'
  },
  'gpu/onboarding': {
    url: 'https://dashr.sydney.edu.au',
    description: 'Sydney GPU cluster onboarding for your research project in DashR portal'
  },
  'gpu/login': {
    url: 'https://gpu.sydney.edu.au',
    description: 'Sydney GPU cluster user interface (RunAI). Requires on-campus network access or VPN.'
  },
  'gpu/guide': {
    url: 'https://sydney-informatics-hub.github.io/gpu-cluster-onboarding-guide/',
    description: 'Sydney GPU cluster onboarding guide and tutorials'
  },
  'hacky-hour-zoom': {
    url: 'https://uni-sydney.zoom.us/my/sih.hackyhour',
    description: 'Zoom link for our monthly SIH Hacky Hour, on the 3rd Wednesday of every month at 2pm.'
  },  
  'hf': {
    url: 'https://huggingface.co/SIH',
    description: 'SIH Hugging Face organization page'
  },
  'hpc': {
    url: 'https://sydneyuni.atlassian.net/wiki/spaces/RC/pages/3448733944/Sydney+HPC+Scheme',
    description: 'Sydney HPC Scheme Confluence page'
  },
  'hpc-chat': {
    url: 'https://app.cogniti.ai/agents/68099883ab29fb8c2af4154d/chat?k=e8f0C6vSYYuEh40obfkH3IRxlwGDrM6T1bCYXyknfm4',
    description: 'University of Sydney High Performance Computing AI Chat Assistant'
  },
  'hpc-dropin': {
    url: 'https://uni-sydney.zoom.us/j/85100208525?from=addon',
    description: 'Zoom link for our monthly HPC drop-in sessions, on the 1st Thursday of every month at 12pm.'
  },
  'hpc-scheme': {
    url: 'https://nci.sydney.edu.au/',
    description: 'Sydney national HPC scheme administration portal'
  },
  'hpc-scheme-policies': {
    url: 'https://sydneyuni.atlassian.net/wiki/spaces/RC/pages/4605805979/Policies',
    description: 'Sydney HPC Scheme policies'
  },
  'ipa-guide': {
    url: 'https://github.com/Sydney-Informatics-Hub/IPA-user-guide/blob/main/20260616%20IPA%20user%20guide.pdf',
    description: 'Ingenuity Pathway Analysis User Guide'
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
    url: 'https://unisyd.sharepoint.com/:x:/r/teams/SydneyInformaticsHub2/Shared%20Documents/1%20SIH%20Central%20Document%20Repository/Admin/Leave%20and%20Travel%20Schedule/SIH_Annual_Leave_and_Business_Travel_Schedule_2026.xlsx?d=wdb8cbe2e7e614bb9889bc5a8136722e1&csf=1&web=1&e=aSUUBA',
    description: 'SIH Leave Calendar 2026'
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
  'nci-access': {
    url: 'https://sydneyuni.atlassian.net/wiki/spaces/RC/pages/3722182703/NCI+Gadi+HPC',
    description: 'NCI access via Sydney HPC Scheme'
  },
  'nci-su-calculator': {
    url: 'https://sydney-informatics-hub.github.io/nci-su-calculator/',
    description: 'Service unit calculator for NCI Gadi HPC'
  },
  'pawsey-onboarding': {
    url: 'https://sydney.au1.qualtrics.com/jfe/form/SV_5mXyhFZsPIwZDBs?SupportType=Pawsey',
    description: 'Pawsey Setonix HPC onboarding form'
  },
  'pawsey-usyd-guide': {
    url: 'https://sydney-informatics-hub.github.io/usyd-pawsey-onboarding-guide/',
    description: 'Pawsey Setonix HPC guide for USyd'
  },
  'pawsey-usyd-docs': {
    url: 'https://sydneyuni.atlassian.net/wiki/spaces/RC/pages/3774775342/Pawsey+Setonix+HPC',
    description: 'Pawsey Setonix HPC documentation for USyd'
  },
  'ref-check': {
    url: 'https://github.com/Sydney-Informatics-Hub/RefCheckAI',
    description: 'SIH AI Reference Checker: Automated citation validation for AI-generated and academic content.'
  },  
  'request': {
    url: 'https://sydney.au1.qualtrics.com/jfe/form/SV_5mXyhFZsPIwZDBs',
    description: 'Sydney Informatics Hub request for assistance form.'
  },
  'research-compute-guides': {
    url: 'https://sydneyuni.atlassian.net/wiki/spaces/RC/overview?homepageId=173932782',
    description: 'Technical documentation for research computing infrastructure at Sydney'
  },
  'research-compute-tools': {
    url: 'https://github.com/Sydney-Informatics-Hub/research-computing-tools',
    description: 'SIH research computing resources and tools'
  },
  'research-pulse': {
    url: 'https://github.com/Sydney-Informatics-Hub/ResearchPulseAI',
    description: 'ResearchPulseAI: AI-driven Research Impact Assessment Tool and Case Study Generator for NSW Health'
  },
  'sharepoint': {
    url: 'https://unisyd.sharepoint.com/:f:/r/teams/SydneyInformaticsHub2/Shared Documents/1 SIH Central Document Repository',
    description: 'SIH Central document repository'
  },
  'sih-sharepoint-site': {
    url: 'https://unisyd.sharepoint.com/teams/SydneyInformaticsHub2/SitePages/00_landing_page.aspx',
    description: 'SIH Staff Home (previously confluence)'
  },
  'skill': {
    url: 'https://github.sydney.edu.au/informatics/trainingmaterials/tree/master/CrossSkilling',
    description: 'SIH Cross-skilling calendar + materials'
  },
  'src':{
    url: 'https://intranet.sydney.edu.au/research-support/managing-research/facilities-and-tools/sydney-research-cloud.html',
    description: 'Sydney Research Cloud information on the Intranet'
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
  'training': {
    url: 'https://www.sydney.edu.au/research/facilities/sydney-informatics-hub/workshops-and-training/training-calendar.html',
    description: 'Training calendar'
  },
  'training-dashboard': {
    url: 'https://app.powerbi.com/links/ZTQdGqm_Uk',
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
  'wimr-consult': {
    url: 'https://outlook.office.com/book/StatisticalConsultwithAlexandraGreenandAmarinderThind@unisyd.onmicrosoft.com/?ismsaljsauthenabled',
    description: 'WIMR biostatistics consult booking form'
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
