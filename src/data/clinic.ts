/**
 * Fonte única de verdade do conteúdo da Climeq.
 *
 * Toda informação aqui foi verificada em fonte pública e está anotada com sua
 * origem. Nada deve ser adicionado a este arquivo sem uma fonte verificável:
 * os componentes apenas apresentam o que está declarado aqui.
 *
 * Última verificação: 13/10/2026
 */

export const clinica = {
  nome: "Climeq",
  nomeCompleto: "Clínica Médica Equipe Multidisciplinar",
  descritor: "Centro Médico Multidisciplinar",
  /** Fonte: descrição oficial do perfil da Climeq no Google ("Com 27 anos de historia..."). */
  anos: 27,
  /** Fonte: site institucional vigente da Climeq. */
  direcao: "Dra. Claudia Lauand",
  cidade: "Teresópolis",
  estado: "RJ",
} as const;

export const contato = {
  /** Fonte: site institucional e perfil do Google. */
  endereco: {
    logradouro: "Av. Delfim Moreira, 598",
    complemento: "1º andar",
    bairro: "Várzea",
    cidade: "Teresópolis",
    estado: "RJ",
    cep: "25953-235",
    referencia: "Em frente ao Shopping Teresópolis",
    linhaUnica:
      "Av. Delfim Moreira, 598, 1º andar — Várzea, Teresópolis — RJ, 25953-235",
  },
  telefone: { exibicao: "(21) 2742-1431", link: "tel:+552127421431" },
  whatsapp: {
    exibicao: "(21) 98986-4137",
    numeroInternacional: "5521989864137",
  },
  instagram: "https://www.instagram.com/clinicaclimeq/",
  /** CID do estabelecimento no Google, obtido do painel de conhecimento. */
  googleMaps: "https://www.google.com/maps?cid=7264906885671596159",
  googleBusca: "https://www.google.com/search?q=Climeq+Teres%C3%B3polis",
  /** Mapa estático/embed por carregamento sob demanda — ver componente Localizacao. */
  mapaEmbed:
    "https://www.google.com/maps?q=Av.+Delfim+Moreira,+598,+V%C3%A1rzea,+Teres%C3%B3polis+-+RJ,+25953-235&output=embed",
} as const;

/**
 * Horário da RECEPÇÃO da clínica — não corresponde à agenda individual de cada
 * profissional. Fonte: site institucional, confirmado pela clínica em 13/10/2026.
 */
export const horario = {
  resumo: "Segunda a sexta, das 8h às 21h",
  detalhe: [
    { dias: "Segunda a sexta", horas: "8h às 21h" },
    { dias: "Sábado e domingo", horas: "Fechado" },
  ],
  observacao:
    "Horário de funcionamento da recepção. A agenda de cada especialidade varia — consulte a disponibilidade pelo WhatsApp.",
} as const;

/**
 * Avaliações públicas do Google, conferidas no painel de conhecimento em
 * 13/10/2026. O número é dinâmico: reconfirme antes de republicar o site.
 */
export const avaliacoesGoogle = {
  nota: 4.9,
  total: 338,
  verificadoEm: "13 de outubro de 2026",
} as const;

/**
 * Reconhecimentos. Fonte: Instagram oficial da Climeq (@clinicaclimeq),
 * confirmado pela clínica em 13/10/2026.
 */
export const premio = {
  nome: "Prêmio IPP",
  categoria: "Pesquisa Cliente Satisfeito",
  ano: 2026,
} as const;

export type Especialidade = {
  nome: string;
  descricao: string;
  icone: string;
  grupo: GrupoId;
};

export type GrupoId = "medicas" | "multidisciplinar" | "programas";

export const grupos: { id: GrupoId; rotulo: string; resumo: string }[] = [
  {
    id: "medicas",
    rotulo: "Especialidades médicas",
    resumo: "Consultas com médicos nas principais áreas de acompanhamento.",
  },
  {
    id: "multidisciplinar",
    rotulo: "Equipe multidisciplinar",
    resumo: "Profissionais que acompanham o paciente além da consulta médica.",
  },
  {
    id: "programas",
    rotulo: "Programas e terapias",
    resumo: "Linhas de cuidado específicas oferecidas pela clínica.",
  },
];

/** Fonte: site institucional vigente da Climeq (corroborado pelo perfil Doctoralia). */
export const especialidades: Especialidade[] = [
  { nome: "Clínica Médica", descricao: "Consultas gerais e acompanhamento.", icone: "Stethoscope", grupo: "medicas" },
  { nome: "Cardiologia", descricao: "Cuidados com o coração.", icone: "HeartPulse", grupo: "medicas" },
  { nome: "Ginecologia e Obstetrícia", descricao: "Saúde da mulher.", icone: "Flower2", grupo: "medicas" },
  { nome: "Psiquiatria", descricao: "Saúde mental e bem-estar.", icone: "Brain", grupo: "medicas" },
  { nome: "Otorrinolaringologia", descricao: "Ouvido, nariz e garganta.", icone: "Ear", grupo: "medicas" },
  { nome: "Medicina de Família", descricao: "Atendimento integral à família.", icone: "Users", grupo: "medicas" },
  { nome: "Fonoaudiologia", descricao: "Comunicação e linguagem.", icone: "Speech", grupo: "multidisciplinar" },
  { nome: "Psicologia", descricao: "Acompanhamento psicológico.", icone: "HeartHandshake", grupo: "multidisciplinar" },
  { nome: "Nutrição", descricao: "Alimentação e qualidade de vida.", icone: "Apple", grupo: "multidisciplinar" },
  { nome: "Clínica de Dor", descricao: "Tratamento e alívio da dor.", icone: "Activity", grupo: "programas" },
  { nome: "Terapias Complementares", descricao: "Reiki, Terapia Floral e outras abordagens.", icone: "Leaf", grupo: "programas" },
  { nome: "Dificuldades de Aprendizado", descricao: "Acompanhamento de foco e aprendizado.", icone: "BookOpenCheck", grupo: "programas" },
];

/** Monta o link do WhatsApp sem solicitar qualquer dado sensível de saúde. */
export function linkWhatsApp(mensagem?: string): string {
  const base = `https://wa.me/${contato.whatsapp.numeroInternacional}`;
  if (!mensagem) return base;
  return `${base}?text=${encodeURIComponent(mensagem)}`;
}

export const mensagens = {
  geral: "Olá! Gostaria de informações sobre atendimento na Climeq.",
  especialidades:
    "Olá! Gostaria de saber quais especialidades estão disponíveis na Climeq.",
  especialidade: (nome: string) =>
    `Olá! Gostaria de informações sobre atendimento em ${nome} na Climeq.`,
} as const;

export const navegacao = [
  { rotulo: "A Climeq", href: "#a-climeq" },
  { rotulo: "Especialidades", href: "#especialidades" },
  { rotulo: "Avaliações", href: "#avaliacoes" },
  { rotulo: "Localização", href: "#localizacao" },
  { rotulo: "Dúvidas", href: "#duvidas" },
] as const;

/** Perguntas cujas respostas são verificáveis nas fontes acima. */
export const perguntasFrequentes = [
  {
    pergunta: "Onde fica a Climeq?",
    resposta:
      "A Climeq fica na Av. Delfim Moreira, 598, 1º andar, no bairro Várzea, em Teresópolis — RJ (CEP 25953-235), em frente ao Shopping Teresópolis.",
  },
  {
    pergunta: "Como entro em contato com a clínica?",
    resposta:
      "Pelo telefone (21) 2742-1431 ou pelo WhatsApp (21) 98986-4137. A recepção funciona de segunda a sexta, das 8h às 21h.",
  },
  {
    pergunta: "Quais especialidades a Climeq oferece?",
    resposta:
      "A clínica reúne Clínica Médica, Cardiologia, Ginecologia e Obstetrícia, Psiquiatria, Otorrinolaringologia e Medicina de Família, além de equipe multidisciplinar em Fonoaudiologia, Psicologia e Nutrição. Também oferece Clínica de Dor, Terapias Complementares e acompanhamento para dificuldades de aprendizado e foco.",
  },
  {
    pergunta: "Como verifico a disponibilidade de atendimento?",
    resposta:
      "A agenda varia conforme a especialidade e o profissional. Fale com a recepção pelo WhatsApp ou pelo telefone para consultar os horários disponíveis.",
  },
  {
    pergunta: "O contato pelo WhatsApp já confirma uma consulta?",
    resposta:
      "Não. O botão de WhatsApp abre uma conversa direta com a equipe da recepção da Climeq, que orienta sobre especialidades, atendimentos e disponibilidade. A confirmação é feita pela própria equipe.",
  },
] as const;
