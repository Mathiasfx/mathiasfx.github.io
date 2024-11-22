import Image from "next/image";

export default function MyPresentation() {
  return (
    <div className="max-w-screen-lg flex flex-col items-center  md:flex-row md:space-y-0 md:space-x-8 pt-16 mt-5 md:mt-0">
      <div className="text-center md:text-left space-y-4 ">
        <h3 className="text-2xl p-2 md:p-0 md:text-3xl">
          Hola, Soy <span className="font-semibold">Mathias Pereira</span>
        </h3>

        <h3 className="font-bold text-4xl md:text-5xl ">Frontend Developer</h3>
        <p className="text-base p-2 md:p-0 md:text-lg  ">
          Soy desarrollador frontend con experiencia en tecnologías como React,
          React Native, Angular y Node.js. Me motiva enfrentar desafíos que me
          permitan crecer profesionalmente y aprender nuevas formas de resolver
          problemas.
        </p>
      </div>

      <div className="md:w-1/3 flex justify-center md:justify-end mt-8 md:mt-0">
        <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-teal-500 shadow-lg">
          <Image
            src="/images/perfil.jpg"
            alt="Mathias Pereira"
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
