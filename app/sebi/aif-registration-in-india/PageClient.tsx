'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import ServicePageLayout from '@/components/templates/ServicePageLayout';

type TableRow = ReactNode[];
type Card = { title: string; body: ReactNode };

const whatsappUrl = 'https://wa.me/919825600907';

const sections = [
  { id: 'quick-overview', title: 'AIF Registration in India: Quick Overview' },
  { id: 'what-is-aif-registration', title: 'What is AIF Registration in India?' },
  { id: 'legal-background', title: 'Legal Background and Regulatory Authority' },
  { id: 'what-is-aif', title: 'What is an Alternative Investment Fund?' },
  { id: 'why-mandatory', title: 'Why AIF Registration is Mandatory' },
  { id: 'categories', title: 'Categories of AIF' },
  { id: 'category-i', title: 'Category I AIF' },
  { id: 'category-ii', title: 'Category II AIF' },
  { id: 'category-iii', title: 'Category III AIF' },
  { id: 'special-structures', title: 'Angel Funds, AI-only Schemes and LVF' },
  { id: 'who-can-apply', title: 'Who Can Apply?' },
  { id: 'who-cannot-apply', title: 'Who Cannot Apply?' },
  { id: 'eligibility', title: 'Eligibility Criteria' },
  { id: 'corpus-commitment', title: 'Corpus, Investor Commitment and Continuing Interest' },
  { id: 'capital-planning', title: 'Capital and Sponsor Contribution Planning' },
  { id: 'ppm-framework', title: 'PPM Drafting Framework' },
  { id: 'governance', title: 'Investment Committee and Governance' },
  { id: 'documents-required', title: 'Documents Required' },
  { id: 'registration-process', title: 'Step-by-Step Registration Process' },
  { id: 'government-fees', title: 'Government Fees' },
  { id: 'timeline', title: 'Timeline for Approval' },
  { id: 'post-registration-activities', title: 'Post-Registration Activities' },
  { id: 'post-registration-compliance', title: 'Post-Registration Compliance' },
  { id: 'compliance-calendar', title: 'Compliance Calendar' },
  { id: 'books-registers', title: 'Books of Account and Registers' },
  { id: 'co-investment', title: 'Co-Investment and Associate Transactions' },
  { id: 'inspection-enforcement', title: 'SEBI Inspection and Enforcement' },
  { id: 'common-mistakes', title: 'Common Mistakes' },
  { id: 'strategic-recommendations', title: 'Strategic Structuring Recommendations' },
  { id: 'how-estabizz-helps', title: 'How Estabizz Helps' },
  { id: 'why-choose-estabizz', title: 'Why Choose Estabizz' },
  { id: 'faqs', title: 'FAQs' },
  { id: 'expert-review', title: 'Reviewer & Disclaimer' },
  { id: 'speak-to-expert', title: 'Speak to Our SEBI Compliance Expert' }
];

export const faqs = [
  ['What is AIF Registration in India?', 'AIF Registration in India refers to obtaining approval from SEBI to operate a privately pooled investment vehicle under the SEBI AIF Regulations.'],
  ['Is AIF Registration mandatory before raising funds?', 'Yes. Any entity intending to pool capital from investors under the AIF framework must obtain SEBI registration before fundraising.'],
  ['Who regulates AIF Registration in India?', 'AIF Registration in India is regulated by the Securities and Exchange Board of India.'],
  ['What is an Alternative Investment Fund?', 'An AIF is a privately pooled investment vehicle established in India that collects funds from investors for investment according to a defined investment policy.'],
  ['Is AIF the same as a mutual fund?', 'No. AIFs are privately pooled investment vehicles and are not regulated as mutual funds.'],
  ['What are the categories of AIF?', 'SEBI classifies AIFs into Category I, Category II and Category III.'],
  ['What is Category I AIF?', 'Category I AIF generally invests in socially or economically beneficial sectors such as venture capital, SME, social impact and infrastructure.'],
  ['What is Category II AIF?', 'Category II AIF includes private equity funds, debt funds, fund of funds and similar commercial investment strategies.'],
  ['What is Category III AIF?', 'Category III AIF includes hedge funds and funds using complex or diverse trading strategies, including leverage where permitted.'],
  ['Can foreign investors invest in Indian AIF?', 'Yes, subject to applicable FEMA regulations, SEBI AIF Regulations and private placement conditions.'],
  ['Who can apply for AIF Registration?', 'A Trust, Company, LLP or body corporate established in India may apply, subject to eligibility and regulatory requirements.'],
  ['Can an individual apply directly?', 'No. An individual cannot directly apply. The AIF must be structured as a legal entity.'],
  ['Can an LLP apply?', 'Yes. LLP is a permitted structure under the AIF framework.'],
  ['Can a private limited company apply?', 'Yes, provided its constitutional documents permit AIF activity and other requirements are met.'],
  ['What is Form A?', 'Form A is the prescribed application form for AIF Registration.'],
  ['Is PPM required?', 'Yes. A draft Private Placement Memorandum must be submitted.'],
  ['What is the minimum corpus for an AIF scheme?', 'Generally, minimum corpus is Rs. 20 Crore per scheme, subject to applicable exceptions.'],
  ['What is the minimum investment per investor?', 'Generally, minimum commitment is Rs. 1 Crore per investor, subject to applicable exceptions.'],
  ['What is sponsor continuing interest?', 'It is the minimum contribution that sponsor or manager must maintain in the scheme to demonstrate alignment with investors.'],
  ['What is continuing interest for Category I and II?', 'Generally, 2.5% of corpus or Rs. 5 Crore, whichever is lower.'],
  ['What is continuing interest for Category III?', 'Generally, 5% of corpus or Rs. 10 Crore, whichever is lower.'],
  ['Can AIF launch multiple schemes?', 'Yes. Once registered, an AIF may launch multiple schemes subject to SEBI filing requirements.'],
  ['What is an AI-only scheme?', 'An AI-only scheme is restricted to Accredited Investors and must comply with SEBI-specified naming and reporting conditions.'],
  ['What is LVF?', 'LVF means Large Value Fund for Accredited Investors and may enjoy certain compliance relaxations subject to SEBI framework.'],
  ['Is co-investment allowed?', 'Yes. Category I and II AIFs may offer co-investment through permitted routes subject to regulatory conditions.'],
  ['Are associate transactions permitted?', 'Yes, subject to disclosure, investor approval and conflict management requirements.'],
  ['Can AIF use leverage?', 'Category I and II generally cannot use leverage except limited temporary borrowing. Category III may use leverage subject to regulatory conditions.'],
  ['What is the application fee?', 'Application fee is generally Rs. 1,00,000, subject to latest SEBI fee schedule.'],
  ['What is registration fee for Category I?', 'Registration fee is generally Rs. 5,00,000, subject to latest SEBI fee schedule.'],
  ['What is registration fee for Category II?', 'Registration fee is generally Rs. 10,00,000, subject to latest SEBI fee schedule.'],
  ['What is registration fee for Category III?', 'Registration fee is generally Rs. 15,00,000, subject to latest SEBI fee schedule.'],
  ['How long does SEBI take to process AIF application?', 'Timeline varies depending on completeness of documents, PPM quality, category complexity and SEBI clarification rounds.'],
  ['Can SEBI reject an incomplete application?', 'Yes. SEBI may return or reject incomplete or non-compliant applications.'],
  ['Is registration valid forever?', 'Registration remains valid unless suspended or cancelled, subject to ongoing compliance.'],
  ['What is Compliance Test Report?', 'Compliance Test Report is a periodic compliance document prepared by the manager and overseen by trustee or sponsor to confirm regulatory compliance.'],
  ['Can SEBI inspect an AIF?', 'Yes. SEBI has inspection, inquiry and enforcement powers.'],
  ['What books must AIF maintain?', 'AIF must maintain scheme-wise books such as investor ledger, capital call register, investment register, valuation register and distribution register.'],
  ['Can an AIF publicly advertise?', 'No. AIFs raise funds through private placement and should avoid public solicitation.'],
  ['How can Estabizz help with AIF Registration in India?', 'Estabizz assists with category selection, fund structuring, PPM drafting, sponsor contribution planning, Form A filing, SEBI query response and post-registration compliance.']
].map(([q, a]) => ({ q, a }));

function DataTable({ headers, rows }: { headers: string[]; rows: TableRow[] }) {
  return (
    <div className="overflow-x-auto my-6 rounded-xl border border-[rgba(0,150,220,0.12)]">
      <table className="data-table my-0 min-w-[720px]">
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function CardGrid({ cards, columns = 'md:grid-cols-2' }: { cards: Card[]; columns?: string }) {
  return (
    <div className={`grid grid-cols-1 ${columns} gap-4 my-6`}>
      {cards.map((card) => (
        <div key={card.title} className="rounded-xl border border-[rgba(0,150,220,0.12)] bg-white p-5 shadow-[0_4px_18px_rgba(0,100,200,0.04)]">
          <h3 className="!p-0 !mb-2 !text-[#0a1628]">{card.title}</h3>
          <div className="text-[14px] leading-7 text-gray-600">{card.body}</div>
        </div>
      ))}
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section className="mb-12"><h2 id={id}>{title}</h2>{children}</section>;
}

function Timeline({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <div className="step-timeline">
      {steps.map((step, index) => (
        <div className="step-item" key={step.title}>
          <div className="step-dot" />
          <div className="step-card">
            <div className="step-label">Step {index + 1}</div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Flow({ items }: { items: string[] }) {
  return (
    <div className="my-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-sky-50 to-white p-5">
      <div className="grid grid-cols-1 gap-3">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-3">
            <div className="min-w-8 h-8 rounded-full bg-[#0a1628] text-white text-sm font-bold flex items-center justify-center">{index + 1}</div>
            <div className="flex-1 rounded-xl bg-white border border-blue-100 px-4 py-3 text-sm font-semibold text-[#0a1628] shadow-sm">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const categoryOneExamples = ['Venture Capital Fund', 'Angel Fund', 'SME Fund', 'Social Impact Fund', 'Infrastructure Fund', 'Startup Technology Fund', 'Deep Tech Innovation Fund', 'Renewable Energy Fund', 'Agri-Tech Venture Fund', 'Healthcare Innovation Fund', 'Defence Manufacturing Fund', 'Women Entrepreneurship Fund', 'Social Stock Exchange Impact Fund'];
const categoryTwoExamples = ['Private Equity Fund', 'Growth Capital Fund', 'Buyout Fund', 'Debt Fund', 'Credit Opportunities Fund', 'Mezzanine Fund', 'Structured Debt Fund', 'Real Estate PE Fund', 'Pre-IPO Fund', 'Fund of Funds', 'Corporate Credit Fund', 'Strategic Investment Fund', 'Emerging Companies Fund'];
const categoryThreeExamples = ['Hedge Fund', 'Long-Short Equity Fund', 'Arbitrage Fund', 'Quant Strategy Fund', 'Derivatives Strategy Fund', 'Market Neutral Fund', 'Event Driven Fund', 'Macro Trading Fund', 'Volatility Fund', 'Multi-Strategy Fund', 'Systematic Trading Fund', 'Alternative Beta Fund'];

export default function PageClient() {
  return (
    <ServicePageLayout
      tags={[
        { emoji: '📈', label: 'SEBI Regulatory Advisory' },
        { emoji: '💼', label: 'AIF Fund Structuring' },
        { emoji: '📋', label: 'PPM & Form A Support' }
      ]}
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'SEBI Services', href: '/sebi' },
        { label: 'AIF Registration in India' }
      ]}
      title="AIF Registration in India - Complete SEBI Compliance Guide for Fund Sponsors"
      heroDescription={
        <>
          <p><strong>AIF Registration in India</strong> is the regulatory approval granted by the Securities and Exchange Board of India to privately pooled investment vehicles operating under the SEBI Alternative Investment Funds framework. If a sponsor or investment manager proposes to launch a venture capital fund, private equity fund, debt fund, hedge fund, infrastructure fund, angel fund, social impact fund or other privately pooled fund structure in India, SEBI AIF Registration must be obtained before raising capital from investors.</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {['SEBI Regulatory Advisory', 'Category I / II / III AIF Structuring', 'PPM Drafting Support', 'Sponsor Contribution Planning', 'Form A Filing Support', 'SEBI Query Response', 'Post-Registration Compliance'].map((badge) => (
              <span key={badge} className="rounded-full border border-blue-100 bg-white/80 px-3 py-1 text-xs font-semibold text-[#0a1628] shadow-sm">{badge}</span>
            ))}
          </div>
        </>
      }
      heroActions={
        <>
          <Link href="/contact" className="px-6 py-3 bg-[#0a1628] text-white font-bold rounded-xl hover:bg-[#1a2638] transition-colors shadow-sm">Apply for AIF Registration</Link>
          <Link href="/get-started" className="px-6 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Check AIF Eligibility</Link>
          <a href={whatsappUrl} className="px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl hover:bg-[#059669] transition-colors shadow-sm">WhatsApp Estabizz Team</a>
        </>
      }
      trustLine="Trusted support for RBI, SEBI, IRDAI, IFSCA and financial regulatory advisory across India and global markets."
      readTime="32 min read"
      displayYear="2026"
      focusKeyword="AIF Registration in India"
      sections={sections}
      ctaTitle="Plan Your AIF"
      ctaDescription="Discuss category selection, PPM, sponsor contribution and SEBI filing readiness with Estabizz."
      quickFacts={[
        { label: 'Regulator', value: 'SEBI' },
        { label: 'Form', value: 'Form A' },
        { label: 'Corpus', value: 'Rs. 20 Cr+' },
        { label: 'Investor', value: 'Rs. 1 Cr+' },
        { label: 'Mode', value: 'Private placement' }
      ]}
      relatedArticles={[
        { title: 'AIF Compliance Test Report', href: '/sebi/aif-compliance-test-report', category: 'SEBI', description: 'Compliance test report requirements for Alternative Investment Funds.' },
        { title: 'Alternative Asset Portfolio Valuation', href: '/sebi/alternative-asset-portfolio-valuation', category: 'SEBI', description: 'Valuation framework for alternative assets and portfolio governance.' },
        { title: 'Collective Investment Schemes', href: '/sebi/collective-investment-schemes', category: 'SEBI', description: 'Understand the difference between CIS and AIF structures.' }
      ]}
      finalCtaTitle="Start Your AIF Registration Journey with Estabizz"
      finalCtaDescription="Build your SEBI AIF application with structured regulatory support, category assessment, fund structuring, sponsor contribution planning, PPM drafting, Form A filing, SEBI query response, scheme launch support and post-registration compliance assistance."
      finalCtaActions={
        <>
          <Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#1677f2] to-[#0077B6] text-white font-bold rounded-xl shadow-lg">Speak to SEBI Compliance Expert</Link>
          <Link href="/contact" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20">Apply for AIF Registration</Link>
          <Link href="/get-started" className="w-full sm:w-auto px-6 py-3 bg-white text-[#0a1628] font-bold rounded-xl">Check AIF Eligibility</Link>
          <a href={whatsappUrl} className="w-full sm:w-auto px-6 py-3 bg-[#10b981] text-white font-bold rounded-xl">WhatsApp Estabizz Team</a>
        </>
      }
    >
      <Section id="quick-overview" title="AIF Registration in India: Quick Overview">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'Regulator', body: 'Securities and Exchange Board of India' },
          { title: 'Applicable Regulation', body: 'SEBI Alternative Investment Funds Regulations, 2012, as amended from time to time' },
          { title: 'Registration Type', body: 'Alternative Investment Fund Registration' },
          { title: 'Eligible Structures', body: 'Trust, Company, LLP or Body Corporate established in India' },
          { title: 'Individual Applicant', body: 'Not eligible directly' },
          { title: 'Main Categories', body: 'Category I, Category II and Category III AIF' },
          { title: 'Minimum Corpus', body: 'Generally Rs. 20 Crore per scheme' },
          { title: 'Minimum Investor Commitment', body: 'Generally Rs. 1 Crore per investor, subject to exceptions' },
          { title: 'Category I and II Tenure', body: 'Close-ended, generally minimum 3 years' },
          { title: 'Category III Tenure', body: 'Open-ended or close-ended, depending on strategy' },
          { title: 'Sponsor / Manager Continuing Interest - Category I and II', body: '2.5% of corpus or Rs. 5 Crore, whichever is lower' },
          { title: 'Sponsor / Manager Continuing Interest - Category III', body: '5% of corpus or Rs. 10 Crore, whichever is lower' },
          { title: 'Application Form', body: 'Form A with SEBI' },
          { title: 'PPM', body: 'Draft Private Placement Memorandum required' },
          { title: 'Registration Validity', body: 'Valid unless suspended or cancelled' },
          { title: 'Timeline', body: 'Indicative 3 to 6 months or more, depending on documentation and SEBI review' }
        ]} />
        <div className="warning-box">The above details are indicative and must be evaluated based on the proposed AIF category, legal structure, investment strategy, sponsor profile, manager capability, PPM quality, investor profile, FEMA position and latest SEBI regulations / circulars at the time of filing.</div>
      </Section>

      <Section id="what-is-aif-registration" title="What is AIF Registration in India?">
        <p>AIF Registration in India is the approval granted by SEBI to a privately pooled investment vehicle established in India for collecting funds from investors and investing such funds in accordance with a defined investment policy. An AIF is not regulated as a mutual fund or collective investment scheme and is governed separately under the SEBI AIF framework.</p>
        <p>AIFs are generally structured for sophisticated investors and institutional capital. They are used for venture capital, private equity, debt, hedge fund strategies, infrastructure investments, social impact investments, angel investments and other alternative investment strategies.</p>
        <div className="warning-box">No entity should pool investor funds under an AIF-like structure without SEBI registration. Unregistered pooling may attract regulatory scrutiny and enforcement action.</div>
      </Section>

      <Section id="legal-background" title="Legal Background of AIF Registration in India">
        <DataTable headers={['Particular', 'Details']} rows={[
          ['Regulator', 'Securities and Exchange Board of India'],
          ['Primary Regulation', 'SEBI (Alternative Investment Funds) Regulations, 2012, as amended from time to time'],
          ['Applicable Law', 'SEBI Act, 1992'],
          ['Application Form', 'Form A'],
          ['Registration Certificate', 'Form B after SEBI approval'],
          ['Fundraising Mode', 'Private placement only'],
          ['Core Regulatory Focus', 'Investor protection, private placement discipline, investment policy clarity, sponsor contribution, governance, disclosure and reporting'],
          ['Key Documents', 'Constitutional documents, PPM, Form A, sponsor / manager details, KMP details, declarations and compliance documents']
        ]} />
        <p>SEBI’s AIF framework regulates privately pooled investment vehicles and prescribes category-wise investment conditions, eligibility, sponsor / manager continuing interest, disclosure obligations, scheme filing, reporting and compliance requirements. SEBI’s official website currently lists the consolidated AIF Regulations as last amended on April 18, 2026, and applicants should always verify the latest official version before filing.</p>
      </Section>

      <Section id="what-is-aif" title="What is an Alternative Investment Fund under SEBI?">
        <p>An Alternative Investment Fund is a privately pooled investment vehicle established in India in the form of a trust, company, LLP or body corporate. It collects funds from Indian or foreign investors for investing as per a defined investment policy and is not covered under SEBI Mutual Fund Regulations or Collective Investment Scheme Regulations.</p>
        <CardGrid columns="md:grid-cols-2" cards={['Privately pooled investment vehicle', 'Established in India', 'Fundraising from Indian or foreign investors', 'Defined investment policy', 'Private placement only', 'Not a mutual fund', 'Not a CIS', 'Regulated by SEBI'].map((item) => ({ title: item, body: 'A core feature to be tested while preparing the structure, PPM and investor onboarding framework.' }))} />
      </Section>

      <Section id="why-mandatory" title="Why AIF Registration in India is Mandatory">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="rounded-xl border border-red-100 bg-red-50/40 p-5">
            <h3 className="!p-0 !mb-3 !text-[#0a1628]">Without AIF Registration</h3>
            <ul><li>Pooling capital may be treated as unauthorised</li><li>Fundraising cannot be legally undertaken as an AIF</li><li>Institutional investors may not participate</li><li>Enforcement and investor protection risk may arise</li><li>Sponsor credibility may be affected</li></ul>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-5">
            <h3 className="!p-0 !mb-3 !text-[#0a1628]">With AIF Registration</h3>
            <ul><li>Legal fund structuring</li><li>Institutional investor confidence</li><li>Category-wise regulatory clarity</li><li>SEBI-compliant PPM and governance framework</li><li>Tax pass-through possibility for Category I and II, subject to law</li><li>Global fundraising credibility</li></ul>
          </div>
        </div>
      </Section>

      <Section id="categories" title="Categories under AIF Registration in India">
        <DataTable headers={['Category', 'Nature', 'Leverage', 'Economic Intent', 'Examples']} rows={[
          ['Category I', 'Funds investing in socially or economically desirable sectors', 'Generally no leverage', 'Positive spillover impact', 'Venture Capital Fund, SME Fund, Social Impact Fund, Infrastructure Fund'],
          ['Category II', 'Funds not falling under Category I or III', 'No leverage except permitted temporary borrowing', 'Commercial returns', 'Private Equity Fund, Debt Fund, Fund of Funds, Real Estate PE Fund'],
          ['Category III', 'Funds using complex or diverse trading strategies', 'Leverage may be allowed subject to regulations', 'Market strategy returns', 'Hedge Fund, Long-Short Fund, Quant Fund, Derivatives Strategy Fund']
        ]} />
        <div className="info-box">Correct category selection is one of the most important structuring decisions during AIF Registration in India. Wrong categorisation may lead to SEBI queries and delay.</div>
      </Section>

      <Section id="category-i" title="Category I AIF Registration in India">
        <p>Category I AIF generally covers funds investing in sectors or strategies considered socially or economically beneficial. These include venture capital funds, SME funds, social impact funds, infrastructure funds, angel funds and other SEBI-specified sub-categories.</p>
        <CardGrid columns="md:grid-cols-3" cards={categoryOneExamples.map((title) => ({ title, body: 'Illustrative Category I strategy, subject to SEBI category conditions and PPM disclosure.' }))} />
        <div className="info-box">Category I AIFs are generally close-ended and do not undertake leverage except as permitted under regulations.</div>
      </Section>

      <Section id="category-ii" title="Category II AIF Registration in India">
        <p>Category II AIF includes private equity funds, debt funds, real estate funds, fund of funds and other funds that do not fall under Category I or Category III. This is a common structure for commercial investment strategies where leverage is not proposed except limited temporary borrowing as permitted.</p>
        <CardGrid columns="md:grid-cols-3" cards={categoryTwoExamples.map((title) => ({ title, body: 'Illustrative Category II strategy requiring clear investment policy and disclosure.' }))} />
      </Section>

      <Section id="category-iii" title="Category III AIF Registration in India">
        <p>Category III AIF is suitable for funds using complex or diverse trading strategies, including hedge funds, long-short funds, quant funds, derivatives strategy funds, arbitrage funds and other market-linked strategies. Category III AIFs may be open-ended or close-ended and may use leverage subject to applicable disclosure and regulatory conditions.</p>
        <CardGrid columns="md:grid-cols-3" cards={categoryThreeExamples.map((title) => ({ title, body: 'Illustrative Category III strategy requiring stronger risk controls, leverage monitoring and investor disclosure.' }))} />
        <div className="warning-box">Category III strategies require stronger risk controls, leverage monitoring, valuation governance and investor disclosure.</div>
      </Section>

      <Section id="special-structures" title="Angel Funds, AI-only Schemes and Large Value Funds">
        <DataTable headers={['Structure', 'Practical Meaning', 'Key Consideration']} rows={[
          ['Angel Fund', 'Category I sub-category for angel investments', 'Special investor and corpus conditions apply'],
          ['AI-only Scheme', 'Scheme restricted to Accredited Investors', 'Naming, consent and reporting conditions apply'],
          ['Large Value Fund', 'Fund catering to accredited investors', 'Certain compliance relaxations may apply'],
          ['Co-Investment Vehicle / CIV', 'Co-investment within AIF structure where permitted', 'Separate compliance, ring-fencing and reporting required']
        ]} />
        <p>These structures should be evaluated carefully based on investor profile, scheme strategy, tenure, compliance flexibility and latest SEBI circulars, including recent circulars on AI-only schemes, LVFs and co-investment routes.</p>
      </Section>

      <Section id="who-can-apply" title="Who Can Apply for AIF Registration in India?">
        <DataTable headers={['Applicant Structure', 'Eligibility Position']} rows={[
          ['Trust', 'Eligible and commonly used for AIF structuring'],
          ['Company', 'Eligible if constitutional documents permit AIF activity'],
          ['LLP', 'Eligible subject to regulatory conditions'],
          ['Body Corporate', 'Eligible where permitted under regulations'],
          ['Individual', 'Not eligible directly'],
          ['NBFC / Regulated group sponsor', 'May sponsor / participate subject to SEBI and other applicable regulator conditions'],
          ['Foreign investors', 'May invest subject to FEMA and applicable investment rules']
        ]} />
      </Section>

      <Section id="who-cannot-apply" title="Who Cannot Apply for AIF Registration in India?">
        <DataTable headers={['Applicant / Situation', 'Regulatory Concern']} rows={[
          ['Individual applying directly', 'Not permitted as AIF structure'],
          ['Unregistered pooling vehicle', 'Enforcement risk'],
          ['Entity with public solicitation model', 'AIF is private placement structure'],
          ['Sponsor / manager failing fit and proper criteria', 'Application risk'],
          ['Vague investment strategy', 'SEBI query risk'],
          ['Entity without adequate infrastructure', 'Operational concern'],
          ['Weak or uncertified investment team', 'Governance concern'],
          ['Applicant unable to maintain continuing interest', 'Eligibility and compliance concern']
        ]} />
      </Section>

      <Section id="eligibility" title="Eligibility Criteria for AIF Registration in India">
        <DataTable headers={['Eligibility Parameter', 'Regulatory Expectation']} rows={[
          ['Legal Structure', 'Trust, Company, LLP or body corporate established in India'],
          ['Private Placement', 'Fundraising through private placement only'],
          ['Constitutional Documents', 'Must permit AIF activity'],
          ['Sponsor and Manager', 'Fit and proper and financially capable'],
          ['Investment Manager', 'Adequate infrastructure, manpower and systems'],
          ['Key Investment Team', 'Qualified and experienced professionals'],
          ['Investment Strategy', 'Clearly defined and category-appropriate'],
          ['PPM', 'Detailed Private Placement Memorandum with required disclosures'],
          ['Continuing Interest', 'Sponsor / manager contribution as prescribed'],
          ['Investor Commitment', 'Minimum investor commitment as prescribed'],
          ['Compliance Framework', 'Reporting, valuation, audit, KYC/AML and internal controls']
        ]} />
      </Section>

      <Section id="corpus-commitment" title="Corpus and Investor Commitment under AIF Registration in India">
        <DataTable headers={['Requirement', 'General Position']} rows={[
          ['Minimum Corpus per Scheme', 'Rs. 20 Crore generally'],
          ['Minimum Investor Commitment', 'Rs. 1 Crore generally'],
          ['Manager / Employee Minimum Commitment', 'Rs. 25 Lakh generally'],
          ['Category I and II Scheme Tenure', 'Close-ended with minimum 3 years'],
          ['Category III Scheme Tenure', 'Open-ended or close-ended'],
          ['Maximum Investors', 'As per SEBI framework'],
          ['Private Placement', 'Mandatory']
        ]} />
        <h3>Sponsor / Manager Continuing Interest</h3>
        <DataTable headers={['AIF Category', 'Continuing Interest Requirement']} rows={[
          ['Category I and II', '2.5% of corpus or Rs. 5 Crore, whichever is lower'],
          ['Category III', '5% of corpus or Rs. 10 Crore, whichever is lower']
        ]} />
        <div className="info-box">Continuing interest must generally be maintained throughout the scheme life and should not be achieved through waiver of management fee.</div>
      </Section>

      <Section id="capital-planning" title="Capital Structure Planning for AIF Registration in India">
        <Flow items={['Sponsor Contribution', 'Investor Commitments', 'Capital Calls', 'Investment Deployment', 'Valuation and Reporting', 'Exit / Returns', 'Distribution Waterfall']} />
        <DataTable headers={['Planning Area', 'Practical Importance']} rows={[
          ['Sponsor Contribution', 'Demonstrates skin in the game'],
          ['Investor Commitments', 'Basis for corpus and capital call planning'],
          ['Capital Call Process', 'Must be clearly defined in PPM'],
          ['Default Consequences', 'Must be documented to avoid disputes'],
          ['Expense Allocation', 'Should be transparent'],
          ['Distribution Waterfall', 'Must be legally and commercially clear'],
          ['Manager Sustainability', 'Working capital and operating cost readiness must be demonstrated']
        ]} />
      </Section>

      <Section id="ppm-framework" title="PPM Drafting Framework for AIF Registration in India">
        <p>Private Placement Memorandum is one of the most important documents in AIF Registration in India. SEBI expects clear disclosure, strategy clarity, risk factors, fee transparency, governance framework and investor protection provisions.</p>
        <DataTable headers={['Section', 'Clauses']} rows={[
          ['Section A - Constitutional Disclosures', '1. Definitions and interpretation; 2. Regulatory background; 3. Legal structure; 4. Sponsor details; 5. Manager details; 6. Trustee details; 7. Category of AIF; 8. Scheme structure; 9. Tenure and extension'],
          ['Section B - Investment Framework', '10. Investment objective; 11. Investment strategy; 12. Target sectors; 13. Permissible instruments; 14. Investment restrictions; 15. Diversification and concentration norms; 16. Leverage policy, if Category III; 17. Co-investment policy; 18. Associate transaction policy; 19. Exit strategy'],
          ['Section C - Governance and Risk', '20. Investment Committee constitution; 21. Voting framework; 22. Conflict of interest policy; 23. Risk management policy; 24. Valuation policy; 25. Custody and asset holding mechanism; 26. Borrowing policy; 27. Insurance coverage'],
          ['Section D - Investor Economics', '28. Capital commitment; 29. Capital call process; 30. Default consequences; 31. Management fee; 32. Carried interest; 33. Hurdle rate; 34. Distribution waterfall; 35. Expenses and cost allocation'],
          ['Section E - Operational and Compliance', '36. Reporting and disclosure; 37. Audit and valuation frequency; 38. Winding up mechanism; 39. SEBI inspection and powers; 40. Investor rights and grievance mechanism']
        ]} />
        <div className="warning-box">Avoid vague investment mandates such as “invest across sectors”. AIF PPM should contain measurable, category-aligned and investor-understandable strategy language.</div>
      </Section>

      <Section id="governance" title="Investment Committee and Governance for AIF Registration in India">
        <DataTable headers={['Role', 'Suggested Requirement']} rows={[
          ['Chairperson', 'Independent or sponsor representative'],
          ['Investment Expert', 'Domain specialist'],
          ['Finance Expert', 'CA, CFA or experienced finance professional'],
          ['Compliance Representative', 'Internal control and compliance oversight'],
          ['Observer', 'Trustee or sponsor nominee, if required']
        ]} />
        <CardGrid columns="md:grid-cols-2" cards={['Investment Committee Charter', 'Voting framework', 'Conflict register', 'Associate transaction policy', 'Valuation committee', 'Compliance officer', 'Risk register', 'Whistleblower policy', 'Code of conduct', 'Data security framework'].map((title) => ({ title, body: 'Governance element to be aligned with the PPM, fund documents and internal controls.' }))} />
        <div className="info-box">Avoid concentration of investment decision-making power in one individual. SEBI closely examines governance and conflict management.</div>
      </Section>

      <Section id="documents-required" title="Documents Required for AIF Registration in India">
        <DataTable headers={['Document Category', 'Key Documents']} rows={[
          ['Application Documents', 'Form A, application fee proof and SEBI-prescribed declarations'],
          ['Constitutional Documents', 'Trust deed, LLP agreement, MOA / AOA or body corporate documents'],
          ['Sponsor Documents', 'Sponsor profile, financials, net worth details, fit and proper declaration and contribution proof'],
          ['Manager Documents', 'Manager profile, financials, infrastructure details, investment team profile and certifications'],
          ['Trustee Documents', 'Trustee details and consent, where trust structure is used'],
          ['PPM Documents', 'Draft Private Placement Memorandum, term sheet and scheme disclosures'],
          ['Investment Strategy Documents', 'Category note, investment objective, target sectors and instrument strategy'],
          ['Governance Documents', 'IC charter, conflict policy, valuation policy, risk policy and compliance manual'],
          ['Investor Documents', 'Investor onboarding framework, KYC/AML process and commitment documents'],
          ['Financial Documents', 'Net worth certificate, capital contribution plan and operating expense projections'],
          ['Compliance Documents', 'Reporting framework, books of account framework, record retention policy and SEBI compliance matrix']
        ]} />
      </Section>

      <Section id="registration-process" title="Step-by-Step Process for AIF Registration in India">
        <Timeline steps={[
          { title: 'Fund Structuring and Category Selection', body: 'Evaluate whether the proposed fund should be structured as Category I, Category II or Category III AIF.' },
          { title: 'Legal Structure Finalisation', body: 'Choose Trust, Company, LLP or Body Corporate structure and align constitutional documents.' },
          { title: 'Sponsor and Manager Readiness', body: 'Review sponsor background, manager capability, investment team qualifications and continuing interest planning.' },
          { title: 'PPM and Policy Drafting', body: 'Prepare draft PPM, investment strategy, risk disclosures, valuation policy, conflict policy and governance documents.' },
          { title: 'Form A Filing with SEBI', body: 'Submit Form A along with prescribed documents and application fee.' },
          { title: 'SEBI Scrutiny', body: 'SEBI reviews legal structure, category, investment strategy, sponsor / manager profile, PPM disclosures and compliance readiness.' },
          { title: 'Clarification and Query Response', body: 'Respond to SEBI observations with revised documents, tracked changes and supporting clarifications.' },
          { title: 'Approval and Registration Fee Payment', body: 'Upon SEBI satisfaction, pay applicable registration fee.' },
          { title: 'Certificate of Registration', body: 'SEBI grants certificate of registration as AIF in the approved category.' },
          { title: 'Scheme Launch Readiness', body: 'Complete bank, demat, custodian, auditor, valuer, investor onboarding and scheme filing requirements before launch.' }
        ]} />
      </Section>

      <Section id="government-fees" title="Government Fees for AIF Registration in India">
        <DataTable headers={['AIF Category', 'Application Fee', 'Registration Fee']} rows={[
          ['Category I AIF', 'Rs. 1,00,000', 'Rs. 5,00,000'],
          ['Category II AIF', 'Rs. 1,00,000', 'Rs. 10,00,000'],
          ['Category III AIF', 'Rs. 1,00,000', 'Rs. 15,00,000']
        ]} />
        <div className="warning-box">Scheme filing fee may apply before launch, except where exempted as per applicable framework. Fees must be verified from the latest SEBI regulations and fee schedule before filing or hardcoding in reusable website data.</div>
      </Section>

      <Section id="timeline" title="Timeline for AIF Registration in India">
        <DataTable headers={['Stage', 'Indicative Timeline']} rows={[
          ['Fund structuring and category mapping', '2 to 4 weeks'],
          ['PPM and document drafting', '3 to 6 weeks'],
          ['Form A filing', 'Case-specific'],
          ['SEBI initial review', '30 to 60 days or more'],
          ['Clarification and revised filing', 'Case-specific'],
          ['Approval and fee payment', 'Subject to SEBI satisfaction'],
          ['Overall timeline', 'Usually 3 to 6 months or more depending on complexity']
        ]} />
        <p>Timeline is indicative and depends on fund complexity, PPM quality, sponsor background, investment strategy, SEBI review and query response.</p>
      </Section>

      <Section id="post-registration-activities" title="Activities After AIF Registration in India">
        <ul className="clean-list">
          {['Raise capital through private placement', 'Launch scheme after required filing', 'Open bank account', 'Open demat account', 'Appoint custodian where applicable', 'Appoint auditor', 'Appoint independent valuer', 'Execute investor contribution agreements', 'Maintain KYC / AML records', 'Issue capital call notices', 'Deploy investments as per PPM', 'Maintain investor reporting framework'].map((item) => <li key={item}>{item}</li>)}
        </ul>
      </Section>

      <Section id="post-registration-compliance" title="Post-Registration Compliance for AIFs">
        <DataTable headers={['Compliance Area', 'Requirement']} rows={[
          ['Private Placement Discipline', 'No public solicitation'],
          ['Corpus and Investor Commitment', 'Maintain prescribed requirements'],
          ['Sponsor Continuing Interest', 'Maintain throughout scheme life'],
          ['Investment Restrictions', 'Follow category-wise restrictions'],
          ['Valuation', 'Independent and periodic valuation as applicable'],
          ['Investor Reporting', 'Periodic investor reports'],
          ['SEBI Reporting', 'Regulatory returns and filings'],
          ['Compliance Test Report', 'Prepare and submit / maintain as applicable'],
          ['Audit', 'Annual audit and scheme-level records'],
          ['KYC / AML', 'Investor due diligence and ongoing monitoring'],
          ['Books of Account', 'Scheme-wise books and registers'],
          ['Leverage Monitoring', 'Mandatory for Category III where applicable'],
          ['Associate Transactions', 'Disclosure and investor approval as applicable']
        ]} />
      </Section>

      <Section id="compliance-calendar" title="AIF Registration in India - Compliance Calendar">
        <h3>Ongoing Compliance</h3>
        <DataTable headers={['Compliance Item', 'Frequency', 'Responsibility', 'Risk if Missed']} rows={[
          ['Sponsor Continuing Interest', 'Continuous', 'Sponsor / Manager', 'Regulatory breach'],
          ['Investment Restrictions', 'Continuous', 'Investment Manager', 'SEBI action'],
          ['Investor KYC / AML', 'Ongoing', 'Compliance Team', 'AML risk'],
          ['Books of Account', 'Continuous', 'Finance Team', 'Inspection risk'],
          ['Conflict Register', 'Continuous', 'Compliance Officer', 'Governance concern'],
          ['Associate Transaction Approval', 'Event-based', 'Manager / Trustee', 'Investor protection issue']
        ]} />
        <h3>Quarterly Compliance</h3>
        <DataTable headers={['Compliance Item', 'Applicability', 'Responsible Person']} rows={[
          ['Investor Reporting', 'As per PPM and regulations', 'Fund Manager'],
          ['SEBI Reporting', 'As prescribed', 'Compliance Officer'],
          ['Valuation Review', 'As applicable', 'Valuer / Finance Team'],
          ['Capital Call and Deployment Review', 'All schemes', 'Investment Team']
        ]} />
        <h3>Annual Compliance</h3>
        <DataTable headers={['Compliance Item', 'Requirement']} rows={[
          ['Annual Audit', 'Scheme and fund-level audit'],
          ['Compliance Test Report', 'As prescribed under SEBI framework'],
          ['Valuation Report', 'As per valuation policy and regulations'],
          ['Investor Annual Statement', 'As per PPM and regulations'],
          ['Financial Statements', 'Fund and scheme-level statements'],
          ['Review of Policies', 'Risk, valuation, conflict and compliance policy review']
        ]} />
        <h3>Event-Based Compliance</h3>
        <DataTable headers={['Event', 'Compliance Action']} rows={[
          ['Scheme launch', 'PPM / information memorandum filing as applicable'],
          ['Change in sponsor or manager', 'SEBI approval / intimation as applicable'],
          ['Change in key investment team', 'Regulatory compliance check'],
          ['Associate transaction', 'Disclosure and investor approval as applicable'],
          ['Extension of tenure', 'Investor approval and SEBI reporting as applicable'],
          ['Winding up', 'Investor approval, audit and SEBI intimation'],
          ['Material PPM change', 'Investor consent and regulatory filing as applicable']
        ]} />
      </Section>

      <Section id="books-registers" title="Books of Account and Registers for AIFs">
        <DataTable headers={['Register / Record', 'Purpose']} rows={[
          ['Capital Commitment Register', 'Investor commitment tracking'],
          ['Capital Call Register', 'Drawdown and payment tracking'],
          ['Investor Ledger', 'Investor-wise capital and distribution details'],
          ['Investment Register', 'Portfolio holdings and transactions'],
          ['Valuation Register', 'Valuation methodology and reports'],
          ['Distribution Register', 'Distribution waterfall and payouts'],
          ['Expense Allocation Register', 'Scheme expense allocation'],
          ['Associate Transaction Register', 'Related party transaction control'],
          ['Compliance Filing Register', 'SEBI and investor filing tracker'],
          ['Investment Committee Resolution Register', 'Approval and decision trail'],
          ['KYC / AML Register', 'Investor due diligence records']
        ]} />
        <p>Books must support SEBI inspection and investor reporting. Scheme-wise record keeping should be planned from day one.</p>
      </Section>

      <Section id="co-investment" title="Co-Investment and Associate Transaction Governance">
        <DataTable headers={['Area', 'Regulatory / Practical Requirement']} rows={[
          ['Co-Investment', 'Category I and II AIFs may offer co-investment through permitted routes, subject to conditions'],
          ['CIV Route', 'Separate ring-fenced structure, bank and demat accounts and compliance requirements where applicable'],
          ['Associate Transactions', 'Disclosure and investor approval requirements apply'],
          ['Investor Approval', '75% investor approval by value may be required for associate transactions'],
          ['Conflict Policy', 'Must be clearly documented in PPM'],
          ['Documentation Trail', 'Board / IC notes, investor consent, valuation and disclosure records required']
        ]} />
        <div className="info-box">Conflict management is one of the most important governance tests in AIF Registration in India.</div>
      </Section>

      <Section id="inspection-enforcement" title="SEBI Inspection and Enforcement Powers">
        <p>SEBI may inspect books, call for records, conduct inquiry, issue directions, impose penalties and suspend or cancel registration where serious non-compliance is observed.</p>
        <DataTable headers={['Violation', 'Possible Consequence']} rows={[
          ['Unregistered pooling', 'Enforcement action'],
          ['Misrepresentation in PPM', 'Severe regulatory action'],
          ['Leverage breach', 'Serious violation, especially for Category I / II'],
          ['Associate misuse', 'Suspension / enforcement risk'],
          ['Chronic non-reporting', 'Penalty and supervisory action'],
          ['Investor complaint upheld', 'Inquiry and corrective directions'],
          ['Fraudulent activity', 'Cancellation and enforcement action'],
          ['Failure to maintain records', 'Inspection adverse finding']
        ]} />
      </Section>

      <Section id="common-mistakes" title="Common Mistakes in AIF Registration in India">
        <DataTable headers={['Mistake', 'Risk']} rows={[
          ['Wrong category selection', 'SEBI query and delay'],
          ['Vague investment strategy', 'PPM clarification'],
          ['Weak sponsor background disclosure', 'Investor protection concern'],
          ['Poorly drafted PPM', 'Disclosure deficiency'],
          ['No certified investment professional', 'Application delay'],
          ['Inadequate manager infrastructure', 'Operational concern'],
          ['Unclear fee structure', 'Investor exploitation concern'],
          ['No conflict policy', 'Governance weakness'],
          ['Weak valuation policy', 'Investor dispute risk'],
          ['Ambiguous capital call default clause', 'Future litigation risk'],
          ['No compliance calendar', 'Post-registration default'],
          ['Slow SEBI query response', 'Procedural delay']
        ]} />
      </Section>

      <Section id="strategic-recommendations" title="Strategic Structuring Recommendations Before Applying">
        <ul className="clean-list">
          {['Select AIF category carefully', 'Prepare clear investment thesis', 'Avoid over-broad investment objective', 'Build sponsor contribution plan early', 'Prepare PPM with full risk disclosure', 'Appoint experienced investment manager', 'Ensure key investment team certification', 'Draft conflict and associate transaction policy', 'Prepare valuation methodology', 'Build compliance test report framework', 'Prepare SEBI query response strategy', 'Maintain scheme-wise record keeping framework'].map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="expert-quote">
          <blockquote>“True fund leadership lies not in how capital is deployed, but in how responsibility is structured before capital is raised.”</blockquote>
          <cite>CS Devyani Khambhati - Compliance Expert</cite>
        </div>
      </Section>

      <Section id="how-estabizz-helps" title="How Estabizz Helps with AIF Registration in India">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'AIF Category Assessment', body: 'We help evaluate whether the proposed fund should be Category I, Category II, Category III, Angel Fund, AI-only scheme, LVF or other suitable structure.' },
          { title: 'Fund Structuring Support', body: 'We assist with Trust / LLP / Company structuring, sponsor-manager arrangement, trustee documentation and fund governance model.' },
          { title: 'PPM Drafting and Review', body: 'We prepare SEBI-ready PPM with investment strategy, risk factors, fee structure, conflict policy, valuation policy and investor rights framework.' },
          { title: 'Sponsor Contribution Planning', body: 'We assist with continuing interest mapping, capital contribution planning and supporting financial documentation.' },
          { title: 'Form A and SEBI Filing', body: 'We assist in Form A preparation, document compilation, application filing support and SEBI query responses.' },
          { title: 'Governance and Policy Documentation', body: 'We help draft investment committee charter, conflict policy, valuation policy, risk policy, KYC/AML policy and compliance manual.' },
          { title: 'Post-Registration Compliance', body: 'We support scheme launch, PPM filing, reporting calendar, compliance test report, investor reporting, books of account and regulatory updates.' },
          { title: 'Co-Investment and Associate Transaction Support', body: 'We assist in structuring co-investment, CIV-related documentation and associate transaction approval framework.' },
          { title: 'Ticket-Based Execution', body: 'Estabizz follows a structured task-tracking system so clients receive organised updates throughout the engagement.' }
        ]} />
      </Section>

      <Section id="why-choose-estabizz" title="Why Choose Estabizz for AIF Registration in India?">
        <CardGrid columns="md:grid-cols-2" cards={[
          { title: 'SEBI Regulatory Expertise', body: 'Our team works across SEBI licensing and compliance matters and understands fund registration scrutiny.' },
          { title: 'Fund Structuring Depth', body: 'We understand category selection, sponsor-manager arrangements, PPM drafting, investor economics and governance architecture.' },
          { title: 'Compliance-First PPM Approach', body: 'We focus on disclosure, risk factors, conflict policy, valuation, fees and investor protection from the drafting stage.' },
          { title: 'Business Plan and Financial Modelling', body: 'We prepare practical fund business plans, corpus planning models, drawdown assumptions and manager sustainability projections.' },
          { title: 'Multi-Regulator Experience', body: 'Estabizz’s experience across RBI, SEBI, IRDAI and IFSCA enables a wider financial regulatory perspective.' },
          { title: 'End-to-End Support', body: 'From fund structuring to SEBI application, query response, scheme launch and post-registration compliance, we provide organised professional handholding.' }
        ]} />
      </Section>

      <Section id="faqs" title="FAQs on AIF Registration in India">
        <div className="faq-accordion">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.q}>
              <summary>{faq.q}</summary>
              <div>{faq.a}</div>
            </details>
          ))}
        </div>
      </Section>

      <Section id="expert-review" title="Reviewed by Estabizz Compliance Expert">
        <div className="info-box">
          <p><strong>Reviewed by:</strong> CS Devyani Khambhati</p>
          <p><strong>Designation:</strong> Compliance Expert | Estabizz Fintech Private Limited</p>
          <p><strong>Expertise:</strong> SEBI, RBI, IRDAI, IFSCA, AIF registration, fund structuring, PPM drafting, SEBI intermediary compliance, investment governance and post-registration regulatory support.</p>
          <p>This content has been prepared from a regulatory advisory perspective to help fund sponsors, investment managers, family offices, venture capital firms, private equity firms, debt fund sponsors and institutional promoters understand the broad SEBI framework for AIF Registration in India.</p>
        </div>
        <div className="warning-box">
          This content is for general informational purposes only and should not be treated as legal, regulatory, tax, investment or financial advice. SEBI requirements, application formats, fee structures, sponsor contribution norms, PPM filing requirements, reporting obligations and approval processes may change from time to time. Applicants should verify the latest SEBI regulations, master circulars and circulars before filing any AIF application.
        </div>
      </Section>

      <Section id="speak-to-expert" title="Speak to Our SEBI Compliance Expert">
        <p>Estabizz can help you assess the proposed AIF category, build the sponsor-manager structure, prepare PPM and Form A documentation, respond to SEBI observations and set up a post-registration compliance calendar.</p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <Link href="/contact" className="px-5 py-3 bg-[#0a1628] text-white font-bold rounded-xl text-center">Speak to SEBI Compliance Expert</Link>
          <Link href="/get-started" className="px-5 py-3 bg-white text-[#1677f2] font-bold rounded-xl border border-blue-200 text-center">Check AIF Eligibility</Link>
          <a href={whatsappUrl} className="px-5 py-3 bg-[#10b981] text-white font-bold rounded-xl text-center">WhatsApp Estabizz Team</a>
        </div>
      </Section>
    </ServicePageLayout>
  );
}
