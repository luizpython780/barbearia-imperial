
// BARBEARIA IMPERIAL
// Sistema demonstrativo de agendamento

// Atualizar automaticamente o ano do rodapé
document.getElementById("year").textContent =
  new Date().getFullYear();

// WhatsApp da barbearia
// Deixe vazio enquanto for um projeto demonstrativo.
// No futuro, coloque o número autorizado do cliente.
// Exemplo de formato: 55 + DDD + número

const numeroWhatsApp = "";

// ELEMENTOS DO FORMULÁRIO

const formulario = document.getElementById("booking-form");

const campoNome = document.getElementById("customer-name");
const campoTelefone = document.getElementById("customer-phone");
const campoServico = document.getElementById("booking-service");
const campoBarbeiro = document.getElementById("booking-barber");
const campoData = document.getElementById("booking-date");
const campoHorario = document.getElementById("booking-time");

const resultado = document.getElementById("booking-result");

// DATA ATUAL

function obterDataLocal() {
  const hoje = new Date();

  const ano = hoje.getFullYear();

  const mes = String(
    hoje.getMonth() + 1
  ).padStart(2, "0");

  const dia = String(
    hoje.getDate()
  ).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

// Impedir agendamentos em datas anteriores

campoData.min = obterDataLocal();

// FORMATAR VALORES

function formatarData(data) {
  return new Date(
    data + "T12:00:00"
  ).toLocaleDateString("pt-BR");
}

// MOSTRAR RESUMO

function mostrarResumo(dados) {
  resultado.replaceChildren();

  const titulo = document.createElement("h3");
  titulo.textContent = "Resumo da solicitação";

  resultado.appendChild(titulo);

  const informacoes = [
    ["Nome", dados.nome],
    ["Telefone", dados.telefone],
    ["Serviço", dados.servico],
    ["Profissional", dados.barbeiro],
    ["Data desejada", dados.data],
    ["Horário desejado", dados.horario]
  ];

  informacoes.forEach(([rotulo, valor]) => {
    const paragrafo = document.createElement("p");

    paragrafo.textContent =
      `${rotulo}: ${valor}`;

    resultado.appendChild(paragrafo);
  });

  const aviso = document.createElement("p");

  aviso.className = "result-note";

  aviso.textContent =
    "Esta é uma demonstração. Nenhum agendamento foi confirmado ou armazenado.";

  resultado.appendChild(aviso);

  resultado.hidden = false;
}

// ENVIAR PARA WHATSAPP

function enviarWhatsApp(mensagem) {
  const telefone = numeroWhatsApp.replace(/\D/g, "");

  if (!telefone) {
    return false;
  }

  const link =
    `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  window.open(
    link,
    "_blank",
    "noopener,noreferrer"
  );

  return true;
}

// PROCESSAR AGENDAMENTO

formulario.addEventListener("submit", function(event) {

  event.preventDefault();

  const nome = campoNome.value.trim();
  const telefone = campoTelefone.value.trim();
  const servico = campoServico.value;
  const barbeiro = campoBarbeiro.value;
  const data = campoData.value;
  const horario = campoHorario.value;

  // VALIDAR CAMPOS

  if (
    !nome ||
    !telefone ||
    !servico ||
    !barbeiro ||
    !data ||
    !horario
  ) {
    alert("Preencha todos os campos.");
    return;
  }

  // VALIDAR DATA

  if (data < obterDataLocal()) {
    alert("Escolha uma data válida.");
    campoData.min = obterDataLocal();
    return;
  }

  const dataFormatada = formatarData(data);

  // ORGANIZAR DADOS

  const dados = {
    nome: nome,
    telefone: telefone,
    servico: servico,
    barbeiro: barbeiro,
    data: dataFormatada,
    horario: horario
  };

  // MOSTRAR RESUMO NO SITE

  mostrarResumo(dados);

  // PREPARAR MENSAGEM

  const mensagem = [
    "Olá! Gostaria de solicitar um agendamento na Barbearia Imperial.",
    "",
    `Nome: ${nome}`,
    `Telefone: ${telefone}`,
    `Serviço: ${servico}`,
    `Profissional: ${barbeiro}`,
    `Data desejada: ${dataFormatada}`,
    `Horário desejado: ${horario}`,
    "",
    "Gostaria de confirmar a disponibilidade."
  ].join("\n");

  // ABRIR WHATSAPP QUANDO CONFIGURADO

  const enviado = enviarWhatsApp(mensagem);

  if (!enviado) {
    console.log(
      "Modo demonstração: WhatsApp não configurado."
    );
  }

});
