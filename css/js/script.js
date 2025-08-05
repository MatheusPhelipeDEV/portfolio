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
  "Especialista em Identidade Visual",
  "Criador de Motion Graphics", // Frases de design adicionadas
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

// === Funcionalidade do Carrossel de Projetos (Artes) ===
const carouselTrack = document.querySelector(".carousel-track");
if (carouselTrack) {
  let isDragging = false;
  let startX;
  let scrollLeft;
  let originalContentWidth = 0;
  let lastTimestamp = 0;
  const scrollSpeed = 0.5;

  const originalCarouselItems = Array.from(carouselTrack.children);

  const imagesToLoad = originalCarouselItems.map(
    (item) =>
      new Promise((resolve) => {
        const img = item.querySelector("img");
        if (img && !img.complete) {
          img.addEventListener("load", () => resolve());
          img.addEventListener("error", () => resolve());
        } else {
          resolve();
        }
      })
  );

  Promise.all(imagesToLoad).then(() => {
    originalCarouselItems.forEach((item) => {
      const clone = item.cloneNode(true);
      carouselTrack.appendChild(clone);
    });

    const recalculateWidth = () => {
      originalContentWidth = 0;
      originalCarouselItems.forEach((item) => {
        originalContentWidth +=
          item.offsetWidth + parseFloat(getComputedStyle(item).marginRight);
      });
    };

    recalculateWidth();
    window.addEventListener("resize", recalculateWidth);

    const autoScroll = (timestamp) => {
      if (!isDragging && originalContentWidth > 0) {
        const elapsed = timestamp - lastTimestamp;
        if (elapsed > 16) {
          carouselTrack.scrollLeft += scrollSpeed * (elapsed / 16);
          if (carouselTrack.scrollLeft >= originalContentWidth) {
            carouselTrack.scrollLeft -= originalContentWidth;
          }
          lastTimestamp = timestamp;
        }
      }
      requestAnimationFrame(autoScroll);
    };

    requestAnimationFrame(autoScroll);

    const handleDragStart = (e) => {
      isDragging = true;
      carouselTrack.style.cursor = "grabbing";
      startX = (e.pageX || e.touches[0].pageX) - carouselTrack.offsetLeft;
      scrollLeft = carouselTrack.scrollLeft;
    };

    const handleDragEnd = () => {
      isDragging = false;
      carouselTrack.style.cursor = "grab";
    };

    const handleDragMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = (e.pageX || e.touches[0].pageX) - carouselTrack.offsetLeft;
      const walk = (x - startX) * 1.5;
      carouselTrack.scrollLeft = scrollLeft - walk;

      if (carouselTrack.scrollLeft <= 0) {
        carouselTrack.scrollLeft += originalContentWidth;
        scrollLeft += originalContentWidth;
      } else if (carouselTrack.scrollLeft >= originalContentWidth) {
        carouselTrack.scrollLeft -= originalContentWidth;
        scrollLeft -= originalContentWidth;
      }
    };

    carouselTrack.addEventListener("mousedown", handleDragStart);
    carouselTrack.addEventListener("mouseleave", handleDragEnd);
    carouselTrack.addEventListener("mouseup", handleDragEnd);
    carouselTrack.addEventListener("mousemove", handleDragMove);
    carouselTrack.addEventListener("touchstart", handleDragStart);
    carouselTrack.addEventListener("touchend", handleDragEnd);
    carouselTrack.addEventListener("touchmove", handleDragMove);
  });
}

// === Funcionalidade do Modal de Detalhes dos Projetos ===

// Dados dos projetos para o modal.
// ADICIONE AQUI AS IMAGENS DE CADA PROJETO!
const projetosDetalhes = {
  1: {
    titulo: "Formulário de Admissão Digital",
    imagens: [
      "./images/projeto01-print1.png", // Exemplo de path, ajuste para o caminho correto das suas imagens
      "./images/projeto01-print2.png",
      "./images/projeto01-print3.png",
    ],
  },
  2: {
    titulo: "Sistema de Gestão de Ativos de TI",
    imagens: ["./images/projeto02-print1.png", "./images/projeto02-print2.png"],
  },
  3: {
    titulo: "Sistema de Cotação",
    imagens: [
      "./images/projeto03-print1.png",
      "./images/projeto03-print2.png",
      "./images/projeto03-print3.png",
    ],
  },
};

const modal = document.getElementById("modal-projeto");
const modalTitulo = document.getElementById("modal-titulo");
const modalGaleria = document.getElementById("modal-imagens");
const fecharModalBtn = document.querySelector(".modal-fechar");
const botoesDetalhes = document.querySelectorAll(".btn-detalhes");

// Função para abrir o modal
function abrirModal(projetoId) {
  const projeto = projetosDetalhes[projetoId];

  if (projeto) {
    modalTitulo.textContent = projeto.titulo;
    modalGaleria.innerHTML = ""; // Limpa a galeria para um novo projeto

    projeto.imagens.forEach((imagemSrc) => {
      const img = document.createElement("img");
      img.src = imagemSrc;
      img.alt = projeto.titulo;
      modalGaleria.appendChild(img);
    });

    modal.classList.add("ativo");
    document.body.style.overflow = "hidden"; // Impede a rolagem do corpo da página
  }
}

// Função para fechar o modal
function fecharModal() {
  modal.classList.remove("ativo");
  document.body.style.overflow = "auto"; // Habilita a rolagem do corpo da página
}

// Event Listeners para os botões de detalhes
botoesDetalhes.forEach((botao) => {
  botao.addEventListener("click", () => {
    const projetoId = botao.getAttribute("data-projeto-id");
    abrirModal(projetoId);
  });
});

// Event Listener para fechar o modal
fecharModalBtn.addEventListener("click", fecharModal);

// Fecha o modal se clicar fora do conteúdo
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    fecharModal();
  }
});

// Inicia as animações e preenchimento de contato quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
  type(); // Inicia o efeito de digitação
  preencherContato(); // Preenche as informações de contato
});
