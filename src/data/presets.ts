export interface IdeaPreset {
  id: string;
  title: string;
  description: string;
  category: string;
  techStack: string;
  database: string;
  platform: string;
  prompt: string;
  badge: string;
}

export const IDEA_PRESETS: IdeaPreset[] = [
  {
    id: 'saas-analytics',
    title: 'SaaS Pulse Analytics',
    description: 'Multi-tenant subscription metrics, churn predictor, and stripe webhook sync with live MRR dashboards.',
    category: 'B2B SaaS',
    techStack: 'React 19 + TypeScript + Node.js + Tailwind CSS',
    database: 'PostgreSQL',
    platform: 'Web Application',
    prompt: 'A multi-tenant SaaS analytics platform that connects with Stripe webhooks to track MRR, churn rate, user cohorts, and team seat usage with interactive charting and automated email reports.',
    badge: 'Popular'
  },
  {
    id: 'ai-doc-vault',
    title: 'CogniVault AI Knowledge Hub',
    description: 'Document intelligence portal with vector semantic search, citation badges, and role-based permissions.',
    category: 'AI & Data',
    techStack: 'React 19 + TypeScript + Express + Vector Embeddings',
    database: 'PostgreSQL (pgvector)',
    platform: 'Enterprise Web',
    prompt: 'An enterprise knowledge repository where teams upload PDF/Markdown documentation, query information using natural language with verifiable source citations, and manage confidential permission tiers.',
    badge: 'AI-Native'
  },
  {
    id: 'collab-canvas',
    title: 'SyncFlow Infinite Canvas',
    description: 'Real-time collaborative diagramming & system architecture whiteboard with multiplayer presence.',
    category: 'Developer Tools',
    techStack: 'React 19 + WebSockets + Canvas API + Node.js',
    database: 'PostgreSQL + Redis',
    platform: 'Web App',
    prompt: 'A real-time collaborative architecture board where engineers draw cloud infrastructure diagrams, see live teammate cursors, leave sticky notes, and export diagrams as Terraform or Docker Compose.',
    badge: 'Real-time'
  },
  {
    id: 'escrow-marketplace',
    title: 'TrustBridge P2P Escrow',
    description: 'Local services marketplace with milestone escrow payments, automated dispute resolution, and chat.',
    category: 'Fintech & Marketplace',
    techStack: 'React 19 + TypeScript + Tailwind CSS + Node.js',
    database: 'PostgreSQL',
    platform: 'Responsive Web / Mobile',
    prompt: 'A peer-to-peer freelance and local service marketplace featuring milestone-based escrow payments, buyer/seller identity verification, encrypted chat, and structured dispute review.',
    badge: 'Fintech'
  },
  {
    id: 'habit-streak',
    title: 'Apex Habit & Protocol Tracker',
    description: 'Gamified daily protocol and wellness tracking with streak heatmaps, offline sync, and social squads.',
    category: 'Health & Lifestyle',
    techStack: 'React 19 + TypeScript + Vite + PWA',
    database: 'SQLite / PostgreSQL',
    platform: 'Mobile Web / PWA',
    prompt: 'A minimalist, dark-mode habit streak tracker with GitHub-style annual heatmaps, customizable daily routine protocols, offline-first local persistence, and accountability squads.',
    badge: 'PWA Ready'
  }
];
