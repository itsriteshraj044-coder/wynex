import Seo from '../components/ui/Seo';
import { PAGE_SEO } from '../constants/seo';
import Hero from '../components/sections/Hero';
import StoryScroll from '../components/sections/StoryScroll';
import TrustedBy from '../components/sections/TrustedBy';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Stats from '../components/sections/Stats';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Process from '../components/sections/Process';
import Technologies from '../components/sections/Technologies';
import Work from '../components/sections/Work';
import Awards from '../components/sections/Awards';
import FAQ from '../components/sections/FAQ';
import Blog from '../components/sections/Blog';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Seo {...PAGE_SEO['/']} path="/" />
      <Hero />
      <TrustedBy />
      <StoryScroll />
      <About more={{ to: '/about', label: 'View full story' }} />
      <Services more={{ to: '/services', label: 'Explore all services' }} />
      <Stats />
      <Work more={{ to: '/work', label: 'View all work' }} />
      <WhyChooseUs />
      <Process more={{ to: '/process', label: 'See our full process' }} />
      <Technologies />
      <Awards />
      <FAQ more={{ to: '/contact', label: 'Still have questions? Contact us' }} />
      <Blog />
      <Contact />
    </>
  );
}
