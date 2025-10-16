import React, { useState, useRef, useEffect } from 'react';
import CoursesTable from '../../components/Management/CoursesTable';
import StudentsTable from '../../components/Management/StudentsTable';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const TABS = {
  ALUNOS: 'alunos',
  CURSOS: 'cursos',
};

// Componente principal
const Management = () => {
  const [activeTab, setActiveTab] = useState(TABS.ALUNOS);

  // 1. Refs para medir a posição e largura dos botões
  const alunosRef = useRef(null);
  const cursosRef = useRef(null);

  // 2. Estado para controlar a posição e largura do indicador (slider)
  const [indicatorStyle, setIndicatorStyle] = useState({});

  // 3. Efeito que calcula a posição sempre que a aba ativa muda
  useEffect(() => {
    let currentRef;
    if (activeTab === TABS.ALUNOS) {
      currentRef = alunosRef.current;
    } else {
      currentRef = cursosRef.current;
    }

    if (currentRef) {
      setIndicatorStyle({
        width: currentRef.offsetWidth,
        transform: `translateX(${currentRef.offsetLeft}px)`,
      });
    }
  }, [activeTab]); // Recalcula quando activeTab muda

  // 4. Função para aplicar classes de texto (cor)
  const getButtonTextClasses = (tabName) => {
    if (activeTab === tabName) {
      return 'text-white dark:text-gray-900';
    }
    return 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400';
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        <header className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Gerenciamento de Alunos e Cursos
          </h1>
          <ThemeSwitcher />
        </header>
        <Link to="/cursos" className="flex text-dark dark:text-white mt-3">
          <ArrowLeftIcon className="size-6" />
          <p>Voltar</p>
        </Link>
        {/* --- Segmented Control com Indicador Deslizante (Centralizado) --- */}
        <div className="p-6 flex justify-center">
          <div className="relative flex p-1 rounded-full bg-gray-100 dark:bg-gray-800 shadow-inner">
            {/* 5. INDICADOR (O SLIDER) - Posicionado Absolutamente */}
            <div
              className="absolute top-0 left-0 h-full rounded-full bg-indigo-500 transition-transform duration-300 ease-in-out"
              style={indicatorStyle}
            />

            {/* Botão ALUNOS */}
            <button
              ref={alunosRef} // Referência para cálculo de posição
              className={`z-10 py-2 px-6 font-medium transition-colors duration-300 ${getButtonTextClasses(
                TABS.ALUNOS
              )}`}
              onClick={() => setActiveTab(TABS.ALUNOS)}
            >
              Alunos
            </button>

            {/* Botão CURSOS */}
            <button
              ref={cursosRef} // Referência para cálculo de posição
              className={`z-10 py-2 px-6 font-medium transition-colors duration-300 ${getButtonTextClasses(
                TABS.CURSOS
              )}`}
              onClick={() => setActiveTab(TABS.CURSOS)}
            >
              Cursos
            </button>
          </div>
        </div>

        {/* --- Conteúdo Renderizado Condicionalmente --- */}
        <div className="px-6 pb-6">
          {activeTab === TABS.ALUNOS && <StudentsTable />}
          {activeTab === TABS.CURSOS && <CoursesTable />}
        </div>
      </div>
    </div>
  );
};

export default Management;
