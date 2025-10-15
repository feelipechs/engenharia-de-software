import { useState } from 'react'; // 👈 Importar useState
import ThemeSwitcher from '../ThemeSwitcher';
import { Link } from 'react-router-dom';
// Importar os ícones do Heroicons
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  // 1. Estado para controlar a visibilidade do menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // Adicionar 'relative' para o posicionamento absoluto do menu dropdown
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 relative">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Container principal com alinhamento vertical */}
        <div className="flex items-center justify-between h-24">
          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link to="/">
              <span className="sr-only">Home</span>
              <img
                src="../images/logo.png"
                alt="logo"
                className="w-24 h-auto" // Simplificando as classes do logo
              />
            </Link>
          </div>

          {/* NAVEGAÇÃO DESKTOP, SWITCHER E AÇÕES */}
          <div className="flex items-center gap-4 md:gap-12">
            {/* NAVEGAÇÃO PRINCIPAL (APENAS DESKTOP) */}
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {/* O ThemeSwitcher foi movido para fora da lista de links no desktop */}
                <li>
                  <Link
                    to="/cursos"
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  >
                    Cursos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/planos"
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  >
                    Planos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sac"
                    className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  >
                    SAC
                  </Link>
                </li>
              </ul>
            </nav>

            {/* BOTÕES DE AÇÃO E THEMESWITCHER */}
            <div className="flex items-center gap-4">
              {/* ThemeSwitcher (Visível em Desktop/Tablet) */}
              <div className="hidden sm:block">
                <ThemeSwitcher />
              </div>

              {/* Botões de Entrar/Cadastrar (Visível em Desktop/Tablet) */}
              <div className="sm:flex sm:gap-4 hidden md:flex">
                <Link
                  to="/login"
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm dark:hover:bg-teal-500"
                >
                  Entrar
                </Link>
                <Link
                  to="/registrar"
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                >
                  Cadastrar
                </Link>
              </div>

              {/* Botão de Menu (Mobile) */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu} // 👈 Conectar a ação aqui
                  className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                  aria-label={isMenuOpen ? 'Fechar Menu' : 'Abrir Menu'}
                >
                  {/* Alternar entre ícone de Hambúrguer e Fechar */}
                  {isMenuOpen ? (
                    <XMarkIcon className="size-5" />
                  ) : (
                    <Bars3Icon className="size-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MENU MOBILE (DROPDOWN) */}
      <div
        className={`md:hidden absolute top-16 w-full bg-white dark:bg-gray-900 shadow-lg z-20 ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <nav aria-label="Mobile Global" className="p-4 space-y-2">
          {/* Links de Navegação */}
          <ul className="flex flex-col space-y-1 border-b pb-4 border-gray-200 dark:border-gray-700">
            <li>
              <Link
                to="/cursos"
                onClick={toggleMenu}
                className="block p-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800 rounded-lg"
              >
                Cursos
              </Link>
            </li>
            <li>
              <Link
                to="/planos"
                onClick={toggleMenu}
                className="block p-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800 rounded-lg"
              >
                Planos
              </Link>
            </li>
            <li>
              <Link
                to="/sac"
                onClick={toggleMenu}
                className="block p-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800 rounded-lg"
              >
                SAC
              </Link>
            </li>
          </ul>

          {/* Ações e ThemeSwitcher (APENAS MOBILE) */}
          <div className="pt-4 space-y-3">
            {/* ThemeSwitcher no Mobile */}
            <div className="flex justify-start items-center p-3">
              <span className="text-sm font-medium text-gray-700 dark:text-white mr-4">
                Tema:
              </span>
              <ThemeSwitcher />
            </div>

            {/* Botões de Ação Mobile */}
            <Link
              to="/login"
              onClick={toggleMenu}
              className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white text-center shadow-sm dark:hover:bg-teal-500"
            >
              Entrar
            </Link>
            <Link
              to="/registrar"
              onClick={toggleMenu}
              className="block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 text-center dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
            >
              Cadastrar
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
