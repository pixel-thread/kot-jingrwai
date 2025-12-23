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

const ContactItem = ({
  icon,
  title,
  value,
  description,
  onClick,
  isLast,
}: ContactItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left border-gray-200 dark:border-gray-800 p-4 ${
        !isLast ? "border-b" : ""
      } flex items-center space-x-4 hover:bg-gray-100 dark:hover:bg-gray-900 transition`}
      aria-label={`Kren lyngba ${title}`}
      type="button"
    >
      <div className="text-indigo-600 dark:text-indigo-400 text-2xl flex-shrink-0">
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
        <p className="mt-1 text-blue-600 dark:text-blue-400 break-all">
          {value}
        </p>
      </div>
      <ChevronRight
        className="text-indigo-600 dark:text-indigo-400 flex-shrink-0"
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
      className="flex flex-col items-center space-y-1 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
      aria-label={label}
    >
      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-3xl">
        {icon}
      </div>
      <span className="text-xs select-none">{label}</span>
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
      className="min-h-full bg-indigo-500 text-gray-900 dark:text-gray-100 py-12 px-6 sm:px-12 md:px-24 lg:px-36"
    >
      {/* Contact Information */}
      <section className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-3xl font-extrabold px-6 pt-8 pb-4 border-b border-gray-200 dark:border-gray-700">
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
