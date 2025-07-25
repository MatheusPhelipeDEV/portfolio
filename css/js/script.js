// script.js

// === CONFIGURAÇÕES DE CONTATO (EDITAR APENAS AQUI) ===
const MEU_EMAIL = "contato.matheusphelipe2131@gmail.com"; // <-- SEU EMAIL AQUI
const MEU_WHATSAPP_NUMERO = "5541987266526"; // <-- SEU NÚMERO DE WHATSAPP (código do país + DDD + número)
const MEU_WHATSAPP_FORMATADO = "(41) 98726-6526"; // <-- SEU NÚMERO FORMATADO PARA EXIBIÇÃO

// === Efeito de digitação no cabeçalho ===
const textoAnimado = document.getElementById("texto-animado");
const frases = [
  "Desenvolvedor Front-End",
  "Desenvolvedor Back-End",
  "Desenvolvedor de Automações",
  "Desenvolvedor Full-Stack",
  "Especialista em UI/UX", // Adicione/remova frases conforme desejar
];

let fraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 60;
const delayBetweenPhrases = 1500;

function type() {
  if (fraseIndex === frases.length) {
    fraseIndex = 0;
  }

  const currentFrase = frases[fraseIndex];

  if (!isDeleting && charIndex < currentFrase.length) {
    textoAnimado.textContent = currentFrase.substring(0, charIndex + 1);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    textoAnimado.textContent = currentFrase.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(type, deletingSpeed);
  } else {
    isDeleting = !isDeleting;
    setTimeout(
      () => {
        if (!isDeleting) {
          fraseIndex++;
        }
        charIndex = 0;
        type();
      },
      isDeleting ? delayBetweenPhrases : typingSpeed
    );
  }
}

// === Funcionalidade do botão "Enviar Mensagem via WhatsApp" ===
const btnEnviarWhatsapp = document.getElementById("enviar-whatsapp");

if (btnEnviarWhatsapp) {
  btnEnviarWhatsapp.addEventListener("click", () => {
    const nome = document.getElementById("nome-contato").value;
    const mensagem = document.getElementById("mensagem-contato").value;

    let textoWhatsapp = `Olá! Meu nome é ${nome}. `;
    if (mensagem) {
      textoWhatsapp += `Gostaria de falar sobre: ${mensagem}`;
    } else {
      textoWhatsapp += `Entrei em contato através do seu portfólio de serviços.`;
    }

    const urlWhatsapp = `https://wa.me/${MEU_WHATSAPP_NUMERO}?text=${encodeURIComponent(
      textoWhatsapp
    )}`;
    window.open(urlWhatsapp, "_blank");
  });
}

// === Preencher informações de contato dinamicamente no HTML ===
function preencherContato() {
  const emailLink = document.getElementById("email-link");
  const whatsappLink = document.getElementById("whatsapp-link");
  const displayEmail = document.getElementById("display-email");
  const displayWhatsapp = document.getElementById("display-whatsapp");

  if (emailLink) {
    emailLink.href = `mailto:${MEU_EMAIL}`;
  }
  if (whatsappLink) {
    whatsappLink.href = `https://wa.me/${MEU_WHATSAPP_NUMERO}`;
  }
  if (displayEmail) {
    displayEmail.textContent = MEU_EMAIL;
  }
  if (displayWhatsapp) {
    displayWhatsapp.textContent = MEU_WHATSAPP_FORMATADO;
  }
}

// Inicia as animações e preenchimento de contato quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
  type(); // Inicia o efeito de digitação
  preencherContato(); // Preenche as informações de contato
});
