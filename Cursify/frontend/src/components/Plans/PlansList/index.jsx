import PlanCard from '../PlanCard';

const plansData = [
  {
    title: 'Iniciante',
    description:
      'A solução perfeita para começar seu projeto pessoal ou pequena equipe.',
    price: '20$',
    buttonText: 'Inscreva-se já',
    buttonLink: '#iniciante',
    isPopular: false,
    features: [
      { text: '10 usuários', isIncluded: true },
      { text: '2GB de armazenamento', isIncluded: true },
      { text: 'Email de suporte', isIncluded: true },
      { text: 'Acesso à central de ajuda', isIncluded: false },
      { text: 'Suporte por telefone', isIncluded: false },
      { text: 'Acesso à comunidade', isIncluded: false },
    ],
  },
  {
    title: 'Profissional',
    description:
      'Para equipes em crescimento que precisam de mais capacidade e suporte.',
    price: '49$',
    buttonText: 'Atualize agora',
    buttonLink: '#profissional',
    isPopular: false, // Card em destaque!
    features: [
      { text: '50 usuários', isIncluded: true },
      { text: '10GB de armazenamento', isIncluded: true },
      { text: 'Email de suporte', isIncluded: true },
      { text: 'Acesso à central de ajuda', isIncluded: true },
      { text: 'Suporte por telefone', isIncluded: false },
      { text: 'Acesso à comunidade', isIncluded: true },
    ],
  },
  {
    title: 'Empresa',
    description: 'Tudo o que uma grande corporação precisa, com suporte 24/7.',
    price: '99$',
    buttonText: 'Contate nossos especialistas',
    buttonLink: '#empresa',
    isPopular: false,
    features: [
      { text: 'Usuários ilimitados', isIncluded: true },
      { text: 'Armazenamento ilimitado', isIncluded: true },
      { text: 'Email de suporte', isIncluded: true },
      { text: 'Acesso à central de ajuda', isIncluded: true },
      { text: 'Suporte por telefone', isIncluded: true },
      { text: 'Acesso à comunidade', isIncluded: true },
    ],
  },
];

const PlansList = () => {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-200 ">
        Escolha o seu plano ideal
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
        {/* Apenas mapeia e passa as props, sem lógica de estado */}
        {plansData.map((plan) => (
          <PlanCard key={plan.title} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default PlansList;
