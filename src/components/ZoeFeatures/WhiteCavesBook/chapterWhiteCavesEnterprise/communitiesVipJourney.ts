import type { SubChapterNode } from '../treeTypes';

export const ENTERPRISE_SUBCHAPTERS_PART2: SubChapterNode[] = [
  {
    level: 6,
    nodeId: 'SC06-WC-COMMUNITIES',
    subChapterNumber: 4,
    title: 'Prime Dubai Real Estate Communities & Geographic Intelligence',
    summary:
      'Detailed market analysis, pricing per square foot, inventory velocity, and capital appreciation models for Dubai top master developments.',
    sections: [
      {
        level: 7,
        nodeId: 'S07-WC-COMMUNITIES-OVERVIEW',
        sectionNumber: 1,
        title: 'Section 4.1: Flagship Master Developments & Price Tiers',
        summary:
          'Market profiling for Palm Jumeirah, Downtown Dubai, Dubai Marina, Dubai Hills Estate, and Emirates Hills.',
        topics: [
          {
            level: 8,
            nodeId: 'T08-WC-PALM-DOWNTOWN',
            topicNumber: 1,
            title: 'Topic 4.1.1: Palm Jumeirah & Downtown Dubai Luxury Corridors',
            summary:
              'Ultra-luxury waterfront villas and high-floor penthouses commanding premiums above AED 4,500/sq.ft with global ultra-high-net-worth investor demand.',
            artifacts: [
              {
                level: 9,
                nodeId: 'A09-WC-COMMUNITY-MATRIX',
                artifactNumber: 1,
                title: 'Artifact: Dubai Prime Communities Intelligence Grid',
                type: 'DATA_CONTRACT',
                filePath: 'src/config/communityIntelligence.ts',
                totalLines: 110,
                complexity: 'O(1)',
                paragraphs: [
                  {
                    level: 10,
                    nodeId: 'P10-WC-COMMUNITY-P1',
                    paragraphNumber: 1,
                    header: 'Waterfront & Central Business District Valuation Benchmarks',
                    narrative:
                      'Palm Jumeirah beachfront villas maintain average transaction caps of AED 85M to AED 220M with annual capital growth of 18-24%. Downtown Dubai burj-view residences average AED 3,200 to AED 5,000/sq.ft, backed by steady short-term holiday home ROI of 8.5% net.',
                    sentences: [
                      {
                        level: 11,
                        nodeId: 'ST11-WC-COMMUNITY-S1',
                        sentenceNumber: 1,
                        statement:
                          'Prime waterfront listings on Palm Jumeirah and JBR must index historical sales data from the official DLD transaction registry to benchmark asking prices.',
                        statutoryInvariant: true,
                        lines: [
                          {
                            level: 12,
                            nodeId: 'LN12-WC-COMMUNITY-L1',
                            lineNumber: 1,
                            text: 'export const BENCHMARK_COMMUNITIES = ["Palm Jumeirah", "Downtown Dubai", "Dubai Hills Estate", "DIFC"];',
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
    nodeId: 'SC06-WC-VIP-JOURNEY',
    subChapterNumber: 5,
    title: 'Ultra-High-Net-Worth (UHNW) Buyer Journey & VIP Concierge Services',
    summary:
      'End-to-end bespoke client onboarding, private jet/chauffeur viewing coordination, sovereign KYC shielding, and trustee deed transfer assistance.',
    sections: [
      {
        level: 7,
        nodeId: 'S07-WC-VIP-PROTOCOL',
        sectionNumber: 1,
        title: 'Section 5.1: VIP Onboarding & Confidentiality Escrow Protocol',
        summary:
          'Non-Disclosure Agreement (NDA) execution, encrypted passport handling via WebAuthn, and verified funds escrow validation prior to private viewing.',
        topics: [
          {
            level: 8,
            nodeId: 'T08-WC-VIP-VIEWING',
            topicNumber: 1,
            title: 'Topic 5.1.1: Private Off-Market Listing Access Rules',
            summary:
              'Trophy assets above AED 50M operate under strict off-market embargo, accessible only to qualified buyers with verified proof of funds.',
            artifacts: [
              {
                level: 9,
                nodeId: 'A09-WC-VIP-SPEC',
                artifactNumber: 1,
                title: 'Artifact: UHNW Concierge & Private Client Charter',
                type: 'LAW',
                filePath: 'src/services/vipConciergeService.ts',
                totalLines: 75,
                complexity: 'O(1)',
                paragraphs: [
                  {
                    level: 10,
                    nodeId: 'P10-WC-VIP-P1',
                    paragraphNumber: 1,
                    header: 'Off-Market Confidentiality & Trustee Transfer Escort',
                    narrative:
                      'White Caves Private Client advisors provide dedicated accompaniment to Dubai Trustee Offices (Al Twar, Barsha, or Downtown). The buyer receives simultaneous Title Deed issuance upon cashier cheque or escrow wire clearance.',
                    sentences: [
                      {
                        level: 11,
                        nodeId: 'ST11-WC-VIP-S1',
                        sentenceNumber: 1,
                        statement:
                          'Off-market trophy assets require signed buyer NDAs and bank-verified Proof of Funds (POF) prior to property inspection.',
                        statutoryInvariant: true,
                        lines: [
                          {
                            level: 12,
                            nodeId: 'LN12-WC-VIP-L1',
                            lineNumber: 1,
                            text: 'assertBuyerVerification(buyerProfile, { requireNDA: true, minPOF: 50_000_000 });',
                            tokenType: 'OPERATOR',
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
