import CoursesList from '../../components/Courses/CoursesList';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SideMenu from '../../components/Courses/SideMenu';

const Courses = () => {
  return (
    // Container principal: min-h-screen para esticar, flex-col para empilhar Header/Main/Footer
    // <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800">
    <div>
      {/* HEADER (Ocupa a largura total da tela) */}
      <Header />

      {/* MAIN: Container de Conteúdo e Sidebar */}
      {/* Retornamos ao mx-auto e max-w-screen-xl para centralizar e limitar o conteúdo. */}
      {/* O flex-1 garante que ele ocupe o espaço verticalmente. */}
      <main className="flex flex-1">
        {/* SIDEBAR - LÓGICA DE RESPONSIVIDADE APLICADA AQUI */}
        <div className="hidden sm:hidden md:block flex-shrink-0">
          {/* O SideMenu precisa estar dentro de um wrapper para controlar a visibilidade sem modificar ele internamente */}
          <SideMenu />
        </div>

        {/* LISTA DE CURSOS (Conteúdo Principal) */}
        {/* Adicionei 'md:px-8' para garantir que haja preenchimento em telas maiores. */}
        <div className="flex-1 overflow-y-auto">
          {/* Removi o <h1> extra, mantendo apenas o CoursesList, como solicitado. */}
          <CoursesList />
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Courses;
