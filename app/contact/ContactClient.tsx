"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const SERVICES_GROUPED = [
    {
        group: 'RBI & NBFC',
        color: '#1677f2',
        items: [
            'NBFC Registration',
            'NBFC Account Aggregator License',
            'NBFC Business Plan',
            'Full-Fledged Money Changers License',
            'LendTech Services',
            'NBFC For Sale / Acquisition',
            'NBFC Legal Support',
            'NBFC Takeover',
            'NBFC Financial Modeling',
        ],
    },
    {
        group: 'SEBI & Capital Markets',
        color: '#7c3aed',
        items: [
            'AMFI Registration',
            'AIF Compliance',
            'Credit Rating Agency Registration',
            'Depository Participant Registration',
            'REIT Registration',
            'Mutual Fund Registration',
            'Underwriter Registration',
            'Social Stock Exchange License in India',
        ],
    },
    {
        group: 'IRDAI & Insurance',
        color: '#0891b2',
        items: [
            'IRDA Insurance Broker License',
            'IRDAI Regulatory Sandbox',
            'Insurance Marketing Firm License',
            'ISNP Registration',
            'IFSCA Insurance Intermediary',
        ],
    },
    {
        group: 'FEMA & International',
        color: '#059669',
        items: [
            'FEMA Registration',
            'FEMA Compliance',
            'India Entry Strategy',
        ],
    },
    {
        group: 'Corporate & Legal',
        color: '#d97706',
        items: [
            'GST Appeal Services',
            'Legal Due Diligence',
            'Transfer Pricing',
            'Trademark Search',
            'ESG Consulting',
            'Other / Not Listed',
        ],
    },
];

const DIAL_CODES = [
    { flag: '🇮🇳', name: 'India',                        dial: '+91'    },
    { flag: '🇦🇫', name: 'Afghanistan',                  dial: '+93'    },
    { flag: '🇦🇱', name: 'Albania',                      dial: '+355'   },
    { flag: '🇩🇿', name: 'Algeria',                      dial: '+213'   },
    { flag: '🇦🇩', name: 'Andorra',                      dial: '+376'   },
    { flag: '🇦🇴', name: 'Angola',                       dial: '+244'   },
    { flag: '🇦🇬', name: 'Antigua & Barbuda',            dial: '+1'     },
    { flag: '🇦🇷', name: 'Argentina',                    dial: '+54'    },
    { flag: '🇦🇲', name: 'Armenia',                      dial: '+374'   },
    { flag: '🇦🇺', name: 'Australia',                    dial: '+61'    },
    { flag: '🇦🇹', name: 'Austria',                      dial: '+43'    },
    { flag: '🇦🇿', name: 'Azerbaijan',                   dial: '+994'   },
    { flag: '🇧🇸', name: 'Bahamas',                      dial: '+1'     },
    { flag: '🇧🇭', name: 'Bahrain',                      dial: '+973'   },
    { flag: '🇧🇩', name: 'Bangladesh',                   dial: '+880'   },
    { flag: '🇧🇧', name: 'Barbados',                     dial: '+1'     },
    { flag: '🇧🇾', name: 'Belarus',                      dial: '+375'   },
    { flag: '🇧🇪', name: 'Belgium',                      dial: '+32'    },
    { flag: '🇧🇿', name: 'Belize',                       dial: '+501'   },
    { flag: '🇧🇯', name: 'Benin',                        dial: '+229'   },
    { flag: '🇧🇹', name: 'Bhutan',                       dial: '+975'   },
    { flag: '🇧🇴', name: 'Bolivia',                      dial: '+591'   },
    { flag: '🇧🇦', name: 'Bosnia & Herzegovina',         dial: '+387'   },
    { flag: '🇧🇼', name: 'Botswana',                     dial: '+267'   },
    { flag: '🇧🇷', name: 'Brazil',                       dial: '+55'    },
    { flag: '🇧🇳', name: 'Brunei',                       dial: '+673'   },
    { flag: '🇧🇬', name: 'Bulgaria',                     dial: '+359'   },
    { flag: '🇧🇫', name: 'Burkina Faso',                 dial: '+226'   },
    { flag: '🇧🇮', name: 'Burundi',                      dial: '+257'   },
    { flag: '🇨🇻', name: 'Cabo Verde',                   dial: '+238'   },
    { flag: '🇰🇭', name: 'Cambodia',                     dial: '+855'   },
    { flag: '🇨🇲', name: 'Cameroon',                     dial: '+237'   },
    { flag: '🇨🇦', name: 'Canada',                       dial: '+1'     },
    { flag: '🇨🇫', name: 'Central African Republic',     dial: '+236'   },
    { flag: '🇹🇩', name: 'Chad',                         dial: '+235'   },
    { flag: '🇨🇱', name: 'Chile',                        dial: '+56'    },
    { flag: '🇨🇳', name: 'China',                        dial: '+86'    },
    { flag: '🇨🇴', name: 'Colombia',                     dial: '+57'    },
    { flag: '🇰🇲', name: 'Comoros',                      dial: '+269'   },
    { flag: '🇨🇬', name: 'Congo (Brazzaville)',          dial: '+242'   },
    { flag: '🇨🇩', name: 'Congo (DRC)',                  dial: '+243'   },
    { flag: '🇨🇷', name: 'Costa Rica',                   dial: '+506'   },
    { flag: '🇭🇷', name: 'Croatia',                      dial: '+385'   },
    { flag: '🇨🇺', name: 'Cuba',                         dial: '+53'    },
    { flag: '🇨🇾', name: 'Cyprus',                       dial: '+357'   },
    { flag: '🇨🇿', name: 'Czech Republic',               dial: '+420'   },
    { flag: '🇩🇰', name: 'Denmark',                      dial: '+45'    },
    { flag: '🇩🇯', name: 'Djibouti',                     dial: '+253'   },
    { flag: '🇩🇲', name: 'Dominica',                     dial: '+1'     },
    { flag: '🇩🇴', name: 'Dominican Republic',           dial: '+1'     },
    { flag: '🇪🇨', name: 'Ecuador',                      dial: '+593'   },
    { flag: '🇪🇬', name: 'Egypt',                        dial: '+20'    },
    { flag: '🇸🇻', name: 'El Salvador',                  dial: '+503'   },
    { flag: '🇬🇶', name: 'Equatorial Guinea',            dial: '+240'   },
    { flag: '🇪🇷', name: 'Eritrea',                      dial: '+291'   },
    { flag: '🇪🇪', name: 'Estonia',                      dial: '+372'   },
    { flag: '🇸🇿', name: 'Eswatini',                     dial: '+268'   },
    { flag: '🇪🇹', name: 'Ethiopia',                     dial: '+251'   },
    { flag: '🇫🇯', name: 'Fiji',                         dial: '+679'   },
    { flag: '🇫🇮', name: 'Finland',                      dial: '+358'   },
    { flag: '🇫🇷', name: 'France',                       dial: '+33'    },
    { flag: '🇬🇦', name: 'Gabon',                        dial: '+241'   },
    { flag: '🇬🇲', name: 'Gambia',                       dial: '+220'   },
    { flag: '🇬🇪', name: 'Georgia',                      dial: '+995'   },
    { flag: '🇩🇪', name: 'Germany',                      dial: '+49'    },
    { flag: '🇬🇭', name: 'Ghana',                        dial: '+233'   },
    { flag: '🇬🇷', name: 'Greece',                       dial: '+30'    },
    { flag: '🇬🇩', name: 'Grenada',                      dial: '+1'     },
    { flag: '🇬🇹', name: 'Guatemala',                    dial: '+502'   },
    { flag: '🇬🇳', name: 'Guinea',                       dial: '+224'   },
    { flag: '🇬🇼', name: 'Guinea-Bissau',                dial: '+245'   },
    { flag: '🇬🇾', name: 'Guyana',                       dial: '+592'   },
    { flag: '🇭🇹', name: 'Haiti',                        dial: '+509'   },
    { flag: '🇭🇳', name: 'Honduras',                     dial: '+504'   },
    { flag: '🇭🇰', name: 'Hong Kong',                    dial: '+852'   },
    { flag: '🇭🇺', name: 'Hungary',                      dial: '+36'    },
    { flag: '🇮🇸', name: 'Iceland',                      dial: '+354'   },
    { flag: '🇮🇩', name: 'Indonesia',                    dial: '+62'    },
    { flag: '🇮🇷', name: 'Iran',                         dial: '+98'    },
    { flag: '🇮🇶', name: 'Iraq',                         dial: '+964'   },
    { flag: '🇮🇪', name: 'Ireland',                      dial: '+353'   },
    { flag: '🇮🇱', name: 'Israel',                       dial: '+972'   },
    { flag: '🇮🇹', name: 'Italy',                        dial: '+39'    },
    { flag: '🇯🇲', name: 'Jamaica',                      dial: '+1'     },
    { flag: '🇯🇵', name: 'Japan',                        dial: '+81'    },
    { flag: '🇯🇴', name: 'Jordan',                       dial: '+962'   },
    { flag: '🇰🇿', name: 'Kazakhstan',                   dial: '+7'     },
    { flag: '🇰🇪', name: 'Kenya',                        dial: '+254'   },
    { flag: '🇰🇮', name: 'Kiribati',                     dial: '+686'   },
    { flag: '🇰🇵', name: 'North Korea',                  dial: '+850'   },
    { flag: '🇰🇷', name: 'South Korea',                  dial: '+82'    },
    { flag: '🇽🇰', name: 'Kosovo',                       dial: '+383'   },
    { flag: '🇰🇼', name: 'Kuwait',                       dial: '+965'   },
    { flag: '🇰🇬', name: 'Kyrgyzstan',                   dial: '+996'   },
    { flag: '🇱🇦', name: 'Laos',                         dial: '+856'   },
    { flag: '🇱🇻', name: 'Latvia',                       dial: '+371'   },
    { flag: '🇱🇧', name: 'Lebanon',                      dial: '+961'   },
    { flag: '🇱🇸', name: 'Lesotho',                      dial: '+266'   },
    { flag: '🇱🇷', name: 'Liberia',                      dial: '+231'   },
    { flag: '🇱🇾', name: 'Libya',                        dial: '+218'   },
    { flag: '🇱🇮', name: 'Liechtenstein',                dial: '+423'   },
    { flag: '🇱🇹', name: 'Lithuania',                    dial: '+370'   },
    { flag: '🇱🇺', name: 'Luxembourg',                   dial: '+352'   },
    { flag: '🇲🇴', name: 'Macao',                        dial: '+853'   },
    { flag: '🇲🇬', name: 'Madagascar',                   dial: '+261'   },
    { flag: '🇲🇼', name: 'Malawi',                       dial: '+265'   },
    { flag: '🇲🇾', name: 'Malaysia',                     dial: '+60'    },
    { flag: '🇲🇻', name: 'Maldives',                     dial: '+960'   },
    { flag: '🇲🇱', name: 'Mali',                         dial: '+223'   },
    { flag: '🇲🇹', name: 'Malta',                        dial: '+356'   },
    { flag: '🇲🇭', name: 'Marshall Islands',             dial: '+692'   },
    { flag: '🇲🇷', name: 'Mauritania',                   dial: '+222'   },
    { flag: '🇲🇺', name: 'Mauritius',                    dial: '+230'   },
    { flag: '🇲🇽', name: 'Mexico',                       dial: '+52'    },
    { flag: '🇫🇲', name: 'Micronesia',                   dial: '+691'   },
    { flag: '🇲🇩', name: 'Moldova',                      dial: '+373'   },
    { flag: '🇲🇨', name: 'Monaco',                       dial: '+377'   },
    { flag: '🇲🇳', name: 'Mongolia',                     dial: '+976'   },
    { flag: '🇲🇪', name: 'Montenegro',                   dial: '+382'   },
    { flag: '🇲🇦', name: 'Morocco',                      dial: '+212'   },
    { flag: '🇲🇿', name: 'Mozambique',                   dial: '+258'   },
    { flag: '🇲🇲', name: 'Myanmar',                      dial: '+95'    },
    { flag: '🇳🇦', name: 'Namibia',                      dial: '+264'   },
    { flag: '🇳🇷', name: 'Nauru',                        dial: '+674'   },
    { flag: '🇳🇵', name: 'Nepal',                        dial: '+977'   },
    { flag: '🇳🇱', name: 'Netherlands',                  dial: '+31'    },
    { flag: '🇳🇿', name: 'New Zealand',                  dial: '+64'    },
    { flag: '🇳🇮', name: 'Nicaragua',                    dial: '+505'   },
    { flag: '🇳🇪', name: 'Niger',                        dial: '+227'   },
    { flag: '🇳🇬', name: 'Nigeria',                      dial: '+234'   },
    { flag: '🇲🇰', name: 'North Macedonia',              dial: '+389'   },
    { flag: '🇳🇴', name: 'Norway',                       dial: '+47'    },
    { flag: '🇴🇲', name: 'Oman',                         dial: '+968'   },
    { flag: '🇵🇰', name: 'Pakistan',                     dial: '+92'    },
    { flag: '🇵🇼', name: 'Palau',                        dial: '+680'   },
    { flag: '🇵🇸', name: 'Palestine',                    dial: '+970'   },
    { flag: '🇵🇦', name: 'Panama',                       dial: '+507'   },
    { flag: '🇵🇬', name: 'Papua New Guinea',             dial: '+675'   },
    { flag: '🇵🇾', name: 'Paraguay',                     dial: '+595'   },
    { flag: '🇵🇪', name: 'Peru',                         dial: '+51'    },
    { flag: '🇵🇭', name: 'Philippines',                  dial: '+63'    },
    { flag: '🇵🇱', name: 'Poland',                       dial: '+48'    },
    { flag: '🇵🇹', name: 'Portugal',                     dial: '+351'   },
    { flag: '🇵🇷', name: 'Puerto Rico',                  dial: '+1'     },
    { flag: '🇶🇦', name: 'Qatar',                        dial: '+974'   },
    { flag: '🇷🇴', name: 'Romania',                      dial: '+40'    },
    { flag: '🇷🇺', name: 'Russia',                       dial: '+7'     },
    { flag: '🇷🇼', name: 'Rwanda',                       dial: '+250'   },
    { flag: '🇰🇳', name: 'Saint Kitts & Nevis',          dial: '+1'     },
    { flag: '🇱🇨', name: 'Saint Lucia',                  dial: '+1'     },
    { flag: '🇻🇨', name: 'Saint Vincent & Grenadines',   dial: '+1'     },
    { flag: '🇼🇸', name: 'Samoa',                        dial: '+685'   },
    { flag: '🇸🇲', name: 'San Marino',                   dial: '+378'   },
    { flag: '🇸🇹', name: 'São Tomé & Príncipe',          dial: '+239'   },
    { flag: '🇸🇦', name: 'Saudi Arabia',                 dial: '+966'   },
    { flag: '🇸🇳', name: 'Senegal',                      dial: '+221'   },
    { flag: '🇷🇸', name: 'Serbia',                       dial: '+381'   },
    { flag: '🇸🇨', name: 'Seychelles',                   dial: '+248'   },
    { flag: '🇸🇱', name: 'Sierra Leone',                 dial: '+232'   },
    { flag: '🇸🇬', name: 'Singapore',                    dial: '+65'    },
    { flag: '🇸🇰', name: 'Slovakia',                     dial: '+421'   },
    { flag: '🇸🇮', name: 'Slovenia',                     dial: '+386'   },
    { flag: '🇸🇧', name: 'Solomon Islands',              dial: '+677'   },
    { flag: '🇸🇴', name: 'Somalia',                      dial: '+252'   },
    { flag: '🇿🇦', name: 'South Africa',                 dial: '+27'    },
    { flag: '🇸🇸', name: 'South Sudan',                  dial: '+211'   },
    { flag: '🇪🇸', name: 'Spain',                        dial: '+34'    },
    { flag: '🇱🇰', name: 'Sri Lanka',                    dial: '+94'    },
    { flag: '🇸🇩', name: 'Sudan',                        dial: '+249'   },
    { flag: '🇸🇷', name: 'Suriname',                     dial: '+597'   },
    { flag: '🇸🇪', name: 'Sweden',                       dial: '+46'    },
    { flag: '🇨🇭', name: 'Switzerland',                  dial: '+41'    },
    { flag: '🇸🇾', name: 'Syria',                        dial: '+963'   },
    { flag: '🇹🇼', name: 'Taiwan',                       dial: '+886'   },
    { flag: '🇹🇯', name: 'Tajikistan',                   dial: '+992'   },
    { flag: '🇹🇿', name: 'Tanzania',                     dial: '+255'   },
    { flag: '🇹🇭', name: 'Thailand',                     dial: '+66'    },
    { flag: '🇹🇱', name: 'Timor-Leste',                  dial: '+670'   },
    { flag: '🇹🇬', name: 'Togo',                         dial: '+228'   },
    { flag: '🇹🇴', name: 'Tonga',                        dial: '+676'   },
    { flag: '🇹🇹', name: 'Trinidad & Tobago',            dial: '+1'     },
    { flag: '🇹🇳', name: 'Tunisia',                      dial: '+216'   },
    { flag: '🇹🇷', name: 'Turkey',                       dial: '+90'    },
    { flag: '🇹🇲', name: 'Turkmenistan',                 dial: '+993'   },
    { flag: '🇹🇻', name: 'Tuvalu',                       dial: '+688'   },
    { flag: '🇺🇬', name: 'Uganda',                       dial: '+256'   },
    { flag: '🇺🇦', name: 'Ukraine',                      dial: '+380'   },
    { flag: '🇦🇪', name: 'United Arab Emirates',         dial: '+971'   },
    { flag: '🇬🇧', name: 'United Kingdom',               dial: '+44'    },
    { flag: '🇺🇸', name: 'United States',                dial: '+1'     },
    { flag: '🇺🇾', name: 'Uruguay',                      dial: '+598'   },
    { flag: '🇺🇿', name: 'Uzbekistan',                   dial: '+998'   },
    { flag: '🇻🇺', name: 'Vanuatu',                      dial: '+678'   },
    { flag: '🇻🇦', name: 'Vatican City',                 dial: '+379'   },
    { flag: '🇻🇪', name: 'Venezuela',                    dial: '+58'    },
    { flag: '🇻🇳', name: 'Vietnam',                      dial: '+84'    },
    { flag: '🇾🇪', name: 'Yemen',                        dial: '+967'   },
    { flag: '🇿🇲', name: 'Zambia',                       dial: '+260'   },
    { flag: '🇿🇼', name: 'Zimbabwe',                     dial: '+263'   },
];

export default function ContactClient() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
    });

    // Country dial code picker
    const [dialIdx, setDialIdx] = useState(0);
    const [dialOpen, setDialOpen] = useState(false);
    const [dialSearch, setDialSearch] = useState('');
    const dialRef = useRef<HTMLDivElement>(null);

    // Service picker
    const [serviceOpen, setServiceOpen] = useState(false);
    const [serviceSearch, setServiceSearch] = useState('');
    const serviceRef = useRef<HTMLDivElement>(null);

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");

    // Close both dropdowns on outside click or page scroll
    useEffect(() => {
        const closeAll = () => {
            setDialOpen(false); setDialSearch('');
            setServiceOpen(false); setServiceSearch('');
        };
        const handler = (e: MouseEvent) => {
            const t = e.target as Node;
            if (dialRef.current?.contains(t) || serviceRef.current?.contains(t)) return;
            closeAll();
        };
        document.addEventListener('mousedown', handler);
        window.addEventListener('scroll', closeAll, { passive: true });
        return () => {
            document.removeEventListener('mousedown', handler);
            window.removeEventListener('scroll', closeAll);
        };
    }, []);

    const filteredCountries = DIAL_CODES.filter(c =>
        c.name.toLowerCase().includes(dialSearch.toLowerCase()) ||
        c.dial.includes(dialSearch)
    );

    const filteredServiceGroups = serviceSearch
        ? SERVICES_GROUPED.map(g => ({
            ...g,
            items: g.items.filter(s => s.toLowerCase().includes(serviceSearch.toLowerCase())),
          })).filter(g => g.items.length > 0)
        : SERVICES_GROUPED;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.service) {
            setSubmitError('Please select a service.');
            return;
        }
        setLoading(true);
        setSubmitError("");
        const fullPhone = `${DIAL_CODES[dialIdx].dial} ${form.phone}`.trim();
        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, phone: fullPhone, source: "contact" }),
            });
            const data = await res.json();
            if (res.ok && data.ok) {
                // Fire-and-forget to Formspree for email notification
                fetch("https://formspree.io/f/xojgnbbk", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify({
                        name:    form.name,
                        email:   form.email,
                        phone:   fullPhone,
                        company: form.company,
                        service: form.service,
                        message: form.message,
                    }),
                }).catch(() => {/* best-effort — never block the user */});
                setSubmitted(true);
            } else {
                setSubmitError(data.error || "Something went wrong. Please try again or call +91 98256 00907.");
            }
        } catch {
            setSubmitError("Network error. Please try again or call +91 98256 00907.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#06101f] pt-[64px]">
            {/* Hero */}
            <header className="relative isolate overflow-hidden border-b border-blue-100 dark:border-[#223550] bg-white dark:bg-[#0d1a2d]">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_18%,rgba(0,150,214,0.16),transparent_38%),radial-gradient(circle_at_5%_92%,rgba(22,119,242,0.10),transparent_34%)]" />
                <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-[#eaf6ff]" />
                <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 sm:py-16">
                    <nav className="mb-5 flex items-center gap-2 text-[12px] text-[#94a3b8]" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-[#374151] transition-colors">Home</Link>
                        <span className="opacity-40">/</span>
                        <span className="text-[#374151]">Contact Us</span>
                    </nav>
                    <div className="inline-flex rounded-full border border-blue-100 bg-[#f5fbff] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#0077B6] shadow-sm">📞 Free Consultation</div>
                    <h1 className="mt-4 text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-[#120b45] sm:text-[44px]">Get Expert <span className="text-[#1677f2]">Regulatory Guidance</span></h1>
                    <p className="mt-4 max-w-2xl text-[16px] font-medium leading-[1.7] text-[#475569] sm:text-[18px]">Book a free consultation with our regulatory compliance experts. We specialise in RBI, SEBI, IRDAI, FEMA and fintech regulatory frameworks in India.</p>
                </div>
            </header>

            {/* Contact Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-[#0d1a2d] rounded-2xl shadow-sm border border-gray-100 dark:border-[#223550] p-8">
                            <h2 className="text-[22px] font-black text-[#0a1628] dark:text-[#f7f9fc] mb-2">Send Us a Message</h2>
                            <p className="text-gray-500 text-sm mb-8">Fill in your details and we&apos;ll get back to you within 24 hours.</p>

                            {submitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0a1628] mb-2">Thank You!</h3>
                                    <p className="text-gray-500">Your inquiry has been received. Our team will contact you within 24 hours.</p>
                                    <button
                                        onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", company: "", service: "", message: "" }); setDialIdx(0); }}
                                        className="mt-6 px-6 py-2.5 bg-[#1677f2] text-white font-semibold rounded-xl text-sm hover:bg-[#0866d9] transition-colors"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#0a1628] dark:text-[#f7f9fc] mb-2">Full Name <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your full name"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1677f2] focus:ring-2 focus:ring-blue-50 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#0a1628] dark:text-[#f7f9fc] mb-2">Email Address <span className="text-red-500">*</span></label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="your@email.com"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1677f2] focus:ring-2 focus:ring-blue-50 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#0a1628] mb-2">Phone Number <span className="text-red-500">*</span></label>
                                            <div className="flex rounded-xl border border-gray-200 focus-within:border-[#1677f2] focus-within:ring-2 focus-within:ring-blue-50 transition-all overflow-visible">
                                                <div ref={dialRef} className="relative flex-shrink-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => { setDialOpen(o => !o); setDialSearch(''); setServiceOpen(false); }}
                                                        className="flex items-center gap-1 h-full px-3 py-3 bg-gray-50 border-r border-gray-200 rounded-l-xl text-sm focus:outline-none cursor-pointer whitespace-nowrap hover:bg-gray-100 transition-colors"
                                                        aria-label="Select country code"
                                                    >
                                                        <span className="text-base leading-none">{DIAL_CODES[dialIdx].flag}</span>
                                                        <span className="text-xs font-semibold text-[#0a1628]">{DIAL_CODES[dialIdx].dial}</span>
                                                        <svg className={`w-3 h-3 text-gray-400 transition-transform ${dialOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>
                                                    {dialOpen && (
                                                        <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-xl border border-gray-200 bg-white shadow-xl">
                                                            <div className="p-2 border-b border-gray-100">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search country or code..."
                                                                    value={dialSearch}
                                                                    onChange={e => setDialSearch(e.target.value)}
                                                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#1677f2]"
                                                                    autoFocus
                                                                />
                                                            </div>
                                                            <div className="overflow-y-auto py-1" style={{ maxHeight: '220px' }}>
                                                                {filteredCountries.length > 0 ? filteredCountries.map((c, i) => {
                                                                    const realIdx = DIAL_CODES.indexOf(c);
                                                                    return (
                                                                        <button
                                                                            key={i}
                                                                            type="button"
                                                                            onClick={() => { setDialIdx(realIdx); setDialOpen(false); setDialSearch(''); }}
                                                                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${realIdx === dialIdx ? 'bg-[#f0f7ff] text-[#1677f2]' : 'hover:bg-[#f5fbff] text-[#0a1628]'}`}
                                                                        >
                                                                            <span className="text-base leading-none w-6 flex-shrink-0">{c.flag}</span>
                                                                            <span className="flex-1 truncate">{c.name}</span>
                                                                            <span className="text-xs text-gray-400 flex-shrink-0">{c.dial}</span>
                                                                        </button>
                                                                    );
                                                                }) : (
                                                                    <p className="px-3 py-3 text-sm text-gray-400 text-center">No country found</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="98765 43210"
                                                    className="flex-1 min-w-0 px-4 py-3 text-sm focus:outline-none bg-white rounded-r-xl"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#0a1628] mb-2">Company / Organisation</label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={form.company}
                                                onChange={handleChange}
                                                placeholder="Your company name"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1677f2] focus:ring-2 focus:ring-blue-50 transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Service Required — custom grouped dropdown */}
                                    <div>
                                        <label className="block text-sm font-semibold text-[#0a1628] mb-2">
                                            Service Required <span className="text-red-500">*</span>
                                        </label>
                                        <div ref={serviceRef} className="relative">
                                            <button
                                                type="button"
                                                onClick={() => { setServiceOpen(o => !o); setServiceSearch(''); setDialOpen(false); }}
                                                className={`w-full flex items-center justify-between px-4 py-3 border rounded-xl text-sm transition-all focus:outline-none ${serviceOpen ? 'border-[#1677f2] ring-2 ring-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                                            >
                                                {form.service ? (
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <div
                                                            className="w-2 h-2 rounded-full flex-shrink-0"
                                                            style={{ backgroundColor: SERVICES_GROUPED.find(g => g.items.includes(form.service))?.color ?? '#1677f2' }}
                                                        />
                                                        <span className="truncate text-[#0a1628] font-medium">{form.service}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">Select a service...</span>
                                                )}
                                                <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-2 transition-transform ${serviceOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>

                                            {serviceOpen && (
                                                <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-xl">
                                                    <div className="p-2 border-b border-gray-100">
                                                        <input
                                                            type="text"
                                                            placeholder="Search service..."
                                                            value={serviceSearch}
                                                            onChange={e => setServiceSearch(e.target.value)}
                                                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#1677f2]"
                                                            autoFocus
                                                        />
                                                    </div>
                                                    <div className="overflow-y-auto" style={{ maxHeight: '280px' }}>
                                                        {filteredServiceGroups.length > 0 ? filteredServiceGroups.map(group => (
                                                            <div key={group.group}>
                                                                <div
                                                                    className="sticky top-0 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider bg-gray-50 border-b border-gray-100"
                                                                    style={{ color: group.color }}
                                                                >
                                                                    {group.group}
                                                                </div>
                                                                {group.items.map(service => (
                                                                    <button
                                                                        key={service}
                                                                        type="button"
                                                                        onClick={() => { setForm(prev => ({ ...prev, service })); setServiceOpen(false); setServiceSearch(''); }}
                                                                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors ${form.service === service ? 'bg-[#f0f7ff] font-semibold' : 'hover:bg-[#f5fbff] text-[#0a1628]'}`}
                                                                    >
                                                                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: group.color }} />
                                                                        <span style={form.service === service ? { color: group.color } : undefined}>{service}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )) : (
                                                            <p className="px-4 py-4 text-sm text-gray-400 text-center">No service found</p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-[#0a1628] mb-2">Message</label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            rows={5}
                                            placeholder="Describe your requirements or questions..."
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1677f2] focus:ring-2 focus:ring-blue-50 transition-all resize-none"
                                        />
                                    </div>

                                    {/* Honeypot */}
                                    <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" onChange={() => {}} />

                                    {submitError && (
                                        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-600">{submitError}</p>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-[#1677f2] text-white font-bold rounded-xl shadow-[0_14px_35px_rgba(22,119,242,0.28)] hover:bg-[#0866d9] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Submitting...
                                            </span>
                                        ) : "Submit Inquiry →"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="text-[16px] font-bold text-[#0a1628] mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#f5fbff] flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-[#1677f2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Phone</p>
                                        <a href="tel:9825600907" className="text-sm font-semibold text-[#0a1628] hover:text-[#1677f2]">+91 98256 00907</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#f5fbff] flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-[#1677f2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Email</p>
                                        <a href="mailto:support@estabizz.com" className="text-sm font-semibold text-[#0a1628] hover:text-[#1677f2]">support@estabizz.com</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-[#f5fbff] flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-[#1677f2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Office</p>
                                        <p className="text-sm font-semibold leading-relaxed text-[#0a1628]">15, Vedika Exotika Bungalow, Near Gift City, PDPU Road, Rayson, Adalaj, Gandhinagar, Gujarat, India - 382421</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-[#1677f2] to-[#0866d9] rounded-2xl p-6 text-white">
                            <div className="text-3xl mb-3">⚡</div>
                            <h3 className="text-[16px] font-bold mb-2">Quick Response Guaranteed</h3>
                            <p className="text-blue-100 text-sm">We respond to all inquiries within 24 hours. For urgent matters, call us directly.</p>
                            <div className="mt-4 space-y-2">
                                {['Free initial consultation', 'No commitment required', 'Expert regulatory guidance'].map(item => (
                                    <div key={item} className="flex items-center gap-2 text-sm">
                                        <svg className="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h3 className="text-[14px] font-bold text-[#0a1628] mb-4 uppercase tracking-wider">Your Expert</h3>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1677f2] to-[#0a1628] flex items-center justify-center text-white font-bold text-lg">CS</div>
                                <div>
                                    <p className="font-bold text-[#0a1628] text-sm">CS Devyani Khambhati</p>
                                    <p className="text-xs text-gray-500">Regulatory Compliance Expert</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">10+ years of experience in RBI, SEBI, IRDAI and FEMA regulatory frameworks. Trusted by 500+ businesses across India.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-gradient-to-br from-[#0a1628] to-[#1a2b45] py-16 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-[28px] font-bold text-white mb-4">Ready to Get Started?</h2>
                    <p className="text-blue-100 mb-4">Join 500+ businesses that trust Estabizz Fintech for their regulatory compliance needs.</p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
                        <span>✓ RBI Compliance</span>
                        <span>✓ SEBI Registration</span>
                        <span>✓ IRDAI Licensing</span>
                        <span>✓ FEMA Advisory</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
