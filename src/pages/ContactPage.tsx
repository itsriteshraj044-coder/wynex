import Seo from '../components/ui/Seo';
import Contact from '../components/sections/Contact';

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact Us — Wynex Technologies"
        description="Get in touch with Wynex Technologies in Patna for websites, mobile apps, custom software, cloud and AI projects. Call, email, WhatsApp or send us your project details."
        path="/contact"
      />
      <div className="pt-12">
        <Contact />
      </div>
    </>
  );
}
