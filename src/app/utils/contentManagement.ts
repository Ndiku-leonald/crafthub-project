// CraftHub Content Management System
// Handles downloadable PDFs, videos, and offline resources

export interface SkillContent {
  skillId: number;
  title: string;
  description: string;
  contentType: 'pdf' | 'video' | 'audio';
  url: string; // URL to download or stream
  fileSize: string; // in MB
  duration?: string; // for videos/audio in minutes
  language: string;
  isOfflineAvailable: boolean;
  steps: ContentStep[];
  createdBy: string;
  createdDate: string;
  lastUpdated: string;
}

export interface ContentStep {
  stepNumber: number;
  title: string;
  description: string;
  duration?: string; // time required for this step
  materials?: string[];
  tools?: string[];
  videoTimestamp?: number; // in seconds
  imageUrl?: string;
}

export interface DownloadedContent {
  skillId: number;
  contentId: string;
  downloadedDate: string;
  fileSize: string;
  localPath: string;
  isViewed: boolean;
}

// Mock database of available skill content
export const SKILL_CONTENTS: SkillContent[] = [
  {
    skillId: 1,
    title: 'Bread Baking - Step by Step Guide',
    description: 'Complete guide to baking fresh bread at home with detailed instructions',
    contentType: 'pdf',
    url: '/content/bread-baking.pdf',
    fileSize: '2.5 MB',
    language: 'English',
    isOfflineAvailable: true,
    createdBy: 'CraftHub Team',
    createdDate: '2025-01-15',
    lastUpdated: '2025-05-15',
    steps: [
      { stepNumber: 1, title: 'Prepare Ingredients', description: 'Mix flour, water, salt, and yeast', materials: ['Flour', 'Water', 'Salt', 'Yeast'], tools: ['Mixing bowl', 'Measuring cups'] },
      { stepNumber: 2, title: 'Knead Dough', description: 'Knead for 10 minutes until smooth', duration: '10 mins' },
      { stepNumber: 3, title: 'First Rise', description: 'Let dough rise for 1-2 hours', duration: '2 hours' },
      { stepNumber: 4, title: 'Shape Bread', description: 'Shape into loaves', duration: '5 mins' },
      { stepNumber: 5, title: 'Second Rise', description: 'Let shaped bread rise for 30-45 minutes', duration: '45 mins' },
      { stepNumber: 6, title: 'Bake', description: 'Bake at 450°F for 25-30 minutes', duration: '30 mins' }
    ]
  },
  {
    skillId: 1,
    title: 'Bread Baking - Video Tutorial',
    description: 'Watch a professional baker make fresh bread step by step',
    contentType: 'video',
    url: '/content/bread-baking-video.mp4',
    fileSize: '120 MB',
    duration: '15:30',
    language: 'English',
    isOfflineAvailable: true,
    createdBy: 'Expert Trainer',
    createdDate: '2025-02-01',
    lastUpdated: '2025-05-15',
    steps: [
      { stepNumber: 1, title: 'Introduction', duration: '1:00', videoTimestamp: 0 },
      { stepNumber: 2, title: 'Ingredients Overview', duration: '2:00', videoTimestamp: 60 },
      { stepNumber: 3, title: 'Mixing Process', duration: '3:30', videoTimestamp: 180 },
      { stepNumber: 4, title: 'Kneading Technique', duration: '3:00', videoTimestamp: 390 },
      { stepNumber: 5, title: 'Rising and Shaping', duration: '4:00', videoTimestamp: 570 },
      { stepNumber: 6, title: 'Baking and Cooling', duration: '2:00', videoTimestamp: 810 }
    ]
  },
  {
    skillId: 16,
    title: 'Soap Making - Complete Guide',
    description: 'Learn to make natural soap from scratch with safety tips',
    contentType: 'pdf',
    url: '/content/soap-making.pdf',
    fileSize: '3.8 MB',
    language: 'English',
    isOfflineAvailable: true,
    createdBy: 'CraftHub Team',
    createdDate: '2025-03-01',
    lastUpdated: '2025-05-15',
    steps: [
      { stepNumber: 1, title: 'Safety First', description: 'Understand lye safety and preparation', materials: ['Lye', 'Oils', 'Water'], tools: ['Goggles', 'Gloves', 'Thermometer'] },
      { stepNumber: 2, title: 'Prepare Ingredients', description: 'Measure oils and prepare lye solution' },
      { stepNumber: 3, title: 'Mix and Cure', description: 'Combine ingredients and let cure for 4-6 weeks' }
    ]
  },
  {
    skillId: 9,
    title: 'Hand Sewing Basics - Luganda',
    description: 'Iga okuwunda mu kamwa - step by step (Luganda)',
    contentType: 'video',
    url: '/content/hand-sewing-luganda.mp4',
    fileSize: '85 MB',
    duration: '12:00',
    language: 'Luganda',
    isOfflineAvailable: true,
    createdBy: 'Local Trainer',
    createdDate: '2025-04-01',
    lastUpdated: '2025-05-15',
    steps: [
      { stepNumber: 1, title: 'Okutandika', description: 'Basics of sewing' },
      { stepNumber: 2, title: 'Okuwunda', description: 'Sewing stitches' }
    ]
  }
];

// Helper functions
export function getSkillContent(skillId: number): SkillContent[] {
  return SKILL_CONTENTS.filter(content => content.skillId === skillId);
}

export function downloadContent(content: SkillContent): DownloadedContent {
  return {
    skillId: content.skillId,
    contentId: `${content.skillId}-${Date.now()}`,
    downloadedDate: new Date().toISOString(),
    fileSize: content.fileSize,
    localPath: content.url,
    isViewed: false
  };
}

export function getDownloadedSkills(): DownloadedContent[] {
  // In a real app, this would fetch from localStorage or a database
  const stored = localStorage.getItem('downloaded_skills');
  return stored ? JSON.parse(stored) : [];
}

export function saveDownloadedSkill(content: DownloadedContent) {
  const downloaded = getDownloadedSkills();
  downloaded.push(content);
  localStorage.setItem('downloaded_skills', JSON.stringify(downloaded));
}

export function isSkillDownloaded(skillId: number): boolean {
  return getDownloadedSkills().some(d => d.skillId === skillId);
}
