import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  BsCreditCard,
  BsFileEarmarkMedical,
  BsHeadphones,
  BsPencil,
  BsChevronDown,
  BsQuestionLg,
} from 'react-icons/bs';
import { LiaCertificateSolid } from 'react-icons/lia';

// Componente simples de Acordeão com Tailwind
const TailwindAccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-lg mt-2 shadow-sm">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 transition duration-300 rounded-t-lg"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <BsChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen p-4' : 'max-h-0 p-0'
        }`}
      >
        <div className={isOpen ? 'pt-2' : ''}>{children}</div>
      </div>
    </div>
  );
};

// Mapeamento dos ícones e textos para a seção de FAQ
const faqItems = [
  {
    icon: BsCreditCard,
    title: 'Quais formas de pagamento vocês aceitam?',
    content:
      'Aceitamos diversos métodos de pagamento para a sua assinatura ou curso, como cartões de crédito, boleto bancário, PayPal e PIX. Você pode escolher a forma mais conveniente ao finalizar sua compra.',
  },
  {
    icon: BsFileEarmarkMedical,
    title: 'Quais são as políticas de reembolso e cancelamento?',
    content:
      'Nossa política de reembolso permite que você solicite o cancelamento da assinatura em até 7 dias após a contratação. O acesso será revogado e o valor devolvido. Consulte nossa página de Política de Reembolso para mais detalhes.',
  },
  {
    icon: BsQuestionLg,
    title: 'Como funciona o acesso aos cursos/plataforma?',
    content:
      'O acesso é imediato após a confirmação do pagamento. Você terá acesso ilimitado aos conteúdos da Cursify conforme o plano contratado. Verifique os detalhes do seu plano ou entre em contato com nosso suporte para mais informações.',
  },
  {
    icon: LiaCertificateSolid,
    title: 'Como funciona o processo de entrega de certificado?',
    content:
      'Após a conclusão do curso e a aprovação no teste final, o certificado será disponibilizado em formato digital na sua área de aluno. Não há taxas de frete por ser um produto digital.',
  },
  {
    icon: BsPencil,
    title: 'Como posso alterar ou cancelar meu plano?',
    content:
      'Você pode alterar ou cancelar seu plano a qualquer momento através da sua área de usuário em "Configurações de Assinatura". Se precisar de ajuda, entre em contato com nosso suporte imediatamente.',
  },
  {
    icon: BsHeadphones,
    title: 'Como entrar em contato com o suporte?',
    content:
      'Para entrar em contato conosco, basta acessar a seção *Fale Conosco* em nosso site. Oferecemos suporte via chat, e-mail e telefone para garantir que todas as suas dúvidas sejam resolvidas rapidamente.',
  },
];

const Sac = () => {
  const [openItem, setOpenItem] = useState(null); // Estado para o Acordeão

  const handleToggle = (itemKey) => {
    setOpenItem(openItem === itemKey ? null : itemKey);
  };

  return (
    <>
      <Header />
      {/* Container (equivalente ao Container + mt-5 mb-5) */}
      <div className="px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <section>
            <h3 className="text-center mb-4 pb-2 text-3xl font-bold text-blue-600">
              SAC
            </h3>
            <p className="text-center mb-10 text-gray-600 dark:text-gray-400">
              Encontre abaixo as respostas para as perguntas mais frequentes
            </p>

            {/* Grid de FAQ (equivalente a Row e Col md-6 lg-4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {faqItems.map((item, index) => (
                <div key={index} className="mb-4">
                  <h6 className="mb-3 text-xl font-semibold text-blue-600 flex items-start">
                    {/* Ícone com margem direita (pe-2) e tamanho (size=32) */}
                    <item.icon className="mr-2 flex-shrink-0" size={32} />
                    {item.title}
                  </h6>
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Acordeão (FAQ Expandido) */}
          <p className="text-center mt-12 text-lg text-gray-700 dark:text-gray-300 font-medium">
            Ainda não encontrou o que queria?
          </p>
          <div className="mt-5 max-w-4xl mx-auto">
            <TailwindAccordionItem
              title="Código de Conduta e Ética"
              isOpen={openItem === 'etica'}
              onClick={() => handleToggle('etica')}
            >
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Nosso compromisso é proporcionar uma experiência de aprendizado
                segura, respeitosa e ética para todos os nossos alunos. Seguimos
                os mais altos padrões de conduta, garantindo:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>
                  <strong>Respeito e cordialidade:</strong> Tratamos todos os
                  clientes, colaboradores e parceiros com respeito e cortesia.
                </li>
                <li>
                  <strong>Transparência:</strong> Informações sobre cursos,
                  planos, políticas e ofertas são sempre claras e atualizadas.
                </li>
                <li>
                  <strong>Confiança:</strong> Trabalhamos para proteger a
                  privacidade e segurança de todos os dados dos nossos clientes.
                </li>
                <li>
                  <strong>Responsabilidade social e ambiental:</strong> Estamos
                  comprometidos com práticas que respeitam o meio ambiente e
                  contribuem para a comunidade.
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                Nosso Código de Conduta e Ética reflete os valores fundamentais
                da **Cursify**. Ao utilizar nossa plataforma, você concorda em
                agir de maneira ética, respeitando as regras e normas que
                garantem um ambiente positivo para todos.
              </p>
            </TailwindAccordionItem>

            <TailwindAccordionItem
              title="Politícas de Privacidade"
              isOpen={openItem === 'privacidade'}
              onClick={() => handleToggle('privacidade')}
            >
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Na **Cursify**, a proteção dos seus dados pessoais é uma
                prioridade. Ao se registrar ou interagir com nosso site, você
                nos fornece informações que são tratadas com a máxima segurança
                e confidencialidade. Esta Política de Privacidade descreve como
                coletamos, usamos, armazenamos e protegemos seus dados:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>
                  <strong>Coleta de dados:</strong> Coletamos informações
                  pessoais, como nome, endereço, e-mail e detalhes de pagamento,
                  quando você contrata um plano ou se registra em nossa
                  plataforma.
                </li>
                <li>
                  <strong>Uso de dados:</strong> Usamos suas informações para
                  gerenciar assinaturas, oferecer um atendimento personalizado e
                  melhorar sua experiência de aprendizado.
                </li>
                <li>
                  <strong>Proteção de dados:</strong> Implementamos medidas de
                  segurança para proteger suas informações contra acessos não
                  autorizados, uso indevido ou divulgação.
                </li>
                <li>
                  <strong>Compartilhamento de dados:</strong> Não compartilhamos
                  seus dados com terceiros, exceto quando necessário para
                  processar pagamentos ou fornecer serviços essenciais (como
                  e-mail de notificação).
                </li>
                <li>
                  <strong>Seus direitos:</strong> Você tem o direito de acessar,
                  corrigir ou excluir suas informações pessoais a qualquer
                  momento, de acordo com as leis de proteção de dados
                  aplicáveis.
                </li>
              </ul>
            </TailwindAccordionItem>

            <TailwindAccordionItem
              title="Termos e Condições"
              isOpen={openItem === 'termos'}
              onClick={() => handleToggle('termos')}
            >
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Estes Termos e Condições regem o uso do nosso site e serviços.
                Ao acessar ou contratar planos na **Cursify**, você concorda com
                as seguintes condições:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>
                  <strong>Cursos e Preços:</strong> Todos os cursos estão
                  sujeitos às condições do plano contratado. Os preços dos
                  planos podem ser alterados sem aviso prévio, mas o valor da
                  sua assinatura atual permanecerá válido até a renovação.
                </li>
                <li>
                  <strong>Pagamento:</strong> Aceitamos diversos métodos de
                  pagamento para a sua assinatura. O acesso aos cursos é
                  liberado após a confirmação do pagamento.
                </li>
                <li>
                  <strong>Acesso:</strong> O acesso é fornecido digitalmente e
                  imediatamente após a confirmação do pagamento.
                </li>
                <li>
                  <strong>Política de Reembolso:</strong> Se você não estiver
                  satisfeito com a plataforma, oferecemos um prazo para
                  reembolso ou cancelamento, conforme nossas políticas
                  específicas.
                </li>
                <li>
                  <strong>Responsabilidade do Usuário:</strong> Você concorda em
                  fornecer informações corretas e precisas durante o processo de
                  registro. É responsabilidade do cliente garantir que os dados
                  fornecidos estejam atualizados e completos.
                </li>
                <li>
                  <strong>Propriedade Intelectual:</strong> Todos os direitos de
                  propriedade intelectual relacionados ao site, incluindo
                  marcas, logos e conteúdos de curso, são de nossa propriedade
                  ou licenciados para o uso exclusivo da nossa plataforma.
                </li>
                <li>
                  <strong>Modificações:</strong> Podemos atualizar ou alterar
                  esses Termos e Condições a qualquer momento, com a versão mais
                  recente disponível em nosso site.
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                Esses Termos e Condições são regidos pela legislação brasileira.
                Se você não concordar com qualquer uma das disposições, por
                favor, não utilize nosso site.
              </p>
            </TailwindAccordionItem>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sac;
