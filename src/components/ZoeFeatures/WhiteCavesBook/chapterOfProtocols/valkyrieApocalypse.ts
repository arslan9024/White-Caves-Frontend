import type { SubChapterNode } from '../treeTypes';

export const PROTOCOL_SUBCHAPTERS_PART2: SubChapterNode[] = [
  {
    level: 6,
    nodeId: 'SC06-P4',
    subChapterNumber: 4,
    title: 'Sub-Chapter 4: Valkyrie Ledger Rise (AEG-026 to AEG-033)',
    summary:
      'The Valkyrie pillar governs all Dubai real estate regulatory compliance and financial control surfaces. AEG-026 mandates static PDF overlays for DLD title deeds (no dynamic rendering of government documents), AEG-027–028 enforce 90/60/30-day Ejari expiry alerts with automated tenant notification, and AEG-029–030 calculate 5% UAE FTA VAT and 9% corporate tax reserves on every commission transaction. AEG-031 requires sequential receipt numbering with Zoho Books synchronization, and AEG-033 locks all COMPLETED deals as immutable — no retroactive editing. Full compliance details in [Enterprise Operations](CH05-WC-01) and [Department SOPs](CH05-DEPT-SOPS).',
    sections: [
      {
        level: 7,
        nodeId: 'S07-P4.1',
        sectionNumber: 1,
        title: 'Section 4.1: UAE Statutory Tax Buffers (AEG-028 - AEG-030)',
        summary:
          'Mathematical calculation and escrow isolation of 5% VAT and 9% corporate tax reserves.',
        topics: [
          {
            level: 8,
            nodeId: 'T08-P4.1.1',
            topicNumber: 1,
            title: 'Topic 4.1.1: UAE Statutory Reserve Formula',
            summary:
              'Splitting gross commission into net brokerage profit, 5% VAT remittance, and 9% corporate tax reserve.',
            artifacts: [
              {
                level: 9,
                nodeId: 'A09-P4.1.1.01',
                artifactNumber: 1,
                title: 'Artifact: UAE Tax Split Calculation (AEG-028)',
                type: 'ALGORITHM',
                complexity: 'O(1)',
                paragraphs: [
                  {
                    level: 10,
                    nodeId: 'P10-P4.1.1.01',
                    paragraphNumber: 1,
                    header: 'Paragraph 1: Tax Reserve Split Equation',
                    narrative:
                      'Every transaction applies statutory UAE FTA VAT and isolates corporate tax buffers before broker payout splits.',
                    mathFormulas: [
                      {
                        title: 'UAE Statutory Tax Allocation',
                        latex:
                          'R_{\\text{VAT}} = 0.05 \\times C_{\\text{gross}}, \\quad R_{\\text{CorpTax}} = 0.09 \\times (C_{\\text{gross}} - E_{\\text{allowable}})',
                        explanation:
                          'Ensures full compliance with UAE Federal Tax Authority mandates and prevents liquidity deficits during audit.',
                      },
                    ],
                    sentences: [
                      {
                        level: 11,
                        nodeId: 'S11-P4.1.1.01',
                        sentenceNumber: 1,
                        statement:
                          'Tax reserve deductions must execute atomically prior to commission ledger distribution.',
                        statutoryInvariant: true,
                        lines: [
                          {
                            level: 12,
                            nodeId: 'L12-P4.1.1.01',
                            lineNumber: 1,
                            text: 'const vatAmount = grossCommission * 0.05;',
                            tokenType: 'KEYWORD',
                          },
                          {
                            level: 12,
                            nodeId: 'L12-P4.1.1.02',
                            lineNumber: 2,
                            text: 'const corpTaxReserve = Math.max(0, (netProfit - 375000) * 0.09);',
                            tokenType: 'KEYWORD',
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
    nodeId: 'SC06-P5',
    subChapterNumber: 5,
    title: 'Sub-Chapter 5: Apocalypse Overdrive Matrix (AEG-034 to AEG-042)',
    summary:
      'The Apocalypse pillar handles high-performance computation and gamification. AEG-034–036 offload OCR processing to Web Workers (preventing UI thread blocking during passport and Emirates ID scans), AEG-037–039 implement the Merit XP Leaderboard system with +500 XP statutory gate rewards for completing compliance checkpoints, and AEG-040 defines 60%–70% dynamic broker commission splits based on deal type and seniority. AEG-042 enforces strict < 350 lines per file — any component exceeding this is automatically flagged for decomposition. See [Core Foundations](CH05-CORE-FOUNDATIONS) for project structure and [Strategic Plans](CH05-STRAT-PLANS) for implementation roadmap.',
    sections: [
      {
        level: 7,
        nodeId: 'S07-P5.1',
        sectionNumber: 1,
        title: 'Section 5.1: Merit XP Rewards & Single-Purpose Files (AEG-037, AEG-042)',
        summary:
          'Incentivizing operational compliance and bounding file complexity strictly below 350 lines.',
        topics: [
          {
            level: 8,
            nodeId: 'T08-P5.1.1',
            topicNumber: 1,
            title: 'Topic 5.1.1: Single-Purpose File Limit & XP Hook',
            summary: 'Every file must fulfill a single responsibility with line count <= 350.',
            artifacts: [
              {
                level: 9,
                nodeId: 'A09-P5.1.1.01',
                artifactNumber: 1,
                title: 'Artifact: Architectural Boundary Law (AEG-042)',
                type: 'LAW',
                filePath: 'src/config/viewsRegistry.ts',
                totalLines: 85,
                complexity: 'O(1)',
                paragraphs: [
                  {
                    level: 10,
                    nodeId: 'P10-P5.1.1.01',
                    paragraphNumber: 1,
                    header: 'Paragraph 1: File Line Limit Enforcement',
                    narrative:
                      'Monolithic source files exceeding 350 lines are automatically rejected by static pre-commit ratchets.',
                    sentences: [
                      {
                        level: 11,
                        nodeId: 'S11-P5.1.1.01',
                        sentenceNumber: 1,
                        statement:
                          'No source file in src/ or server/ may exceed 350 lines of code.',
                        statutoryInvariant: true,
                        lines: [
                          {
                            level: 12,
                            nodeId: 'L12-P5.1.1.01',
                            lineNumber: 1,
                            text: 'if (lineCount > 350) throw new Error("File exceeds 350 lines limit");',
                            tokenType: 'KEYWORD',
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
