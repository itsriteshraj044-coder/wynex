import Seo from '../components/ui/Seo';
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
import Testimonials from '../components/sections/Testimonials';
import Awards from '../components/sections/Awards';
import FAQ from '../components/sections/FAQ';
import Blog from '../components/sections/Blog';
import Newsletter from '../components/sections/Newsletter';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Seo
        title="Wynex Technologies — Award-Winning Web, App & AI Development Agency"
        description="Premium software development agency crafting high-performance websites, web & mobile apps, custom software, cloud and AI solutions for ambitious brands worldwide."
        path="/"
      />
      <Hero />
      <TrustedBy />
      <StoryScroll />
      <About />
      <Services />
      <Stats />
      <Work />
      <WhyChooseUs />
      <Process />
      <Technologies />
      <Testimonials />
      <Awards />
      <FAQ />
      <Blog />
      <Newsletter />
      <Contact />
    </>
  );
}
