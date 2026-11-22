// Sub-chapters 4–6: DLD Oqood Integration, Document Template Registry & UAE FTA VAT Filing
import { SubChapterNode } from '../treeTypes';

export const DEPARTMENT_SOP_STATUTORY_FINANCE_SUBCHAPTERS: SubChapterNode[] = [
  {
    level: 6,
    nodeId: 'SC06-BIZ-4',
    subChapterNumber: 4,
    title: 'DLD Integration & Oqood Off-Plan Registration Workflow',
    summary:
      '> **Tracking:** `DU004` | **Agent:** `@Timnit` (Compliance & Regulatory Gate Specialist) | **Status:** `ACTIVE SPECIFICATION` > **Authority:** Dubai Land Depart',
    sections: [
      {
        level: 7,
        nodeId: 'S07-SC06-BIZ-4',
        sectionNumber: 1,
        title: 'Section: Statutory & Operational Rules',
        summary:
          '> **Tracking:** `DU004` | **Agent:** `@Timnit` (Compliance & Regulatory Gate Specialist) | **Status:',
        topics: [
          {
            level: 8,
            nodeId: 'T08-SC06-BIZ-4',
            topicNumber: 1,
            title: 'Topic: Core Architectural Specification',
            summary:
              '> **Tracking:** `DU004` | **Agent:** `@Timnit` (Compliance & Regulatory Gate Spe',
            artifacts: [
              {
                level: 9,
                nodeId: 'A09-SC06-BIZ-4',
                artifactNumber: 1,
                title: 'Artifact: Production Data Contract',
                type: 'LAW',
                filePath:
                  'C:/Users/Dell/Documents/antigravity/White-Caves/Aegis-Sterling/.agents/business_docs/09_crm_features/dld-integration.md',
                totalLines: 6,
                complexity: 'O(1)',
                paragraphs: [
                  {
                    level: 10,
                    nodeId: 'P10-SC06-BIZ-4',
                    paragraphNumber: 1,
                    header: 'DLD Integration & Oqood Off-Plan Registration Workflow',
                    narrative:
                      '> **Tracking:** `DU004` | **Agent:** `@Timnit` (Compliance & Regulatory Gate Specialist) | **Status:** `ACTIVE SPECIFICATION` > **Authority:** Dubai Land Department (DLD) Law No. 13 of 2008 & Law No. 7 of 2013 > **CONSUMES:** `server/routes/aegis.ts`, `src/config/crmModuleRegistry.tsx` > **FEEDS:**',
                    sentences: [
                      {
                        level: 11,
                        nodeId: 'ST11-SC06-BIZ-4-1',
                        sentenceNumber: 1,
                        statement:
                          '> **Tracking:** `DU004` | **Agent:** `@Timnit` (Compliance & Regulatory Gate Specialist) | **Status:** `ACTIVE SPECIFICATION` > **Authority:** Dubai Land Department (DLD) Law No.',
                        statutoryInvariant: false,
                        lines: [
                          {
                            level: 12,
                            nodeId: 'LN12-SC06-BIZ-4-1-1',
                            lineNumber: 1,
                            text: '> **Tracking:** `DU004` | **Agent:** `@Timnit` (Compliance & Regulatory Gate Specialist) | **Status:** `ACTIVE SPECIFICATION` > **Authority:** Dubai Land Department (DLD) Law No.',
                            tokenType: 'LITERAL',
                          },
                        ],
                      },
                      {
                        level: 11,
                        nodeId: 'ST11-SC06-BIZ-4-2',
                        sentenceNumber: 2,
                        statement: '13 of 2008 & Law No.',
                        statutoryInvariant: false,
                        lines: [
                          {
                            level: 12,
                            nodeId: 'LN12-SC06-BIZ-4-2-1',
                            lineNumber: 1,
                            text: '13 of 2008 & Law No.',
                            tokenType: 'LITERAL',
                          },
                        ],
                      },
                      {
                        level: 11,
                        nodeId: 'ST11-SC06-BIZ-4-3',
                        sentenceNumber: 3,
                        statement:
                          '7 of 2013 > **CONSUMES:** `server/routes/aegis.ts`, `src/config/crmModuleRegistry.tsx` > **FEEDS:** `business_docs/09_crm_features/dld-integration.md` > **FEEDS_ACK:** `AEGIS-V5-COMPLIANCE-OQOOD-ACK` ---',
                        statutoryInvariant: false,
                        lines: [
                          {
                            level: 12,
                            nodeId: 'LN12-SC06-BIZ-4-3-1',
                            lineNumber: 1,
                            text: '7 of 2013 > **CONSUMES:** `server/routes/aegis.ts`, `src/config/crmModuleRegistry.tsx` > **FEEDS:** `business_docs/09_crm_features/dld-integration.md` > **FEEDS_ACK:** `AEGIS-V5-COMPLIANCE-OQOOD-ACK` ---',
                            tokenType: 'LITERAL',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    level: 6,
    nodeId: 'SC06-BIZ-5',
    subChapterNumber: 5,
    title: 'Headless Document Template Registry & PDF Generation Pipeline',
    summary:
      '> **Tracking:** `DU011` | **Agent:** `@Annie` (Container Ecosystem & PDF Infrastructure Architect) | **Status:** `ACTIVE SPECIFICATION` > **CONSUMES:** `server/',
    sections: [
      {
        level: 7,
        nodeId: 'S07-SC06-BIZ-5',
        sectionNumber: 1,
        title: 'Section: Statutory & Operational Rules',
        summary:
          '> **Tracking:** `DU011` | **Agent:** `@Annie` (Container Ecosystem & PDF Infrastructure Architect) |',
        topics: [
          {
            level: 8,
            nodeId: 'T08-SC06-BIZ-5',
            topicNumber: 1,
            title: 'Topic: Core Architectural Specification',
            summary:
              '> **Tracking:** `DU011` | **Agent:** `@Annie` (Container Ecosystem & PDF Infrast',
            artifacts: [
              {
                level: 9,
                nodeId: 'A09-SC06-BIZ-5',
                artifactNumber: 1,
                title: 'Artifact: Production Data Contract',
                type: 'LAW',
                filePath:
                  'C:/Users/Dell/Documents/antigravity/White-Caves/Aegis-Sterling/.agents/business_docs/09_crm_features/document-generation.md',
                totalLines: 5,
                complexity: 'O(1)',
                paragraphs: [
                  {
                    level: 10,
                    nodeId: 'P10-SC06-BIZ-5',
                    paragraphNumber: 1,
                    header: 'Headless Document Template Registry & PDF Generation Pipeline',
                    narrative:
                      '> **Tracking:** `DU011` | **Agent:** `@Annie` (Container Ecosystem & PDF Infrastructure Architect) | **Status:** `ACTIVE SPECIFICATION` > **CONSUMES:** `server/routes/v1Documents.ts`, `business_docs/09_crm_features/legal-management.md` > **FEEDS:** `business_docs/09_crm_features/document-generation.',
                    sentences: [
                      {
                        level: 11,
                        nodeId: 'ST11-SC06-BIZ-5-1',
                        sentenceNumber: 1,
                        statement:
                          '> **Tracking:** `DU011` | **Agent:** `@Annie` (Container Ecosystem & PDF Infrastructure Architect) | **Status:** `ACTIVE SPECIFICATION` > **CONSUMES:** `server/routes/v1Documents.ts`, `business_docs/09_crm_features/legal-management.md` > **FEEDS:** `business_docs/09_crm_features/document-generation.md` > **FEEDS_ACK:** `AEGIS-V5-DOC-TEMPLATE-REGISTRY-ACK` ---',
                        statutoryInvariant: false,
                        lines: [
                          {
                            level: 12,
                            nodeId: 'LN12-SC06-BIZ-5-1-1',
                            lineNumber: 1,
                            text: '> **Tracking:** `DU011` | **Agent:** `@Annie` (Container Ecosystem & PDF Infrastructure Architect) | **Status:** `ACTIVE SPECIFICATION` > **CONSUMES:** `server/routes/v1Documents.ts`, `business_docs/09_crm_features/legal-management.md` > **FEEDS:** `business_docs/09_crm_features/document-generation.md` > **FEEDS_ACK:** `AEGIS-V5-DOC-TEMPLATE-REGISTRY-ACK` ---',
                            tokenType: 'LITERAL',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    level: 6,
    nodeId: 'SC06-BIZ-6',
    subChapterNumber: 6,
    title: 'UAE FTA VAT Filing Workflow & Quarterly Reconciliation',
    summary:
      '> **Tracking:** `DU006` | **Agent:** `@Invoice` (Director of FinTech & Statutory Tax Systems) | **Status:** `ACTIVE SPECIFICATION` > **Statutory Baseline:** UAE',
    sections: [
      {
        level: 7,
        nodeId: 'S07-SC06-BIZ-6',
        sectionNumber: 1,
        title: 'Section: Statutory & Operational Rules',
        summary:
          '> **Tracking:** `DU006` | **Agent:** `@Invoice` (Director of FinTech & Statutory Tax Systems) | **St',
        topics: [
          {
            level: 8,
            nodeId: 'T08-SC06-BIZ-6',
            topicNumber: 1,
            title: 'Topic: Core Architectural Specification',
            summary:
              '> **Tracking:** `DU006` | **Agent:** `@Invoice` (Director of FinTech & Statutory',
            artifacts: [
              {
                level: 9,
                nodeId: 'A09-SC06-BIZ-6',
                artifactNumber: 1,
                title: 'Artifact: Production Data Contract',
                type: 'LAW',
                filePath:
                  'C:/Users/Dell/Documents/antigravity/White-Caves/Aegis-Sterling/.agents/business_docs/09_crm_features/financial-reporting.md',
                totalLines: 6,
                complexity: 'O(1)',
                paragraphs: [
                  {
                    level: 10,
                    nodeId: 'P10-SC06-BIZ-6',
                    paragraphNumber: 1,
                    header: 'UAE FTA VAT Filing Workflow & Quarterly Reconciliation',
                    narrative:
                      '> **Tracking:** `DU006` | **Agent:** `@Invoice` (Director of FinTech & Statutory Tax Systems) | **Status:** `ACTIVE SPECIFICATION` > **Statutory Baseline:** UAE Federal Decree-Law No. (8) of 2017 on Value Added Tax & FTA Decision No. (3) of 2024 > **CONSUMES:** `server/routes/aegis.ts`, `src/store/s',
                    sentences: [
                      {
                        level: 11,
                        nodeId: 'ST11-SC06-BIZ-6-1',
                        sentenceNumber: 1,
                        statement:
                          '> **Tracking:** `DU006` | **Agent:** `@Invoice` (Director of FinTech & Statutory Tax Systems) | **Status:** `ACTIVE SPECIFICATION` > **Statutory Baseline:** UAE Federal Decree-Law No.',
                        statutoryInvariant: false,
                        lines: [
                          {
                            level: 12,
                            nodeId: 'LN12-SC06-BIZ-6-1-1',
                            lineNumber: 1,
                            text: '> **Tracking:** `DU006` | **Agent:** `@Invoice` (Director of FinTech & Statutory Tax Systems) | **Status:** `ACTIVE SPECIFICATION` > **Statutory Baseline:** UAE Federal Decree-Law No.',
                            tokenType: 'LITERAL',
                          },
                        ],
                      },
                      {
                        level: 11,
                        nodeId: 'ST11-SC06-BIZ-6-2',
                        sentenceNumber: 2,
                        statement: '(8) of 2017 on Value Added Tax & FTA Decision No.',
                        statutoryInvariant: false,
                        lines: [
                          {
                            level: 12,
                            nodeId: 'LN12-SC06-BIZ-6-2-1',
                            lineNumber: 1,
                            text: '(8) of 2017 on Value Added Tax & FTA Decision No.',
                            tokenType: 'LITERAL',
                          },
                        ],
                      },
                      {
                        level: 11,
                        nodeId: 'ST11-SC06-BIZ-6-3',
                        sentenceNumber: 3,
                        statement:
                          '(3) of 2024 > **CONSUMES:** `server/routes/aegis.ts`, `src/store/slices/crm/invoicesExpensesThunks.ts` > **FEEDS:** `business_docs/09_crm_features/financial-reporting.md` > **FEEDS_ACK:** `AEGIS-V5-FINANCE-VAT-FTA-ACK` ---',
                        statutoryInvariant: false,
                        lines: [
                          {
                            level: 12,
                            nodeId: 'LN12-SC06-BIZ-6-3-1',
                            lineNumber: 1,
                            text: '(3) of 2024 > **CONSUMES:** `server/routes/aegis.ts`, `src/store/slices/crm/invoicesExpensesThunks.ts` > **FEEDS:** `business_docs/09_crm_features/financial-reporting.md` > **FEEDS_ACK:** `AEGIS-V5-FINANCE-VAT-FTA-ACK` ---',
                            tokenType: 'LITERAL',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
