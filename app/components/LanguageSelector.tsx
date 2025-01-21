import { useContext, useState } from "react";
import { I18nContext } from "../providers/i18nProvider";
import Image from "next/image";

const LanguageSelector = () => {
  const context = useContext(I18nContext);
  const [isOpen, setIsOpen] = useState(false);

  if (context === null) {
    throw new Error(
      "The I18n is not initialized, Make sure you have the provider set up correctly"
    );
  }

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleLanguageChange = (lang: string) => {
    context.changeLanguage(lang);
    setIsOpen(false); // Cerrar el dropdown después de seleccionar
  };

  return (
    <div className="language-switcher">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 p-2  border-2 border-gray-300 rounded-md cursor-pointer"
      >
        {/* Bandera actual */}
        <Image
          src={
            context.language === "en"
              ? "https://flagcdn.com/w20/us.png"
              : "https://flagcdn.com/w20/es.png"
          }
          alt={context.language === "en" ? "English" : "Español"}
          width={20}
          height={20}
          className="w-5 h-5 rounded-full"
        />
        <span>
          {context.language === "en"
            ? context.t.translate("languages.en")
            : context.t.translate("languages.es")}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full  border border-gray-300 rounded-md shadow-md mt-2 z-10">
          <button
            onClick={() => handleLanguageChange("en")}
            className="flex items-center w-full p-2 text-left hover:bg-gray-800"
          >
            <Image
              src="https://flagcdn.com/w20/us.png"
              alt="English"
              width={20}
              height={20}
              className="w-5 h-5 rounded-full mr-2"
            />
            <span>{context.t.translate("languages.en")}</span>
          </button>
          <button
            onClick={() => handleLanguageChange("es")}
            className="flex items-center w-full p-2 text-left hover:bg-gray-200"
          >
            <Image
              src="https://flagcdn.com/w20/es.png"
              alt="Spanish"
              width={20}
              height={20}
              className="w-5 h-5 rounded-full mr-2"
            />
            <span>{context.t.translate("languages.es")}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
