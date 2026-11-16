export const CONVERSATION_STATUSES = ['ACTIVE', 'PENDING', 'CLOSED', 'SPAM'] as const;
export const CONVERSATION_PRIORITIES = ['URGENT', 'HIGH', 'NORMAL', 'LOW'] as const;
export const MESSAGE_SENDERS = ['CUSTOMER', 'AGENT', 'SYSTEM'] as const;
export const MESSAGE_INTENTS = [
  'PROPERTY_INQUIRY',
  'VIEWING_REQUEST',
  'PURCHASE_INTEREST',
  'COMPLAINT',
  'PRICE_NEGOTIATION',
  'GENERAL_QUESTION',
  'UNKNOWN',
] as const;
export const MESSAGE_SENTIMENTS = ['POSITIVE', 'NEUTRAL', 'NEGATIVE'] as const;

export const ACTIVITY_TYPES = [
  'deal_closed',
  'lead_created',
  'stage_change',
  'client_created',
  'deal_cancelled',
  'property_added',
  'agent_added',
  'alert',
  'call',
  'email',
  'whatsapp',
  'visit',
  'note',
] as const;

export const ACTIVITY_ICONS: Record<string, string> = {
  deal_closed: '✅',
  lead_created: '🔥',
  stage_change: '📈',
  client_created: '👤',
  deal_cancelled: '❌',
  property_added: '🏠',
  agent_added: '👥',
  alert: '⭐',
  call: '📞',
  email: '📧',
  whatsapp: '💬',
  visit: '🏢',
  note: '📝',
};

export const CUSTOMER_NAMES = [
  'Alexander Petrov',
  'Viktor Ivanov',
  'Chen Wei',
  'Raj Kumar',
  'Pierre Dubois',
  'Giovanni Rossi',
  'James Anderson',
  'Sophie Laurent',
  'Elena Volkov',
  'Natasha Kim',
  'Hugo Martinez',
  'Oliver Schmidt',
  'Isabella Park',
  'Lucas Tanaka',
  'Amir Hassan',
  'Charlotte Williams',
  'Sergei Novak',
  'Hans Fischer',
  'Carlos Garcia',
  "William O'Brien",
];

export const CUSTOMER_MESSAGES = [
  "Hi, I'm interested in properties in {community}. Do you have anything available?",
  "What's the price range for {type} in Dubai Marina?",
  'I saw your listing on Bayut. Can I schedule a viewing this weekend?',
  "I'm looking for a {beds}-bedroom apartment with sea view. Budget around AED {budget}M.",
  'Can you send me the floor plans for the {community} property?',
  "Is the price negotiable? I'm a cash buyer.",
  'I need something ready to move in by next month. What do you have?',
  'Hello, I was referred by a friend. Looking for investment properties.',
  "Can we arrange a virtual tour? I'm currently based overseas.",
  'What are the service charges for {community}?',
  'Is there a payment plan available for off-plan projects?',
  "I'd like to compare 3 properties this Saturday. Can your agent meet me?",
  "What's the ROI expectation for {type} in Business Bay?",
  'My family is relocating to Dubai. We need a villa with garden.',
  'Are there any new launches in {community}?',
];

export const AGENT_MESSAGES = [
  'Thank you for your interest! Let me share some options with you.',
  'I have several properties matching your criteria in {community}.',
  'Absolutely! I can arrange viewings this weekend. What time works best?',
  'The price for this unit is AED {price}. Payment plans are available.',
  "I'm sending the floor plans and brochure to your email right now.",
  'Great news — the developer is offering a special launch price this week.',
  "I'd recommend viewing these 3 properties: they match your budget perfectly.",
  "Welcome! As a first-time buyer, I'll guide you through the entire process.",
  'Video tour link has been sent. Would you like to discuss after viewing?',
  'Service charges are approximately AED {charge}/sqft per year.',
  'Yes, flexible payment plans available — 60/40 and 70/30 options.',
  "I've blocked 3 viewing slots for Saturday: 10am, 12pm, and 3pm.",
  'Expected ROI is 7-9% for this area. I can share market data.',
  'I have a beautiful villa in Arabian Ranches — 4BR with private garden.',
  'New phase launching next week. Shall I register you for priority access?',
];

export const ACTIVITY_TEMPLATES: Record<string, string[]> = {
  deal_closed: [
    '{agent} closed a deal worth AED {amount}',
    'Sale completed — {property} sold for AED {amount}',
    'Rental agreement signed — AED {amount}/year',
  ],
  lead_created: [
    '{lead} added as new hot lead',
    'New inquiry from {lead} via {source}',
    '{lead} registered interest in {property}',
  ],
  stage_change: [
    '{lead} moved to negotiation stage',
    '{lead} upgraded from warm to hot',
    '{lead} moved to proposal stage',
  ],
  client_created: [
    '{client} registered as new client',
    'New client onboarded: {client}',
    '{client} account activated',
  ],
  deal_cancelled: [
    '{lead} requested deal cancellation',
    'Transaction cancelled — buyer withdrew',
    'Deal voided due to financing issues',
  ],
  property_added: [
    'New luxury {type} added to inventory',
    '{property} listed in {community}',
    'Off-plan {type} added — {community}',
  ],
  agent_added: ['{agent} joined the {dept} team', 'New agent onboarded: {agent}'],
  alert: [
    '{agent} achieved top performer status',
    'Monthly target exceeded by {dept} team',
    'System: Database backup completed',
    'Unusual login detected — security review triggered',
  ],
  call: ['{agent} called {lead} — discussed {property}', 'Follow-up call with {lead} — 15 min'],
  email: ['Proposal sent to {lead} for {property}', 'Market report emailed to {client}'],
  whatsapp: [
    'WhatsApp conversation with {lead} — viewing confirmed',
    '{agent} shared property photos via WhatsApp to {lead}',
  ],
  visit: [
    '{lead} visited {property} — positive feedback',
    'Property tour completed: {community} {type}',
  ],
  note: [
    '{agent} added note: "{lead} prefers corner unit"',
    'Internal note: Financing pre-approved for {lead}',
  ],
};

export const COMMUNITIES = [
  'Palm Jumeirah',
  'Downtown Dubai',
  'Dubai Marina',
  'Business Bay',
  'JBR',
  'Dubai Hills Estate',
  'Arabian Ranches',
  'Dubai Creek Harbour',
];

export const PROP_TYPES = ['Villa', 'Apartment', 'Penthouse', 'Townhouse', 'Studio'];

