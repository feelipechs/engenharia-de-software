import React from 'react';
import CourseCard from '../CourseCard';

const coursesData = [
  {
    id: 1,
    title: 'Desenvolvimento Web Full Stack com React e Node.js',
    description:
      'Aprenda a construir aplicações web completas, do frontend reativo ao backend robusto, utilizando as tecnologias mais demandadas do mercado.',
    price: 'R$ 997,00',
    imageUrl:
      'https://miro.medium.com/v2/resize:fit:1200/1*Z8v53FpG5MiKbLhuX5E4Yw.jpeg', // Imagem de exemplo
    link: '#fullstack-info',
  },
  {
    id: 2,
    title: 'Análise de Dados e Ciência de Dados com Python',
    description:
      'Domine as bibliotecas Pandas e NumPy, crie modelos preditivos e visualize dados complexos para tomar decisões informadas em seu negócio.',
    price: 'R$ 650,00',
    imageUrl:
      'https://blog.dsacademy.com.br/wp-content/uploads/2022/11/Mapa-de-Funcoes.png', // Imagem de exemplo
    link: '#data-science-info',
  },
  {
    id: 3,
    title: 'Design UI/UX Essencial para Desenvolvedores',
    description:
      'Transforme layouts em interfaces bonitas e funcionais. Entenda os princípios de usabilidade e crie experiências de usuário agradáveis.',
    price: 'R$ 399,00',
    imageUrl:
      'https://assets.dio.me/Da7FZBLHAae7_Ar-m6oAYNnNVS6nSP6dCzyes-lMLPM/f:webp/q:80/L2FydGljbGVzL2NvdmVyL2ZmN2MyMDkxLTc3ZmUtNGI4MS1hN2M1LTM5NzNhYTM2MTMxYi5wbmc', // Imagem de exemplo
    link: '#ui-ux-info',
  },
];

const CoursesList = () => {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900 dark:text-white">
        Cursos em Destaque
      </h1>

      {/* Layout de grid para listar os cards */}
      <div className="max-w-7xl mx-auto space-y-6">
        {coursesData.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            price={course.price}
            imageUrl={course.imageUrl}
            link={course.link}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesList;
