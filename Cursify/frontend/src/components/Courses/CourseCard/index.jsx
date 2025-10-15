import React from 'react';

const CourseCard = ({ title, description, price, imageUrl, link }) => {
  return (
    // Container principal: Retangular e com layout flex para a divisão vertical
    <div className="flex bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
      {/* 1. Área da Imagem (Lado Esquerdo) */}
      <div className="w-1/3 flex-shrink-0">
        <img
          className="h-full w-full object-cover"
          src={imageUrl}
          alt={`Capa do curso ${title}`}
        />
      </div>

      {/* 2. Conteúdo do Texto (Lado Direito) */}
      <div className="p-5 flex flex-col justify-between w-2/3">
        <div>
          {/* Nome do Curso */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
            {title}
          </h2>

          {/* Descrição */}
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
            {description}
          </p>
        </div>

        {/* Rodapé: Preço e Botão */}
        <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
          {/* Preço */}
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {price}
          </span>

          {/* Botão de Ação */}
          <a
            href={link}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
          >
            Saber Mais
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
