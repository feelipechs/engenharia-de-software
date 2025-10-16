import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const studentsData = [
  {
    name: 'Aluno 01',
    email: 'aluno.01@email.com',
    registrationDate: '15/10/2025',
    courses: [
      { id: 'c1', title: 'Curso 01', description: '...' },
      { id: 'c2', title: 'Curso 02', description: '...' },
    ],
  },
  {
    name: 'Aluno 02',
    email: 'aluno.02@email.com',
    registrationDate: '01/01/2025',
    courses: [{ id: 'c3', title: 'Curso 03', description: '...' }],
  },
];

const StudentRow = ({ student }) => {
  const { name, email, registrationDate, courses } = student;

  return (
    <tr className="*:text-gray-900 *:first:font-medium dark:*:text-white">
      <td className="px-3 py-2 whitespace-nowrap">{name}</td>
      <td className="px-3 py-2 whitespace-nowrap">{email}</td>
      <td className="px-3 py-2 whitespace-nowrap">{registrationDate}</td>

      {/* Tratando a exibição dos Cursos (array de objetos) */}
      <td className="px-3 py-2 whitespace-nowrap">
        {courses.map((course) => course.title).join(', ')}
      </td>

      {/* Renderizando as Ações diretamente na célula (Gerenciar) */}
      <td className="px-3 py-2 whitespace-nowrap flex gap-2">
        <PencilIcon
          className="h-5 w-5 text-blue-500 hover:text-blue-700 cursor-pointer"
          title="Editar"
        />
        <TrashIcon
          className="h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer"
          title="Excluir"
        />
      </td>
    </tr>
  );
};

const StudentsTable = () => {
  return (
    <div className="overflow-x-auto">
      <div className="teste justify-items-end">
        <PlusIcon
          className="text-green-500 size-6 cursor-pointer"
          title="Adicionar"
        />
      </div>
      <table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700">
        <thead className="ltr:text-left rtl:text-right">
          <tr className="*:font-medium *:text-gray-900 dark:*:text-white">
            <th className="px-3 py-2 whitespace-nowrap">Nome</th>
            <th className="px-3 py-2 whitespace-nowrap">E-mail</th>
            <th className="px-3 py-2 whitespace-nowrap">Data de Cadastro</th>
            <th className="px-3 py-2 whitespace-nowrap">Cursos</th>
            <th className="px-3 py-2 whitespace-nowrap">Gerenciar</th>
          </tr>
        </thead>

        {/* === Corpo (<tbody>) - Dinâmico === */}
        <tbody className="divide-y divide-gray-200 *:even:bg-gray-50 dark:divide-gray-700 dark:*:even:bg-gray-800">
          {/* Onde a mágica acontece: Mapeando os dados para renderizar linhas */}
          {studentsData.map((student) => (
            // Para cada 'student', renderizamos um componente 'StudentRow'
            // O 'key' é crucial para a performance do React
            <StudentRow
              key={student.email} // Use algo único como 'key' (ex: email, id)
              student={student}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
