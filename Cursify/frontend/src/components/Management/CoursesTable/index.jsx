import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const coursesData = [
  {
    id: 'c1',
    title: 'Curso 01',
    description: 'Descrição do curso 01',
    creationDate: '15/10/2025',
    students: [
      { id: 'a1', name: 'Aluno 01', email: '...' },
      { id: 'a2', name: 'Aluno 02', email: '...' },
    ],
  },
  {
    id: 'c2',
    title: 'Curso 02',
    description: 'Descrição do curso 02',
    creationDate: '15/10/2025',
    students: [{ id: 'a1', name: 'Aluno 01', email: '...' }],
  },
];

const CourseRow = ({ course }) => {
  const { title, description, creationDate, students } = course;

  return (
    <tr className="*:text-gray-900 *:first:font-medium dark:*:text-white">
      <td className="px-3 py-2 whitespace-nowrap">{title}</td>
      <td className="px-3 py-2 whitespace-nowrap">{description}</td>
      <td className="px-3 py-2 whitespace-nowrap">{creationDate}</td>

      <td className="px-3 py-2 whitespace-nowrap">
        {students.map((student) => student.name).join(', ')}
      </td>

      <td className="px-3 py-2 whitespace-nowrap flex gap-2">
        <PencilIcon className="h-5 w-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
        <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer" />
      </td>
    </tr>
  );
};

const CoursesTable = () => {
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
            <th className="px-3 py-2 whitespace-nowrap">Título</th>
            <th className="px-3 py-2 whitespace-nowrap">Descrição</th>
            <th className="px-3 py-2 whitespace-nowrap">Data de Criação</th>
            <th className="px-3 py-2 whitespace-nowrap">Alunos</th>
            <th className="px-3 py-2 whitespace-nowrap">Gerenciar</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 *:even:bg-gray-50 dark:divide-gray-700 dark:*:even:bg-gray-800">
          {coursesData.map((course) => (
            // Para cada 'student', renderizamos um componente 'StudentRow'
            // O 'key' é crucial para a performance do React
            <CourseRow
              key={course.id} // Use algo único como 'key' (ex: email, id)
              course={course}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesTable;
