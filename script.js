const CONFIG = {
  googleMeetLink: "",
  cpaFormsLink: "",
  rematriculaLink: "",
  contatoLink: "",
  declaracaoLink: "",
};

// Função auxiliar para escapar HTML e prevenir XSS
function escapeHtml(text) {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = String(text);
  return div.innerHTML;
}

// Validar URLs do CONFIG
function validateConfigLink(url, fallbackText = "") {
  if (!url) return fallbackText;
  try {
    new URL(url);
    return url;
  } catch (e) {
    console.warn("URL inválida em CONFIG:", url);
    return fallbackText;
  }
}

const DATA_INICIO = "2026-10-20";

const CRONOGRAMA = [
  {
    semana: 1,
    modulo: "Módulo 1",
    aulas: [
      { numero: 1, data: "2026-10-20", tema: "Apresentação do curso e introdução básica à Física da Radiação", tipo: "Teórica", status: "Disponível" },
      { numero: 2, data: "2026-10-22", tema: "Natureza da radiação e espectro eletromagnético", tipo: "Teórica", status: "Próxima aula" },
    ],
  },
  {
    semana: 2,
    modulo: "Módulo 2",
    aulas: [
      { numero: 3, data: "2026-10-27", tema: "Diagnóstico por imagem e formação da imagem", tipo: "Teórica", status: "Não Disponível" },
      { numero: 4, data: "2026-10-29", tema: "Radioterapia e medicina nuclear", tipo: "Prática", status: "Não Disponível" },
    ],
  },
  {
    semana: 3,
    modulo: "Módulo 3",
    aulas: [
      { numero: 5, data: "2026-11-03", tema: "Radiografia industrial e inspeção de materiais", tipo: "Teórica", status: "Não Disponível" },
      { numero: 6, data: "2026-11-05", tema: "Detectores e instrumentação nuclear", tipo: "Prática", status: "Não Disponível" },
    ],
  },
  {
    semana: 4,
    modulo: "Módulo 4",
    aulas: [
      { numero: 7, data: "2026-11-10", tema: "Efeitos biológicos da radiação", tipo: "Teórica", status: "Não Disponível" },
      { numero: 8, data: "2026-11-12", tema: "Acidentes radiológicos e ética", tipo: "Seminário", status: "Não Disponível" },
    ],
  },
  {
    semana: 5,
    modulo: "Revisão + Avaliação Final",
    aulas: [
      { numero: 9, data: "2026-11-17", tema: "Revisão geral do curso", tipo: "Revisão", status: "Não Disponível" },
      { numero: 10, data: "2026-11-19", tema: "Avaliação final e encerramento", tipo: "Avaliação", status: "Não Disponível" },
    ],
  },
];

const AVISOS = [
  { categoria: "Aula", titulo: "Próxima aula disponível em 20/10/2026.", data: "18/10/2026" },
  { categoria: "Avaliação", titulo: "Atividade de módulo em breve.", data: "15/10/2026" },
  { categoria: "Financeiro", titulo: "Atenção à sua situação financeira no portal.", data: "12/10/2026" },
  { categoria: "Documentos", titulo: "Declarações acadêmicas podem ser solicitadas a partir desta semana.", data: "09/10/2026" },
  { categoria: "Geral", titulo: "A plataforma permanece em modo demonstração." , data: "05/10/2026" },
];

const AULAS_GRAVADAS = [
  {
    numero: "Aula Teste",
    data: "14/10/2026",
    tema: "Aula inaugural / Aula teste",
    professor: "Professor demonstrativo",
    duracao: "45 min",
    status: "Aula gravada disponível",
    videoUrl: "videos/aula-exemplo.mp4",
  },
];

const AVALIACOES = [
  { nome: "Avaliação do Módulo 1", valor: "1,0 ponto", status: "Disponível" },
  { nome: "Avaliação do Módulo 2", valor: "1,0 ponto", status: "Em andamento" },
  { nome: "Avaliação do Módulo 3", valor: "1,0 ponto", status: "Encerrada" },
  { nome: "Avaliação do Módulo 4", valor: "1,0 ponto", status: "Corrigida" },
  { nome: "Avaliação Final", valor: "6,0 pontos", status: "Disponível" },
];

const NOTAS = [
  { avaliacao: "Módulo 1", valor: 1.0, nota: "[Preencher]" },
  { avaliacao: "Módulo 2", valor: 1.0, nota: "[Preencher]" },
  { avaliacao: "Módulo 3", valor: 1.0, nota: "[Preencher]" },
  { avaliacao: "Módulo 4", valor: 1.0, nota: "[Preencher]" },
  { avaliacao: "Avaliação Final", valor: 6.0, nota: "[Preencher]" },
];

const FREQUENCIA = {
  aulasRealizadas: "[Preencher]",
  presencas: "[Preencher]",
  faltas: "[Preencher]",
  percentual: "[Preencher]",
};

const DOCUMENTOS = [
  {
    titulo: "Declaração de inscrição",
    descricao: "Documento que comprova a inscrição do aluno no curso.",
    tipo: "inscricao",
  },
  {
    titulo: "Declaração de participação",
    descricao: "Documento destinado a comprovar a participação do aluno no curso.",
    tipo: "participacao",
  },
  {
    titulo: "Relatório acadêmico",
    descricao: "Resumo de desempenho, frequência e atividades.",
    tipo: "relatorio",
  },
];

const FINANCEIRO = [
  { parcela: "Parcela 1", vencimento: "[Preencher]", valor: "[Preencher]", situacao: "Pago", statusClass: "status-pago" },
  { parcela: "Parcela 2", vencimento: "[Preencher]", valor: "[Preencher]", situacao: "Em aberto", statusClass: "status-aberto" },
  { parcela: "Parcela 3", vencimento: "[Preencher]", valor: "[Preencher]", situacao: "Atrasado", statusClass: "status-atrasado" },
];

const MODULOS = [
  {
    title: "Módulo 1 — Fundamentos da Radiação",
    items: [
      "Radiação eletromagnética",
      "Radiação corpuscular",
      "Espectro eletromagnético",
      "Radiação ionizante e não ionizante",
      "Efeito fotoelétrico",
      "Efeito Compton",
      "Produção de pares",
      "Atenuação e absorção",
      "Gray, Sievert, Becquerel",
    ],
  },
  {
    title: "Módulo 2 — Radiação na Área da Saúde",
    items: [
      "Radiografia convencional",
      "Tomografia computadorizada",
      "Mamografia",
      "Radioterapia externa",
      "Braquiterapia",
      "Radiofármacos",
      "Cintilografia",
      "PET",
      "Proteção radiológica",
    ],
  },
  {
    title: "Módulo 3 — Radiação na Tecnologia e Engenharia",
    items: [
      "Radiografia industrial",
      "Inspeção de materiais",
      "Controle de qualidade",
      "Esterilização",
      "Geiger-Müller",
      "Câmaras de ionização",
      "Detectores semicondutores",
      "Reatores",
      "Energia nuclear",
    ],
  },
  {
    title: "Módulo 4 — Efeitos Biológicos e Segurança",
    items: [
      "Danos ao DNA",
      "Efeitos determinísticos e estocásticos",
      "Radiossensibilidade",
      "Chernobyl",
      "Fukushima",
      "Goiânia",
      "Ética e uso responsável",
      "Inteligência artificial em radiologia",
    ],
  },
];

const OBJETIVOS = [
  "Compreender os princípios físicos das radiações ionizantes e não ionizantes",
  "Compreender a interação da radiação com a matéria",
  "Relacionar os fenômenos físicos às aplicações médicas",
  "Conhecer os princípios de formação das imagens médicas",
  "Compreender conceitos de dosimetria e proteção radiológica",
  "Conhecer os efeitos biológicos da radiação",
  "Desenvolver visão crítica sobre segurança e utilização da radiação",
  "Relacionar Física, tecnologia e saúde",
];

const MIDIAS_DIGITAIS = [
  {
    nome: "Aula 1 - Introdução à Física da Radiação",
    data: "20/10/2026",
    tipo: "PDF",
    preview: "Aula 1",
  },
];

const METODOLOGIA = [
  { titulo: "Aulas teóricas", texto: "Fundamentação dos principais conceitos físicos." },
  { titulo: "Aplicações práticas", texto: "Relação entre os conceitos físicos e os procedimentos utilizados na área da saúde." },
  { titulo: "Estudos de caso", texto: "Análise de situações e aplicações reais." },
  { titulo: "Recursos digitais", texto: "Uso de simulações, imagens, animações e materiais complementares." },
];

const DIFERENCIAIS = [
  "Pensamento científico",
  "Compreensão dos fenômenos físicos",
  "Visão interdisciplinar",
  "Conhecimento em proteção radiológica",
  "Compreensão das tecnologias médicas",
  "Capacidade de relacionar teoria e prática",
];

const INFO_CURSO = [
  { titulo: "Modalidade", valor: "EAD síncrono" },
  { titulo: "Carga horária", valor: "40 horas" },
  { titulo: "Duração", valor: "5 semanas" },
  { titulo: "Início", valor: "20 de outubro de 2026" },
  { titulo: "Término", valor: "[Preencher]" },
  { titulo: "Certificação", valor: "[Preencher]" },
  { titulo: "Público-alvo", valor: "Estudantes e profissionais das áreas da saúde, tecnologia e engenharia" },
  { titulo: "Pré-requisitos", valor: "[Preencher]" },
];

function formatCurrency(value) {
  if (value === "[Preencher]") return "[Preencher]";
  return `R$ ${value}`;
}

function formatDate(dateString) {
  if (!dateString) return "[Preencher]";
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function formatLongDate(dateString) {
  if (!dateString) return "[Preencher]";
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(date);
}

function buildCronogramaRows() {
  const tbody = document.querySelector("#cronogramaTable tbody");
  if (!tbody) return;

  let rows = [];
  const allAulas = CRONOGRAMA.flatMap((entry) =>
    entry.aulas.map((aula) => ({
      ...aula,
      semana: entry.semana,
      modulo: entry.modulo,
    }))
  );

  allAulas.forEach((aula) => {
    const dataDisplay = formatDate(aula.data);
    const status = aula.status || "Disponível";
    const statusClass = status === "Próxima aula"
      ? "status-proxima"
      : status === "Disponível"
        ? "status-disponivel"
        : status === "Concluída"
          ? "status-concluida"
          : status === "Aula gravada disponível"
            ? "status-gravada"
            : status === "Não Disponível"
              ? "status-nao-disponivel"
              : "status-disponivel";

    rows.push(`
      <tr>
        <td>Aula ${aula.numero}</td>
        <td>${dataDisplay}</td>
        <td>Semana ${aula.semana}</td>
        <td>${aula.modulo}: ${aula.tema}</td>
        <td>${aula.tipo || "Teórica"}</td>
        <td><span class="status-pill ${statusClass}">${status}</span></td>
      </tr>
    `);
  });

  tbody.innerHTML = rows.join("");
}

function updateProximaAula() {
  const allAulas = CRONOGRAMA.flatMap((entry) =>
    entry.aulas.map((aula) => ({ ...aula, semana: entry.semana, modulo: entry.modulo }))
  );
  
  const next = allAulas.find((aula) => aula.status === "Próxima aula") || allAulas[0];
  
  if (!next) {
    console.warn("Nenhuma aula encontrada no cronograma");
    return;
  }

  const dateEl = document.getElementById("proximaAulaData");
  const horarioEl = document.getElementById("proximaAulaHorario");
  const temaEl = document.getElementById("proximaAulaTema");
  const liveDate = document.getElementById("liveDate");
  const liveTema = document.getElementById("liveTema");

  if (dateEl) dateEl.textContent = formatLongDate(next.data);
  if (horarioEl) horarioEl.textContent = "[Preencher]";
  if (temaEl) temaEl.textContent = next.tema;
  if (liveDate) liveDate.textContent = formatDate(next.data);
  if (liveTema) liveTema.textContent = next.tema;
}

function updateProgress() {
  const progressText = document.getElementById("progressoTexto");
  const progressBar = document.getElementById("progressoBarra");

  if (progressText) progressText.textContent = "Semana 1 de 5";
  if (progressBar) progressBar.style.width = "20%";
}

function renderAvisosRecentes() {
  const list = document.getElementById("avisosRecentes");
  if (!list) return;

  const recent = AVISOS.slice(0, 4).map((aviso) => `
    <li>
      <strong>${aviso.titulo}</strong>
      <span>${aviso.data}</span>
    </li>
  `).join("");

  list.innerHTML = recent;
}

function renderObjectives() {
  const container = document.getElementById("objetivosEspecificos");
  if (!container) return;

  container.innerHTML = OBJETIVOS.map((item, index) => `
    <article class="objective-card info-card">
      <h3>Objetivo ${index + 1}</h3>
      <p>${item}</p>
    </article>
  `).join("");
}

function renderEmenta() {
  const container = document.getElementById("ementaContainer");
  if (!container) return;

  container.innerHTML = MODULOS.map((modulo) => `
    <article class="module-card">
      <h3>${modulo.title}</h3>
      <ul>
        ${modulo.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

function renderAulasGravadas() {
  const container = document.getElementById("aulasGravadas");
  if (!container) return;

  container.innerHTML = AULAS_GRAVADAS.map((aula) => `
    <article class="video-card">
      <h3>${aula.numero}</h3>
      <p><strong>Data:</strong> ${aula.data}</p>
      <p><strong>Tema:</strong> ${aula.tema}</p>
      <p><strong>Professor:</strong> ${aula.professor}</p>
      <p><strong>Duração:</strong> ${aula.duracao}</p>
      <p><strong>Status:</strong> ${aula.status}</p>
      <div class="video-frame">
        ${aula.videoUrl ? `<video controls preload="metadata" aria-label="Vídeo da aula">
          <source src="${aula.videoUrl}" type="video/mp4" />
          Seu navegador não suporta vídeo HTML5.
        </video>` : `<div class="placeholder-video">Vídeo demonstrativo. Substitua o arquivo em /videos/aula-exemplo.mp4.</div>`}
      </div>
      <button type="button" class="secondary-btn" data-video="${aula.videoUrl || ""}">Assistir aula</button>
    </article>
  `).join("");
}

function renderAvaliacoes() {
  const container = document.getElementById("avaliacoesContainer");
  if (!container) return;

  container.innerHTML = AVALIACOES.map((item) => `
    <article class="assessment-card">
      <h3>${item.nome}</h3>
      <p><strong>Valor:</strong> ${item.valor}</p>
      <p><strong>Status:</strong> ${item.status}</p>
      <button type="button" class="action-btn">Detalhes</button>
    </article>
  `).join("");
}

function renderNotas() {
  const notasTable = document.getElementById("notasTable");
  const notaTotalTexto = document.getElementById("notaTotalTexto");
  const notaProgressBar = document.getElementById("notaProgressBar");

  if (notasTable) {
    notasTable.innerHTML = NOTAS.map((item) => `
      <tr>
        <td>${item.avaliacao}</td>
        <td>${item.valor}</td>
        <td>${item.nota}</td>
      </tr>
    `).join("");
  }

  if (notaTotalTexto) notaTotalTexto.textContent = "10,0 / [Preencher]";
  if (notaProgressBar) notaProgressBar.style.width = "72%";
}

function renderFrequencia() {
  const list = document.getElementById("frequenciaList");
  if (!list) return;

  list.innerHTML = `
    <li><span>Aulas realizadas</span><strong>${FREQUENCIA.aulasRealizadas}</strong></li>
    <li><span>Presenças</span><strong>${FREQUENCIA.presencas}</strong></li>
    <li><span>Faltas</span><strong>${FREQUENCIA.faltas}</strong></li>
    <li><span>Percentual</span><strong>${FREQUENCIA.percentual}</strong></li>
  `;
}

function renderDocumentos() {
  const container = document.getElementById("documentosContainer");
  if (!container) return;

  container.innerHTML = DOCUMENTOS.map((doc) => `
    <article class="document-card">
      <h3>${doc.titulo}</h3>
      <p>${doc.descricao}</p>
      <button type="button" class="action-btn" data-document="${doc.tipo}">${doc.titulo.includes("Relatório") ? "Gerar relatório" : doc.titulo.includes("Participação") ? "Solicitar documento" : "Solicitar declaração"}</button>
    </article>
  `).join("");
}

function renderFinanceiro() {
  const cards = document.getElementById("situacaoFinanceira");
  if (cards) {
    cards.innerHTML = [
      { label: "Total de parcelas", value: "[Preencher]" },
      { label: "Parcelas pagas", value: "[Preencher]" },
      { label: "Parcelas em aberto", value: "[Preencher]" },
      { label: "Parcelas atrasadas", value: "[Preencher]" },
    ].map((item) => `
      <article class="metric-card">
        <h3>${item.label}</h3>
        <p class="big-text">${item.value}</p>
      </article>
    `).join("");
  }

  const table = document.querySelector("#financeiroTable tbody");
  if (table) {
    table.innerHTML = FINANCEIRO.map((parcela) => `
      <tr>
        <td>${parcela.parcela}</td>
        <td>${parcela.vencimento}</td>
        <td>${formatCurrency(parcela.valor)}</td>
        <td><span class="status-pill ${parcela.statusClass}">${parcela.situacao}</span></td>
        <td><button type="button" class="link-btn" data-boleto="true">Ver boleto</button></td>
      </tr>
    `).join("");
  }
}

function renderAvisos() {
  const container = document.getElementById("avisosContainer");
  if (!container) return;

  container.innerHTML = AVISOS.map((aviso) => `
    <article class="notice-card">
      <h3>${aviso.categoria}</h3>
      <p><strong>${aviso.titulo}</strong></p>
      <span class="muted">${aviso.data}</span>
    </article>
  `).join("");
}

function renderMidiasDigitais() {
  const container = document.getElementById("midiasDigitais");
  if (!container) return;

  container.innerHTML = MIDIAS_DIGITAIS.map((midia) => `
    <article class="pdf-card">
      <div class="pdf-thumb" aria-label="Prévia em PDF">
        <span>PDF</span>
      </div>
      <h3>${midia.nome}</h3>
      <p><strong>Data:</strong> ${midia.data}</p>
      <p><strong>Tipo:</strong> ${midia.tipo}</p>
      <button type="button" class="action-btn open-pdf" data-pdf-title="${midia.nome}">Abrir PDF</button>
    </article>
  `).join("");
}

function renderInfoCurso() {
  const container = document.getElementById("infoCurso");
  if (!container) return;

  container.innerHTML = INFO_CURSO.map((item) => `
    <article class="metric-card">
      <h3>${item.titulo}</h3>
      <p class="big-text">${item.valor}</p>
    </article>
  `).join("");
}

function renderMetodologia() {
  const container = document.getElementById("metodologiaContainer");
  if (!container) return;

  container.innerHTML = METODOLOGIA.map((item) => `
    <article class="metric-card">
      <h3>${item.titulo}</h3>
      <p>${item.texto}</p>
    </article>
  `).join("");
}

function renderDiferenciais() {
  const container = document.getElementById("diferenciaisContainer");
  if (!container) return;

  // Escapar conteúdo para segurança
  container.innerHTML = DIFERENCIAIS.map((item) => `
    <article class="metric-card">
      <h3>${escapeHtml(item)}</h3>
    </article>
  `).join("");
}

function openModal(title, html) {
  const modal = document.getElementById("genericModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");

  if (!modal || !modalTitle || !modalContent) return;

  modalTitle.textContent = title;
  modalContent.innerHTML = html;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  const modal = document.getElementById("genericModal");
  if (!modal) return;

  // Limpar event listeners da imagem de zoom para evitar memory leak
  const image = modal.querySelector(".modal-image-wrapper img");
  if (image) {
    // Remover listeners via clonagem (mais eficiente)
    const newImage = image.cloneNode(true);
    image.parentNode.replaceChild(newImage, image);
  }

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function gerarDocumentoDemonstrativo(tipo) {
  // Validar tipo de documento contra lista branca
  const validTypes = ["inscricao", "participacao", "relatorio"];
  if (!validTypes.includes(tipo)) {
    console.warn("Tipo de documento inválido:", tipo);
    tipo = "inscricao";
  }

  const templates = {
    inscricao: {
      title: "Declaração de inscrição",
      body: `<div class="document-sample"><p><strong>MODELO DEMONSTRATIVO</strong></p><p>Declaração que atesta a inscrição do aluno no curso de Física da Radiação Aplicada.</p><p>Dados demonstrativos. Integração com backend será habilitada em versão futura.</p></div>`,
    },
    participacao: {
      title: "Declaração de participação",
      body: `<div class="document-sample"><p><strong>MODELO DEMONSTRATIVO</strong></p><p>Documento que comprova a participação do aluno no curso, com carga horária e atividades demonstrativas.</p><p>Dados fictícios para apresentação da interface.</p></div>`,
    },
    relatorio: {
      title: "Relatório acadêmico",
      body: `<div class="document-sample"><p><strong>RELATÓRIO DEMONSTRATIVO</strong></p><p>Resumo do desempenho acadêmico, frequência e atividades do aluno.</p><p>Desempenho geral: [Preencher]</p><p>Frequência: [Preencher]</p></div>`,
    },
  };

  const config = templates[tipo];
  openModal(config.title, config.body);
}

function openGoogleMeet() {
  if (!CONFIG.googleMeetLink) {
    openModal("Aula ao vivo", '<p>Link da aula ainda não disponibilizado.</p>');
    return;
  }
  window.open(CONFIG.googleMeetLink, "_blank", "noopener");
}

function openCPAForm() {
  if (!CONFIG.cpaFormsLink) {
    openModal("Avaliação institucional", '<p>Formulário de avaliação ainda não disponibilizado.</p>');
    return;
  }
  window.open(CONFIG.cpaFormsLink, "_blank", "noopener");
}

function openRematricula() {
  if (!CONFIG.rematriculaLink) {
    openModal("Rematrícula", '<p>Link de rematrícula ainda não disponibilizado.</p>');
    return;
  }
  window.open(CONFIG.rematriculaLink, "_blank", "noopener");
}

function handleNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;

      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");

      document.querySelectorAll(".page-section").forEach((section) => {
        section.classList.toggle("active", section.id === targetId.replace("#", ""));
      });

      if (window.innerWidth <= 1024) {
        document.body.classList.remove("sidebar-open");
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function toggleSidebar(forceState) {
  const body = document.body;
  const nextState = typeof forceState === "boolean" ? forceState : !body.classList.contains("sidebar-open");
  body.classList.toggle("sidebar-open", nextState);
}

function attachGlobalEvents() {
  const menuToggle = document.getElementById("menuToggle");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => toggleSidebar());
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", () => toggleSidebar(false));
  }

  document.querySelector("#liveMeetButton")?.addEventListener("click", openGoogleMeet);
  document.querySelector("#cpaButton")?.addEventListener("click", openCPAForm);
  document.querySelector("#rematriculaButton")?.addEventListener("click", openRematricula);

  document.querySelectorAll("[data-document]").forEach((button) => {
    button.addEventListener("click", () => {
      const docType = button.dataset.document;
      if (docType) gerarDocumentoDemonstrativo(docType);
    });
  });

  document.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.open;
      const section = document.getElementById(target);
      if (section) {
        document.querySelectorAll(".page-section").forEach((item) => item.classList.toggle("active", item.id === target));
        const link = document.querySelector(`.nav-link[href="#${target}"]`);
        document.querySelectorAll(".nav-link").forEach((nav) => nav.classList.toggle("active", nav === link));
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  document.querySelector(".modal-close")?.addEventListener("click", closeModal);
  document.querySelector(".modal-backdrop")?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  const insertFileButton = document.getElementById("insertFileButton");
  const fileOptionList = document.getElementById("fileOptionList");

  if (insertFileButton && fileOptionList) {
    insertFileButton.addEventListener("click", () => {
      fileOptionList.classList.toggle("visible");
    });

    fileOptionList.querySelectorAll(".file-option").forEach((option) => {
      option.addEventListener("click", () => {
        const type = option.textContent.trim();
        openModal("Anexo do fórum", `<p>Arquivo do tipo <strong>${type}</strong> selecionado.</p><p>Interface demonstrativa: integração com upload real será adicionada em versão futura.</p>`);
        fileOptionList.classList.remove("visible");
      });
    });
  }

  const sendForumMessage = document.getElementById("sendForumMessage");
  if (sendForumMessage) {
    sendForumMessage.addEventListener("click", () => {
      const input = document.getElementById("forumMensagem");
      const message = input ? input.value.trim() : "";

      if (!message) {
        openModal("Fórum", '<p>Digite uma mensagem antes de enviar.</p>');
        return;
      }

      // SEGURANÇA: Escapar HTML da mensagem do usuário para prevenir XSS
      const safeMensagem = escapeHtml(message);
      openModal("Mensagem enviada", `<p><strong>Mensagem enviada com sucesso.</strong></p><p>Exemplo de envio do fórum: ${safeMensagem}</p><p>Dados demonstrativos.</p>`);
      if (input) input.value = "";
    });
  }

  document.querySelectorAll("[data-video]").forEach((button) => {
    button.addEventListener("click", () => {
      const videoUrl = button.dataset.video;
      if (!videoUrl) {
        openModal("Vídeo demonstrativo", '<p>Vídeo demonstrativo. Substitua o arquivo em /videos/aula-exemplo.mp4.</p>');
        return;
      }
      window.open(videoUrl, "_blank", "noopener");
    });
  });

  document.querySelectorAll("[data-image-zoom]").forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.dataset.imageZoom;
      if (!src) return;

      const modal = document.getElementById("genericModal");
      const modalTitle = document.getElementById("modalTitle");
      const modalContent = document.getElementById("modalContent");

      if (!modal || !modalTitle || !modalContent) return;

      modalTitle.textContent = "Imagem da landing page";
      modalContent.innerHTML = `
        <div class="modal-image-wrapper" aria-label="Imagem ampliada da landing page">
          <img src="${src}" alt="Imagem ampliada da landing page" />
        </div>
      `;

      const image = modalContent.querySelector("img");
      if (image) {
        let scale = 1;
        let dragX = 0;
        let dragY = 0;
        let isDragging = false;
        let startX = 0;
        let startY = 0;

        image.addEventListener("wheel", (event) => {
          event.preventDefault();
          const delta = event.deltaY < 0 ? 0.12 : -0.12;
          scale = Math.min(3, Math.max(1, scale + delta));
          image.style.transform = `scale(${scale}) translate(${dragX}px, ${dragY}px)`;
        }, { passive: false });

        image.addEventListener("mousedown", (event) => {
          isDragging = true;
          startX = event.clientX - dragX;
          startY = event.clientY - dragY;
          image.style.cursor = "grabbing";
        });

        image.addEventListener("mousemove", (event) => {
          if (!isDragging) return;
          dragX = event.clientX - startX;
          dragY = event.clientY - startY;
          image.style.transform = `scale(${scale}) translate(${dragX}px, ${dragY}px)`;
        });

        image.addEventListener("mouseup", () => {
          isDragging = false;
          image.style.cursor = "grab";
        });

        image.addEventListener("mouseleave", () => {
          isDragging = false;
          image.style.cursor = "grab";
        });

        image.style.cursor = "grab";
      }

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  document.querySelectorAll(".open-pdf").forEach((button) => {
    button.addEventListener("click", () => {
      const title = button.dataset.pdfTitle || "Aula de referência";
      openModal(title, `
        <div class="document-sample pdf-preview">
          <div class="pdf-header">
            <span>PDF</span>
            <strong>${title}</strong>
          </div>
          <div class="pdf-body">
            <h4>Aula 1</h4>
            <p>Apresentação do curso e introdução básica à Física da Radiação</p>
            <ul>
              <li>Conceptos iniciais</li>
              <li>Radiação ionizante e não ionizante</li>
              <li>Proteção radiológica</li>
            </ul>
          </div>
        </div>
      `);
    });
  });

  document.querySelectorAll("[data-boleto]").forEach((button) => {
    button.addEventListener("click", () => {
      openModal("Boleto", '<p>Visualização do boleto em modo demonstrativo. Integração real será habilitada futuramente.</p>');
    });
  });
}

function computeCourseDates() {
  const inicio = new Date(`${DATA_INICIO}T12:00:00`);
  const termino = new Date(inicio);
  termino.setDate(inicio.getDate() + 35);
  const terminoLabel = document.querySelector("#infoCurso .metric-card:nth-child(5) .big-text");
  if (terminoLabel) {
    terminoLabel.textContent = formatLongDate(termino.toISOString().split("T")[0]);
  }
}

function initialize() {
  buildCronogramaRows();
  updateProximaAula();
  updateProgress();
  renderAvisosRecentes();
  renderObjectives();
  renderEmenta();
  renderAulasGravadas();
  renderMidiasDigitais();
  renderAvaliacoes();
  renderNotas();
  renderFrequencia();
  renderDocumentos();
  renderFinanceiro();
  renderAvisos();
  renderInfoCurso();
  renderMetodologia();
  renderDiferenciais();
  computeCourseDates();
  handleNavigation();
  attachGlobalEvents();
}

document.addEventListener("DOMContentLoaded", initialize);
