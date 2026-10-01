import { FaWhatsapp } from 'react-icons/fa';
import { SITE } from '../../constants/site';
import { track } from '../../utils/analytics';

const number = SITE.phone.replace(/\D/g, '');
const greeting = encodeURIComponent("Hi Wynex Technologies, I'd like to discuss a project.");

/** Floating WhatsApp button that opens a chat with the team. */
export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${number}?text=${greeting}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('whatsapp_click')}
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed bottom-24 right-6 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping" />
      <FaWhatsapp className="relative h-7 w-7" />
    </a>
  );
}
