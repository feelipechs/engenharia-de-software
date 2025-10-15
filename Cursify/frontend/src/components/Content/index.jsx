import { Link } from 'react-router-dom';

const Content = () => {
  return (
    <section className="bg-white lg:grid lg:h-screen lg:place-content-center dark:bg-gray-900">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
        <div className="max-w-prose text-left">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
            Impulsione sua carreira com nossos
            <strong className="text-indigo-600"> cursos </strong>e conquiste
            novos horizontes
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
            Aumente suas habilidades e explore novas oportunidades com cursos em
            diversas áreas. Nossa plataforma oferece conteúdo de alta qualidade,
            flexível e acessível, para você aprender no seu ritmo e avançar na
            sua carreira.
          </p>

          <div className="mt-4 flex gap-4 sm:mt-6">
            <Link
              to="/cursos"
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Comece agora
            </Link>

            <a
              className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
              href="#"
            >
              Ler mais
            </a>
          </div>
        </div>

        <img src="/images/boneco.png" alt="boneco" />
      </div>
    </section>
  );
};

export default Content;
