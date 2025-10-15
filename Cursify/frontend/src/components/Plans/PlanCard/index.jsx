import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';

const PlanCard = ({
  title,
  description,
  price,
  features,
  buttonText,
  buttonLink,
  isPopular,
}) => {
  // ... (A FeatureItem continua a mesma) ...
  const FeatureItem = ({ text, isIncluded }) => {
    // ... (Lógica do ícone) ...
    const iconColor = isIncluded ? 'text-indigo-700' : 'text-red-700';
    const iconPath = isIncluded
      ? 'M4.5 12.75l6 6 9-13.5'
      : 'M6 18L18 6M6 6l12 12';

    return (
      <li className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`size-5 shadow-sm ${iconColor}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
        </svg>
        <span className="text-gray-700 dark:text-gray-300"> {text} </span>
      </li>
    );
  };

  // 1. Classes BASE para o container
  const baseClasses =
    'divide-y divide-gray-200 rounded-2xl border transition duration-300 ease-in-out cursor-pointer';

  // 2. Classes de DESTAQUE (se for o plano 'popular')
  const popularClasses = isPopular
    ? 'border-indigo-600 shadow-lg'
    : 'border-gray-200 shadow-xs';

  // 3. Classes de HOVER: Fica em destaque ao passar o mouse
  const hoverClasses = 'hover:border-indigo-600 hover:shadow-xl';

  return (
    <div
      // Combina as classes, o hover garante a interação
      className={`${baseClasses} ${popularClasses} ${hoverClasses}`}
      // Opcional: Adicionar um link ao card inteiro (para cobrir a área clicável)
      onClick={() => (window.location.href = buttonLink)}
    >
      <div className="p-6 sm:px-8">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          {title}
          <span className="sr-only">Plano</span>
        </h2>

        {/* ... Restante do conteúdo, incluindo preço e descrição ... */}

        <p className="mt-2 text-gray-700 dark:text-gray-300">{description}</p>

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold sm:text-4xl text-gray-900 dark:text-gray-100">
            {' '}
            {price}{' '}
          </strong>

          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            /mês
          </span>
        </p>

        <a
          className="mt-4 block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden sm:mt-6"
          href={buttonLink}
          // Usamos e.stopPropagation() para garantir que o clique no botão não
          // acione o redirecionamento (se você optou por um link no card inteiro)
          onClick={(e) => e.stopPropagation()}
        >
          {buttonText}
        </a>
      </div>

      {/* ... (Seção de "What's included") ... */}
      <div className="p-6 sm:px-8">
        <p className="text-lg font-medium sm:text-xl text-gray-900 dark:text-gray-100">
          What's included:
        </p>

        <ul className="mt-2 space-y-2 sm:mt-4">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              text={feature.text}
              isIncluded={feature.isIncluded}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlanCard;
