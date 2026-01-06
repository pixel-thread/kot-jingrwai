import React from "react";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";

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
      className={`w-full border-gray-200 p-4 text-left dark:border-gray-800 ${
        !isLast ? "border-b" : ""
      } flex items-center space-x-4 transition hover:bg-gray-100 dark:hover:bg-gray-900`}
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
      className="min-h-full bg-indigo-500 px-6 py-12 text-gray-900 sm:px-12 md:px-24 lg:px-36 dark:text-gray-100">
      {/* Contact Information */}
      <section className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
        <h2 className="border-b border-gray-200 px-6 pb-4 pt-8 text-3xl font-extrabold dark:border-gray-700">
          Kumno ban contact ia ngi
        </h2>
        <div>
          <ContactItem
            icon={<Mail />}
            title="Email"
            value={email}
            description="Kren bad ngi lyngba ka email na ka bynta jingiarap lane jingkylli"
            onClick={openEmail}
          />
          <ContactItem
            icon={<Phone />}
            title="Phone"
            value={phone}
            description="Call ia ngi ha ki por treikam"
            onClick={openPhone}
          />
          <ContactItem
            icon={<MapPin />}
            title="Ka jaka treikam"
            value={address}
            description="Wan jngoh ia ka ophis jong ngi ne wad ha ka map"
            onClick={openMap}
            isLast
          />
        </div>
      </section>
    </section>
  );
};
