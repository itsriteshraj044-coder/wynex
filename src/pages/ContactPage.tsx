import Seo from '../components/ui/Seo';
import { PAGE_SEO } from '../constants/seo';
import Contact from '../components/sections/Contact';

export default function ContactPage() {
  return (
    <>
      <Seo {...PAGE_SEO['/contact']} path="/contact" />
      <div className="pt-12">
        <Contact />
      </div>
    </>
  );
}
