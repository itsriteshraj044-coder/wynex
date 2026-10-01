/**
 * Legal page content. Blocks are plain strings (paragraphs) or { list } (bullets);
 * URLs and email addresses in the text are turned into links when rendered.
 *
 * Keep the Privacy Policy accurate to what the site actually does — if you add
 * analytics, ads, a chat widget or a newsletter tool, describe it here first.
 */

export type LegalBlock = string | { list: string[] };

export interface LegalSection {
  id: string;
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const COMPANY = 'Wynex Technologies';
const EMAIL = 'info@wynextechnologies.com';
const ADDRESS = 'Pragati Nagar, I.O.C Road Sipara, Patna, Bihar 800030, India';
const UPDATED = 'October 2, 2026';

const contactList = [
  `Email: ${EMAIL}`,
  'Phone: +91 93412 67488',
  `Post: Grievance Officer, ${COMPANY}, ${ADDRESS}`,
];

export const LEGAL: Record<'privacy' | 'terms' | 'cookies', LegalDoc> = {
  privacy: {
    title: 'Privacy Policy',
    updated: UPDATED,
    intro: `This Privacy Policy explains how ${COMPANY} ("Wynex", "we", "us") collects, uses, shares and protects personal data when you visit wynextechnologies.com or contact us. It is written to meet India's Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025, and the disclosure requirements of the Google services this website uses. We have kept it in plain language — if anything is unclear, write to ${EMAIL}.`,
    sections: [
      {
        id: 'who-we-are',
        heading: 'Who we are',
        blocks: [
          `${COMPANY} is a software development company registered as an MSME in India, with its office at ${ADDRESS}. For the personal data described in this policy, we are the "Data Fiduciary" under the DPDP Act — we decide why and how your data is processed.`,
        ],
      },
      {
        id: 'data-we-collect',
        heading: 'Personal data we collect',
        blocks: [
          'We collect only what we need to reply to you and run this website:',
          {
            list: [
              'Enquiry details you give us through the contact form, the "Start a project" form, email, phone or WhatsApp: your name, email address, phone number, city, state, the service you are interested in, and any project details you choose to share.',
              'Technical data sent automatically by your browser when you load a page: IP address, browser and device type, the page requested and the time. Our hosting provider records this in standard server logs for security and to keep the site running.',
              'A one-way (hashed) form of your IP address and the time of a form submission, kept for about 10 minutes to stop spam and repeated automated submissions.',
              'Your light/dark theme choice, saved only in your own browser (local storage). It is never sent to us.',
            ],
          },
          'We do not use analytics or advertising trackers on this website, and we do not ask for sensitive information such as financial, health or identity documents through it. Please do not include such information in the form.',
        ],
      },
      {
        id: 'how-we-use',
        heading: 'Why we use it',
        blocks: [
          {
            list: [
              'To read and reply to your enquiry and send you a proposal or quote you asked for.',
              'To deliver and support services if you become a client (this is then also covered by our written agreement with you).',
              'To keep the website secure, prevent spam and abuse, and fix technical problems.',
              'To meet legal, tax and accounting obligations.',
            ],
          },
          'We do not sell your personal data, rent it, or use it for advertising profiles. We do not send marketing emails unless you have separately agreed to receive them, and you can stop them at any time.',
        ],
      },
      {
        id: 'consent',
        heading: 'Consent and withdrawing it',
        blocks: [
          'When you submit a form or contact us, you consent to us using the details you provide for the purposes above. Giving us this information is voluntary, but without it we cannot respond to your enquiry.',
          `You can withdraw your consent at any time — as easily as you gave it — by emailing ${EMAIL} with the subject "Withdraw consent". We will stop processing your data for that purpose and delete it unless we must keep it by law. Withdrawal does not affect processing already carried out.`,
        ],
      },
      {
        id: 'google-and-third-parties',
        heading: 'Google services and other third parties',
        blocks: [
          'This website uses the following third-party services. When your browser loads them, the provider receives your IP address and standard browser information, and may set its own cookies under its own privacy policy:',
          {
            list: [
              'Google Fonts — loads the typeface used on this site. Google Privacy Policy: https://policies.google.com/privacy',
              'Google Maps (embedded map on the Contact section) — shows our office location and may set Google cookies when the map loads. How Google uses information from sites that use its services: https://policies.google.com/technologies/partner-sites',
              'Unsplash — serves some of the photographs on this site.',
              'WhatsApp (Meta) — only if you click our WhatsApp button, which opens a chat in WhatsApp under its own terms: https://www.whatsapp.com/legal/privacy-policy',
            ],
          },
          'We also share personal data with service providers who process it on our behalf and only on our instructions: our hosting and email provider (Hostinger), which stores the website and delivers form submissions to our mailbox, and professional advisers such as accountants where required. We may disclose data if required by law, a court order or a government authority.',
        ],
      },
      {
        id: 'cookies',
        heading: 'Cookies',
        blocks: [
          'Our own website does not set advertising or analytics cookies. Third-party services listed above (in particular the embedded Google Map) may set cookies when they load. You can block or delete cookies in your browser settings; the site will continue to work, though the embedded map may not display. See our Cookie Policy at https://wynextechnologies.com/cookies for details.',
        ],
      },
      {
        id: 'retention',
        heading: 'How long we keep data',
        blocks: [
          {
            list: [
              'Enquiries that do not lead to a project: up to 2 years from our last contact, then deleted.',
              'Client records: for the duration of the engagement and as long afterwards as required by Indian tax, accounting and contract law.',
              'Spam-prevention data (hashed IP): about 10 minutes.',
              'Server logs: kept by our hosting provider for a limited period for security purposes.',
            ],
          },
          'When data is no longer needed, we delete it or make it anonymous.',
        ],
      },
      {
        id: 'security',
        heading: 'How we protect your data',
        blocks: [
          'The website is served only over encrypted HTTPS. Form submissions are sent to our mailbox over an encrypted, authenticated connection, and the mailbox password is kept out of our source code. Access to enquiries is limited to people at Wynex who need it to respond. No method of transmission or storage is completely secure, but if a personal data breach affects you, we will inform you and the Data Protection Board of India as the law requires.',
        ],
      },
      {
        id: 'your-rights',
        heading: 'Your rights',
        blocks: [
          'Under the DPDP Act, you have the right to:',
          {
            list: [
              'Access a summary of the personal data we hold about you and how we use it.',
              'Correct, complete or update inaccurate or incomplete data.',
              'Erase your personal data when it is no longer needed or you withdraw consent.',
              'Withdraw consent at any time.',
              'Nominate another person to exercise these rights on your behalf in the event of death or incapacity.',
              'Have your grievances addressed.',
            ],
          },
          `To exercise any right, email ${EMAIL} from the address you used with us (or tell us how to verify that it's you). We respond as soon as possible and within the time limits set by law. If you are in the European Union or United Kingdom, you have similar rights under the GDPR, including the right to object and to complain to your local data protection authority.`,
        ],
      },
      {
        id: 'grievances',
        heading: 'Grievance Officer',
        blocks: [
          'If you have a concern or complaint about how we handle your personal data, contact our Grievance Officer:',
          { list: contactList },
          'We will acknowledge your complaint and try to resolve it promptly. If you are not satisfied with our response, you may approach the Data Protection Board of India.',
        ],
      },
      {
        id: 'international',
        heading: 'Where your data is processed',
        blocks: [
          'Our service providers (including Google and our hosting provider) may store or process data on servers outside India. Where this happens, we rely on providers that protect data to a standard consistent with Indian law and any restrictions notified by the Government of India.',
        ],
      },
      {
        id: 'children',
        heading: 'Children',
        blocks: [
          'This website is meant for businesses and adults. We do not knowingly collect personal data from anyone under 18. If you believe a child has sent us their details, contact us and we will delete them.',
        ],
      },
      {
        id: 'changes',
        heading: 'Changes to this policy',
        blocks: [
          'We may update this policy when our website or the law changes. The "Last updated" date at the top shows the latest version, and we will highlight significant changes on this page.',
        ],
      },
    ],
  },

  terms: {
    title: 'Terms & Conditions',
    updated: UPDATED,
    intro: `These Terms & Conditions govern your use of wynextechnologies.com (the "website") operated by ${COMPANY}. By using the website you agree to them. If you do not agree, please do not use the website. Services we provide to clients are additionally governed by a separate written agreement, which prevails over these terms if they conflict.`,
    sections: [
      {
        id: 'about',
        heading: 'About us',
        blocks: [
          `${COMPANY} is an MSME-registered software development company based at ${ADDRESS}. You can reach us at ${EMAIL}.`,
        ],
      },
      {
        id: 'use',
        heading: 'Using this website',
        blocks: [
          'You may use the website for lawful purposes only. You agree not to:',
          {
            list: [
              'Send spam, false enquiries or automated submissions through our forms.',
              'Attempt to gain unauthorised access to the website, its server or its code, or interfere with its security or normal operation.',
              'Upload or send malware, or anything unlawful, defamatory or that infringes someone else’s rights.',
              'Copy, scrape or republish the website’s content for commercial use without our written permission.',
            ],
          },
        ],
      },
      {
        id: 'enquiries',
        heading: 'Enquiries, quotes and proposals',
        blocks: [
          'Information on the website — including service descriptions, timelines and example prices — is a general guide, not a binding offer. A project begins only when both parties sign a written proposal or agreement setting out the scope, price, timeline and payment terms. Quotes are valid for the period stated in them.',
        ],
      },
      {
        id: 'client-work',
        heading: 'Client projects',
        blocks: [
          'Unless the written agreement for a project says otherwise:',
          {
            list: [
              'Payments are made in the milestones agreed in the proposal. Work may pause if an invoice remains unpaid past its due date.',
              'Changes to the agreed scope are quoted and approved in writing before work starts.',
              'Ownership of the final source code, designs and deliverables created specifically for you transfers to you once the project has been paid in full.',
              'We may reuse our own pre-existing tools, libraries and know-how, and open-source components remain under their own licences.',
              'Unless you ask us not to, we may mention the project and show non-confidential screenshots in our portfolio.',
              'Each party keeps the other’s confidential information private and uses it only for the project.',
            ],
          },
        ],
      },
      {
        id: 'ip',
        heading: 'Intellectual property',
        blocks: [
          `The website’s design, text, graphics, logo and code are owned by ${COMPANY} or our licensors and are protected by law. Project screenshots shown in our portfolio remain the property of the respective clients. Some photographs are used under their providers’ licences. You may share links to our pages, but may not reproduce our content without written permission.`,
        ],
      },
      {
        id: 'blog',
        heading: 'Blog and informational content',
        blocks: [
          'Articles on our blog are for general information only and are prepared with the help of AI writing tools. They are not professional, legal or financial advice. Technology changes quickly, so check details against official documentation before relying on them. We are not responsible for decisions made solely on the basis of blog content.',
        ],
      },
      {
        id: 'third-party',
        heading: 'Third-party links and services',
        blocks: [
          'The website links to and embeds third-party services — such as Google Maps, WhatsApp and the live websites of projects in our portfolio. We do not control them and are not responsible for their content, availability or privacy practices. Their own terms apply when you use them.',
        ],
      },
      {
        id: 'disclaimer',
        heading: 'Disclaimer',
        blocks: [
          'We work to keep the website accurate and available, but it is provided "as is" and "as available". We do not guarantee that it will always be uninterrupted, error-free or free of harmful components, and we may change or withdraw any part of it without notice.',
        ],
      },
      {
        id: 'liability',
        heading: 'Limitation of liability',
        blocks: [
          `To the fullest extent permitted by law, ${COMPANY} is not liable for any indirect, incidental or consequential loss — including loss of profit, data or business — arising from your use of the website. Nothing in these terms limits liability that cannot be limited under Indian law. Our liability for client services is set out in the relevant written agreement.`,
        ],
      },
      {
        id: 'indemnity',
        heading: 'Indemnity',
        blocks: [
          'You agree to compensate us for any loss or claim arising from your breach of these terms or your misuse of the website.',
        ],
      },
      {
        id: 'privacy',
        heading: 'Privacy',
        blocks: [
          'How we handle personal data is explained in our Privacy Policy at https://wynextechnologies.com/privacy, which forms part of these terms.',
        ],
      },
      {
        id: 'law',
        heading: 'Governing law and disputes',
        blocks: [
          'These terms are governed by the laws of India. We will first try to resolve any dispute in good faith by discussion. If that fails, the courts at Patna, Bihar will have exclusive jurisdiction.',
        ],
      },
      {
        id: 'changes',
        heading: 'Changes to these terms',
        blocks: [
          'We may update these terms from time to time. The "Last updated" date shows the current version. Continuing to use the website after a change means you accept the updated terms.',
        ],
      },
      {
        id: 'contact',
        heading: 'Contact',
        blocks: ['Questions about these terms? Get in touch:', { list: contactList.slice(0, 2).concat(`Address: ${ADDRESS}`) }],
      },
    ],
  },

  cookies: {
    title: 'Cookie Policy',
    updated: UPDATED,
    intro: `This Cookie Policy explains how cookies and similar technologies are used on wynextechnologies.com. In short: our own website does not use advertising or analytics cookies.`,
    sections: [
      {
        id: 'what',
        heading: 'What cookies are',
        blocks: ['Cookies are small text files a website stores in your browser. Similar technologies, such as local storage, keep small pieces of information on your device in the same way.'],
      },
      {
        id: 'ours',
        heading: 'What this website stores',
        blocks: [
          {
            list: [
              'Theme preference (local storage, "wynex-theme") — remembers whether you chose the light or dark theme. It stays on your device and is never sent to us.',
              'No analytics, advertising or tracking cookies are set by our website.',
            ],
          },
        ],
      },
      {
        id: 'third-party',
        heading: 'Third-party cookies',
        blocks: [
          'Some embedded services may set their own cookies when they load:',
          {
            list: [
              'Google Maps (map on the Contact section) — may set Google cookies. See https://policies.google.com/technologies/cookies',
              'WhatsApp — only after you click the WhatsApp button and leave our site.',
            ],
          },
          'These cookies are controlled by the third party, not by us.',
        ],
      },
      {
        id: 'manage',
        heading: 'Managing cookies',
        blocks: ['You can block or delete cookies and local storage at any time in your browser settings. Blocking them will not stop our website from working, although the embedded map may not load.'],
      },
      {
        id: 'more',
        heading: 'More information',
        blocks: [`See our Privacy Policy at https://wynextechnologies.com/privacy, or email ${EMAIL} with any questions.`],
      },
    ],
  },
};
