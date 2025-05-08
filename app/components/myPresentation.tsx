"use client";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { I18nContextValue } from "../interfaces/i18nContextValue.interface";

export default function MyPresentation({
  context,
}: {
  context: I18nContextValue;
}) {
  const [copySuccess, setCopySuccess] = useState<string>("");
  const copyToClipboard = (email: string) => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopySuccess("Correo copiado !");
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch((err) => {
        console.error("Error al copiar el correo: ", err);
      });
  };

  return (
    <div className="max-w-screen-lg h-full flex flex-col items-center  md:flex-row md:space-y-0 md:space-x-8 pt-16 mt-5 md:mt-0">
      <div className="text-center md:text-left space-y-4 ">
        <h3 className="text-2xl p-2 md:p-0 md:text-3xl">
          {context.t.translate("hi")}
          <span className="font-semibold"> {context.t.translate("name")}</span>
        </h3>

        <h3 className="font-bold text-4xl md:text-5xl ">
          {context.t.translate("title")}
        </h3>
        <p className="text-base p-2 md:p-0 md:text-lg  ">
          {context.t.translate("description")}
        </p>
        <div className="flex justify-center items-center py-2">
          <a href="https://www.linkedin.com/in/mathias-pereira/">
            <FaLinkedin size={24} className="mr-2" />
          </a>

          <a href="https://github.com/Mathiasfx">
            <FaGithub size={24} className="mr-2" />
          </a>
          <p className="text-center text-sm  items-center flex justify-center">
            <CgMail size={24} className="mr-2" />
            mathiaspereiradev@gmail.com
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <button
            type="button"
            onClick={() => copyToClipboard("mathiaspereiradev@gmail.com")}
            className="flex items-center px-4 py-2 rounded focus:outline-none focus:ring-offset-0 
     border border-green-500 bg-slate-700 text-white hover:bg-gray-800
     dark:bg-transparent dark:border dark:border-green-500 dark:text-white dark:hover:bg-gray-800 focus:transparent"
          >
            <MdOutlineContentCopy size={16} className="mr-1" />
            {copySuccess
              ? context.t.translate("copySuccess")
              : context.t.translate("copyAction")}
          </button>
          <a
            href="https://firebasestorage.googleapis.com/v0/b/finanzasweb-efd1f.firebasestorage.app/o/CV_Mathias_Pereira.pdf?alt=media&token=4c8e8b73-16e8-4596-b6fe-3344940b013d"
            download="CV_Mathias_Pereira.pdf"
          >
            <button
              type="button"
              className="flex items-center px-4 py-2 rounded focus:outline-none focus:ring-offset-0 
       border border-green-500 bg-slate-700 text-white hover:bg-gray-800
       dark:bg-transparent dark:border dark:border-green-500 dark:text-white dark:hover:bg-gray-800 focus:transparent"
            >
              CV
            </button>
          </a>
        </div>
      </div>

      <div className="md:w-1/3 flex justify-center md:justify-end mt-8 md:mt-0">
        <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-teal-500 shadow-lg">
          <Image
            src="/images/perfil.jpg"
            alt="Mathias Alejandro Pereira"
            width={400}
            height={400}
            objectFit="cover"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}
