import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type ContactItemProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  description?: string;
  onClick?: () => void;
  isLast?: boolean;
};

const ContactItem = ({ icon, title, value, description, onClick, isLast }: ContactItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`liquid-interact liquid-ripple w-full border-gray-200/40 p-4 text-left dark:border-white/5 ${!isLast ? "border-b" : ""
        } flex items-center space-x-4`}
      aria-label={`Kren lyngba ${title}`}
      type="button">
      <div className="flex-shrink-0 text-2xl text-indigo-600 dark:text-indigo-400">{icon}</div>
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
        )}
        <p className="mt-1 break-all text-blue-600 dark:text-blue-400">{value}</p>
      </div>
      <ChevronRight
        className="flex-shrink-0 text-indigo-600 dark:text-indigo-400"
        size={24}
        aria-hidden="true"
      />
    </button>
  );
};

type SocialButtonProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

export const SocialButton = ({ icon, label, href }: SocialButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center space-y-1 text-gray-600 transition hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
      aria-label={label}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-3xl text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400">
        {icon}
      </div>
      <span className="select-none text-xs">{label}</span>
    </a>
  );
};

export const Contact = () => {
  // Contact data
  const email = "bimonlangb@gmail.com";
  const phone = "+91 883 701 1018";
  const address = "Mairang Kynshi 793120";
  const mapUrl = "https://www.google.com/maps?q=Mairang+Kynshi+793120";

  // Handlers
  const openEmail = () => {
    window.location.href = `mailto:${email}`;
  };

  const openPhone = () => {
    window.location.href = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  };

  const openMap = () => {
    window.open(mapUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id={"contact"}
      className="relative flex min-h-[80vh] items-center overflow-hidden bg-background px-6 py-16 text-gray-900 sm:px-12 md:px-24 lg:px-36 dark:bg-[#0a0a0a] dark:text-gray-100">

      {/* Background Orbs */}
      <div className="absolute left-[10%] top-[20%] -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="absolute bottom-[20%] right-[10%] -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]" />

      {/* Contact Information */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
          },
        }}
        className="liquid-glass mx-auto w-full max-w-4xl overflow-hidden rounded-3xl">
        <motion.h2 variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className="border-b border-gray-100 px-8 pb-6 pt-10 text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-left sm:text-4xl dark:border-gray-800 dark:text-white">
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">Get in Touch</span> with us
        </motion.h2>
        <div className="p-2 sm:p-4">
          <ContactItem
            icon={<Mail />}
            title="Email Address"
            value={email}
            description="Reach out to us via email for any inquiries or support."
            onClick={openEmail}
          />
          <ContactItem
            icon={<Phone />}
            title="Phone Support"
            value={phone}
            description="Give us a call. We're available during working hours."
            onClick={openPhone}
          />
          <ContactItem
            icon={<MapPin />}
            title="Headquarters"
            value={address}
            description="Visit us at our main office branch."
            onClick={openMap}
            isLast
          />
        </div>
      </motion.div>
    </section>
  );
};
