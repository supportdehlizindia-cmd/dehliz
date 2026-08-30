/**
 * DEHLIZ Website Application Engine
 * Implements client-side Routing, CMS-Ready Data Architecture,
 * Resource Search/Filter, Donation Calculations, and Form State Controls.
 */
// Supabase Database Connection Credentials (Placeholder configurations)
const SUPABASE_URL = window.SUPABASE_URL || 'https://gkaniaerppgrwiyfznvb.supabase.co';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || 'sb_publishable_SyyEq_lqVRprAfdsJSwtrg_BIXbaZXm';

let supabase = null;
if (typeof supabasejs !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabase = supabasejs.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else if (typeof window.supabase !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY) {
    // CDN import attaches to window.supabase
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else if (typeof supabase !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY) {
    // Default global supabase instance fallback
    supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// EmailJS Configuration Coordinates (Client/User to provide real values)
const EMAILJS_SERVICE_ID = window.EMAILJS_SERVICE_ID || 'service_ibz3h8a';
const EMAILJS_TEMPLATE_ID = window.EMAILJS_TEMPLATE_ID || 'template_31splpt';
const EMAILJS_PUBLIC_KEY = window.EMAILJS_PUBLIC_KEY || 'HhuTy78N1KyLZkrJ9';

// CMS-Ready Data Architecture (No Fabricated Stats, Clean Structures)
const DEHLIZ_DATA = {
    // Curated Social Media Posts (X, Instagram, Facebook) for Home Page Multi-Card Slider
    socialPosts: [
        {
            platform: 'instagram',
            id: 'DcodADXjJ1S',
            url: 'https://www.instagram.com/dehlizindia/p/DcodADXjJ1S/',
            text: 'Empowering local community leaders with legal and digital resources to create primary safety blocks.',
            image: '/community_networks.png',
            date: 'August 30, 2026'
        },
        {
            platform: 'twitter',
            id: 'x1',
            url: 'https://x.com/dehlizindia',
            text: 'Understanding your constitutional and family rights is the first step towards safety. Read our latest guide on Protection of Women from Domestic Violence Act, 2005.',
            image: '/legal_guidance.jpg',
            date: 'August 28, 2026'
        },
        {
            platform: 'facebook',
            id: 'fb1',
            url: 'https://www.facebook.com/dehlizindia',
            text: 'Dehliz works closely with legal scholars and social researchers to verify and catalog rights under both Indian Law and Islamic traditional jurisprudence.',
            image: '/community_support.png',
            date: 'August 25, 2026'
        },
        {
            platform: 'instagram',
            id: 'DcoOwQ6DGuz',
            url: 'https://www.instagram.com/dehlizindia/p/DcoOwQ6DGuz/',
            text: 'Dignified boundary between struggle and empowerment. Helping families walk into secure lives.',
            image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800',
            date: 'August 22, 2026'
        },
        {
            platform: 'twitter',
            id: 'x2',
            url: 'https://x.com/dehlizindia',
            text: 'Livelihoods and Skill Building: We support block-level workshops teaching basic economic skills and local resources.',
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
            date: 'August 19, 2026'
        },
        {
            platform: 'instagram',
            id: 'Dcn6lycjG2m',
            url: 'https://www.instagram.com/dehlizindia/p/Dcn6lycjG2m/',
            text: 'Advocating for educational block access and rights security awareness. Seminars held in regional communities.',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
            date: 'August 15, 2026'
        }
    ],
    // Featured YouTube Video config (Client episode 8)
    featuredVideo: {
        title: "Dehliz India - Ek Umeed",
        tag: "About Our Mission",
        embedUrl: "https://www.youtube.com/embed/UJo3ItcQtD4?playlist=UJo3ItcQtD4",
        description: "An overview of Dehliz India's efforts in building legal awareness, supporting communities, and empowering individuals."
    },

    // Campaigns Data
    campaigns: [
        {
            id: 'c1',
            title: 'Empower Her Rights',
            category: 'Legal Awareness',
            date: 'August 2026',
            description: 'A nationwide campaign focused on spreading awareness about constitutional and personal legal rights of women in local communities.',
            progress: 'Initial Phase',
            status: 'Ongoing',
            image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 'c2',
            title: 'Dignified Spaces',
            category: 'Community Support',
            date: 'July 2026',
            description: 'Support network enhancement providing safe shelters and counselling assistance pathways for vulnerable individuals.',
            progress: 'Capacity Building',
            status: 'Ongoing',
            image: '/community_support.png'
        },
        {
            id: 'c3',
            title: 'Rights & Faith Dialogue',
            category: 'Advocacy & Education',
            date: 'June 2026',
            description: 'Educational seminars clarifying women\'s rights, security, and financial autonomy guaranteed under Islamic family law frameworks.',
            progress: '6 Workshops Completed',
            status: 'Active',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'
        }
    ],

    // Success Stories (Dignity Preserved - Sample Structures for Future CMS Intake)
    successStories: [
        {
            id: 's1',
            badge: 'Legal Guidance',
            image: '/legal_guidance.jpg',
            quote: '"The support and clarity I received regarding my legal status changed my trajectory. I learned to stand strong and speak for myself."',
            author: 'A. Rahmani (Name changed for privacy)',
            result: 'Assisted with domestic rights counselling'
        },
        {
            id: 's2',
            badge: 'Community Network',
            image: '/community_networks.png',
            quote: '"Finding a supportive community that did not judge me, but rather empowered me with legal and spiritual awareness, was a turning point."',
            author: 'S. Fatima (Name changed for privacy)',
            result: 'Supported through local outreach workshops'
        },
        {
            id: 's3',
            badge: 'Community Support',
            image: '/community_support.png',
            quote: '"DEHLIZ provided me with immediate guidance and safety resources. The community support network helped us navigate our most difficult times."',
            author: 'R. Begum (Name changed for privacy)',
            result: 'Helped with emergency community support referrals'
        }
    ],

    // Resource & Publication Library (Topic, Category, Type, Date)
    resources: [
        {
            id: 'r1',
            title: 'Understanding Women\'s Inheritance Under Islamic Jurisprudence',
            category: 'Rights in Islam',
            type: 'Guide',
            date: '2026-05-15',
            summary: 'A detailed walkthrough of property rights, inheritance fractions, and economic independence structures provided to women in traditional Islamic law.',
            content: 'Islamic law establishes clear property and economic rights for women, separate from their male relatives. This comprehensive guide outlines the specific provisions, references from historical jurisprudence, and modern applications.'
        },
        {
            id: 'r2',
            title: 'A Guide to the Protection of Women from Domestic Violence Act, 2005',
            category: 'Indian Law',
            type: 'Publication',
            date: '2026-04-10',
            summary: 'An accessibility-focused overview of the legal protections, definitions of abuse, protection orders, and how to file a domestic incident report under Indian law.',
            content: 'Understanding your legal remedies is the first step toward safety. The Domestic Violence Act of 2005 offers civil protection orders, residence orders, and monetary relief. This publication explains how the law works and step-by-step procedures for seeking aid.'
        },
        {
            id: 'r3',
            title: 'Annual Social Impact and Community Support Report',
            category: 'Publications',
            type: 'Report',
            date: '2026-01-20',
            summary: 'Our annual review detailing outreach statistics, workshop counts, and strategic goals for support and legal awareness.',
            content: 'This document compiles the quantitative metrics and qualitative frameworks used by DEHLIZ during the previous fiscal year to promote rights education and safety networks across target communities.'
        },
        {
            id: 'r4',
            title: 'Empowerment Through Education: Empowering Local Community Leaders',
            category: 'Blog',
            type: 'Article',
            date: '2026-07-02',
            summary: 'A feature article on our latest training program for female community leaders in municipal legal resources.',
            content: 'Training local leaders ensures that legal and spiritual rights knowledge is distributed organically. Last month, we gathered 25 community advocates to discuss mediation frameworks and public assistance directories.'
        },
        {
            id: 'r5',
            title: 'Rights to Mehr (Dower) & Maintenance: Islamic Law Perspectives',
            category: 'Rights in Islam',
            type: 'Guide',
            date: '2026-03-05',
            summary: 'Exploring the legal and economic implications of Mehr, maintenance responsibilities, and marriage contracts.',
            content: 'Mehr is a mandatory payment given by the groom to the bride at the time of marriage, representing her exclusive property. This educational paper details the classifications of Mehr and legal recourse options.'
        },
        {
            id: 'r6',
            title: 'Know Your Rights: Family Courts and Personal Laws in India',
            category: 'Indian Law',
            type: 'Guide',
            date: '2026-02-12',
            summary: 'Practical overview of how Family Courts operate in India, procedure timelines, and what to expect during legal proceedings.',
            content: 'Navigating family courts can be overwhelming. This guide breaks down legal representation rules, reconciliation processes, and rights pertaining to custody and support.'
        },
        {
            id: 'r7',
            title: 'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013',
            category: 'Indian Law',
            type: 'Act / PDF',
            date: '2013-12-09',
            summary: 'The official POSH Act, 2013 outlining prevention, prohibition, and redressal mechanisms against sexual harassment at the workplace.',
            content: 'The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 is a legislative act in India that seeks to protect women from sexual harassment at their place of work. It was passed by the Lok Sabha on 3 September 2012, by the Rajya Sabha on 26 February 2013, and received the assent of the President on 22 April 2013.',
            pdfUrl: 'https://share.google/n4bQOWPBErWlcscRs'
        },
        {
            id: 'r8',
            title: 'The National Commission For Minorities Act, 1992',
            category: 'Indian Law',
            type: 'Act / PDF',
            date: '1992-05-17',
            summary: 'The legal framework establishing the National Commission for Minorities to safeguard the rights and interests of minority communities in India.',
            content: 'An Act to constitute a National Commission for Minorities and to provide for matters connected therewith or incidental thereto. It mandates the evaluation of progress of minority development under the Union and States.',
            pdfUrl: 'https://share.google/WuhPq9Xr9EYqQq7TI'
        },
        {
            id: 'r9',
            title: 'Case Comment: TMA Pai Foundation Vs State of Karnataka, 2002',
            category: 'Indian Law',
            type: 'Case Comment / PDF',
            date: '2002-10-31',
            summary: 'Analysis of the landmark Supreme Court judgment on the rights of minorities to establish and administer educational institutions under Article 30(1).',
            content: 'T.M.A. Pai Foundation v. State of Karnataka is a landmark decision of the Supreme Court of India. The Court ruled on the scope of right of minorities to establish and administer educational institutions of their choice under Article 30(1) and Article 19(1)(g) of the Constitution of India.',
            pdfUrl: 'https://share.google/XjXij4ZRHszOn1pjl'
        },
        {
            id: 'r10',
            title: 'Islamic Academy Of Education And Others vs State Of Karnataka And Others, 2003',
            category: 'Indian Law',
            type: 'Judgment / PDF',
            date: '2003-08-14',
            summary: 'Supreme Court judgment clarifying the implementation guidelines of the TMA Pai Foundation verdict on minority institution rights.',
            content: 'This judgment clarification deals with the regulation of fee structures, admission processes, and seat allocations in minority and non-minority educational institutions under Article 30 of the Constitution.',
            pdfUrl: 'https://share.google/wdpIqKbsphD8dksoi'
        },
        {
            id: 'r11',
            title: 'Fatima Sheikh - Wikipedia',
            category: 'Indian Law',
            type: 'Biography / PDF',
            date: '2026-08-30',
            summary: 'The life and legacy of Fatima Sheikh, one of India\'s first Muslim woman teachers and social reformers working alongside Savitribai Phule.',
            content: 'Fatima Sheikh was an Indian educator and social reformer, who was a colleague of the social reformers Jyotirao Phule and Savitribai Phule. She is widely regarded as the first Muslim woman teacher in modern India.',
            pdfUrl: 'https://share.google/HZpPVBarPbXeP2R0q'
        },
        {
            id: 'r12',
            title: 'Shabnam Hashmi vs. Union of India & Ors. (2014)',
            category: 'Indian Law',
            type: 'Judgment / PDF',
            date: '2014-02-19',
            summary: 'Supreme Court ruling establishing the right to adopt children under the Juvenile Justice Act as a fundamental right transcending personal laws.',
            content: 'In this landmark case, the Supreme Court of India held that prospective adoptive parents have the right to adopt a child under the Juvenile Justice (Care and Protection of Children) Act, 2000, irrespective of their personal laws.',
            pdfUrl: 'https://share.google/Sofdo8MabPzQso44x'
        },
        {
            id: 'r13',
            title: 'Women & The Law: Legal Awareness Programme',
            category: 'Indian Law',
            type: 'Act / PDF',
            date: '2026-08-30',
            summary: 'A comprehensive NALSA and NCW training module on constitutional rights, personal laws, labour laws, criminal laws, and reproductive rights for women.',
            content: 'This training module was created for NALSA resource persons in collaboration with the National Commission for Women (NCW) and All India Reporter. It covers Fundamental Rights, Directive Principles, Family Laws, Labour Laws, and Criminal Law protections.',
            pdfUrl: 'public/nalsa_women_and_law.pdf'
        },
        {
            id: 'r14',
            title: 'The Protection of Women from Domestic Violence Act, 2005',
            category: 'Indian Law',
            type: 'Act / PDF',
            date: '2005-09-13',
            summary: 'The full official text of the Protection of Women from Domestic Violence Act, 2005 outlining legal remedies, duties, and procedures for seeking relief.',
            content: 'An Act to provide for more effective protection of the rights of women guaranteed under the Constitution who are victims of violence of any kind occurring within the family and for matters connected therewith or incidental thereto.',
            pdfUrl: 'public/domestic_violence_act_2005.pdf'
        },
        {
            id: 'r15',
            title: 'Post-Matric Scholarship Scheme for Minority Communities',
            category: 'Publications',
            type: 'Act / PDF',
            date: '2026-08-30',
            summary: 'Official guidelines and eligibility criteria of the Post-Matric Scholarship scheme for students belonging to minority communities.',
            content: 'This scheme provides financial assistance for higher secondary, college, and university level studies to students belonging to notified minority communities (Muslims, Sikhs, Christians, Buddhists, Parsis, and Jains). Features 30% earmarking for girl students.',
            pdfUrl: 'public/post_matric_scholarship.pdf'
        },
        {
            id: 'r16',
            title: 'Summary of the Sachar Committee Report',
            category: 'Publications',
            type: 'Report / PDF',
            date: '2006-11-30',
            summary: 'A concise summary of the Prime Minister\'s High Level Committee Report on the social, economic, and educational status of the Muslim community in India.',
            content: 'Chaired by Justice Rajindar Sachar, this report examines the development deficits among Muslims in India, including literacy rates, employment shares in public sectors, and bank credit access.',
            pdfUrl: 'public/sachar_committee_report.pdf'
        },
        {
            id: 'r17',
            title: 'The Bharatiya Nyaya Sanhita, 2023',
            category: 'Indian Law',
            type: 'Act / PDF',
            date: '2023-12-25',
            summary: 'The official gazetted text of the Bharatiya Nyaya Sanhita, 2023 consolidating and amending general criminal code provisions in India.',
            content: 'An Act to consolidate and amend the provisions relating to offences and for matters connected therewith or incidental thereto, replacing the Indian Penal Code (IPC). It includes chapters on offences against women and children.',
            pdfUrl: 'public/bharatiya_nyaya_sanhita_2023.pdf'
        },
        {
            id: 'r18',
            title: 'Shamim Ara vs State of U.P. & Anr (2002)',
            category: 'Indian Law',
            type: 'Judgment / PDF',
            date: '2002-10-01',
            summary: 'Landmark Supreme Court of India judgment clarifying the legal requirements and validity of Talaq (divorce) under Muslim Personal Law.',
            content: 'In this decision, the Supreme Court ruled that a mere plea of previous divorce in a written statement or an affidavit does not by itself dissolve a marriage. For a divorce to be legally valid and effective, the pronouncement of Talaq must be proved with reasonable cause and preceded by attempts at reconciliation.',
            pdfUrl: 'public/shamim_ara_v_state_of_up.pdf'
        },
        {
            id: 'r19',
            title: 'Guidelines for "Nai Roshni" Scheme (2017)',
            category: 'Publications',
            type: 'Scheme Guidelines / PDF',
            date: '2017-09-23',
            summary: 'Official guidelines for the "Nai Roshni" scheme, focused on leadership development, confidence building, and economic empowerment of minority women.',
            content: 'Implemented by the Ministry of Minority Affairs, the Nai Roshni scheme aims to empower and instill confidence among minority women, including their neighbours, by providing training, tools, and knowledge to interact with government systems, banks, and other institutions.',
            pdfUrl: 'public/nai_roshni_guidelines.pdf'
        },
        {
            id: 'r20',
            title: 'Legal Frame Work and Constitutionalism of Wakf (Amendment) Act, 2025',
            category: 'Indian Law',
            type: 'Research Paper / PDF',
            date: '2025-05-01',
            summary: 'An academic research paper exploring the legal, constitutional, and socio-political dimensions of the Waqf (Amendment) Act, 2025.',
            content: 'This paper analyzes the principal provisions of the 2025 Waqf Amendment, including the inclusion of non-Muslim members, deletion of the "Waqf by User" provision, increased government oversight, and constitutional concerns regarding religious autonomy under Articles 25 and 26.',
            pdfUrl: 'public/wakf_amendment_act_2025.pdf'
        }
    ],

    // Verified Public Helplines & Assistance Networks (No fabricated numbers)
    helplines: [
        {
            organization: 'National Commission for Women (NCW) Helpline',
            service: '24/7 Helpline for Domestic Violence & Safety',
            phone: '7827170170',
            website: 'www.ncw.nic.in',
            availability: '24 Hours / 7 Days a week',
            location: 'National / Pan-India',
            description: 'Direct government helpline established to receive complaints of violence, abuse, and safety issues affecting women.'
        },
        {
            organization: 'National Emergency Support System',
            service: 'Single Emergency Response Number',
            phone: '112',
            website: 'www.112.gov.in',
            availability: '24 Hours / 7 Days a week',
            location: 'National / Pan-India',
            description: 'Integrated emergency response system for immediate Police, Fire, and Health emergencies.'
        },
        {
            organization: 'DEHLIZ Community Support Help Desk',
            service: 'Non-Emergency Legal & Support Guidance Referral',
            phone: '9892208356',
            website: 'Via official contact channels only',
            availability: '10:00 AM - 6:00 PM (Mon-Fri)',
            location: 'Community-level outreach offices',
            description: 'Connecting women to legal counseling, community advisors, and supportive referral directories.'
        }
    ],

    // Team Directory
    team: [
        {
            name: 'Nazia Sayed',
            role: 'Founder & Director',
            bio: 'Investigative Journalist, Author, and Communications Professional with 15+ years of experience in conflict reporting, corporate communications, and public affairs. Founder and Editor-in-Chief of Ground Zero Monitor.',
            image: 'public/nazia_sayed.jpg'
        },
        {
            name: 'Aman Khan',
            role: 'Director / Head of Research, Strategies & Communication',
            bio: 'Director at Dehliz and Head of Research, Strategies & Communication. Leads institutional research, policy strategy, and communication channels to drive social development and support networks.',
            image: 'public/aman_khan.png'
        },
        {
            name: 'Naziya',
            role: 'Head of Marketing & Branding',
            bio: 'Entrepreneur and freelance hairstylist with a passion for digital communication, content creation, and brand storytelling. Leads digital marketing and strategic communication to amplify women\'s education, employment, and empowerment initiatives.',
            image: 'public/naziya.jpg'
        },
        {
            name: 'Ayyan Chougle',
            role: 'Programme Coordinator & Research',
            bio: 'Mechanical Engineering graduate and Political Science researcher. Specializes in policy analysis, digital media initiatives, and translating complex socio-political data into clear, impactful narratives for women\'s development.',
            image: 'public/ayyan_chougle.png'
        }
    ],

    // Upcoming Events
    events: [
        {
            id: 'e1',
            date: 'Sept 15, 2026',
            title: 'Legal Awareness Workshop: Women\'s Constitutional Rights',
            location: 'Community Center / Hybrid',
            description: 'An interactive seminar breaking down property, family, and safety rights under local jurisprudence. Open registration.'
        },
        {
            id: 'e2',
            date: 'Oct 02, 2026',
            title: 'Islamic Jurisprudence & Gender Justice Seminar',
            location: 'Online Webinar',
            description: 'Prominent scholars discuss the historical framework of women\'s financial, spiritual, and marital autonomy in Islamic history.'
        }
    ],

    // Donation Impact Scale
    donationImpacts: {
        oneTime: [
            { amount: 500, title: 'Educational Materials', desc: 'Provides informative rights booklets and legal guide booklets to 5 community workshop participants.' },
            { amount: 1500, title: 'Counseling Session Support', desc: 'Enables 1 initial legal counseling or personal trauma guidance referral consultation for a woman in distress.' },
            { amount: 3000, title: 'Workshop Seminar Support', desc: 'Sponsors resource facilitation, printing, and space logistics for a local family rights awareness group meeting.' },
            { amount: 5000, title: 'Advocacy Materials & Outreach', desc: 'Enables development and translation of digital publications and legal self-help modules.' }
        ],
        monthly: [
            { amount: 200, title: 'Continuous Library Access', desc: 'Maintains digital hosting of resources and educational templates accessible to hundreds of readers daily.' },
            { amount: 500, title: 'Ongoing Support Network', desc: 'Assists with administrative support for tracking and routing calls to verified local crisis helpline networks.' },
            { amount: 1000, title: 'Regular Training Programs', desc: 'Provides ongoing training materials and legal briefs for 2 community volunteers each month.' },
            { amount: 2500, title: 'Sustained Legal Assistance', desc: 'Contributes to a legal aid pool that supports sustained legal counseling for women with limited financial means.' }
        ]
    }
};

// State Variables
let currentRoute = '/';
let resourceFilters = {
    search: '',
    category: 'All'
};
let activeDonationType = 'oneTime'; // 'oneTime' or 'monthly'
let selectedDonationAmount = 1500; // default one-time amount

// Dynamic Database Fetcher
async function initDatabaseData() {
    if (!supabase) {
        console.log("Supabase URL or Anon key is missing. Running in fallback/placeholder mode.");
        return;
    }

    try {
        // 1. Fetch campaigns
        const { data: campaignsData, error: campaignsError } = await supabase
            .from('campaigns')
            .select('*')
            .eq('is_published', true)
            .order('display_order', { ascending: true });
        if (!campaignsError && campaignsData && campaignsData.length > 0) {
            DEHLIZ_DATA.campaigns = campaignsData.map(c => {
                let img = c.cover_image_url || 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800';
                if (!c.cover_image_url || c.cover_image_url.includes('unsplash.com/photo-1544025162-d76694265947') || c.cover_image_url.includes('photo-1544025162')) {
                    if (c.category === 'Community Support') {
                        img = '/community_support.png';
                    }
                }
                return {
                    id: c.id,
                    title: c.title,
                    category: c.category,
                    date: c.start_date ? new Date(c.start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '',
                    description: c.short_description || c.description,
                    progress: c.progress || c.status,
                    status: c.status,
                    image: img
                };
            });
        }

        // 2. Fetch events
        const { data: eventsData, error: eventsError } = await supabase
            .from('events')
            .select('*')
            .eq('is_published', true)
            .order('event_date', { ascending: true });
        if (!eventsError && eventsData && eventsData.length > 0) {
            DEHLIZ_DATA.events = eventsData.map(e => ({
                id: e.id,
                date: new Date(e.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                title: e.title,
                location: e.location || (e.is_online ? 'Online Webinar' : ''),
                description: e.description
            }));
        }

        // 3. Fetch resources
        const { data: resourcesData, error: resourcesError } = await supabase
            .from('resources')
            .select('*')
            .eq('is_published', true);
        if (!resourcesError && resourcesData && resourcesData.length > 0) {
            const dbResources = resourcesData.map(r => ({
                id: r.id,
                title: r.title,
                category: r.category,
                type: r.resource_type || 'Guide',
                date: r.published_at ? r.published_at.split('T')[0] : r.created_at.split('T')[0],
                summary: r.description,
                content: r.content,
                pdfUrl: r.pdf_url || r.pdfUrl || null
            }));
            // Append database resources ensuring we keep our local pre-defined items intact
            const localResourceIds = ['r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13', 'r14', 'r15', 'r16', 'r17', 'r18', 'r19', 'r20'];
            const localItems = DEHLIZ_DATA.resources.filter(lr => localResourceIds.includes(lr.id));

            // Filter out duplicates if database happens to have same ids
            const filteredDbResources = dbResources.filter(dbr => !localResourceIds.includes(dbr.id));
            DEHLIZ_DATA.resources = [...filteredDbResources, ...localItems];
        }

        // 4. Fetch success stories
        const { data: successData, error: successError } = await supabase
            .from('success_stories')
            .select('*')
            .eq('is_published', true);
        if (!successError && successData && successData.length > 0) {
            DEHLIZ_DATA.successStories = successData.map(s => {
                let img = s.cover_image_url || '';
                if (!img || img.includes('unsplash.com/photo-1542838132-92c53300491e') || img.includes('photo-1542838132')) {
                    if (s.category === 'Legal Guidance') {
                        img = '/legal_guidance.jpg';
                    } else if (s.category === 'Community Network') {
                        img = '/community_networks.png';
                    } else if (s.category === 'Community Support') {
                        img = '/community_support.png';
                    }
                }
                return {
                    id: s.id,
                    badge: s.category || 'Success Story',
                    image: img,
                    quote: s.summary || s.story,
                    author: s.title,
                    result: s.summary
                };
            });
        }

        // 5. Fetch team members
        const { data: teamData, error: teamError } = await supabase
            .from('team_members')
            .select('*')
            .eq('is_active', true)
            .order('display_order', { ascending: true });
        if (!teamError && teamData && teamData.length > 0) {
            const dbTeam = teamData.map(t => ({
                name: t.name,
                role: t.role,
                bio: t.biography || '',
                image: t.photo_url || ''
            }));
            // Discard default placeholder rows from database
            const filteredDbTeam = dbTeam.filter(t => t.name !== 'Founder Name' && t.name !== 'Legal Advisor Name');

            // Keep local team members intact
            const localNames = ['Nazia Sayed', 'Ayyan Chougle', 'Naziya', 'Aman Khan'];
            const localItems = DEHLIZ_DATA.team.filter(lt => localNames.includes(lt.name));

            // Combine local items and unique database entries
            const uniqueDbItems = filteredDbTeam.filter(dbt => !localNames.includes(dbt.name));
            DEHLIZ_DATA.team = [...localItems, ...uniqueDbItems];
        }

        // 6. Fetch helplines
        const { data: helplineData, error: helplineError } = await supabase
            .from('helplines')
            .select('*')
            .eq('is_published', true);
        if (!helplineError && helplineData && helplineData.length > 0) {
            DEHLIZ_DATA.helplines = helplineData.map(h => ({
                organization: h.organization_name,
                service: h.service_name || '',
                phone: h.phone,
                website: h.website_url || '',
                availability: h.availability || '',
                location: h.location || '',
                description: h.description || ''
            }));
        }

        // Refresh currently active route so layout updates with real database records
        renderPage(currentRoute);

    } catch (err) {
        console.error("Error executing Supabase query sync:", err);
    }
}

// Initialize Router & Events
window.addEventListener('DOMContentLoaded', () => {
    initRouter();
    setupGlobalEvents();
    initDatabaseData();
});

// Client-Side Hash Router
function initRouter() {
    const handleRoute = () => {
        const hash = window.location.hash || '#/';
        // Normalize hash to path format (e.g. #/about -> /about)
        let path = hash.substring(1);
        if (!path.startsWith('/')) {
            path = '/' + path;
        }

        currentRoute = path;
        renderPage(path);
        updateActiveNavLinks(hash);
        window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleRoute);
    handleRoute(); // Call once on load
}

function updateActiveNavLinks(hash) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        const linkHash = link.getAttribute('href');
        if (linkHash === hash || (hash === '#/' && linkHash === '#/')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function setupGlobalEvents() {
    // Mobile Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('mobile-open');
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('mobile-open');
        });
    });
}

// Route Renderer
function renderPage(path) {
    const appContent = document.getElementById('app-content');
    appContent.className = 'page-transition'; // Trigger fade animation

    // Simple base routing logic
    if (path === '/' || path === '/home') {
        appContent.innerHTML = getHomeHtml();
        setupHomeInteractions();
    } else if (path === '/about') {
        appContent.innerHTML = getAboutHtml();
    } else if (path === '/our-work') {
        appContent.innerHTML = getOurWorkHtml();
    } else if (path === '/resources') {
        appContent.innerHTML = getResourcesHtml();
        setupResourcesInteractions();
    } else if (path === '/join-us') {
        appContent.innerHTML = getJoinUsHtml();
        setupJoinUsInteractions();
    } else if (path === '/donate') {
        appContent.innerHTML = getDonateHtml();
        setupDonateInteractions();
    } else if (path === '/contact') {
        appContent.innerHTML = getContactHtml();
        setupContactInteractions();
    } else if (path === '/admin') {
        appContent.innerHTML = getAdminPageHtml();
        setupAdminInteractions();
    } else if (path === '/our-work/support-services') {
        appContent.innerHTML = getOurWorkSubpageHtml('support');
    } else if (path === '/our-work/community-initiatives') {
        appContent.innerHTML = getOurWorkSubpageHtml('community');
    } else if (path === '/our-work/advocacy') {
        appContent.innerHTML = getOurWorkSubpageHtml('advocacy');
    } else if (path === '/resources/islamic-rights') {
        appContent.innerHTML = getResourcesSubpageHtml('Rights in Islam');
    } else if (path === '/resources/indian-law') {
        appContent.innerHTML = getResourcesSubpageHtml('Indian Law');
    } else if (path === '/resources/publications') {
        appContent.innerHTML = getResourcesSubpageHtml('Publications');
    } else {
        // Fallback to 404/Home
        appContent.innerHTML = getHomeHtml();
        setupHomeInteractions();
    }
}

// ----------------------------------------------------
// PAGE VIEW GENERATORS (HTML templates in JS)
// ----------------------------------------------------

function getHomeHtml() {
    // Generate campaigns markup
    const campaignsHtml = DEHLIZ_DATA.campaigns.map(c => `
        <div class="img-card fade-in-section">
            <div class="img-card-media">
                <img src="${c.image}" alt="${c.title}" loading="lazy">
            </div>
            <div class="img-card-content">
                <span class="card-meta">${c.category}</span>
                <h3 class="card-title">${c.title}</h3>
                <p class="card-text">${c.description}</p>
                <a href="#/our-work/advocacy" class="card-link">Learn More &rarr;</a>
            </div>
        </div>
    `).join('');

    // Generate success stories markup
    const storiesHtml = DEHLIZ_DATA.successStories.map(s => `
        <div class="story-card fade-in-section">
            <div class="story-img-area">
                <img src="${s.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600'}" alt="${s.badge}" loading="lazy" style="object-fit: cover; width: 100%; height: 100%;">
            </div>
            <div class="story-content-area">
                <span class="story-badge">${s.badge}</span>
                <p class="story-quote">${s.quote}</p>
                <div class="story-author">${s.author}</div>
                <div class="story-result">${s.result}</div>
            </div>
        </div>
    `).join('');

    // Generate recent resources
    const recentResourcesHtml = DEHLIZ_DATA.resources.slice(0, 3).map(r => `
        <div class="card fade-in-section">
            <span class="card-meta">${r.category} &bull; ${r.type}</span>
            <h3 class="card-title">${r.title}</h3>
            <p class="card-text">${r.summary}</p>
            <a href="#/resources" class="card-link">Read Guide &rarr;</a>
        </div>
    `).join('');

    // Generate Social slide cards markup (shows 3 on desktop, 2 on tablet, 1 on mobile)
    const socialSlidesHtml = DEHLIZ_DATA.socialPosts.map((p, index) => {
        let platformIcon = '📸';
        let platformColor = '#E1306C';
        let platformName = 'Instagram';
        if (p.platform === 'twitter') {
            platformIcon = '🐦';
            platformColor = '#1DA1F2';
            platformName = 'X (Twitter)';
        } else if (p.platform === 'facebook') {
            platformIcon = '📘';
            platformColor = '#1877F2';
            platformName = 'Facebook';
        }

        return `
            <div class="social-card-slide" style="flex: 0 0 calc(33.333% - 1rem); min-width: 280px; box-sizing: border-box; background: white; border-radius: 12px; overflow: hidden; border: 1px solid rgba(142, 112, 79, 0.15); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; transition: all 0.3s ease;">
                <div style="padding: 1rem; border-bottom: 1px solid rgba(142,112,79,0.08); display: flex; align-items: center; gap: 0.75rem; background: var(--color-cream);">
                    <span style="font-size: 1.25rem;">${platformIcon}</span>
                    <div style="line-height: 1.2;">
                        <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-charcoal);">@dehlizindia</div>
                        <span style="font-size: 0.75rem; color: ${platformColor}; font-weight: 600;">${platformName}</span>
                    </div>
                </div>
                ${p.image ? `
                <div style="width: 100%; height: 180px; overflow: hidden;">
                    <img src="${p.image}" alt="Post image" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                ` : ''}
                <div style="padding: 1.25rem; display: flex; flex-direction: column; flex-grow: 1;">
                    <p style="font-size: 0.95rem; line-height: 1.5; color: var(--color-text-dark); margin-bottom: 1.5rem; flex-grow: 1; min-height: 70px;">
                        ${p.text}
                    </p>
                    <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(142,112,79,0.08); padding-top: 0.75rem; margin-top: auto;">
                        <span style="font-size: 0.75rem; color: var(--color-text-light); font-weight: 500;">${p.date}</span>
                        <a href="${p.url}" target="_blank" style="font-size: 0.8rem; font-weight: 700; color: var(--color-bronze); text-decoration: none; display: flex; align-items: center; gap: 4px;">View Post &rarr;</a>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Generate slider dots markup
    const socialDotsHtml = DEHLIZ_DATA.socialPosts.map((_, index) => `
        <span class="dot ${index === 0 ? 'active' : ''}" data-slide="${index}" style="width: 8px; height: 8px; border-radius: 50%; background: rgba(142, 112, 79, 0.3); cursor: pointer; transition: all 0.3s ease;"></span>
    `).join('');

    return `
        <!-- Hero Section -->
        <section class="hero bg-beige-section">
            <div class="container grid-2">
                <div class="hero-content">
                    <span class="hero-tag" style="font-family: var(--font-logo); text-transform: lowercase; font-size: 1.3rem; color: var(--color-bronze); display: inline-flex; align-items: center; gap: 8px; margin-bottom: 1.5rem;">dehliz <span style="font-size: 9px; color: var(--color-charcoal); line-height: 1;">&hearts;</span> <span style="font-family: var(--font-body); font-size: 0.85rem; letter-spacing: 2px; font-weight: 600;">ek umeed</span></span>
                    <h1 class="hero-title">Empowering Communities. Protecting Rights.</h1>
                    <p class="hero-description">We promote awareness, social safety networks, and legal understanding, focusing on women's rights under Indian constitutional law and Islamic jurisprudence.</p>
                    <div class="hero-actions">
                        <a href="#/our-work" class="btn btn-primary">Get Support</a>
                        <a href="#/donate" class="btn btn-secondary">Support Our Work</a>
                    </div>
                </div>
            </div>
            <div class="hero-image-container">
                <div class="hero-img-wrapper" style="overflow: hidden;">
                    <!-- Brand logo video as primary visual anchor -->
                    <video src="vid.mp4" autoplay loop muted playsinline style="width: 100%; height: auto; max-width: 480px; display: block; border-radius: 8px;"></video>
                </div>
            </div>
        </section>

        <!-- Mission Statement & Brand Introduction -->
        <section class="container">
            <div class="logo-anchor-card" style="overflow: hidden; background: transparent; border: none; box-shadow: none;">
                <video src="vid.mp4" autoplay loop muted playsinline style="width: 100%; height: auto; max-width: 180px; display: block; margin: 0 auto; border-radius: 8px;"></video>
                <h2 style="font-family: var(--font-heading); font-size: 2.2rem; margin-bottom: 1.5rem; color: var(--color-charcoal);">Our Foundation & Trust</h2>
                <p style="max-width: 800px; margin: 0 auto 1.5rem auto; font-size: 1.15rem; color: var(--color-text-dark); font-weight: 500;">
                    DEHLIZ (meaning 'threshold' or 'doorstep') symbolizes the safe boundary between struggle and empowerment, guiding families and individuals into safe, informed, and dignified lives.
                </p>
                <p style="max-width: 700px; margin: 0 auto; font-size: 0.95rem;">
                    Our commitment blends rigorous legal advocacy under Indian statutes with a faithful understanding of marital and financial rights granted within Islamic tradition.
                </p>
            </div>
            
            <div class="grid-2" style="margin-top: 4rem;">
                <div>
                    <span class="section-tag">WHO WE ARE</span>
                    <h2 class="section-title">Turning Awareness into Action</h2>
                    <p style="margin-bottom: 2rem; font-size: 1.1rem; font-weight: 500;">Our work focuses on turning awareness into action through four key areas:</p>
                    
                    <ul style="list-style: none; padding: 0; margin: 0 0 2.5rem 0; display: flex; flex-direction: column; gap: 1.25rem;">
                        <li style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">1</span>
                            <div>
                                <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">Education & Literacy</strong>
                                <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">Promoting access to education, digital literacy and learning opportunities for Muslim girls and women.</span>
                            </div>
                        </li>
                        <li style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">2</span>
                            <div>
                                <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">Livelihoods & Employment</strong>
                                <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">Supporting Muslim women with skills, employment opportunities, entrepreneurship and pathways towards economic independence.</span>
                            </div>
                        </li>
                        <li style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">3</span>
                            <div>
                                <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">Legal Literacy & Access to Justice</strong>
                                <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">Creating awareness about constitutional rights, laws, government support systems and available legal assistance.</span>
                            </div>
                        </li>
                        <li style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">4</span>
                            <div>
                                <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">Social Awareness & Empowerment</strong>
                                <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">Starting conversations around issues affecting Muslim women and creating platforms where their voices, experiences and achievements can be recognised.</span>
                            </div>
                        </li>
                    </ul>
                    <a href="#/about" class="btn btn-secondary">Read Our Full Story &rarr;</a>
                </div>
                <div>
                    <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800" alt="Empowered Community Gathering" style="border: 1px solid rgba(142, 112, 79, 0.2); padding: 8px; background: var(--color-cream);" loading="lazy">
                </div>
            </div>
        </section>

        <!-- Social Media Posts Slideshow Banner -->
        <section class="banner-slider-section bg-beige-section">
            <div class="container">
                <div class="section-header text-center" style="margin-bottom: 2rem;">
                    <span class="section-tag">SOCIAL MEDIA FEED</span>
                    <h2 class="section-title">Latest Updates & Posts</h2>
                </div>
                
                <div class="slider-wrapper" style="position: relative; max-width: 1200px; margin: 0 auto; overflow: hidden; padding: 1rem 0;">
                    <div class="slider-container" id="homeSlider" style="display: flex; transition: transform 0.5s ease-in-out; gap: 1.5rem; width: 100%;">
                        ${socialSlidesHtml}
                    </div>
                    
                    <!-- Slider Controls -->
                    <button class="slider-btn prev-btn" id="prevSlideBtn" aria-label="Previous Slide" style="position: absolute; top: 50%; left: 0px; transform: translateY(-50%); background: white; border: 1px solid rgba(142, 112, 79, 0.3); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer; color: var(--color-charcoal); z-index: 10; box-shadow: var(--shadow-sm); transition: all 0.3s ease;">&#10094;</button>
                    <button class="slider-btn next-btn" id="nextSlideBtn" aria-label="Next Slide" style="position: absolute; top: 50%; right: 0px; transform: translateY(-50%); background: white; border: 1px solid rgba(142, 112, 79, 0.3); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer; color: var(--color-charcoal); z-index: 10; box-shadow: var(--shadow-sm); transition: all 0.3s ease;">&#10095;</button>
                    
                    <!-- Slider Dots -->
                    <div class="slider-dots" id="sliderDots" style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 2rem; flex-wrap: wrap;">
                        ${socialDotsHtml}
                    </div>
                </div>
            </div>
        </section>

        <!-- Configurable YouTube Video Section -->
        ${DEHLIZ_DATA.featuredVideo && DEHLIZ_DATA.featuredVideo.embedUrl ? `
        <section class="container">
            <div class="video-section">
                <div class="video-wrapper">
                    <iframe 
                        src="${DEHLIZ_DATA.featuredVideo.embedUrl}" 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="video-info">
                    ${DEHLIZ_DATA.featuredVideo.tag ? `<span class="video-tag">${DEHLIZ_DATA.featuredVideo.tag}</span>` : ''}
                    <h2 class="video-title">${DEHLIZ_DATA.featuredVideo.title}</h2>
                    <p class="video-desc">${DEHLIZ_DATA.featuredVideo.description}</p>
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Dynamic Success Stories / Impact Section -->
        <section class="bg-beige-section">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag">IMPACT & STORIES</span>
                    <h2 class="section-title">Support & Success Stories</h2>
                    <p class="section-subtitle">Real community impact. Identites and detailed elements are protected to preserve safety and human dignity.</p>
                </div>
                <div class="stories-container">
                    ${storiesHtml}
                </div>
            </div>
        </section>

        <!-- Three Core Work Verticals -->
        <section class="container">
            <div class="section-header">
                <span class="section-tag">OUR WORK AREAS</span>
                <h2 class="section-title">What We Do</h2>
                <p class="section-subtitle">Three pillars focused on safety, education, advocacy and legal assistance pathways.</p>
            </div>
            <div class="grid-3">
                <div class="card">
                    <div class="card-icon">&sect;</div>
                    <h3 class="card-title">Support Services</h3>
                    <p class="card-text">Confidential legal aid referrals, emotional counselling channels, and safety advice directories for women seeking safety.</p>
                    <a href="#/our-work/support-services" class="card-link">Explore Support &rarr;</a>
                </div>
                <div class="card">
                    <div class="card-icon">&amp;</div>
                    <h3 class="card-title">Community Initiatives</h3>
                    <p class="card-text">Local legal awareness workshops, education programs, and community-led mutual support systems.</p>
                    <a href="#/our-work/community-initiatives" class="card-link">Explore Initiatives &rarr;</a>
                </div>
                <div class="card">
                    <div class="card-icon">&#9878;</div>
                    <h3 class="card-title">Advocacy & Reforms</h3>
                    <p class="card-text">Campaigning for women's legal protection, advocating for fair family law interpretations, and conducting rights research.</p>
                    <a href="#/our-work/advocacy" class="card-link">Explore Advocacy &rarr;</a>
                </div>
            </div>
        </section>

        <!-- Support emergency notice CTA banner -->
        <section class="cta-banner bg-charcoal-section">
            <div class="cta-banner-content">
                <h2 class="text-gold">Need support or rights resources?</h2>
                <p>Access our community helpline directory, download educational manuals, or connect with our intake coordinators.</p>
                <div class="cta-banner-actions">
                    <a href="#/our-work" class="btn btn-outline-gold">Helplines Directory</a>
                    <a href="#/resources" class="btn btn-primary" style="background-color: var(--color-bronze); color: white;">Rights Library</a>
                </div>
            </div>
        </section>

        <!-- Featured Campaigns -->
        <section class="container">
            <div class="section-header">
                <span class="section-tag">ACTIVE CAMPAIGNS</span>
                <h2 class="section-title">Current Advocacy Campaigns</h2>
                <p class="section-subtitle">Discover our active community programs focused on legal education and social support.</p>
            </div>
            <div class="grid-3">
                ${campaignsHtml}
            </div>
        </section>

        <!-- Resource Library Sneak-peek -->
        <section class="bg-beige-section">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag">RESOURCES & GUIDES</span>
                    <h2 class="section-title">Featured Legal & Jurisprudential Guides</h2>
                    <p class="section-subtitle">Education is empowerment. Access clear, reviewed guides concerning your rights.</p>
                </div>
                <div class="grid-3">
                    ${recentResourcesHtml}
                </div>
                <div class="text-center" style="margin-top: 3.5rem;">
                    <a href="#/resources" class="btn btn-primary">Browse All Resources</a>
                </div>
            </div>
        </section>

        <!-- Homepage Events Section -->
        <section class="container">
            <div class="section-header">
                <span class="section-tag">UPCOMING PROGRAMS</span>
                <h2 class="section-title">Events & Seminars</h2>
                <p class="section-subtitle">Join our active workshops and webinars to learn about constitutional protections and community solidarity.</p>
            </div>
            <div class="grid-2">
                ${DEHLIZ_DATA.events.map(e => `
                    <div class="card">
                        <span class="card-meta">${e.date}</span>
                        <h3 class="card-title">${e.title}</h3>
                        <div style="font-size: 0.85rem; color: var(--color-bronze); font-weight: 700; margin-bottom: 1.0rem;">Location: ${e.location}</div>
                        <p class="card-text">${e.description}</p>
                        <a href="#/join-us" class="card-link" onclick="focusVolunteerForm('${e.title}')">Register Attendance &rarr;</a>
                    </div>
                `).join('')}
            </div>
        </section>

        <!-- WhatsApp QR Section on Homepage -->
        <section class="bg-beige-section">
            <div class="container">
                <div class="whatsapp-community-card">
                    <div class="whatsapp-qr-area">
                        <div style="text-align: center;">
                            <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">&#128225;</span>
                            <span style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--color-bronze);">[DEHLIZ WHATSAPP QR]</span>
                        </div>
                    </div>
                    <div class="whatsapp-content-area">
                        <h3 class="whatsapp-title">Join Our Community Updates Channel</h3>
                        <p style="font-size: 0.95rem; margin-bottom: 1.5rem;">Get instant notices regarding legal aid schedules, publication drops, and regional workshops directly on your mobile device.</p>
                        <a href="https://www.instagram.com/dehlizindia/" target="_blank" class="btn btn-support">Open WhatsApp Channel</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Homepage Donation CTA Section -->
        <section class="container text-center" style="border-top: 1px solid rgba(142, 112, 79, 0.15); padding-top: 5rem; padding-bottom: 5rem;">
            <div style="max-width: 800px; margin: 0 auto;">
                <span class="section-tag">SUPPORT US</span>
                <h2 style="font-size: 2.2rem; margin-bottom: 1rem; font-family: var(--font-heading);">Where Your Support Goes</h2>
                <p style="margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">Donations are allocated directly to legal guidelines development, workshop booklets, and community counseling references.</p>
                <div class="grid-4" style="margin-top: 2rem; margin-bottom: 3rem; text-align: left;">
                    <div style="background: var(--color-cream); padding: 1.5rem; border: 1px solid rgba(142,112,79,0.12);">
                        <h4 style="font-family: var(--font-body); font-weight: 700; color: var(--color-bronze); margin-bottom: 0.5rem;">Workshops (40%)</h4>
                        <p style="font-size: 0.85rem;">Funding print manuals and local hall logistics.</p>
                    </div>
                    <div style="background: var(--color-cream); padding: 1.5rem; border: 1px solid rgba(142,112,79,0.12);">
                        <h4 style="font-family: var(--font-body); font-weight: 700; color: var(--color-bronze); margin-bottom: 0.5rem;">Referral Directory (30%)</h4>
                        <p style="font-size: 0.85rem;">Maintaining verified legal aid directories.</p>
                    </div>
                    <div style="background: var(--color-cream); padding: 1.5rem; border: 1px solid rgba(142,112,79,0.12);">
                        <h4 style="font-family: var(--font-body); font-weight: 700; color: var(--color-bronze); margin-bottom: 0.5rem;">Publications (20%)</h4>
                        <p style="font-size: 0.85rem;">Researching and translating legal sheets.</p>
                    </div>
                    <div style="background: var(--color-cream); padding: 1.5rem; border: 1px solid rgba(142,112,79,0.12);">
                        <h4 style="font-family: var(--font-body); font-weight: 700; color: var(--color-bronze); margin-bottom: 0.5rem;">Operations (10%)</h4>
                        <p style="font-size: 0.85rem;">Digital workspace and data safety audits.</p>
                    </div>
                </div>
                <div style="background: var(--color-beige); padding: 1rem; border-left: 3px solid var(--color-bronze); margin-bottom: 2rem; display: inline-block; font-size: 0.85rem;">
                    <strong>Notice:</strong> Online Payment Gateway Integration is currently required. Directly support via manual bank transfer coordinates.
                </div>
                <br>
                <a href="#/donate" class="btn btn-primary">Contribute Now</a>
            </div>
        </section>

        <!-- Join Us banner -->
        <section class="container text-center" style="padding-top: 5rem; padding-bottom: 5rem;">
            <div style="max-width: 800px; margin: 0 auto; background: var(--color-beige); padding: 4rem 2rem; border: 1px solid rgba(142,112,79,0.15);">
                <span class="section-tag">BECOME PART OF DEHLIZ</span>
                <h2 style="font-size: 2.2rem; margin-bottom: 1rem;">Join Our Empowered Community</h2>
                <p style="margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">Support rights awareness, volunteer your legal/design expertise, or join as a registered member to help build safer futures.</p>
                <a href="#/join-us" class="btn btn-primary">Join Dehliz</a>
            </div>
        </section>
    `;
}

function setupHomeInteractions() {
    const slider = document.getElementById('homeSlider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.social-card-slide');
    const dots = document.querySelectorAll('#sliderDots .dot');
    const prevBtn = document.getElementById('prevSlideBtn');
    const nextBtn = document.getElementById('nextSlideBtn');
    let currentSlide = 0;
    let slideInterval;

    function getVisibleCardsCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function showSlide(index) {
        const visibleCards = getVisibleCardsCount();
        const maxSlideIndex = Math.max(0, slides.length - visibleCards);
        
        currentSlide = index;
        if (currentSlide > maxSlideIndex) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = maxSlideIndex;
        }

        // Shifting slides offset dynamically
        const offsetPercent = currentSlide * (100 / visibleCards);
        slider.style.transform = `translateX(-${offsetPercent}%)`;

        // Update dots status
        dots.forEach((dot, idx) => {
            if (idx === currentSlide) {
                dot.classList.add('active');
                dot.style.background = 'var(--color-bronze)';
                dot.style.width = '20px';
                dot.style.borderRadius = '10px';
            } else {
                dot.classList.remove('active');
                dot.style.background = 'rgba(142, 112, 79, 0.3)';
                dot.style.width = '8px';
                dot.style.borderRadius = '50%';
            }
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });
        prevBtn.addEventListener('mouseenter', () => {
            prevBtn.style.background = 'var(--color-bronze)';
            prevBtn.style.color = 'white';
        });
        prevBtn.addEventListener('mouseleave', () => {
            prevBtn.style.background = 'white';
            prevBtn.style.color = 'var(--color-charcoal)';
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });
        nextBtn.addEventListener('mouseenter', () => {
            nextBtn.style.background = 'var(--color-bronze)';
            nextBtn.style.color = 'white';
        });
        nextBtn.addEventListener('mouseleave', () => {
            nextBtn.style.background = 'white';
            nextBtn.style.color = 'var(--color-charcoal)';
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-slide'));
            showSlide(index);
            resetTimer();
        });
    });

    function startTimer() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    window.addEventListener('resize', () => {
        showSlide(currentSlide);
    });

    // Initialize styling for active dot on load
    showSlide(0);
    startTimer();
}

function getAboutHtml() {
    const teamHtml = DEHLIZ_DATA.team.map(member => `
        <div class="team-card">
            <div class="team-avatar">
                <img src="${member.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'}" alt="${member.name} Profile" style="object-fit: cover; width: 100%; height: 100%;">
            </div>
            <div class="team-name">${member.name}</div>
            <div class="team-role">${member.role}</div>
            <div class="team-bio">${member.bio}</div>
        </div>
    `).join('');

    return `
        <section class="bg-beige-section">
            <div class="container" style="max-width: 800px; text-align: center;">
                <span class="section-tag">ABOUT US</span>
                <h1 class="section-title" style="font-size: 3.5rem;">Who We Are</h1>
                <p style="font-size: 1.25rem; line-height: 1.8;"><strong>Dehliz - Ek Umeed</strong> is an initiative committed to creating a more informed, empowered and inclusive society where muslim women have the knowledge, opportunities and confidence to shape their own futures.</p>
            </div>
        </section>

        <!-- Our Story & Foundations -->
        <section class="container grid-2">
            <div>
                <h2 style="font-size: 2.2rem; margin-bottom: 1.5rem; font-family: var(--font-heading);">Our Focus & Belief</h2>
                <p style="margin-bottom: 1.5rem; font-size: 1.1rem; font-weight: 500; line-height: 1.7;">Our work focuses on turning awareness into action through four key areas:</p>
                
                <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; display: flex; flex-direction: column; gap: 1.25rem;">
                    <li style="display: flex; gap: 1rem; align-items: flex-start;">
                        <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">1</span>
                        <div>
                            <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">Education & Literacy</strong>
                            <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">Promoting access to education, digital literacy and learning opportunities for Muslim girls and women.</span>
                        </div>
                    </li>
                    <li style="display: flex; gap: 1rem; align-items: flex-start;">
                        <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">2</span>
                        <div>
                            <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">Livelihoods & Employment</strong>
                            <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">Supporting Muslim women with skills, employment opportunities, entrepreneurship and pathways towards economic independence.</span>
                        </div>
                    </li>
                    <li style="display: flex; gap: 1rem; align-items: flex-start;">
                        <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">3</span>
                        <div>
                            <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">Legal Literacy & Access to Justice</strong>
                            <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">Creating awareness about constitutional rights, laws, government support systems and available legal assistance.</span>
                        </div>
                    </li>
                    <li style="display: flex; gap: 1rem; align-items: flex-start;">
                        <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">4</span>
                        <div>
                            <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">Social Awareness & Empowerment</strong>
                            <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">Starting conversations around issues affecting Muslim women and creating platforms where their voices, experiences and achievements can be recognised.</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div>
                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800" alt="Editorial Story Image" style="border: 1px solid rgba(142, 112, 79, 0.2); padding: 8px; background: var(--color-cream);">
            </div>
        </section>

        <!-- Mission, Vision & Core Values -->
        <section class="bg-beige-section">
            <div class="container grid-3">
                <div class="card">
                    <h3 class="card-title" style="color: var(--color-bronze);">Our Mission</h3>
                    <p class="card-text">To empower Muslim women with knowledge, skills, opportunities and awareness of their rights, enabling them to make informed decisions, achieve greater independence and participate equally in society.</p>
                </div>
                <div class="card">
                    <h3 class="card-title" style="color: var(--color-bronze);">Our Vision</h3>
                    <p class="card-text">A society where every Muslim woman has the knowledge, opportunity, freedom and confidence to shape her own future. We envision a society where Muslim women can access education, build sustainable livelihoods, understand and exercise their rights, participate in decision-making and live with equality, safety and dignity.</p>
                </div>
                <div class="card">
                    <h3 class="card-title" style="color: var(--color-bronze);">Our Values</h3>
                    <p class="card-text" style="font-size: 1.1rem; line-height: 1.8; color: var(--color-charcoal);">
                        Our values are simple:<br>
                        <strong>Educate. Empower. Enable. Inspire.</strong>
                    </p>
                </div>
            </div>
        </section>

        <!-- Our Approach -->
        <section class="container">
            <div class="section-header">
                <span class="section-tag">METHODOLOGY</span>
                <h2 class="section-title">Our Strategic Approach</h2>
                <p class="section-subtitle">How we combine education, community advocacy, and referral-based support networks to drive impact.</p>
            </div>
            
            <div class="grid-2">
                <div>
                    <h3 style="font-size: 1.6rem; margin-bottom: 1rem;">1. Ground-Up Legal Education</h3>
                    <p style="margin-bottom: 1.5rem;">We believe legal empowerment starts locally. We translate complex legal definitions (e.g. inheritance laws, domestic safety acts) into clear, multi-lingual guides and community workshops.</p>
                    
                    <h3 style="font-size: 1.6rem; margin-bottom: 1rem;">2. Islamic Rights Clarification</h3>
                    <p style="margin-bottom: 1.5rem;">Distorting traditional values often isolates women from seeking civil remedies. We offer resources explaining the strong property, consent, and marital rights guaranteed to women within traditional Islamic jurisprudence.</p>
                </div>
                <div>
                    <h3 style="font-size: 1.6rem; margin-bottom: 1rem;">3. Safe Directory Referrals</h3>
                    <p style="margin-bottom: 1.5rem;">We do not replace state agencies or emergency portals. Instead, we catalog, verify, and guide individuals to established public helplines, safe shelters, legal aid attorneys, and professional counselors.</p>
                    
                    <h3 style="font-size: 1.6rem; margin-bottom: 1rem;">4. Public Policy Advocacy</h3>
                    <p>Through research papers, publications, and campaigns, we advocate for fair legal interpretations and structural gender reforms that guarantee dignity for women.</p>
                </div>
            </div>
        </section>

        <!-- Leadership & Team Directory -->
        <section class="bg-beige-section">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag">LEADERSHIP & TRUSTEES</span>
                    <h2 class="section-title">Our Team & Advisers</h2>
                    <p class="section-subtitle">Organized by CMS structures. Authentic team biographies are maintained directly by the board.</p>
                </div>
                <div class="team-grid">
                    ${teamHtml}
                </div>
            </div>
        </section>
    `;
}

function getOurWorkHtml() {
    // Generate verified helplines list
    const helplineRows = DEHLIZ_DATA.helplines.map(h => `
        <div class="helpline-card">
            <div class="helpline-title">${h.organization}</div>
            <div style="font-size: 0.9rem; color: var(--color-bronze); font-weight: 600;">${h.service}</div>
            <div class="helpline-number">${h.phone}</div>
            <div class="helpline-meta-row">
                <div class="helpline-meta-item">Location: <span>${h.location}</span></div>
                <div class="helpline-meta-item">Hours: <span>${h.availability}</span></div>
            </div>
            <p style="font-size: 0.9rem; flex-grow: 1;">${h.description}</p>
            ${h.website !== 'N/A' && !h.website.includes('[') ? `<a href="https://${h.website}" target="_blank" style="margin-top: 1rem; font-size: 0.85rem; font-weight: 700; color: var(--color-charcoal); text-decoration: underline;">Visit Web Platform &rarr;</a>` : ''}
        </div>
    `).join('');

    return `
        <section class="bg-beige-section">
            <div class="container" style="max-width: 800px; text-align: center;">
                <span class="section-tag">ACTIVITIES</span>
                <h1 class="section-title" style="font-size: 3.5rem;">Our Work</h1>
                <p style="font-size: 1.25rem; line-height: 1.8;">Learn how we build awareness, support communities, and advocate for constitutional safety networks across the country.</p>
            </div>
        </section>

        <!-- Vertical A: Support Services -->
        <section class="container" id="support-services">
            <div class="grid-2">
                <div>
                    <span class="section-tag">VERTICAL A</span>
                    <h2 class="section-title">Support Services & Referral Networks</h2>
                    <p style="margin-bottom: 1.2rem;">DEHLIZ facilitates direct access to public resources. We catalog verified legal support channels, trauma counseling centers, and shelter locations.</p>
                    <p style="margin-bottom: 2rem;">If you or someone you know requires legal assistance or domestic support, refer to the verified public directories below. We encourage contacting these national resources directly for immediate emergency support.</p>
                    <a href="#/contact" class="btn btn-primary">Connect with Intake Advisor</a>
                </div>
                <div>
                    <img src="/community_support.png" alt="Counseling meeting context" style="border: 1px solid rgba(142, 112, 79, 0.2); padding: 8px; background: var(--color-cream); max-height: 380px; width: 100%; object-fit: cover;">
                </div>
            </div>

            <!-- Helplines Sub-directory -->
            <div style="margin-top: 5rem;">
                <h3 style="font-size: 1.8rem; border-bottom: 1px solid rgba(142, 112, 79, 0.15); padding-bottom: 1rem;">Verified Helpline Directory</h3>
                <div class="helpline-grid">
                    ${helplineRows}
                </div>
            </div>
        </section>

        <!-- Vertical B: Community Initiatives -->
        <section class="bg-beige-section" id="community-initiatives">
            <div class="container grid-2">
                <div>
                    <img src="/community_networks.png" alt="Community Seminar" style="border: 1px solid rgba(142, 112, 79, 0.2); padding: 8px; background: var(--color-cream); max-height: 380px; width: 100%; object-fit: cover;">
                </div>
                <div>
                    <span class="section-tag">VERTICAL B</span>
                    <h2 class="section-title">Community Initiatives & Training</h2>
                    <p style="margin-bottom: 1.2rem;">Through local partnerships, we host educational rights workshops. Our programs focus on domestic safety laws, personal inheritance, marital contract provisions, and counseling pathways.</p>
                    <p style="margin-bottom: 1.5rem;"><strong>Workshops:</strong> Guided by lawyers and social advocates to explain legal processes in clear Urdu, Hindi, and English.</p>
                    <p style="margin-bottom: 2rem;"><strong>Education Hubs:</strong> Equipping local female leaders with knowledge to act as primary safety guides within their municipal blocks.</p>
                    <a href="#/join-us" class="btn btn-secondary">Request a Workshop in Your Area</a>
                </div>
            </div>
        </section>

        <!-- Vertical C: Advocacy & Legal Reforms -->
        <section class="container" id="advocacy-reforms">
            <div class="grid-2">
                <div>
                    <span class="section-tag">VERTICAL C</span>
                    <h2 class="section-title">Advocacy & Legal Reforms</h2>
                    <p style="margin-bottom: 1.2rem;">DEHLIZ works with jurists, legal scholars, and social researchers to examine family laws and policy frameworks.</p>
                    <p style="margin-bottom: 1.2rem;">We draft research briefs clarifying gender justice principles within Islamic jurisprudence, refuting regressive cultural practices that deny women their lawful inheritance, consent, or safety.</p>
                    <p style="margin-top: 1.5rem;">We advocate for legislative enforcement of marital safety provisions and work with legal aid groups to handle strategic case filings in high courts.</p>
                </div>
                <div>
                    <img src="/legal_guidance.jpg" alt="Legal Brief Documents" style="border: 1px solid rgba(142, 112, 79, 0.2); padding: 8px; background: var(--color-cream); max-height: 380px; width: 100%; object-fit: cover;">
                </div>
            </div>
        </section>
    `;
}

function getOurWorkSubpageHtml(vertical) {
    if (vertical === 'support') {
        return `
            <section class="container" style="max-width: 800px; padding-top: 5rem; padding-bottom: 5rem;">
                <span class="section-tag">VERTICAL DETAILED</span>
                <h1 class="section-title">Support Services Overview</h1>
                <p style="margin-bottom: 2rem; font-size: 1.15rem;">DEHLIZ provides direct linkage to institutional, legal, and counseling services.</p>
                <div style="background: var(--color-beige); padding: 2rem; border-left: 4px solid var(--color-bronze); margin-bottom: 3rem;">
                    <h4 style="margin-bottom: 0.5rem;">Privacy & Safety Statement</h4>
                    <p style="font-size: 0.9rem;">We protect the safety of all seekers. We do not store sensitive details, abuse descriptions, or tracking markers. Your query remains confidential and anonymous upon request.</p>
                </div>
                <h3 style="margin-bottom: 1rem;">Available Support Verticals</h3>
                <ul style="margin-left: 2rem; margin-bottom: 3rem; line-height: 2;">
                    <li>Referral networks to domestic violence shelter spaces.</li>
                    <li>Linkages to legal aid counsel representing municipal family courts.</li>
                    <li>Trauma-informed guidance counselling counselors.</li>
                    <li>Helpline routing directories.</li>
                </ul>
                <a href="#/our-work" class="btn btn-primary">Back to Directory</a>
            </section>
        `;
    }
    if (vertical === 'community') {
        return `
            <section class="container" style="max-width: 800px; padding-top: 5rem; padding-bottom: 5rem;">
                <span class="section-tag">VERTICAL DETAILED</span>
                <h1 class="section-title">Community Initiatives Detailed</h1>
                <p style="margin-bottom: 2rem; font-size: 1.15rem;">Building capacity inside neighborhoods to ensure rights awareness is accessible.</p>
                <h3 style="margin-bottom: 1rem;">Primary Initiatives</h3>
                <p style="margin-bottom: 1.5rem;"><strong>Legal Literacy Workshops:</strong> Interactive seminars providing booklets and step-by-step guides on marriage contracts, inheritance, and personal protection filings.</p>
                <p style="margin-bottom: 1.5rem;"><strong>Advocacy Circles:</strong> Monthly group discussions in safe municipal spaces for women to share advice, counseling contacts, and mutual encouragement.</p>
                <p style="margin-bottom: 3rem;"><strong>Volunteers Network:</strong> Law students, activists, and graphic creators collaborating to translate complex legal articles into simple visual graphics.</p>
                <a href="#/join-us" class="btn btn-primary">Become a Volunteer</a>
            </section>
        `;
    }
    return `
        <section class="container" style="max-width: 800px; padding-top: 5rem; padding-bottom: 5rem;">
            <span class="section-tag">VERTICAL DETAILED</span>
            <h1 class="section-title">Advocacy & Family Law Reform</h1>
            <p style="margin-bottom: 2rem; font-size: 1.15rem;">We challenge systemic injustice by aligning Islamic jurisprudence with constitutional protections.</p>
            <h3 style="margin-bottom: 1rem;">Key Areas of Research</h3>
            <p style="margin-bottom: 1.5rem;"><strong>Dower & Financial Rights:</strong> Advocating for immediate enforcement of Mehr and post-divorce maintenance rights of women under personal laws.</p>
            <p style="margin-bottom: 1.5rem;"><strong>Property Share Rights:</strong> Educating and legally supporting female family members claiming lawful inheritance divisions without coercion.</p>
            <p style="margin-bottom: 3rem;"><strong>Consent & Safety Protections:</strong> Promoting policy briefs detailing the strict prohibitions against forced marriages and physical abuse within theological contexts.</p>
            <a href="#/resources" class="btn btn-primary">View Advocacy Publications</a>
        </section>
    `;
}

function getResourcesHtml() {
    return `
        <section class="bg-beige-section">
            <div class="container" style="max-width: 800px; text-align: center;">
                <span class="section-tag">LIBRARY & RESEARCH</span>
                <h1 class="section-title" style="font-size: 3.5rem;">Education & Resource Library</h1>
                <p style="font-size: 1.25rem; line-height: 1.8;">Search and filter our articles, publications, legal manuals and educational guides.</p>
            </div>
        </section>

        <!-- Resource Directory Controls & Grid -->
        <section class="container">
            <div class="resource-controls">
                <div class="search-bar-container">
                    <input type="text" id="resource-search" class="search-input" placeholder="Search resources, topics, keyword, or law code...">
                </div>
                <div class="filter-row">
                    <span class="filter-label">Filter by Topic:</span>
                    <button class="filter-btn active" data-category="All">All Topics</button>
                    <button class="filter-btn" data-category="Rights in Islam">Rights in Islam</button>
                    <button class="filter-btn" data-category="Indian Law">Indian Law</button>
                    <button class="filter-btn" data-category="Publications">Publications</button>
                    <button class="filter-btn" data-category="Blog">Blog</button>
                </div>
            </div>

            <!-- Dynamic Resource Grid -->
            <div id="resource-grid" class="grid-3">
                <!-- Injected via JavaScript -->
            </div>

            <!-- Empty State -->
            <div id="resource-empty-state" class="text-center" style="display: none; padding: 4rem; background: var(--color-beige); border: 1px dashed rgba(142,112,79,0.3);">
                <h4>No resources match your search or filter criteria.</h4>
                <p>Try searching for general keywords like "Inheritance", "Marriage", "Law", or "Report".</p>
            </div>

            <!-- Reusable Pagination -->
            <div class="pagination">
                <button class="pagination-btn active">1</button>
                <button class="pagination-btn">2</button>
                <button class="pagination-btn">&raquo;</button>
            </div>
        </section>
    `;
}

function setupResourcesInteractions() {
    const searchInput = document.getElementById('resource-search');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let currentPage = 1;
    const itemsPerPage = 6;

    const updateGrid = () => {
        const query = searchInput.value.toLowerCase().trim();
        const category = resourceFilters.category;

        // Filter logic
        const filtered = DEHLIZ_DATA.resources.filter(r => {
            const matchesCategory = (category === 'All' || r.category === category);
            const matchesSearch = (
                r.title.toLowerCase().includes(query) ||
                r.summary.toLowerCase().includes(query) ||
                r.category.toLowerCase().includes(query) ||
                r.type.toLowerCase().includes(query)
            );
            return matchesCategory && matchesSearch;
        });

        const grid = document.getElementById('resource-grid');
        const emptyState = document.getElementById('resource-empty-state');
        const paginationContainer = document.querySelector('.pagination');

        if (filtered.length === 0) {
            grid.innerHTML = '';
            emptyState.style.display = 'block';
            if (paginationContainer) paginationContainer.innerHTML = '';
        } else {
            emptyState.style.display = 'none';

            // Calculate pagination bounds
            const totalPages = Math.ceil(filtered.length / itemsPerPage);
            if (currentPage > totalPages) currentPage = totalPages || 1;

            const startIdx = (currentPage - 1) * itemsPerPage;
            const endIdx = startIdx + itemsPerPage;
            const paginatedItems = filtered.slice(startIdx, endIdx);

            grid.innerHTML = paginatedItems.map(r => `
                <div class="card page-transition">
                    <span class="card-meta">${r.category} &bull; ${r.type}</span>
                    <h3 class="card-title">${r.title}</h3>
                    <p class="card-text">${r.summary}</p>
                    <div style="display: flex; gap: 10px; margin-top: 1rem; align-items: center; flex-wrap: wrap;">
                        <a href="#/resources" class="card-link" onclick="openResourceModal('${r.id}')" style="margin-top: 0;">Read Full Guide &rarr;</a>
                        ${r.pdfUrl ? `
                            <a href="${r.pdfUrl}" target="_blank" class="card-link" style="margin-top: 0; color: var(--color-gold);">View PDF</a>
                            <a href="${r.pdfUrl}" download class="card-link" style="margin-top: 0; color: var(--color-bronze);">Download PDF</a>
                        ` : ''}
                    </div>
                </div>
            `).join('');

            // Render Pagination Buttons
            if (paginationContainer) {
                let paginationHtml = '';
                for (let i = 1; i <= totalPages; i++) {
                    paginationHtml += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
                }
                paginationContainer.innerHTML = paginationHtml;

                // Add click events to pagination buttons
                paginationContainer.querySelectorAll('.pagination-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        currentPage = parseInt(btn.getAttribute('data-page'));
                        updateGrid();
                        // Scroll to top of resources controls so user sees new items
                        const controls = document.querySelector('.resource-controls');
                        if (controls) controls.scrollIntoView({ behavior: 'smooth' });
                    });
                });
            }
        }
    };

    // Filter Buttons click handler
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            resourceFilters.category = btn.getAttribute('data-category');
            currentPage = 1; // Reset to page 1 on filter change
            updateGrid();
        });
    });

    // Search input handler
    searchInput.addEventListener('input', () => {
        currentPage = 1; // Reset to page 1 on search change
        updateGrid();
    });

    // Initial load
    updateGrid();
}

// Modal view helper for resource details
window.openResourceModal = function (id) {
    const r = DEHLIZ_DATA.resources.find(item => item.id === id);
    if (!r) return;

    // Create modal wrapper overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.backgroundColor = 'rgba(20, 20, 20, 0.6)';
    modalOverlay.style.backdropFilter = 'blur(5px)';
    modalOverlay.style.zIndex = '2000';
    modalOverlay.style.display = 'flex';
    modalOverlay.style.alignItems = 'center';
    modalOverlay.style.justifyContent = 'center';
    modalOverlay.style.padding = '2rem';

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'var(--color-cream)';
    modalContent.style.border = '1px solid var(--color-bronze)';
    modalContent.style.padding = '3rem';
    modalContent.style.maxWidth = '700px';
    modalContent.style.width = '100%';
    modalContent.style.maxHeight = '90vh';
    modalContent.style.overflowY = 'auto';
    modalContent.style.position = 'relative';

    modalContent.innerHTML = `
        <button style="position: absolute; right: 1.5rem; top: 1.5rem; background: none; border: none; font-size: 1.8rem; cursor: pointer; color: var(--color-text-light);" onclick="closeResourceModal(this)">&times;</button>
        <span class="section-tag">${r.category} &bull; ${r.type}</span>
        <h2 style="font-family: var(--font-heading); font-size: 2.2rem; margin-bottom: 1.5rem; line-height: 1.3;">${r.title}</h2>
        <p style="font-size: 0.9rem; color: var(--color-bronze); margin-bottom: 1.5rem;">Published: ${r.date}</p>
        <p style="font-weight: 500; font-size: 1.05rem; margin-bottom: 2rem; color: var(--color-text-dark);">${r.summary}</p>
        ${r.pdfUrl ? `<div style="margin-bottom: 2rem; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <a href="${r.pdfUrl}" target="_blank" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> View PDF</a>
            <a href="${r.pdfUrl}" download class="btn btn-support" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download PDF</a>
        </div>` : ''}
        <div style="font-size: 0.95rem; line-height: 1.8; color: var(--color-text-light); border-top: 1px solid rgba(142, 112, 79, 0.15); padding-top: 1.5rem;">
            ${r.content}
        </div>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
};

window.closeResourceModal = function (btn) {
    const overlay = btn.closest('div').parentElement;
    overlay.remove();
};

function getResourcesSubpageHtml(category) {
    const list = DEHLIZ_DATA.resources.filter(r => r.category === category);
    const listHtml = list.map(r => `
        <div class="card" style="margin-bottom: 1.5rem;">
            <span class="card-meta">${r.type}</span>
            <h3 class="card-title">${r.title}</h3>
            <p class="card-text">${r.summary}</p>
            <div style="display: flex; gap: 10px; margin-top: 1rem; align-items: center; flex-wrap: wrap;">
                <a href="#/resources" class="card-link" onclick="openResourceModal('${r.id}')" style="margin-top: 0;">Read Full Guide &rarr;</a>
                ${r.pdfUrl ? `
                    <a href="${r.pdfUrl}" target="_blank" class="card-link" style="margin-top: 0; color: var(--color-gold);">View PDF</a>
                    <a href="${r.pdfUrl}" download class="card-link" style="margin-top: 0; color: var(--color-bronze);">Download PDF</a>
                ` : ''}
            </div>
        </div>
    `).join('');

    return `
        <section class="container" style="max-width: 800px; padding-top: 5rem; padding-bottom: 5rem;">
            <span class="section-tag">CATEGORY INDEX</span>
            <h1 class="section-title">${category} Directory</h1>
            <p style="margin-bottom: 3rem; font-size: 1.15rem;">Access educational publications and resources dedicated specifically to ${category.toLowerCase()} topics.</p>
            <div>
                ${listHtml.length > 0 ? listHtml : '<p>No specific entries in this index. Refer to our main resource controls.</p>'}
            </div>
            <a href="#/resources" class="btn btn-primary" style="margin-top: 2rem;">Back to Library</a>
        </section>
    `;
}

function getJoinUsHtml() {
    return `
        <section class="bg-beige-section">
            <div class="container" style="max-width: 800px; text-align: center;">
                <span class="section-tag">COMMUNITY ENGAGEMENT</span>
                <h1 class="section-title" style="font-size: 3.5rem;">Join Us</h1>
                <p style="font-size: 1.25rem; line-height: 1.8;">Volunteer your time, skills, or design/legal expertise, or register as a registered community member to help build safer futures.</p>
            </div>
        </section>

        <!-- Volunteer Registration Form section -->
        <section class="container" id="volunteer-section">
            <div style="max-width: 700px; margin: 0 auto;">
                <div class="form-card">
                    <h2 class="form-title" id="volunteer-form-header">Apply to Volunteer / Join Us</h2>
                    
                    <div id="volunteer-alert" class="form-alert"></div>

                    <form id="volunteer-form" onsubmit="handleVolunteerSubmit(event)">
                        <div class="form-group">
                            <label class="form-label" for="v-name">Full Name</label>
                            <input type="text" id="v-name" class="form-control" required placeholder="Enter your name">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="v-email">Email Address</label>
                            <input type="email" id="v-email" class="form-control" required placeholder="name@domain.com">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="v-phone">Phone Number</label>
                            <input type="tel" id="v-phone" class="form-control" required placeholder="10-digit number">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="v-role">Preferred Area of Contribution</label>
                            <select id="v-role" class="form-control" required>
                                <option value="" disabled selected>Select an option...</option>
                                <option value="Community Outreach">Community Outreach Workshops</option>
                                <option value="Legal Research">Legal Research & Publications</option>
                                <option value="Digital Media">Digital Media & Graphic Assets</option>
                                <option value="Translation">Multi-lingual Translation</option>
                                <option value="Event Support">Local Event Volunteers</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="v-notes">Additional Notes / Experience</label>
                            <textarea id="v-notes" class="form-control" placeholder="Tell us briefly about your background or why you want to support DEHLIZ..."></textarea>
                        </div>
                        
                        <div style="background: var(--color-beige); padding: 1rem; border-left: 3px solid var(--color-bronze); margin-bottom: 1.5rem;">
                            <p style="font-size: 0.8rem; line-height: 1.4; color: var(--color-text-dark);">
                                <strong>Safety Notice:</strong> We value your safety. We collect your contact details solely for application review. We will never share your personal information.
                            </p>
                        </div>

                        <div class="form-submit-row">
                            <button type="submit" class="btn btn-primary">Submit Application</button>
                            <div class="form-loading-spinner" id="volunteer-spinner"></div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `;
}

window.focusVolunteerForm = function (subject) {
    const el = document.getElementById('volunteer-section');
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        const select = document.getElementById('v-role');
        const header = document.getElementById('volunteer-form-header');
        if (select) {
            header.innerText = `Registration: ${subject}`;
            if (subject.includes('Workshop') || subject.includes('Rights')) {
                select.value = 'Local Event Volunteers';
            } else {
                select.value = 'Community Outreach';
            }
        }
    }
};

// Helper function to send email confirmation via EmailJS
async function sendConfirmationEmail(volunteer) {
    if (typeof emailjs === 'undefined') {
        console.warn("EmailJS library not loaded. Cannot send confirmation email.");
        return false;
    }
    try {
        const templateParams = {
            to_name: volunteer.name,
            to_email: volunteer.email,
            email: volunteer.email, // Matching the {{email}} field in EmailJS dashboard
            volunteer_id: volunteer.volunteer_id,
            area_of_interest: volunteer.area_of_interest || 'General Membership'
        };
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
        );
        console.log("EmailJS response:", response);
        return true;
    } catch (e) {
        console.error("EmailJS sending error:", e);
        throw e;
    }
}

window.handleVolunteerSubmit = async function (event) {
    event.preventDefault();
    const alertBox = document.getElementById('volunteer-alert');
    const spinner = document.getElementById('volunteer-spinner');
    const form = document.getElementById('volunteer-form');

    alertBox.className = 'form-alert';
    alertBox.style.display = 'none';
    spinner.style.display = 'block';

    const name = document.getElementById('v-name').value;
    const email = document.getElementById('v-email').value;
    const phone = document.getElementById('v-phone').value || null;
    const area_of_interest = document.getElementById('v-role').value;
    const message = document.getElementById('v-notes').value || null;

    if (!supabase) {
        setTimeout(() => {
            spinner.style.display = 'none';
            window.showFeedbackModal('Submission Failed', 'Form submission backend not connected yet. Application data was validated locally but could not be transmitted.', false);
        }, 1200);
        return;
    }

    try {
        // Insert and select the generated row to get the backend-generated volunteer_id
        const { data, error } = await supabase
            .from('volunteer_applications')
            .insert([{ name, email, phone, area_of_interest, message }])
            .select();

        if (error) {
            spinner.style.display = 'none';
            window.showFeedbackModal('Submission Failed', 'Database error during submission: ' + error.message, false);
            return;
        }

        const registeredVol = data && data[0];
        const volId = registeredVol ? registeredVol.volunteer_id : 'DEHLIZ-VOL-XXXX';

        let emailSent = false;
        try {
            if (registeredVol) {
                emailSent = await sendConfirmationEmail(registeredVol);
            }
        } catch (e) {
            console.error("Failed to send email but volunteer data is saved:", e);
        }

        spinner.style.display = 'none';

        let successHtml = '';
        if (emailSent) {
            successHtml = `Thank you for joining Dehliz! Your volunteer registration has been successfully submitted. You will receive your unique Volunteer ID via email shortly.`;
        } else {
            successHtml = `Thank you for joining Dehliz! Your volunteer registration has been successfully submitted.<br><br>Your unique Volunteer ID is:<br><strong style="font-size: 1.6rem; color: var(--color-bronze); display: block; margin: 1rem 0; padding: 0.8rem; background: var(--color-beige); border-radius: 4px; border-left: 5px solid var(--color-bronze); font-family: monospace; letter-spacing: 1px;">${volId}</strong><span style="font-size: 0.85rem; color: #8C2F2F; font-weight: 600; display: block; margin-top: 0.5rem;">Note: Registration saved successfully, but email dispatch failed. Please note down your Volunteer ID.</span>`;
        }

        window.showFeedbackModal('Application Submitted', successHtml, true);
        form.reset();
    } catch (err) {
        spinner.style.display = 'none';
        window.showFeedbackModal('Submission Failed', 'Network error during submission. Try again later.', false);
    }
};

function setupJoinUsInteractions() {
    // Reset alert box and loading spinner when visiting the page
    const alertBox = document.getElementById('volunteer-alert');
    const spinner = document.getElementById('volunteer-spinner');
    if (alertBox) {
        alertBox.style.display = 'none';
        alertBox.className = 'form-alert';
        alertBox.innerText = '';
    }
    if (spinner) {
        spinner.style.display = 'none';
    }
}

window.showFeedbackModal = function (title, htmlContent, isSuccess) {
    const modalOverlay = document.createElement('div');
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.backgroundColor = 'rgba(20, 20, 20, 0.6)';
    modalOverlay.style.backdropFilter = 'blur(5px)';
    modalOverlay.style.zIndex = '2000';
    modalOverlay.style.display = 'flex';
    modalOverlay.style.alignItems = 'center';
    modalOverlay.style.justifyContent = 'center';
    modalOverlay.style.padding = '2rem';

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'var(--color-cream)';
    modalContent.style.border = isSuccess ? '2px solid #2E7D32' : '2px solid #B00020';
    modalContent.style.padding = '3rem';
    modalContent.style.borderRadius = '8px';
    modalContent.style.maxWidth = '550px';
    modalContent.style.width = '100%';
    modalContent.style.textAlign = 'center';
    modalContent.style.position = 'relative';
    modalContent.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';

    const icon = isSuccess ? '&#10004;' : '&#9888;';
    const iconColor = isSuccess ? '#2E7D32' : '#B00020';
    const iconBg = isSuccess ? '#2e7d321a' : '#b000201a';

    modalContent.innerHTML = `
        <button style="position: absolute; right: 1.5rem; top: 1.5rem; background: none; border: none; font-size: 1.8rem; cursor: pointer; color: var(--color-text-light);" onclick="this.closest('div').parentElement.remove()">&times;</button>
        <div style="width: 70px; height: 70px; background: ${iconBg}; color: ${iconColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; margin: 0 auto 1.5rem auto; font-weight: bold;">
            ${icon}
        </div>
        <h2 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 1rem; color: var(--color-charcoal);">${title}</h2>
        <div style="font-size: 1.05rem; line-height: 1.6; color: var(--color-text-light); margin-bottom: 2rem;">
            ${htmlContent}
        </div>
        <button class="btn btn-primary" style="padding: 0.8rem 2.5rem;" onclick="this.closest('div').parentElement.remove()">Dismiss</button>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
};

function getDonateHtml() {
    return `
        <section class="bg-beige-section">
            <div class="container" style="max-width: 800px; text-align: center;">
                <span class="section-tag">SUPPORT & STABILITY</span>
                <h1 class="section-title" style="font-size: 3.5rem;">Donate to Dehliz</h1>
                <p style="font-size: 1.25rem; line-height: 1.8;">Help us maintain resources, legal directories, workshops, and support counselling networks. Your trust is our core asset.</p>
            </div>
        </section>

        <!-- Donation Interactive Panel & Impact -->
        <section class="container grid-2">
            <div>
                <span class="section-tag">CONTRIBUTION OPTIONS</span>
                <h2 class="section-title">Support Our Mission</h2>
                <p style="margin-bottom: 2rem;">Every contribution helps us maintain resource hosting, coordinate volunteers, compile legal guides, and sustain advocacy operations. We operate with strict visual transparency.</p>
                
                <div class="donation-interactive">
                    <div class="donation-type-toggle">
                        <button class="donation-toggle-btn active" id="btn-toggle-onetime" onclick="toggleDonationType('oneTime')">One-Time Contribution</button>
                        <button class="donation-toggle-btn" id="btn-toggle-monthly" onclick="toggleDonationType('monthly')">Monthly Support</button>
                    </div>

                    <div class="donation-amounts-grid" id="amounts-container">
                        <!-- Injected via JavaScript -->
                    </div>

                    <div class="custom-amount-container">
                        <label class="form-label">Custom Contribution Amount (INR)</label>
                        <span class="custom-amount-symbol">&#8377;</span>
                        <input type="number" id="custom-amount" class="form-control custom-amount-input" placeholder="Enter other amount" oninput="handleCustomAmountInput(this)">
                    </div>

                    <!-- Impact indicator text box -->
                    <div class="donation-impact-card">
                        <div class="donation-impact-title" id="impact-title">Educational Materials</div>
                        <div class="donation-impact-desc" id="impact-desc">Provides informative rights booklets and legal guide booklets to 5 community workshop participants.</div>
                    </div>

                    <!-- CTA payment structure placeholder -->
                    <div style="background: var(--color-beige); padding: 1.2rem; margin-bottom: 1.5rem; text-align: center; font-size: 0.85rem;">
                        <strong>Direct Transfer Coordinates:</strong> [ORGANIZATION TO PROVIDE BANK details]
                    </div>
                    
                    <button class="btn btn-primary" style="width: 100%; text-align: center;" onclick="triggerFakePayment()">Proceed to Support</button>
                </div>
            </div>

            <!-- Transparency / Where your support goes -->
            <div>
                <h2 style="font-size: 2.2rem; margin-bottom: 1.5rem; font-family: var(--font-heading);">Where Your Support Goes</h2>
                <p style="margin-bottom: 2.5rem;">We prioritize direct community intervention. Our administrative costs are minimized, supported largely by volunteer efforts.</p>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--color-text-dark); font-family: var(--font-body); font-weight: 700;">Rights Workshops (40%)</h4>
                    <p style="font-size: 0.9rem;">Printing guidebooks, reserving local community centers, and coordinating logistics for legal seminars.</p>
                </div>
                <div style="margin-bottom: 2rem;">
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--color-text-dark); font-family: var(--font-body); font-weight: 700;">Legal Assistance Referral Network (30%)</h4>
                    <p style="font-size: 0.9rem;">Supporting administrative logistics to verify public lawyers and counseling contacts.</p>
                </div>
                <div style="margin-bottom: 2rem;">
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--color-text-dark); font-family: var(--font-body); font-weight: 700;">Resource Research & Publications (20%)</h4>
                    <p style="font-size: 0.9rem;">Writing, updating, and translating legal/jurisprudential publications for distribution.</p>
                </div>
                <div>
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--color-text-dark); font-family: var(--font-body); font-weight: 700;">Operational Integrity (10%)</h4>
                    <p style="font-size: 0.9rem;">Web platform maintenance, hosting fees, and data safety compliance audits.</p>
                </div>
            </div>
        </section>
    `;
}

function setupDonateInteractions() {
    renderDonationAmounts();
}

function renderDonationAmounts() {
    const list = DEHLIZ_DATA.donationImpacts[activeDonationType];
    const container = document.getElementById('amounts-container');

    container.innerHTML = list.map(item => `
        <button class="amount-btn ${item.amount === selectedDonationAmount ? 'active' : ''}" 
                onclick="selectDonationAmount(${item.amount})">
            &#8377;${item.amount}
        </button>
    `).join('');

    updateImpactText();
}

window.toggleDonationType = function (type) {
    activeDonationType = type;
    document.getElementById('btn-toggle-onetime').className = `donation-toggle-btn ${type === 'oneTime' ? 'active' : ''}`;
    document.getElementById('btn-toggle-monthly').className = `donation-toggle-btn ${type === 'monthly' ? 'active' : ''}`;

    // Reset selection defaults for each type
    selectedDonationAmount = DEHLIZ_DATA.donationImpacts[type][1].amount; // default second item

    const customInput = document.getElementById('custom-amount');
    if (customInput) customInput.value = '';

    renderDonationAmounts();
};

window.selectDonationAmount = function (amount) {
    selectedDonationAmount = amount;

    // Highlight buttons
    const btns = document.querySelectorAll('.amount-btn');
    btns.forEach(btn => {
        if (btn.innerText.includes(amount)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const customInput = document.getElementById('custom-amount');
    if (customInput) customInput.value = '';

    updateImpactText();
};

window.handleCustomAmountInput = function (input) {
    const val = parseInt(input.value);

    // Remove active state from preset buttons
    const btns = document.querySelectorAll('.amount-btn');
    btns.forEach(btn => btn.classList.remove('active'));

    if (isNaN(val) || val <= 0) {
        selectedDonationAmount = 0;
        document.getElementById('impact-title').innerText = 'Custom Support';
        document.getElementById('impact-desc').innerText = 'Enter an amount to see how your contribution is routed through our programs.';
    } else {
        selectedDonationAmount = val;
        updateImpactText(true);
    }
};

function updateImpactText(isCustom = false) {
    const titleEl = document.getElementById('impact-title');
    const descEl = document.getElementById('impact-desc');

    if (isCustom) {
        titleEl.innerText = `Custom Support of \u20B9${selectedDonationAmount}`;
        descEl.innerText = `Your contribution of \u20B9${selectedDonationAmount} will be pooled into our general education, publication, and legal referral resources.`;
        return;
    }

    const currentScale = DEHLIZ_DATA.donationImpacts[activeDonationType];
    const match = currentScale.find(item => item.amount === selectedDonationAmount);

    if (match) {
        titleEl.innerText = match.title;
        descEl.innerText = match.desc;
    }
}

window.triggerFakePayment = async function () {
    if (!supabase) {
        alert(`Payment Gateway Integration Required\n\nTotal Selected: \u20B9${selectedDonationAmount} (${activeDonationType === 'oneTime' ? 'One-Time' : 'Monthly'}).\n\nDirect bank transfer instructions are available, but online card/UPI payment processing is currently offline.`);
        return;
    }

    // Insert pending donation record securely
    try {
        const donor_name = "Anonymous Donor"; // Or query from inputs if logged
        const donor_email = "donor@example.com";
        const { data, error } = await supabase
            .from('donations')
            .insert([{
                donor_name,
                donor_email,
                amount: selectedDonationAmount,
                currency: 'INR',
                donation_type: activeDonationType,
                payment_status: 'Pending'
            }])
            .select();

        if (error) {
            alert("Database Error setting up payment record: " + error.message);
        } else {
            alert(`Payment Gateway Integration Required (Pending Record Created)\n\nAmount: \u20B9${selectedDonationAmount}\nDonation ID: ${data[0].id}\n\nA pending transaction record has been created in our database. Actual payment gateway integrations (Razorpay/Stripe) are required to complete this payment automatically.`);
        }
    } catch (err) {
        alert("Network Error setting up pending transaction record. Please try again.");
    }
};

function getContactHtml() {
    return `
        <section class="bg-beige-section">
            <div class="container" style="max-width: 800px; text-align: center;">
                <span class="section-tag">GET IN TOUCH</span>
                <h1 class="section-title" style="font-size: 3.5rem;">Contact Dehliz</h1>
                <p style="font-size: 1.25rem; line-height: 1.8;">Reach out for assistance referrals, partnership queries, general questions, or community updates.</p>
            </div>
        </section>

        <!-- Contact Section Form & coordinates -->
        <section class="container grid-2">
            <div>
                <div class="form-card">
                    <h2 class="form-title">Send a Secure Inquiry</h2>
                    
                    <div id="contact-alert" class="form-alert"></div>

                    <form id="contact-form" onsubmit="handleContactSubmit(event)">
                        <div class="form-group">
                            <label class="form-label" for="c-name">Full Name</label>
                            <input type="text" id="c-name" class="form-control" required placeholder="Enter name">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="c-email">Email Address</label>
                            <input type="email" id="c-email" class="form-control" required placeholder="name@domain.com">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="c-subject">I want to:</label>
                            <select id="c-subject" class="form-control" required>
                                <option value="" disabled selected>Select option...</option>
                                <option value="General Inquiry">Ask a general inquiry</option>
                                <option value="Request Support">Request legal rights resources & helplines</option>
                                <option value="Partnership">Explore organizational partnership</option>
                                <option value="Volunteering">Inquire about volunteer tasks</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="c-message">Message</label>
                            <textarea id="c-message" class="form-control" required placeholder="Write details here..."></textarea>
                        </div>

                        <div style="background: var(--color-beige); padding: 1rem; border-left: 3px solid var(--color-bronze); margin-bottom: 1.5rem;">
                            <p style="font-size: 0.8rem; line-height: 1.4; color: var(--color-text-dark);">
                                <strong>Privacy Agreement:</strong> Do not send highly sensitive abuse files, documentation, or legal coordinates in this web form. All support discussions will be conducted securely with an intake officer.
                            </p>
                        </div>

                        <div class="form-submit-row">
                            <button type="submit" class="btn btn-primary">Submit Inquiry</button>
                            <div class="form-loading-spinner" id="contact-spinner"></div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Details, Socials, WhatsApp community QR -->
            <div>
                <h2 style="font-family: var(--font-heading); font-size: 2.2rem; margin-bottom: 1.5rem;">Official Coordinates</h2>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-bronze); margin-bottom: 0.25rem;">Email Channel</h4>
                    <p style="font-size: 1.1rem; color: var(--color-text-dark); font-weight: 500;"><a href="mailto:support.dehlizindia.com@gmail.com" style="text-decoration: underline;">support.dehlizindia.com@gmail.com</a></p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-bronze); margin-bottom: 0.25rem;">Contact Number</h4>
                    <p style="font-size: 1.1rem; color: var(--color-text-dark); font-weight: 500; display: flex; align-items: center; gap: 0.6rem;">
                        <a href="tel:+919892208356" style="text-decoration: underline;">+91 98922 08356</a>
                        <a href="https://wa.me/919892208356" target="_blank" style="display: inline-flex; align-items: center; color: #25D366;" title="Chat on WhatsApp">
                            <svg style="width: 20px; height: 20px; fill: currentColor;" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 2.028 14.11 1.01 11.487 1.01c-5.462 0-9.902 4.388-9.904 9.808 0 1.77.485 3.5 1.407 5.02L2.009 21.3l5.59-1.43c.038.02.077.04.115.06l-.067-.776zm12.512-4.835c-.29-.146-1.72-.85-1.985-.946-.266-.097-.46-.144-.652.146-.19.29-.739.946-.905 1.14-.167.19-.332.213-.622.068-.29-.147-1.228-.452-2.339-1.443-.864-.771-1.447-1.724-1.616-2.015-.17-.29-.018-.448.127-.593.13-.13.29-.34.435-.51.145-.17.193-.29.29-.485.097-.19.048-.36-.024-.505-.072-.147-.652-1.577-.893-2.158-.235-.568-.475-.49-.652-.49-.17 0-.365-.015-.56-.015-.195 0-.514.073-.783.364-.268.29-1.024 1.02-1.024 2.487 0 1.467 1.062 2.885 1.21 3.08.148.197 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.72-.704 1.962-1.385.243-.68.243-1.262.17-1.385-.073-.122-.268-.195-.56-.34z"/>
                            </svg>
                        </a>
                    </p>
                </div>

                <div style="margin-bottom: 2rem;">
                    <h4 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-bronze); margin-bottom: 0.25rem;">Office Head Office</h4>
                    <p style="font-size: 1.1rem; color: var(--color-text-dark); font-weight: 500;">Dehliz — India (Temporary Placeholder)</p>
                </div>

                <div style="margin-bottom: 3rem;">
                    <h4 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-bronze); margin-bottom: 0.5rem;">Instagram Engagement</h4>
                    <a href="https://www.instagram.com/dehlizindia/" target="_blank" style="font-size: 1.1rem; color: var(--color-text-dark); font-weight: 500; text-decoration: underline;">@dehlizindia</a>
                </div>

                <!-- WhatsApp QR Area -->
                <div class="whatsapp-community-card">
                    <div class="whatsapp-qr-area">
                        <!-- Standard mock representation for QR code container -->
                        <div style="text-align: center;">
                            <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">&#128225;</span>
                            <span style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--color-bronze);">[DEHLIZ WHATSAPP QR]</span>
                        </div>
                    </div>
                    <div class="whatsapp-content-area">
                        <h3 class="whatsapp-title">Join Our Community</h3>
                        <p style="font-size: 0.9rem; margin-bottom: 1.5rem;">Scan this QR to enter our official WhatsApp updates channel. Get notified on upcoming legal programs, guidebooks, and community circles directly.</p>
                        <a href="https://wa.me/919892208356" target="_blank" class="btn btn-support">Open WhatsApp Link</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function setupContactInteractions() {
    // Scroll coordinates or event handles
}

window.handleContactSubmit = async function (event) {
    event.preventDefault();
    const alertBox = document.getElementById('contact-alert');
    const spinner = document.getElementById('contact-spinner');
    const form = document.getElementById('contact-form');

    alertBox.className = 'form-alert';
    alertBox.style.display = 'none';
    spinner.style.display = 'block';

    const name = document.getElementById('c-name').value;
    const email = document.getElementById('c-email').value;
    const enquiry_type = document.getElementById('c-subject').value;
    const subject = document.getElementById('c-subject').value;
    const message = document.getElementById('c-message').value;

    if (!supabase) {
        setTimeout(() => {
            spinner.style.display = 'none';
            alertBox.className = 'form-alert error';
            alertBox.innerText = 'Form submission backend not connected yet. Message structure validated locally but could not be transmitted.';
        }, 1200);
        return;
    }

    try {
        const { error } = await supabase
            .from('contact_messages')
            .insert([{ name, email, enquiry_type, subject, message }]);

        spinner.style.display = 'none';
        if (error) {
            alertBox.className = 'form-alert error';
            alertBox.innerText = 'Database error: ' + error.message;
        } else {
            alertBox.className = 'form-alert success';
            alertBox.innerText = 'Your secure message has been submitted to the database. An intake officer will review your enquiry.';
            form.reset();
        }
    } catch (err) {
        spinner.style.display = 'none';
        alertBox.className = 'form-alert error';
        alertBox.innerText = 'Network error during submission. Try again later.';
    }
};

// ==========================================================================
// ADMIN DASHBOARD MODULE
// ==========================================================================

let isAdminLoggedIn = sessionStorage.getItem('dehliz_admin_auth') === 'true';
let activeAdminTab = 'volunteers';
let adminData = {
    volunteers: [],
    donations: [],
    contacts: []
};

// Returns Admin HTML based on auth state
window.getAdminPageHtml = function () {
    if (!isAdminLoggedIn) {
        return `
            <section class="admin-login-section">
                <div class="admin-login-card">
                    <h2>Dehliz Admin Portal</h2>
                    <p>Enter your credentials to manage user submissions</p>
                    <div id="admin-login-alert" class="form-alert" style="display: none;"></div>
                    <form id="admin-login-form" onsubmit="handleAdminLogin(event)">
                        <div class="form-group" style="text-align: left;">
                            <label class="form-label" for="admin-email">Admin Email ID</label>
                            <input type="email" id="admin-email" class="form-control" required placeholder="support.dehlizindia.com@gmail.com">
                        </div>
                        <div class="form-group" style="text-align: left;">
                            <label class="form-label" for="admin-password">Password</label>
                            <input type="password" id="admin-password" class="form-control" required placeholder="••••••••">
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Log In</button>
                    </form>
                </div>
            </section>
        `;
    }

    return `
        <section class="admin-dashboard-container">
            <div class="container">
                <div class="admin-header">
                    <div>
                        <span class="section-tag" style="margin-bottom: 0.5rem; display: inline-block;">Secure Administration</span>
                        <h1>Control Panel</h1>
                    </div>
                    <button class="btn btn-secondary btn-sm" onclick="handleAdminLogout()" style="background-color: var(--color-charcoal); color: white; border-color: transparent;">Log Out</button>
                </div>

                <!-- Dashboard Summary Cards -->
                <div class="admin-metrics-grid">
                    <div class="admin-metric-card">
                        <div class="admin-metric-label">Join Requests</div>
                        <div class="admin-metric-val" id="metric-volunteers">0</div>
                        <div style="font-size: 0.8rem; color: #666;">Total volunteer registrations</div>
                    </div>
                    <div class="admin-metric-card">
                        <div class="admin-metric-label">Total Contributions</div>
                        <div class="admin-metric-val" id="metric-donations">&#8377;0</div>
                        <div style="font-size: 0.8rem; color: #666;">Sum of all donation entries</div>
                    </div>
                    <div class="admin-metric-card">
                        <div class="admin-metric-label">Inquiries</div>
                        <div class="admin-metric-val" id="metric-contacts">0</div>
                        <div style="font-size: 0.8rem; color: #666;">Inbox contact submissions</div>
                    </div>
                </div>

                <!-- Tab Menu -->
                <div class="admin-tabs">
                    <button class="admin-tab-btn ${activeAdminTab === 'volunteers' ? 'active' : ''}" id="tab-volunteers" onclick="switchAdminTab('volunteers')">Join Us Submissions</button>
                    <button class="admin-tab-btn ${activeAdminTab === 'donations' ? 'active' : ''}" id="tab-donations" onclick="switchAdminTab('donations')">Donations</button>
                    <button class="admin-tab-btn ${activeAdminTab === 'contacts' ? 'active' : ''}" id="tab-contacts" onclick="switchAdminTab('contacts')">Inquiries / Messages</button>
                </div>

                <!-- Live Dynamic Table container -->
                <div class="admin-table-container">
                    <div id="admin-table-loader" style="text-align: center; padding: 3rem; color: var(--color-bronze); font-weight: 600;">
                        Loading live records from database...
                    </div>
                    <div id="admin-table-content" style="display: none;">
                        <!-- Table injected here -->
                    </div>
                </div>
            </div>
        </section>
    `;
};

// Handle login validation
window.handleAdminLogin = function (event) {
    event.preventDefault();
    const emailInput = document.getElementById('admin-email').value.trim();
    const passwordInput = document.getElementById('admin-password').value;
    const alertBox = document.getElementById('admin-login-alert');

    // Credentials checks
    if (emailInput === 'support.dehlizindia.com@gmail.com' && passwordInput === 'Dehliz@123') {
        isAdminLoggedIn = true;
        sessionStorage.setItem('dehliz_admin_auth', 'true');
        renderPage('/admin');
    } else {
        alertBox.style.display = 'block';
        alertBox.className = 'form-alert error';
        alertBox.innerText = 'Invalid Admin Email or Password. Please try again.';
    }
};

// Handle logout
window.handleAdminLogout = function () {
    isAdminLoggedIn = false;
    sessionStorage.removeItem('dehliz_admin_auth');
    renderPage('/admin');
};

// Initialize Admin Actions & Fetch Data
window.setupAdminInteractions = async function () {
    if (!isAdminLoggedIn) return;

    const loader = document.getElementById('admin-table-loader');
    const tableDiv = document.getElementById('admin-table-content');

    if (loader) loader.style.display = 'block';
    if (tableDiv) tableDiv.style.display = 'none';

    await fetchAdminDashboardData();

    if (loader) loader.style.display = 'none';
    if (tableDiv) tableDiv.style.display = 'block';

    updateMetricsDisplay();
    renderAdminTabContent();
};

// Fetch dynamic rows from Supabase
async function fetchAdminDashboardData() {
    if (!supabase) {
        console.warn("Supabase not configured. Admin panel running with empty placeholders.");
        return;
    }

    try {
        // Fetch Volunteers
        const { data: volData, error: volError } = await supabase
            .from('volunteer_applications')
            .select('*')
            .order('created_at', { ascending: false });
        if (!volError && volData) adminData.volunteers = volData;

        // Fetch Donations
        const { data: donData, error: donError } = await supabase
            .from('donations')
            .select('*')
            .order('created_at', { ascending: false });
        if (!donError && donData) adminData.donations = donData;

        // Fetch Contacts
        const { data: conData, error: conError } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });
        if (!conError && conData) adminData.contacts = conData;

    } catch (err) {
        console.error("Failed to fetch admin dashboard records:", err);
    }
}

// Update summary blocks
function updateMetricsDisplay() {
    const volEl = document.getElementById('metric-volunteers');
    const donEl = document.getElementById('metric-donations');
    const conEl = document.getElementById('metric-contacts');

    if (volEl) volEl.innerText = adminData.volunteers.length;
    if (conEl) conEl.innerText = adminData.contacts.length;

    if (donEl) {
        const sum = adminData.donations.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
        donEl.innerHTML = `&#8377;${sum.toLocaleString('en-IN')}`;
    }
}

// Switch current tab view
window.switchAdminTab = function (tab) {
    activeAdminTab = tab;

    // Toggle active class on buttons
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeBtn = document.getElementById(`tab-${tab}`);
    if (activeBtn) activeBtn.classList.add('active');

    renderAdminTabContent();
};

// Renders the table layout based on the active tab selection
function renderAdminTabContent() {
    const container = document.getElementById('admin-table-content');
    if (!container) return;

    let html = '';

    if (activeAdminTab === 'volunteers') {
        const rows = adminData.volunteers;
        if (rows.length === 0) {
            html = `<div style="padding: 3rem; text-align: center; color: #888;">No volunteer applications found.</div>`;
        } else {
            html = `
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Volunteer ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Interest Area</th>
                            <th>Message / Experience</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(r => `
                            <tr>
                                <td style="white-space: nowrap;">${new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                <td style="font-weight: 700; color: var(--color-bronze); font-family: monospace;">${r.volunteer_id ? escapeHtml(r.volunteer_id) : '<span style="color: #bbb;">Pending</span>'}</td>
                                <td><strong>${escapeHtml(r.name)}</strong></td>
                                <td><a href="mailto:${escapeHtml(r.email)}" style="text-decoration: underline; color: var(--color-bronze); font-weight: 500;">${escapeHtml(r.email)}</a></td>
                                <td>${r.phone ? escapeHtml(r.phone) : '<span style="color: #bbb;">N/A</span>'}</td>
                                <td><span class="badge-status info">${escapeHtml(r.area_of_interest || 'General')}</span></td>
                                <td>${r.message ? escapeHtml(r.message) : '<span style="color: #bbb;">No notes provided</span>'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
    } else if (activeAdminTab === 'donations') {
        const rows = adminData.donations;
        if (rows.length === 0) {
            html = `<div style="padding: 3rem; text-align: center; color: #888;">No donation entries recorded.</div>`;
        } else {
            html = `
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Donor Name</th>
                            <th>Email ID</th>
                            <th>Amount</th>
                            <th>Recurrence</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(r => `
                            <tr>
                                <td style="white-space: nowrap;">${new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                <strong><td>${escapeHtml(r.donor_name || 'Anonymous')}</td></strong>
                                <td>${r.donor_email ? `<a href="mailto:${escapeHtml(r.donor_email)}" style="text-decoration: underline;">${escapeHtml(r.donor_email)}</a>` : '<span style="color: #bbb;">N/A</span>'}</td>
                                <td style="font-weight: 700; color: var(--color-charcoal);">&#8377;${Number(r.amount).toLocaleString('en-IN')}</td>
                                <td><span style="text-transform: capitalize;">${escapeHtml(r.donation_type || 'oneTime')}</span></td>
                                <td><span class="badge-status ${r.payment_status === 'Pending' ? 'warning' : 'success'}">${escapeHtml(r.payment_status || 'Pending')}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
    } else if (activeAdminTab === 'contacts') {
        const rows = adminData.contacts;
        if (rows.length === 0) {
            html = `<div style="padding: 3rem; text-align: center; color: #888;">No inquiry messages found in inbox.</div>`;
        } else {
            html = `
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Email ID</th>
                            <th>Subject</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(r => `
                            <tr>
                                <td style="white-space: nowrap;">${new Date(r.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                <strong><td>${escapeHtml(r.name)}</td></strong>
                                <td><a href="mailto:${escapeHtml(r.email)}" style="text-decoration: underline; color: var(--color-bronze); font-weight: 500;">${escapeHtml(r.email)}</a></td>
                                <td><span class="badge-status info" style="background-color: #eee; color: #333;">${escapeHtml(r.subject || r.enquiry_type || 'General')}</span></td>
                                <td>${escapeHtml(r.message)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
    }

    container.innerHTML = html;
}

// Simple HTML escaping helper to prevent XSS
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
