import Seo from '../components/ui/Seo';

interface Section { heading: string; body: string; }

const CONTENT: Record<string, { title: string; updated: string; intro: string; sections: Section[] }> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'July 1, 2026',
    intro: 'Wynex Technologies respects your privacy. This policy explains what information we collect, how we use it, and the choices you have.',
    sections: [
      { heading: 'Information we collect', body: 'We collect information you provide directly — such as your name, email and message when you contact us — along with standard analytics data like pages visited and device type.' },
      { heading: 'How we use your information', body: 'We use your information to respond to enquiries, deliver our services, improve our website, and — where you have opted in — send you occasional updates. We never sell your data.' },
      { heading: 'Cookies', body: 'We use essential cookies to run the site and optional analytics cookies to understand usage. You can control cookies through your browser settings.' },
      { heading: 'Data security', body: 'We apply industry-standard safeguards to protect your data. No method of transmission is 100% secure, but we continually review our practices.' },
      { heading: 'Your rights', body: 'You may request access to, correction of, or deletion of your personal data at any time by emailing hello@wynex.tech.' },
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'July 1, 2026',
    intro: 'These terms govern your use of the Wynex Technologies website and services. By using our site you agree to them.',
    sections: [
      { heading: 'Use of our website', body: 'You may use our website for lawful purposes only. You agree not to misuse the site or interfere with its normal operation.' },
      { heading: 'Intellectual property', body: 'All content, design and code on this site are owned by Wynex Technologies unless otherwise stated, and may not be reproduced without permission.' },
      { heading: 'Services', body: 'Any services we provide are governed by a separate written agreement. Nothing on this website constitutes a binding offer.' },
      { heading: 'Limitation of liability', body: 'The website is provided "as is". To the fullest extent permitted by law, Wynex Technologies is not liable for any indirect or consequential loss arising from its use.' },
      { heading: 'Changes', body: 'We may update these terms from time to time. Continued use of the site constitutes acceptance of the current terms.' },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    updated: 'July 1, 2026',
    intro: 'This policy explains how Wynex Technologies uses cookies and similar technologies on our website.',
    sections: [
      { heading: 'What are cookies', body: 'Cookies are small text files stored on your device that help websites function and understand how they are used.' },
      { heading: 'Types we use', body: 'Essential cookies keep the site working. Analytics cookies help us measure and improve performance. Preference cookies remember settings such as your theme.' },
      { heading: 'Managing cookies', body: 'You can accept or reject non-essential cookies and clear them anytime via your browser. Blocking some cookies may affect functionality.' },
    ],
  },
};

export default function Legal({ type }: { type: 'privacy' | 'terms' | 'cookies' }) {
  const data = CONTENT[type];
  return (
    <>
      <Seo title={`${data.title} — Wynex Technologies`} path={`/${type}`} />
      <div className="pt-36">
        <div className="container-x max-w-3xl pb-24">
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="text-4xl font-bold sm:text-5xl dark:text-white">{data.title}</h1>
          <p className="mt-3 text-sm text-ink-muted dark:text-slate-500">Last updated: {data.updated}</p>
          <p className="mt-8 text-lg leading-relaxed text-ink-muted dark:text-slate-300">{data.intro}</p>

          <div className="mt-10 flex flex-col gap-8">
            {data.sections.map((s, i) => (
              <section key={s.heading}>
                <h2 className="text-xl font-bold text-ink dark:text-white">{i + 1}. {s.heading}</h2>
                <p className="mt-2 leading-relaxed text-ink-muted dark:text-slate-400">{s.body}</p>
              </section>
            ))}
          </div>

          <p className="mt-12 rounded-3xl border border-white/60 bg-white/70 p-6 text-sm text-ink-muted backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400">
            Questions about this policy? Email us at <a href="mailto:hello@wynex.tech" className="font-semibold text-brand-indigo">hello@wynex.tech</a>.
          </p>
        </div>
      </div>
    </>
  );
}
