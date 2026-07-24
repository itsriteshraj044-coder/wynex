import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description?: string;
  path?: string;
}

const BASE = 'https://wynex.tech';

export default function Seo({ title, description, path = '/' }: Props) {
  const desc = description ?? 'Wynex Technologies — premium software development agency for web, mobile, cloud and AI.';
  const url = `${BASE}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}
