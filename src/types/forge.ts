export interface UserStory {
  id: string;
  persona: string;
  want: string;
  soThat: string;
  acceptanceCriteria: string[];
}

export interface SchemaColumn {
  name: string;
  type: string;
  isPrimary: boolean;
  isNullable?: boolean;
  isUnique?: boolean;
  foreignKey?: string;
  comment?: string;
}

export interface SchemaTable {
  name: string;
  description: string;
  columns: SchemaColumn[];
}

export interface DatabaseSchema {
  tables: SchemaTable[];
  sqlDdl: string;
  prismaSchema?: string;
  typescriptInterfaces: string;
  seedDataJson?: string;
}

export interface MockUiElement {
  type: string;
  label: string;
  content?: string;
  badge?: string;
}

export interface WireframeScreen {
  id: string;
  title: string;
  description: string;
  layout: string;
  keyComponents: string[];
  mockUiElements: MockUiElement[];
}

export interface StarterFile {
  path: string;
  language: string;
  description: string;
  content: string;
}

export interface RiskAndEdgeCase {
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | string;
  category: 'Security' | 'Performance' | 'Data Integrity' | 'UX' | 'Concurrency' | string;
  impact: string;
  mitigationStrategy: string;
  preventionCodeHint?: string;
}

export interface UnitTestItem {
  module: string;
  testCase: string;
  expectedBehavior: string;
  sampleCode?: string;
}

export interface IntegrationTestItem {
  endpointOrFlow: string;
  testCase: string;
  expectedBehavior: string;
}

export interface QaChecklistItem {
  category: string;
  item: string;
  priority: string;
  checked?: boolean;
}

export interface TestPlan {
  unitTests: UnitTestItem[];
  integrationTests: IntegrationTestItem[];
  qaChecklist: QaChecklistItem[];
}

export interface ArchitectureSpec {
  client: string;
  server: string;
  database: string;
  authMethod: string;
  hosting: string;
  keyThirdPartyServices: string[];
}

export interface RequirementsSpec {
  p0: string[];
  p1: string[];
  p2?: string[];
  nonFunctional: string[];
}

export interface AppForgePlan {
  appName: string;
  tagline: string;
  overview: string;
  targetAudience: string[];
  architecture: ArchitectureSpec;
  requirements: RequirementsSpec;
  userStories: UserStory[];
  databaseSchema: DatabaseSchema;
  wireframeScreens: WireframeScreen[];
  starterCode: {
    files: StarterFile[];
    runInstructions: string;
  };
  riskAndEdgeCases: RiskAndEdgeCase[];
  testPlan: TestPlan;
}
