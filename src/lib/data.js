// Todos os dados são fictícios (projeto de portfólio).
export const services = [
  { id: 'consulta', nome: 'Consulta clínica', desc: 'Avaliação completa, vacinas e acompanhamento de rotina para cães e gatos.', min: 40, preco: 'R$ 140', icone: 'steto' },
  { id: 'vacina', nome: 'Vacinação', desc: 'Protocolos para filhotes e adultos, com carteirinha digital e lembrete de reforço.', min: 20, preco: 'R$ 95', icone: 'seringa' },
  { id: 'exames', nome: 'Exames e imagem', desc: 'Hemograma, bioquímico, ultrassom e raio-X com laudo no mesmo dia.', min: 45, preco: 'a partir de R$ 120', icone: 'lupa' },
  { id: 'cirurgia', nome: 'Cirurgia e castração', desc: 'Centro cirúrgico com monitoramento anestésico e recuperação acompanhada.', min: 90, preco: 'sob avaliação', icone: 'bisturi' },
  { id: 'dentario', nome: 'Odontologia', desc: 'Limpeza de tártaro, extrações e prevenção de doença periodontal.', min: 60, preco: 'a partir de R$ 380', icone: 'dente' },
  { id: 'banho', nome: 'Banho e tosa terapêutica', desc: 'Para peles sensíveis, com produtos indicados pelo veterinário da casa.', min: 60, preco: 'a partir de R$ 85', icone: 'gota' }
];

export const team = [
  { id: 'helena', nome: 'Dra. Helena Prado', papel: 'Clínica geral e felinos', crmv: 'CRMV-PR 00000 (fictício)', dias: [1, 2, 3, 4, 5], bio: 'Quinze anos de rotina com gatos de apartamento e tutores de primeira viagem.' },
  { id: 'otavio', nome: 'Dr. Otávio Lemos', papel: 'Cirurgia e ortopedia', crmv: 'CRMV-PR 00001 (fictício)', dias: [2, 3, 4, 6], bio: 'Cirurgião com foco em recuperação rápida e dor controlada no pós-operatório.' },
  { id: 'iris', nome: 'Dra. Íris Nogueira', papel: 'Dermatologia e odontologia', crmv: 'CRMV-PR 00002 (fictício)', dias: [1, 3, 5, 6], bio: 'Pele, ouvidos e dentes: os três assuntos que mais tiram o sono dos tutores.' }
];

export const horarios = { abre: 8, fecha: 18, sabadoFecha: 13 };
