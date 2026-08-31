import { translations } from './translations.js';

// Setup i18n
window.t = function(key, params = {}, fallback = null) {
    const lang = localStorage.getItem('dehliz_lang') || 'en';
    const keys = key.split('.');
    let translation = translations[lang];
    for (const k of keys) {
        if (translation) {
            translation = translation[k];
        } else {
            return fallback !== null ? fallback : key; // Fallback to provided fallback
        }
    }
    if (!translation) return fallback !== null ? fallback : key;
    
    // Replace placeholders like {{name}}
    Object.keys(params).forEach(pKey => {
        if (typeof translation === 'string') {
            translation = translation.replace(new RegExp(`{{${pKey}}}`, 'g'), params[pKey]);
        }
    });
    return translation;
};

window.setLanguage = function(lang) {
    localStorage.setItem('dehliz_lang', lang);
    window.localizeDOM();
    
    // Rerender active page to apply translations to dynamic strings
    const hash = window.location.hash || '#/';
    let path = hash.substring(1);
    if (!path.startsWith('/')) {
        path = '/' + path;
    }
    renderPage(path);
};

window.localizeDOM = function() {
    // Translate standard elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const attr = el.getAttribute('data-i18n-attr');
        if (attr) {
            el.setAttribute(attr, window.t(key));
        } else {
            el.innerHTML = window.t(key);
        }
    });

    // Update active language switcher UI select dropdown
    const currentLang = localStorage.getItem('dehliz_lang') || 'en';
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = currentLang;
    }

    // Set HTML lang attribute
    document.documentElement.lang = currentLang;
};

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
            text: 'Advocating for educational block access and rights security awareness. Seminars held in regional Muslim Women.',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
            date: 'August 15, 2026'
        }
    ],
    // Featured YouTube Video config (Client episode 8)
    featuredVideo: {
        title: "Dehliz India - Ek Umeed",
        tag: "About Our Mission",
        embedUrl: "https://www.youtube.com/embed/UJo3ItcQtD4?playlist=UJo3ItcQtD4",
        description: "An overview of Dehliz India's efforts in building legal awareness, supporting Muslim Women, and empowering individuals."
    },

    // Campaigns Data
    campaigns: [
        {
            id: 'c1',
            title: 'Empower Her Rights',
            category: 'Legal Awareness',
            date: 'August 2026',
            description: 'A nationwide campaign focused on spreading awareness about constitutional and personal legal rights of women in local Muslim Women.',
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
            title: 'The Bharatiya Nyaya Sanhita, 2023',
            category: 'Indian Law Protections',
            type: 'Act / PDF',
            date: '2023-12-25',
            summary: 'The official gazetted text of the Bharatiya Nyaya Sanhita, 2023 consolidating and amending general criminal code provisions in India.',
            content: 'An Act to consolidate and amend the provisions relating to offences and for matters connected therewith or incidental thereto, replacing the Indian Penal Code (IPC). It includes chapters on offences against women and children.',
            pdfUrl: '/pdfs/250883_english_01042024_copy.pdf'
        },
        {
            id: 'r2',
            title: 'Muslim Personal Law Overview',
            category: 'Rights in Islam',
            type: 'Word / DOCX',
            date: '2026-08-30',
            summary: 'A comprehensive summary of marriage, maintenance, and inheritance rights under traditional Muslim personal laws.',
            content: 'A summary document outlining rights pertaining to marriage contracts (Nikahnama), dower (Mehr), maintenance, divorce, and succession frameworks under Islamic family laws.',
            pdfUrl: '/pdfs/Muslimlaw.docx'
        },
        {
            id: 'r3',
            title: 'NALSA Women & Law Handbook',
            category: 'Indian Law Protections',
            type: 'Act / PDF',
            date: '2026-08-30',
            summary: 'A training module on constitutional rights, personal laws, labour laws, criminal laws, and reproductive rights for women.',
            content: 'This handbook was created in collaboration with the National Commission for Women (NCW) and All India Reporter. It covers Fundamental Rights, Directive Principles, and Criminal Law protections.',
            pdfUrl: '/pdfs/NALSA Women Law.pdf'
        },
        {
            id: 'r4',
            title: 'NCW - Muslim Womens Rights Booklet',
            category: 'Rights in Islam',
            type: 'Manual / PDF',
            date: '2026-08-30',
            summary: 'Official National Commission for Women resource guide explaining statutory protections and civil privileges for Muslim women in India.',
            content: 'A detailed manual published by the National Commission for Women containing verified guidelines on marital rights, Mehr protections, custody, and social security structures.',
            pdfUrl: '/pdfs/NCW_MUSLIM_Rights_compressed_copy.pdf'
        },
        {
            id: 'r5',
            title: 'Nai Roshni Leadership Development Scheme',
            category: 'Research & Briefs',
            type: 'Scheme Guidelines / PDF',
            date: '2017-09-23',
            summary: 'Official guidelines for the "Nai Roshni" scheme focused on confidence building and economic empowerment of minority women.',
            content: 'Implemented by the Ministry of Minority Affairs, the Nai Roshni scheme aims to empower and instill confidence among minority women by providing training, tools, and knowledge to interact with government systems, banks, and other institutions.',
            pdfUrl: '/pdfs/Nai Roshni Scheme.pdf'
        },
        {
            id: 'r6',
            title: 'Minority Students Post-Matric Scholarship Details',
            category: 'Research & Briefs',
            type: 'Scheme Guidelines / PDF',
            date: '2026-08-30',
            summary: 'Official guidelines and eligibility criteria of the Post-Matric Scholarship scheme for students belonging to minority Muslim Women.',
            content: 'This scheme provides financial assistance for higher secondary, college, and university level studies to students belonging to notified minority Muslim Women (Muslims, Sikhs, Christians, Buddhists, Parsis, and Jains). Features 30% earmarking for girl students.',
            pdfUrl: '/pdfs/SCHEME-OF-POST-MATRIC-SCHOLARSHIP-FOR-STUDENTS-BELONGING-TO-MINORITY-COMMUNITY_copy.pdf'
        },
        {
            id: 'r7',
            title: 'Shamim Ara vs State of U.P. Landmark Judgement',
            category: 'Rights in Islam',
            type: 'Judgment / PDF',
            date: '2002-10-01',
            summary: 'Landmark Supreme Court of India judgment clarifying the legal requirements and validity of Talaq (divorce) under Muslim Personal Law.',
            content: 'In this decision, the Supreme Court ruled that a mere plea of previous divorce in a written statement or an affidavit does not by itself dissolve a marriage. For a divorce to be legally valid and effective, the pronouncement of Talaq must be proved with reasonable cause and preceded by attempts at reconciliation.',
            pdfUrl: '/pdfs/Shamim Ara Vs state of U.P.pdf'
        },
        {
            id: 'r8',
            title: 'Sachar Committee Report Summary',
            category: 'Research & Briefs',
            type: 'Report Summary / PDF',
            date: '2006-11-30',
            summary: 'A concise summary of the Prime Minister\'s High Level Committee Report on the social, economic, and educational status of the Muslim community in India.',
            content: 'Chaired by Justice Rajindar Sachar, this report examines the development deficits among Muslims in India, including literacy rates, employment shares in public sectors, and bank credit access.',
            pdfUrl: '/pdfs/Summary of Sachar Committee Report_copy.pdf'
        },
        {
            id: 'r9',
            title: 'Waqf Act Board Rules',
            category: 'Indian Law Protections',
            type: 'Act / PDF',
            date: '1995-11-22',
            summary: 'The statutory framework regulating Waqf properties, administrative boards, and community asset security in India.',
            content: 'The primary legislation governing Waqf properties, defining responsibilities, mutations, lease powers, and dispute resolutions under regional Waqf Tribunals.',
            pdfUrl: '/pdfs/Waqf Act .pdf'
        },
        {
            id: 'r10',
            title: 'Protection of Women from Domestic Violence Act, 2005',
            category: 'Indian Law Protections',
            type: 'Act / PDF',
            date: '2005-09-13',
            summary: 'The full official text of the Protection of Women from Domestic Violence Act, 2005 outlining legal remedies, duties, and procedures for seeking relief.',
            content: 'An Act to provide for more effective protection of the rights of women guaranteed under the Constitution who are victims of violence of any kind occurring within the family and for matters connected therewith or incidental thereto.',
            pdfUrl: '/pdfs/protection_of_women_from_domestic_violence_act,_2005_copy.pdf'
        },
        {
            id: 'r11',
            title: 'Protection of Women from Domestic Violence Act, 2005 (Hindi Copy)',
            category: 'Indian Law Protections',
            type: 'Act / PDF',
            date: '2005-09-13',
            summary: 'The official text of the Protection of Women from Domestic Violence Act, 2005 in Hindi translation outlining legal remedies, duties, and procedures.',
            content: 'घरेलू हिंसा से महिलाओं का संरक्षण अधिनियम, 2005 - महिलाओं को परिवार के भीतर होने वाली किसी भी प्रकार की हिंसा से बचाने के लिए अधिक प्रभावी संरक्षण प्रदान करने वाला अधिनियम।',
            pdfUrl: '/pdfs/protection_of_women_from_domestic_violence_act,_2005_copy (1).pdf'
        },
        {
            id: 'r12',
            title: 'Protection of Women from Domestic Violence Act, 2005 (Marathi Copy)',
            category: 'Indian Law Protections',
            type: 'Act / PDF',
            date: '2005-09-13',
            summary: 'The official text of the Protection of Women from Domestic Violence Act, 2005 in Marathi translation outlining legal remedies, duties, and procedures.',
            content: 'कौटुंबिक हिंसेपासून महिलांचे संरक्षण अधिनियम, २००५ - कुटुंबात घडणाऱ्या कोणत्याही प्रकारच्या हिंसेला बळी पडलेल्या महिलांच्या हक्कांचे अधिक प्रभावी संरक्षण सुनिश्चित करणारे नियम।',
            pdfUrl: '/pdfs/protection_of_women_from_domestic_violence_act,_2005_copy (2).pdf'
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
            image: '/nazia_sayed.jpg'
        },
        {
            name: 'Naziya',
            role: 'Head of Marketing & Branding',
            bio: 'Entrepreneur and freelance hairstylist with a passion for digital communication, content creation, and brand storytelling. Leads digital marketing and strategic communication to amplify women\'s education, employment, and empowerment initiatives.',
            image: '/naziya.jpg'
        },
        {
            name: 'Ayyan Chougle',
            role: 'Programme Coordinator & Research',
            bio: 'Mechanical Engineering graduate and Political Science researcher. Specializes in policy analysis, digital media initiatives, and translating complex socio-political data into clear, impactful narratives for women\'s development.',
            image: '/ayyan_chougle.png'
        },
        {
            name: 'Aman Khan',
            role: 'Head of Research, Strategies & Communication',
            bio: 'Head of Research, Strategies & Communication. Leads institutional research, policy strategy, and communication channels to drive social development and support networks.',
            image: '/aman_khan.jpg'
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
            const localResourceIds = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13', 'r14', 'r15', 'r16', 'r17', 'r18', 'r19', 'r20'];
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
            const localNames = ['Nazia Sayed', 'Naziya', 'Ayyan Chougle', 'Aman Khan'];
            const localItems = localNames.map(name => DEHLIZ_DATA.team.find(lt => lt.name === name)).filter(Boolean);

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
    window.localizeDOM();
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
        window.localizeDOM();
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
    const campaignsHtml = DEHLIZ_DATA.campaigns.map((c, idx) => {
        const key = `campaigns.c${idx + 1}`;
        const title = window.t(`${key}.title`) !== `${key}.title` ? window.t(`${key}.title`) : c.title;
        const category = window.t(`${key}.category`) !== `${key}.category` ? window.t(`${key}.category`) : c.category;
        const description = window.t(`${key}.desc`) !== `${key}.desc` ? window.t(`${key}.desc`) : c.description;
        
        return `
        <div class="img-card fade-in-section">
            <div class="img-card-media">
                <img src="${c.image}" alt="${title}" loading="lazy">
            </div>
            <div class="img-card-content">
                <span class="card-meta">${category}</span>
                <h3 class="card-title">${title}</h3>
                <p class="card-text">${description}</p>
                <a href="#/our-work/advocacy" class="card-link">${window.t('campaigns.learnMore')}</a>
            </div>
        </div>
        `;
    }).join('');

    // Generate success stories markup
    const storiesHtml = DEHLIZ_DATA.successStories.map((s, idx) => {
        const key = `stories.s${idx + 1}`;
        const badge = window.t(`${key}.badge`) !== `${key}.badge` ? window.t(`${key}.badge`) : s.badge;
        const quote = window.t(`${key}.quote`) !== `${key}.quote` ? window.t(`${key}.quote`) : s.quote;
        const author = window.t(`${key}.author`) !== `${key}.author` ? window.t(`${key}.author`) : s.author;
        const result = window.t(`${key}.result`) !== `${key}.result` ? window.t(`${key}.result`) : s.result;

        return `
        <div class="story-card fade-in-section">
            <div class="story-img-area">
                <img src="${s.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600'}" alt="${badge}" loading="lazy" style="object-fit: cover; width: 100%; height: 100%;">
            </div>
            <div class="story-content-area">
                <span class="story-badge">${badge}</span>
                <p class="story-quote">${quote}</p>
                <div class="story-author">${author}</div>
                <div class="story-result">${result}</div>
            </div>
        </div>
        `;
    }).join('');

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
                        <a href="${p.url}" target="_blank" style="font-size: 0.8rem; font-weight: 700; color: var(--color-bronze); text-decoration: none; display: flex; align-items: center; gap: 4px;">${window.t('social.viewPost')}</a>
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
                    <span class="hero-tag" style="font-family: var(--font-logo); text-transform: lowercase; font-size: 1.3rem; color: var(--color-bronze); display: inline-flex; align-items: center; gap: 8px; margin-bottom: 1.5rem;">${window.t('hero.tag')}</span>
                    <h1 class="hero-title">${window.t('hero.title')}</h1>
                    <p class="hero-description">${window.t('hero.desc')}</p>
                    <div class="hero-actions">
                        <a href="#/our-work" class="btn btn-primary">${window.t('hero.actions.getSupport')}</a>
                        <a href="#/donate" class="btn btn-secondary">${window.t('hero.actions.donate')}</a>
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
                <h2 style="font-family: var(--font-heading); font-size: 2.2rem; margin-bottom: 1.5rem; color: var(--color-charcoal);">${window.t('footer.explore')}</h2>
                <p style="max-width: 800px; margin: 0 auto 1.5rem auto; font-size: 1.15rem; color: var(--color-text-dark); font-weight: 500;">
                    ${window.t('footer.desc')}
                </p>
            </div>
            
            <div class="grid-2" style="margin-top: 4rem;">
                <div>
                    <span class="section-tag">${window.t('whoWeAre.tag')}</span>
                    <h2 class="section-title">${window.t('whoWeAre.title')}</h2>
                    <p style="margin-bottom: 2rem; font-size: 1.1rem; font-weight: 500;">${window.t('whoWeAre.subtitle')}</p>
                    
                    <ul style="list-style: none; padding: 0; margin: 0 0 2.5rem 0; display: flex; flex-direction: column; gap: 1.25rem;">
                        <li style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">1</span>
                            <div>
                                <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">${window.t('whoWeAre.point1.title')}</strong>
                                <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">${window.t('whoWeAre.point1.desc')}</span>
                            </div>
                        </li>
                        <li style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">2</span>
                            <div>
                                <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">${window.t('whoWeAre.point2.title')}</strong>
                                <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">${window.t('whoWeAre.point2.desc')}</span>
                            </div>
                        </li>
                        <li style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">3</span>
                            <div>
                                <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">${window.t('whoWeAre.point3.title')}</strong>
                                <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">${window.t('whoWeAre.point3.desc')}</span>
                            </div>
                        </li>
                        <li style="display: flex; gap: 1rem; align-items: flex-start;">
                            <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">4</span>
                            <div>
                                <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">${window.t('whoWeAre.point4.title')}</strong>
                                <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">${window.t('whoWeAre.point4.desc')}</span>
                            </div>
                        </li>
                    </ul>
                    <a href="#/about" class="btn btn-secondary">${window.t('whoWeAre.btn')}</a>
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
                    <span class="section-tag">${window.t('social.tag')}</span>
                    <h2 class="section-title">${window.t('social.title')}</h2>
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
                <span class="section-tag">${window.t('home.whatWeDo.tag')}</span>
                <h2 class="section-title">${window.t('home.whatWeDo.title')}</h2>
                <p class="section-subtitle">${window.t('home.whatWeDo.subtitle')}</p>
            </div>
            <div class="grid-3">
                <div class="card">
                    <div class="card-icon">&sect;</div>
                    <h3 class="card-title">${window.t('home.whatWeDo.card1.title')}</h3>
                    <p class="card-text">${window.t('home.whatWeDo.card1.desc')}</p>
                    <a href="#/our-work/support-services" class="card-link">${window.t('home.whatWeDo.card1.btn')} &rarr;</a>
                </div>
                <div class="card">
                    <div class="card-icon">&amp;</div>
                    <h3 class="card-title">${window.t('home.whatWeDo.card2.title')}</h3>
                    <p class="card-text">${window.t('home.whatWeDo.card2.desc')}</p>
                    <a href="#/our-work/community-initiatives" class="card-link">${window.t('home.whatWeDo.card2.btn')} &rarr;</a>
                </div>
                <div class="card">
                    <div class="card-icon">&#9878;</div>
                    <h3 class="card-title">${window.t('home.whatWeDo.card3.title')}</h3>
                    <p class="card-text">${window.t('home.whatWeDo.card3.desc')}</p>
                    <a href="#/our-work/advocacy" class="card-link">${window.t('home.whatWeDo.card3.btn')} &rarr;</a>
                </div>
            </div>
        </section>

        <!-- Support emergency notice CTA banner -->
        <section class="cta-banner bg-charcoal-section">
            <div class="cta-banner-content">
                <h2 class="text-gold">${window.t('forms.contact.title')}</h2>
                <p>${window.t('forms.contact.desc')}</p>
                <div class="cta-banner-actions">
                    <a href="#/our-work" class="btn btn-outline-gold">${window.t('forms.contact.helplines')}</a>
                    <a href="#/resources" class="btn btn-primary" style="background-color: var(--color-bronze); color: white;">${window.t('forms.contact.library')}</a>
                </div>
            </div>
        </section>

        <!-- Featured Campaigns -->
        <section class="container">
            <div class="section-header">
                <span class="section-tag">${window.t('campaigns.tag')}</span>
                <h2 class="section-title">${window.t('campaigns.title')}</h2>
                <p class="section-subtitle">${window.t('campaigns.subtitle')}</p>
            </div>
            <div class="grid-3">
                ${campaignsHtml}
            </div>
        </section>

        <!-- Resource Library Sneak-peek -->
        <section class="bg-beige-section">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag">${window.t('home.resources.tag')}</span>
                    <h2 class="section-title">${window.t('home.resources.title')}</h2>
                    <p class="section-subtitle">${window.t('home.resources.subtitle')}</p>
                </div>
                <div class="grid-3">
                    ${recentResourcesHtml}
                </div>
                <div class="text-center" style="margin-top: 3.5rem;">
                    <a href="#/resources" class="btn btn-primary">${window.t('home.resources.btn')}</a>
                </div>
            </div>
        </section>

        <!-- Homepage Events Section -->
        <section class="container">
            <div class="section-header">
                <span class="section-tag">${window.t('events.tag')}</span>
                <h2 class="section-title">${window.t('events.title')}</h2>
                <p class="section-subtitle">${window.t('events.desc')}</p>
            </div>
            <div class="grid-2">
                ${DEHLIZ_DATA.events.map(e => `
                    <div class="card">
                        <span class="card-meta">${e.date}</span>
                        <h3 class="card-title">${e.title}</h3>
                        <div style="font-size: 0.85rem; color: var(--color-bronze); font-weight: 700; margin-bottom: 1.0rem;">${window.t('events.location', {loc: e.location})}</div>
                        <p class="card-text">${e.description}</p>
                        <a href="#/join-us" class="card-link" onclick="focusVolunteerForm('${e.title}')">${window.t('events.register')}</a>
                    </div>
                `).join('')}
            </div>
        </section>

        <!-- WhatsApp QR Section on Homepage -->
        <section class="bg-beige-section">
            <div class="container">
                <div class="whatsapp-community-card">
                    <div class="whatsapp-qr-area">
                        <img src="/whatsapp_qr.png" alt="WhatsApp QR Code" style="width: 100%; height: 100%; object-fit: contain;">
                    </div>
                    <div class="whatsapp-content-area">
                        <h3 class="whatsapp-title">${window.t('whatsapp.title')}</h3>
                        <p style="font-size: 0.95rem; margin-bottom: 1.5rem;">${window.t('whatsapp.desc')}</p>
                        <a href="https://www.instagram.com/dehlizindia/" target="_blank" class="btn btn-support">${window.t('whatsapp.title')}</a>
                    </div>
                </div>
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
    const teamHtml = DEHLIZ_DATA.team.map(member => {
        const id = member.name.toLowerCase().replace(/\s+/g, '_');
        const role = window.t(`team.${id}.role`, {}, member.role);
        const bio = window.t(`team.${id}.bio`, {}, member.bio);
        return `
        <div class="team-card">
            <div class="team-avatar">
                <img src="${member.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'}" alt="${member.name} Profile" style="object-fit: cover; width: 100%; height: 100%;">
            </div>
            <div class="team-name">${member.name}</div>
            <div class="team-role">${role}</div>
            <div class="team-bio">${bio}</div>
        </div>
        `;
    }).join('');

    return `
        <section class="bg-beige-section">
            <div class="container" style="max-width: 800px; text-align: center;">
                <span class="section-tag">${window.t('nav.about')}</span>
                <h1 class="section-title" style="font-size: 3.5rem;">${window.t('aboutPage.title')}</h1>
                <p style="font-size: 1.25rem; line-height: 1.8;">${window.t('aboutPage.desc')}</p>
            </div>
        </section>

        <!-- Our Story & Foundations -->
        <section class="container grid-2">
            <div>
                <h2 style="font-size: 2.2rem; margin-bottom: 1.5rem; font-family: var(--font-heading);">${window.t('aboutPage.focusTitle')}</h2>
                <p style="margin-bottom: 1.5rem; font-size: 1.1rem; font-weight: 500; line-height: 1.7;">${window.t('whoWeAre.subtitle')}</p>
                
                <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; display: flex; flex-direction: column; gap: 1.25rem;">
                    <li style="display: flex; gap: 1rem; align-items: flex-start;">
                        <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">1</span>
                        <div>
                            <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">${window.t('whoWeAre.point1.title')}</strong>
                            <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">${window.t('whoWeAre.point1.desc')}</span>
                        </div>
                    </li>
                    <li style="display: flex; gap: 1rem; align-items: flex-start;">
                        <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">2</span>
                        <div>
                            <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">${window.t('whoWeAre.point2.title')}</strong>
                            <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">${window.t('whoWeAre.point2.desc')}</span>
                        </div>
                    </li>
                    <li style="display: flex; gap: 1rem; align-items: flex-start;">
                        <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">3</span>
                        <div>
                            <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">${window.t('whoWeAre.point3.title')}</strong>
                            <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">${window.t('whoWeAre.point3.desc')}</span>
                        </div>
                    </li>
                    <li style="display: flex; gap: 1rem; align-items: flex-start;">
                        <span style="font-weight: 700; color: var(--color-text-white); background: var(--color-bronze); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 1; font-size: 0.95rem;">4</span>
                        <div>
                            <strong style="color: var(--color-charcoal); display: block; font-size: 1.05rem; margin-bottom: 0.15rem;">${window.t('whoWeAre.point4.title')}</strong>
                            <span style="font-size: 0.95rem; color: var(--color-text-light); display: block; line-height: 1.5;">${window.t('whoWeAre.point4.desc')}</span>
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
                    <h3 class="card-title" style="color: var(--color-bronze);">${window.t('aboutPage.missionTitle')}</h3>
                    <p class="card-text">${window.t('aboutPage.missionDesc')}</p>
                </div>
                <div class="card">
                    <h3 class="card-title" style="color: var(--color-bronze);">${window.t('aboutPage.visionTitle')}</h3>
                    <p class="card-text">${window.t('aboutPage.visionDesc')}</p>
                </div>
                <div class="card">
                    <h3 class="card-title" style="color: var(--color-bronze);">${window.t('aboutPage.valuesTitle')}</h3>
                    <p class="card-text" style="font-size: 1.1rem; line-height: 1.8; color: var(--color-charcoal);">${window.t('aboutPage.valuesDesc')}</p>
                </div>
            </div>
        </section>

        <!-- Our Approach -->
        <section class="container">
            <div class="section-header">
                <span class="section-tag">${window.t('aboutPage.approachTag')}</span>
                <h2 class="section-title">${window.t('aboutPage.approachTitle')}</h2>
                <p class="section-subtitle">${window.t('aboutPage.approachDesc')}</p>
            </div>
            
            <div class="grid-2">
                <div>
                    <h3 style="font-size: 1.6rem; margin-bottom: 1rem;">${window.t('aboutPage.approach1Title')}</h3>
                    <p style="margin-bottom: 1.5rem;">${window.t('aboutPage.approach1Desc')}</p>
                    
                    <h3 style="font-size: 1.6rem; margin-bottom: 1rem;">${window.t('aboutPage.approach2Title')}</h3>
                    <p style="margin-bottom: 1.5rem;">${window.t('aboutPage.approach2Desc')}</p>
                </div>
                <div>
                    <h3 style="font-size: 1.6rem; margin-bottom: 1rem;">${window.t('aboutPage.approach3Title')}</h3>
                    <p style="margin-bottom: 1.5rem;">${window.t('aboutPage.approach3Desc')}</p>
                    
                    <h3 style="font-size: 1.6rem; margin-bottom: 1rem;">${window.t('aboutPage.approach4Title')}</h3>
                    <p>${window.t('aboutPage.approach4Desc')}</p>
                </div>
            </div>
        </section>

        <!-- Leadership & Team Directory -->
        <section class="bg-beige-section">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag">${window.t('aboutPage.teamTag')}</span>
                    <h2 class="section-title">${window.t('aboutPage.teamTitle')}</h2>
                    <p class="section-subtitle">${window.t('aboutPage.teamDesc')}</p>
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
    const helplineRows = DEHLIZ_DATA.helplines.map(h => {
        const id = h.organization.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const org = window.t(`helpline.${id}.org`, {}, h.organization);
        const svc = window.t(`helpline.${id}.svc`, {}, h.service);
        const desc = window.t(`helpline.${id}.desc`, {}, h.description);
        return `
        <div class="helpline-card">
            <div class="helpline-title">${org}</div>
            <div style="font-size: 0.9rem; color: var(--color-bronze); font-weight: 600;">${svc}</div>
            <div class="helpline-number">${h.phone}</div>
            <div class="helpline-meta-row">
                <div class="helpline-meta-item">${window.t('workPage.locLabel', {loc: h.location})}</div>
                <div class="helpline-meta-item">${window.t('workPage.hoursLabel', {hours: h.availability})}</div>
            </div>
            <p style="font-size: 0.9rem; flex-grow: 1;">${desc}</p>
            ${h.website !== 'N/A' && !h.website.includes('[') ? `<a href="https://${h.website}" target="_blank" style="margin-top: 1rem; font-size: 0.85rem; font-weight: 700; color: var(--color-charcoal); text-decoration: underline;">${window.t('workPage.visitWeb')}</a>` : ''}
        </div>
        `;
    }).join('');

    return `
        <section class="bg-beige-section">
            <div class="container" style="max-width: 800px; text-align: center;">
                <span class="section-tag">${window.t('workPage.tag')}</span>
                <h1 class="section-title" style="font-size: 3.5rem;">${window.t('workPage.title')}</h1>
                <p style="font-size: 1.25rem; line-height: 1.8;">${window.t('workPage.desc')}</p>
            </div>
        </section>

        <!-- Vertical A: Support Services -->
        <section class="container" id="support-services">
            <div class="grid-2">
                <div>
                    <span class="section-tag">${window.t('workPage.v1Tag')}</span>
                    <h2 class="section-title">${window.t('workPage.v1Title')}</h2>
                    <p style="margin-bottom: 1.2rem;">${window.t('workPage.v1Desc')}</p>
                    <a href="#/contact" class="btn btn-primary">${window.t('home.hero.actions.getSupport')}</a>
                </div>
                <div>
                    <img src="/community_support.png" alt="Counseling meeting context" style="border: 1px solid rgba(142, 112, 79, 0.2); padding: 8px; background: var(--color-cream); max-height: 380px; width: 100%; object-fit: cover;">
                </div>
            </div>

            <!-- Helplines Sub-directory -->
            <div style="margin-top: 5rem;">
                <h3 style="font-size: 1.8rem; border-bottom: 1px solid rgba(142, 112, 79, 0.15); padding-bottom: 1rem;">${window.t('workPage.helplinesTitle')}</h3>
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
                    <span class="section-tag">${window.t('workPage.v2Tag')}</span>
                    <h2 class="section-title">${window.t('workPage.v2Title')}</h2>
                    <p style="margin-bottom: 1.2rem;">${window.t('workPage.v2Desc')}</p>
                    <a href="#/join-us" class="btn btn-secondary">${window.t('workPage.v2Btn')}</a>
                </div>
            </div>
        </section>

        <!-- Vertical C: Advocacy & Legal Reforms -->
        <section class="container" id="advocacy-reforms">
            <div class="grid-2">
                <div>
                    <span class="section-tag">${window.t('workPage.v3Tag')}</span>
                    <h2 class="section-title">${window.t('workPage.v3Title')}</h2>
                    <p style="margin-bottom: 1.2rem;">${window.t('workPage.v3Desc')}</p>
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
                <span class="section-tag">${window.t('subpages.tag', {}, 'VERTICAL DETAILED')}</span>
                <h1 class="section-title">${window.t('subpages.support.title', {}, 'Support Services Overview')}</h1>
                <p style="margin-bottom: 2rem; font-size: 1.15rem;">${window.t('subpages.support.desc', {}, 'DEHLIZ provides direct linkage to institutional, legal, and counseling services.')}</p>
                <div style="background: var(--color-beige); padding: 2rem; border-left: 4px solid var(--color-bronze); margin-bottom: 3rem;">
                    <h4 style="margin-bottom: 0.5rem;">${window.t('subpages.support.privacyTitle', {}, 'Privacy & Safety Statement')}</h4>
                    <p style="font-size: 0.9rem;">${window.t('subpages.support.privacyDesc', {}, 'We protect the safety of all seekers. We do not store sensitive details, abuse descriptions, or tracking markers. Your query remains confidential and anonymous upon request.')}</p>
                </div>
                <h3 style="margin-bottom: 1rem;">${window.t('subpages.support.listTitle', {}, 'Available Support Verticals')}</h3>
                <ul style="margin-left: 2rem; margin-bottom: 3rem; line-height: 2;">
                    <li>${window.t('subpages.support.list1', {}, 'Referral networks to domestic violence shelter spaces.')}</li>
                    <li>${window.t('subpages.support.list2', {}, 'Linkages to legal aid counsel representing municipal family courts.')}</li>
                    <li>${window.t('subpages.support.list3', {}, 'Trauma-informed guidance counselling counselors.')}</li>
                    <li>${window.t('subpages.support.list4', {}, 'Helpline routing directories.')}</li>
                </ul>
                <a href="#/our-work" class="btn btn-primary">${window.t('subpages.backToDir', {}, 'Back to Directory')}</a>
            </section>
        `;
    }
    if (vertical === 'community') {
        return `
            <section class="container" style="max-width: 800px; padding-top: 5rem; padding-bottom: 5rem;">
                <span class="section-tag">${window.t('subpages.tag', {}, 'VERTICAL DETAILED')}</span>
                <h1 class="section-title">${window.t('subpages.community.title', {}, 'Community Initiatives Detailed')}</h1>
                <p style="margin-bottom: 2rem; font-size: 1.15rem;">${window.t('subpages.community.desc', {}, 'Building capacity inside neighborhoods to ensure rights awareness is accessible.')}</p>
                <h3 style="margin-bottom: 1rem;">${window.t('subpages.community.subtitle', {}, 'Primary Initiatives')}</h3>
                <p style="margin-bottom: 1.5rem;"><strong>${window.t('subpages.community.item1Title', {}, 'Legal Literacy Workshops')}:</strong> ${window.t('subpages.community.item1Desc', {}, 'Interactive seminars providing booklets and step-by-step guides on marriage contracts, inheritance, and personal protection filings.')}</p>
                <p style="margin-bottom: 1.5rem;"><strong>${window.t('subpages.community.item2Title', {}, 'Advocacy Circles')}:</strong> ${window.t('subpages.community.item2Desc', {}, 'Monthly group discussions in safe municipal spaces for women to share advice, counseling contacts, and mutual encouragement.')}</p>
                <p style="margin-bottom: 3rem;"><strong>${window.t('subpages.community.item3Title', {}, 'Volunteers Network')}:</strong> ${window.t('subpages.community.item3Desc', {}, 'Law students, activists, and graphic creators collaborating to translate complex legal articles into simple visual graphics.')}</p>
                <a href="#/join-us" class="btn btn-primary">${window.t('subpages.becomeVolunteer', {}, 'Become a Volunteer')}</a>
            </section>
        `;
    }
    return `
        <section class="container" style="max-width: 800px; padding-top: 5rem; padding-bottom: 5rem;">
            <span class="section-tag">${window.t('subpages.tag', {}, 'VERTICAL DETAILED')}</span>
            <h1 class="section-title">${window.t('subpages.advocacy.title', {}, 'Advocacy & Family Law Reform')}</h1>
            <p style="margin-bottom: 2rem; font-size: 1.15rem;">${window.t('subpages.advocacy.desc', {}, 'We challenge systemic injustice by aligning Islamic jurisprudence with constitutional protections.')}</p>
            <h3 style="margin-bottom: 1rem;">${window.t('subpages.advocacy.subtitle', {}, 'Key Areas of Research')}</h3>
            <p style="margin-bottom: 1.5rem;"><strong>${window.t('subpages.advocacy.item1Title', {}, 'Dower & Financial Rights')}:</strong> ${window.t('subpages.advocacy.item1Desc', {}, 'Advocating for immediate enforcement of Mehr and post-divorce maintenance rights of women under personal laws.')}</p>
            <p style="margin-bottom: 1.5rem;"><strong>${window.t('subpages.advocacy.item2Title', {}, 'Property Share Rights')}:</strong> ${window.t('subpages.advocacy.item2Desc', {}, 'Educating and legally supporting female family members claiming lawful inheritance divisions without coercion.')}</p>
            <p style="margin-bottom: 3rem;"><strong>${window.t('subpages.advocacy.item3Title', {}, 'Consent & Safety Protections')}:</strong> ${window.t('subpages.advocacy.item3Desc', {}, 'Promoting policy briefs detailing the strict prohibitions against forced marriages and physical abuse within theological contexts.')}</p>
            <a href="#/resources" class="btn btn-primary">${window.t('subpages.viewPubs', {}, 'View Advocacy Publications')}</a>
        </section>
    `;
}

function getResourcesHtml() {
    return `
        <section class="bg-beige-section">
            <div class="container" style="max-width: 800px; text-align: center;">
                <span class="section-tag">${window.t('resources.tag')}</span>
                <h1 class="section-title" style="font-size: 3.5rem;">${window.t('resources.title')}</h1>
                <p style="font-size: 1.25rem; line-height: 1.8;">${window.t('resources.desc')}</p>
            </div>
        </section>

        <!-- Resource Directory Controls & Grid -->
        <section class="container">
            <div class="resource-controls">
                <div class="search-bar-container">
                    <input type="text" id="resource-search" class="search-input" placeholder="${window.t('resources.search')}">
                </div>
                <div class="filter-row">
                    <span class="filter-label">${window.t('resources.filter')}</span>
                    <button class="filter-btn active" data-category="All">${window.t('resources.all')}</button>
                    <button class="filter-btn" data-category="Rights in Islam">${window.t('footer.rights')}</button>
                    <button class="filter-btn" data-category="Indian Law Protections">${window.t('footer.law')}</button>
                    <button class="filter-btn" data-category="Research & Briefs">${window.t('footer.briefs')}</button>
                </div>
            </div>

            <!-- Dynamic Resource Grid -->
            <div id="resource-grid" class="grid-3">
                <!-- Injected via JavaScript -->
            </div>

            <!-- Empty State -->
            <div id="resource-empty-state" class="text-center" style="display: none; padding: 4rem; background: var(--color-beige); border: 1px dashed rgba(142,112,79,0.3);">
                <h4>${window.t('resources.emptyTitle')}</h4>
                <p>${window.t('resources.emptyDesc')}</p>
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
    const itemsPerPage = 20;

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

            grid.innerHTML = paginatedItems.map(r => {
                const id = r.id;
                const category = window.t(`resource.${id}.category`, {}, r.category);
                const type = window.t(`resource.${id}.type`, {}, r.type);
                const title = window.t(`resource.${id}.title`, {}, r.title);
                const summary = window.t(`resource.${id}.summary`, {}, r.summary);
                return `
                <div class="card page-transition">
                    <span class="card-meta">${category} &bull; ${type}</span>
                    <h3 class="card-title">${title}</h3>
                    <p class="card-text">${summary}</p>
                    <div style="display: flex; gap: 10px; margin-top: 1rem; align-items: center; flex-wrap: wrap;">
                        <a href="#/resources" class="card-link" onclick="openResourceModal('${r.id}')" style="margin-top: 0;">${window.t('common.readGuide', {}, 'Read Full Guide &rarr;')}</a>
                        ${r.pdfUrl ? `
                            <a href="${r.pdfUrl}" target="_blank" class="card-link" style="margin-top: 0; color: var(--color-gold);">${window.t('common.view', {}, 'View')}</a>
                            <a href="${r.pdfUrl}" download class="card-link" style="margin-top: 0; color: var(--color-bronze);">${window.t('common.download', {}, 'Download')}</a>
                        ` : ''}
                    </div>
                </div>
                `;
            }).join('');

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

    const category = window.t(`resource.${r.id}.category`, {}, r.category);
    const type = window.t(`resource.${r.id}.type`, {}, r.type);
    const title = window.t(`resource.${r.id}.title`, {}, r.title);
    const summary = window.t(`resource.${r.id}.summary`, {}, r.summary);
    const content = window.t(`resource.${r.id}.content`, {}, r.content);

    modalContent.innerHTML = `
        <button style="position: absolute; right: 1.5rem; top: 1.5rem; background: none; border: none; font-size: 1.8rem; cursor: pointer; color: var(--color-text-light);" onclick="closeResourceModal(this)">&times;</button>
        <span class="section-tag">${category} &bull; ${type}</span>
        <h2 style="font-family: var(--font-heading); font-size: 2.2rem; margin-bottom: 1.5rem; line-height: 1.3;">${title}</h2>
        <p style="font-size: 0.9rem; color: var(--color-bronze); margin-bottom: 1.5rem;">${window.t('common.published', {}, 'Published')}: ${r.date}</p>
        <p style="font-weight: 500; font-size: 1.05rem; margin-bottom: 2rem; color: var(--color-text-dark);">${summary}</p>
        ${r.pdfUrl ? `<div style="margin-bottom: 2rem; display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <a href="${r.pdfUrl}" target="_blank" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> ${window.t('common.viewPdf', {}, 'View PDF')}</a>
            <a href="${r.pdfUrl}" download class="btn btn-support" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> ${window.t('common.downloadPdf', {}, 'Download PDF')}</a>
        </div>` : ''}
        <div style="font-size: 0.95rem; line-height: 1.8; color: var(--color-text-light); border-top: 1px solid rgba(142, 112, 79, 0.15); padding-top: 1.5rem;">
            ${content}
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
    const listHtml = list.map(r => {
        const id = r.id;
        const type = window.t(`resource.${id}.type`, {}, r.type);
        const title = window.t(`resource.${id}.title`, {}, r.title);
        const summary = window.t(`resource.${id}.summary`, {}, r.summary);
        return `
        <div class="card" style="margin-bottom: 1.5rem;">
            <span class="card-meta">${type}</span>
            <h3 class="card-title">${title}</h3>
            <p class="card-text">${summary}</p>
            <div style="display: flex; gap: 10px; margin-top: 1rem; align-items: center; flex-wrap: wrap;">
                <a href="#/resources" class="card-link" onclick="openResourceModal('${r.id}')" style="margin-top: 0;">${window.t('common.readGuide', {}, 'Read Full Guide &rarr;')}</a>
                ${r.pdfUrl ? `
                    <a href="${r.pdfUrl}" target="_blank" class="card-link" style="margin-top: 0; color: var(--color-gold);">${window.t('common.view', {}, 'View')}</a>
                    <a href="${r.pdfUrl}" download class="card-link" style="margin-top: 0; color: var(--color-bronze);">${window.t('common.download', {}, 'Download')}</a>
                ` : ''}
            </div>
        </div>
        `;
    }).join('');

    const translatedCategory = window.t(`footer.${category.toLowerCase().replace(/[^a-z0-9]/g, '')}`, {}, category);
    return `
        <section class="container" style="max-width: 800px; padding-top: 5rem; padding-bottom: 5rem;">
            <span class="section-tag">${window.t('subpages.categoryIndex', {}, 'CATEGORY INDEX')}</span>
            <h1 class="section-title">${window.t('subpages.categoryDirTitle', {category: translatedCategory}, `${category} Directory`)}</h1>
            <p style="margin-bottom: 3rem; font-size: 1.15rem;">${window.t('subpages.categoryDirDesc', {category: translatedCategory.toLowerCase()}, `Access educational publications and resources dedicated specifically to ${category.toLowerCase()} topics.`)}</p>
            <div>
                ${listHtml.length > 0 ? listHtml : `<p>${window.t('subpages.noEntries', {}, 'No specific entries in this index. Refer to our main resource controls.')}</p>`}
            </div>
            <a href="#/resources" class="btn btn-primary" style="margin-top: 2rem;">${window.t('subpages.backToLibrary', {}, 'Back to Library')}</a>
        </section>
    `;
}

function getJoinUsHtml() {
    return `
        <section class="bg-beige-section">
            <div class="container" style="max-width: 800px; text-align: center;">
                <span class="section-tag">${window.t('footer.join')}</span>
                <h1 class="section-title" style="font-size: 3.5rem;">${window.t('nav.join')}</h1>
                <p style="font-size: 1.25rem; line-height: 1.8;">${window.t('footer.joinDesc')}</p>
            </div>
        </section>

        <!-- Volunteer Registration Form section -->
        <section class="container" id="volunteer-section">
            <div style="max-width: 700px; margin: 0 auto;">
                <div class="form-card">
                    <h2 class="form-title" id="volunteer-form-header">${window.t('forms.volunteer.title')}</h2>
                    
                    <div id="volunteer-alert" class="form-alert"></div>

                    <form id="volunteer-form" onsubmit="handleVolunteerSubmit(event)">
                        <div class="form-group">
                            <label class="form-label" for="v-name">${window.t('forms.volunteer.name')}</label>
                            <input type="text" id="v-name" class="form-control" required placeholder="${window.t('forms.volunteer.namePlaceholder')}">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="v-email">${window.t('forms.volunteer.email')}</label>
                            <input type="email" id="v-email" class="form-control" required placeholder="${window.t('forms.volunteer.emailPlaceholder')}">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="v-phone">${window.t('forms.volunteer.phone')}</label>
                            <input type="tel" id="v-phone" class="form-control" required placeholder="${window.t('forms.volunteer.phonePlaceholder')}">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="v-role">${window.t('forms.volunteer.interest')}</label>
                            <select id="v-role" class="form-control" required>
                                <option value="" disabled selected>${window.t('forms.volunteer.selectInterest')}</option>
                                <option value="Community Outreach">${window.t('forms.volunteer.interest1')}</option>
                                <option value="Legal Research">${window.t('forms.volunteer.interest2')}</option>
                                <option value="Digital Media">${window.t('forms.volunteer.interest3')}</option>
                                <option value="Translation">${window.t('forms.volunteer.interest4')}</option>
                                <option value="Event Support">${window.t('footer.join')}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="v-notes">${window.t('forms.volunteer.msg')}</label>
                            <textarea id="v-notes" class="form-control" placeholder="${window.t('forms.volunteer.msgPlaceholder')}"></textarea>
                        </div>
                        
                        <div style="background: var(--color-beige); padding: 1rem; border-left: 3px solid var(--color-bronze); margin-bottom: 1.5rem;">
                            <p style="font-size: 0.8rem; line-height: 1.4; color: var(--color-text-dark);">
                                <strong>${window.t('disclaimer.strong')}</strong> ${window.t('disclaimer.text')}
                            </p>
                        </div>

                        <div class="form-submit-row">
                            <button type="submit" class="btn btn-primary">${window.t('forms.volunteer.submitBtn')}</button>
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
                <span class="section-tag">${window.t('donatePage.tag')}</span>
                <h1 class="section-title" style="font-size: 3.5rem;">${window.t('nav.donate')}</h1>
                <p style="font-size: 1.25rem; line-height: 1.8;">${window.t('donatePage.desc')}</p>
            </div>
        </section>

        <!-- Donation Interactive Panel & Impact -->
        <section class="container grid-2">
            <div>
                <span class="section-tag">${window.t('donatePage.tag')}</span>
                <h2 class="section-title">${window.t('home.donation.title')}</h2>
                <p style="margin-bottom: 2rem;">${window.t('home.donation.desc')}</p>
                
                <div class="donation-interactive">
                    <div class="donation-type-toggle">
                        <button class="donation-toggle-btn active" id="btn-toggle-onetime" onclick="toggleDonationType('oneTime')">${window.t('home.donation.oneTime')}</button>
                        <button class="donation-toggle-btn" id="btn-toggle-monthly" onclick="toggleDonationType('monthly')">${window.t('home.donation.monthly')}</button>
                    </div>

                    <div class="donation-amounts-grid" id="amounts-container">
                        <!-- Injected via JavaScript -->
                    </div>

                    <div class="custom-amount-container">
                        <label class="form-label">${window.t('donatePage.customLabel')}</label>
                        <span class="custom-amount-symbol">&#8377;</span>
                        <input type="number" id="custom-amount" class="form-control custom-amount-input" placeholder="${window.t('donatePage.customPlaceholder')}" oninput="handleCustomAmountInput(this)">
                    </div>

                    <!-- Impact indicator text box -->
                    <div class="donation-impact-card">
                        <div class="donation-impact-title" id="impact-title">${window.t('donatePage.impactTitle')}</div>
                        <div class="donation-impact-desc" id="impact-desc">${window.t('donatePage.impactLabel')}</div>
                    </div>

                    <!-- CTA payment structure placeholder -->
                    <div style="background: var(--color-beige); padding: 1.2rem; margin-bottom: 1.5rem; text-align: center; font-size: 0.85rem;">
                        <strong>${window.t('donatePage.bankCoords')}:</strong>
                        <div style="margin-top: 0.5rem; text-align: left; display: inline-block;">
                            <strong>${window.t('donatePage.holder')}</strong> XXXXX<br>
                            <strong>${window.t('donatePage.bankName')}</strong> XXXXX<br>
                            <strong>${window.t('donatePage.accNumber')}</strong> XXXXX<br>
                            <strong>${window.t('donatePage.ifsc')}</strong> XXXXX<br>
                            <strong>${window.t('donatePage.branch')}</strong> XXXXX
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" style="width: 100%; text-align: center;" onclick="triggerFakePayment()">${window.t('donatePage.btnProceed')}</button>
                </div>
            </div>

            <!-- Transparency / Where your support goes -->
            <div>
                <h2 style="font-size: 2.2rem; margin-bottom: 1.5rem; font-family: var(--font-heading);">${window.t('donatePage.transparency')}</h2>
                <p style="margin-bottom: 2.5rem;">${window.t('donatePage.transparencyDesc')}</p>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--color-text-dark); font-family: var(--font-body); font-weight: 700;">${window.t('donatePage.w1')}</h4>
                    <p style="font-size: 0.9rem;">${window.t('donatePage.w1Desc')}</p>
                </div>
                <div style="margin-bottom: 2rem;">
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--color-text-dark); font-family: var(--font-body); font-weight: 700;">${window.t('donatePage.w2')}</h4>
                    <p style="font-size: 0.9rem;">${window.t('donatePage.w2Desc')}</p>
                </div>
                <div style="margin-bottom: 2rem;">
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--color-text-dark); font-family: var(--font-body); font-weight: 700;">${window.t('donatePage.w3')}</h4>
                    <p style="font-size: 0.9rem;">${window.t('donatePage.w3Desc')}</p>
                </div>
                <div>
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--color-text-dark); font-family: var(--font-body); font-weight: 700;">${window.t('donatePage.w4')}</h4>
                    <p style="font-size: 0.9rem;">${window.t('donatePage.w4Desc')}</p>
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
                <span class="section-tag">${window.t('contactPage.tag')}</span>
                <h1 class="section-title" style="font-size: 3.5rem;">${window.t('contactPage.title')}</h1>
                <p style="font-size: 1.25rem; line-height: 1.8;">${window.t('contactPage.desc')}</p>
            </div>
        </section>

        <!-- Contact Section Form & coordinates -->
        <section class="container grid-2">
            <div>
                <div class="form-card">
                    <h2 class="form-title">${window.t('contactPage.formTitle')}</h2>
                    
                    <div id="contact-alert" class="form-alert"></div>

                    <form id="contact-form" onsubmit="handleContactSubmit(event)">
                        <div class="form-group">
                            <label class="form-label" for="c-name">${window.t('forms.volunteer.name')}</label>
                            <input type="text" id="c-name" class="form-control" required placeholder="${window.t('forms.volunteer.namePlaceholder')}">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="c-email">${window.t('forms.volunteer.email')}</label>
                            <input type="email" id="c-email" class="form-control" required placeholder="${window.t('forms.volunteer.emailPlaceholder')}">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="c-subject">${window.t('forms.volunteer.interest')}</label>
                            <select id="c-subject" class="form-control" required>
                                <option value="" disabled selected>${window.t('contactPage.selectOption')}</option>
                                <option value="General Inquiry">${window.t('contactPage.opt1')}</option>
                                <option value="Request Support">${window.t('contactPage.opt2')}</option>
                                <option value="Medical Help">${window.t('contactPage.opt5', {}, 'Medical Help')}</option>
                                <option value="Education Help">${window.t('contactPage.opt6', {}, 'Education Help')}</option>
                                <option value="Partnership">${window.t('contactPage.opt3')}</option>
                                <option value="Volunteering">${window.t('contactPage.opt4')}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="c-message">${window.t('forms.contact.message')}</label>
                            <textarea id="c-message" class="form-control" required placeholder="${window.t('forms.contact.messagePlaceholder')}"></textarea>
                        </div>

                        <div style="background: var(--color-beige); padding: 1rem; border-left: 3px solid var(--color-bronze); margin-bottom: 1.5rem;">
                            <p style="font-size: 0.8rem; line-height: 1.4; color: var(--color-text-dark);">
                                ${window.t('contactPage.privacy')}
                            </p>
                        </div>

                        <div class="form-submit-row">
                            <button type="submit" class="btn btn-primary">${window.t('contactPage.submitBtn')}</button>
                            <div class="form-loading-spinner" id="contact-spinner"></div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Details, Socials, WhatsApp community QR -->
            <div>
                <h2 style="font-family: var(--font-heading); font-size: 2.2rem; margin-bottom: 1.5rem;">${window.t('contactPage.coords')}</h2>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-bronze); margin-bottom: 0.25rem;">${window.t('contactPage.emailChannel')}</h4>
                    <p style="font-size: 1.1rem; color: var(--color-text-dark); font-weight: 500;"><a href="mailto:support.dehlizindia.com@gmail.com" style="text-decoration: underline;">support.dehlizindia.com@gmail.com</a></p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-bronze); margin-bottom: 0.25rem;">${window.t('forms.volunteer.phone')}</h4>
                    <p style="font-size: 1.1rem; color: var(--color-text-dark); font-weight: 500; display: flex; align-items: center; gap: 0.6rem;">
                        <a href="tel:+919892208356" style="text-decoration: underline;">+91 98922 08356</a>
                        <a href="https://wa.me/919892208356" target="_blank" style="display: inline-flex; align-items: center; color: #25D366;" title="Chat on WhatsApp">
                            <svg style="width: 20px; height: 20px; fill: currentColor;" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 2.028 14.11 1.01 11.487 1.01c-5.462 0-9.902 4.388-9.904 9.808 0 1.77.485 3.5 1.407 5.02L2.009 21.3l5.59-1.43c.038.02.077.04.115.06l-.067-.776zm12.512-4.835c-.29-.146-1.72-.85-1.985-.946-.266-.097-.46-.144-.652.146-.19.29-.739.946-.905 1.14-.167.19-.332.213-.622.068-.29-.147-1.228-.452-2.339-1.443-.864-.771-1.447-1.724-1.616-2.015-.17-.29-.018-.448.127-.593.13-.13.29-.34.435-.51.145-.17.193-.29.29-.485.097-.19.048-.36-.024-.505-.072-.147-.652-1.577-.893-2.158-.235-.568-.475-.49-.652-.49-.17 0-.365-.015-.56-.015-.195 0-.514.073-.783.364-.268.29-1.024 1.02-1.024 2.487 0 1.467 1.062 2.885 1.21 3.08.148.197 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.72-.704 1.962-1.385.243-.68.243-1.262.17-1.385-.073-.122-.268-.195-.56-.34z"/>
                            </svg>
                        </a>
                    </p>
                </div>
                
                <div style="margin-bottom: 3rem;">
                    <h4 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; color: var(--color-bronze); margin-bottom: 0.5rem;">${window.t('contactPage.socialMedia')}</h4>
                    <a href="https://www.instagram.com/dehlizindia/" target="_blank" style="font-size: 1.1rem; color: var(--color-text-dark); font-weight: 500; text-decoration: underline;">@dehlizindia</a>
                </div>
                
                <!-- WhatsApp QR Area -->
                <div class="whatsapp-community-card">
                    <div class="whatsapp-qr-area">
                        <img src="/whatsapp_qr.png" alt="WhatsApp QR Code" style="width: 100%; height: 100%; object-fit: contain;">
                    </div>
                    <div class="whatsapp-content-area">
                        <h3 class="whatsapp-title">${window.t('whatsapp.title')}</h3>
                        <p style="font-size: 0.9rem; margin-bottom: 1.5rem;">${window.t('whatsapp.desc')}</p>
                        <a href="https://wa.me/919892208356" target="_blank" class="btn btn-support">${window.t('whatsapp.title')}</a>
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
