const produtos = [
  { id: 1, nome: 'Maracujá', categoria: 'tortas', preco: 90, descricao: 'Irresistível torta com cremoso creme de maracujá, mousse de chocolate com base de biscoito amanteigado de chocolate e coroada com uma deliciosa geleia de maracujá.', imagem: 'img/WhatsApp Image 2025-11-28 at 14.32.40.jpeg', selo: '' },
  { id: 2, nome: 'Doce de Leite', categoria: 'tortas', preco: 95, descricao: 'Base de biscoito amanteigado, mousse de doce de leite e finalizada com deliciosa cobertura de doce de leite e crocante de amendoim.', imagem: 'img/WhatsApp Image 2025-11-28 at 14.00.11.jpeg' },
  { id: 3, nome: 'Pistache Dubai', categoria: 'tortas', preco: 88, descricao: 'Base crocante, delicado mousse de pistache, com uma camada de pasta pura de pistache, finalizada com ganache de chocolate branco e pistaches triturados para decorar.', imagem: 'img/WhatsApp Image 2025-11-28 at 14.32.15.jpeg', selo: 'Novo' },
  { id: 4, nome: 'Red Velvet', categoria: 'tortas', preco: 92, descricao: 'Deliciosa torta Red Velvet, com base de biscoito amanteigado, mousse de cream cheese e finalizado com uma deliciosa geleia de morango.', imagem: 'img/WhatsApp Image 2025-11-28 at 14.32.42.jpeg' },
  { id: 5, nome: 'Ninho com nutella', categoria: 'tortas', preco: 98, descricao: 'Base biscoito amanteigado de chocolate, suave creme mousse de ninho, recheado com nutella e uma generosa cobertura de nutella.', imagem: 'img/WhatsApp Image 2025-11-27 at 01.09.26.jpeg', selo: 'Favorita' },
  { id: 6, nome: 'Triplo Chocolate', categoria: 'tortas', preco: 105, descricao: 'Deliciosa combinação de três camadas de mousse: chocolate meio amargo, chocolate ao leite e chocolate branco. Finalizada com uma suave ganache de chocolate branco e um Kinder Bueno como toque especial. Uma experiência cremosa e irresistível para os verdadeiros amantes de chocolate.', imagem: 'img/WhatsApp Image 2025-11-29 at 11.03.40.jpeg' },
  { id: 7,
     nome: 'Ferrero Rocher',
     categoria: 'tortas',
      preco: 110, descricao: 'Base de biscoito amanteigado de chocolate recheada com nossa mousse de avelã coberta com ganache de chocolate belga e amendoim torrado. Perfeita para amantes de ferreiro rocher.',
       imagem: 'img/WhatsApp Image 2025-11-28 at 14.32.14.jpeg' 
      },
  { id: 8,
     nome: 'Banoffe',
      categoria: 'tortas',
       preco: 520,
        descricao: 'Base crocante, doce de leite, bananas frescas e uma capa irresistível de chantilly, adicionamos ainda mais encanto com canela polvilhada.',
         imagem: 'img/WhatsApp Image 2025-12-08 at 18.58.43.jpeg',
          selo: '' },
          
  { id: 9, nome: 'Choco oreo', categoria: 'tortas', preco: 112, descricao: 'Base biscoito oreo, creme mousse de oreo, mousse de chocolate coberto com nossa deliciosa ganache de chocolate belga.', imagem: 'img/WhatsApp Image 2025-11-28 at 14.00.12.jpeg' },
  { id: 10, nome: 'Pink', categoria: 'tortas', preco: 112, descricao: 'Base crocante de biscoito amanteigado, coberta por um mousse de morango delicado com pedacinhos de frutas vermelhas frescas, finalizada com mousse de limão cremoso que traz equilíbrio e frescor a cada fatia.', imagem: 'img/WhatsApp Image 2025-11-28 at 14.00.13.jpeg' },
];

const chips = document.querySelectorAll('.chip');
const cardsContainer = document.getElementById('cards');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.modal .close');

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    render(chip.dataset.cat);
  });
});

if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

render('tortas');

function render(categoria) {
  if (!cardsContainer) return;
  cardsContainer.innerHTML = '';
  const filtrados = produtos.filter((p) => p.categoria === categoria);

  filtrados.forEach((produto) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="img-shell">
        <span class="pill">${capitalize(produto.categoria)}</span>
        ${produto.selo ? `<span class="tag">${produto.selo}</span>` : ''}
        <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
      </div>
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
    `;
    card.addEventListener('click', () => abrirModal(produto));
    cardsContainer.appendChild(card);
  });
}

function abrirModal(produto) {
  if (!modal || !modalBody) return;
  const outrosSabores = produtos.filter((p) => p.nome !== produto.nome);
  // Use api.whatsapp.com for melhor compatibilidade mobile/web.
  const waBase = 'https://api.whatsapp.com/send?phone=5598999696130&text=';

  const getPagamento = () => {
    const paySelected = document.querySelector('input[name="pay-option"]:checked');
    return paySelected ? paySelected.value : '';
  };

  const buildMessage = () => {
    const qtdeInput = document.getElementById('qtde');
    const qtd = Math.max(1, Number(qtdeInput?.value || 1));
    const extras = Array.from(document.querySelectorAll('.extra-row')).flatMap((row) => {
      const cb = row.querySelector('input[type="checkbox"]');
      const qty = row.querySelector('input[type="number"]');
      if (!cb?.checked) return [];
      const q = Math.max(1, Number(qty?.value || 1));
      const nome = cb.dataset.nome || '';
      return nome ? [{ nome, q }] : [];
    });
    const pagamento = getPagamento();
    const partes = [
      'Olá, tudo bem? Quero encomendar:',
      `${qtd}x ${produto.nome}`
    ];
    if (extras.length) {
      extras.forEach((e) => partes.push(`${e.q}x ${e.nome}`));
    }
    if (pagamento) {
      partes.push(`Pagamento: ${pagamento}`);
    }
    // Usa CRLF para forçar quebra de linha no WhatsApp (iOS gosta de \r\n).
    return encodeURIComponent(partes.join('\r\n'));
  };

  modalBody.innerHTML = `
    <div class="img-shell" style="height:240px; margin-bottom: 1rem;">
      <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
    </div>
    <h3>${produto.nome}</h3>
    <p>${produto.descricao}</p>
    <div class="order-form">
      <label>
        Quantidade
        <input id="qtde" type="number" min="1" value="1">
      </label>
      <div class="extras">
        <p class="extras-title">Adicionar outros sabores Charm. 😁</p>
        ${outrosSabores.map((p) => `
          <label class="extra-row">
            <input type="checkbox" data-nome="${p.nome}">
            <span>${p.nome}</span>
            <input type="number" min="1" value="1" disabled>
          </label>
        `).join('')}
        <small class="muted"></small>
      </div>
      <div class="payments">
        <p class="extras-title">Forma de pagamento</p>
        <label class="payment-option">
          <input type="radio" name="pay-option" value="PIX">
          <span>PIX (enviamos a chave na confirmação)</span>
        </label>
        <label class="payment-option">
          <input type="radio" name="pay-option" value="Cartão (crédito ou débito)">
          <span>Cartão (crédito / mandamos o link de pagamento)</span>
        </label>
        <label class="payment-option">
          <input type="radio" name="pay-option" value="Dinheiro (preciso de troco)">
          <span>Dinheiro (informar troco)</span>
        </label>
      </div>
    </div>
    <a
      id="cta-whatsapp"
      class="cta"
      style="width:100%; text-align:center; margin-top: 0.8rem;"
      href="${waBase}${buildMessage()}"
      target="_blank"
      rel="noopener noreferrer"
    >Pedir pelo WhatsApp</a>
  `;

  const cta = modalBody.querySelector('#cta-whatsapp');
  const qtdeInput = modalBody.querySelector('#qtde');
  const extraChecks = modalBody.querySelectorAll('.extra-row input[type="checkbox"]');
  const extraQtys = modalBody.querySelectorAll('.extra-row input[type="number"]');
  const payRadios = modalBody.querySelectorAll('input[name="pay-option"]');

  const syncLink = () => {
    if (!cta) return;
    const pagamento = getPagamento();
    if (!pagamento) {
      cta.classList.add('disabled');
      cta.setAttribute('aria-disabled', 'true');
      cta.removeAttribute('href');
      return;
    }
    cta.classList.remove('disabled');
    cta.removeAttribute('aria-disabled');
    cta.href = `${waBase}${buildMessage()}`;
  };

  qtdeInput?.addEventListener('input', syncLink);
  extraChecks.forEach((cb, idx) => {
    const qty = extraQtys[idx];
    cb.addEventListener('change', () => {
      if (qty) qty.disabled = !cb.checked;
      syncLink();
    });
  });
  extraQtys.forEach((qty) => qty.addEventListener('input', syncLink));
  payRadios.forEach((rb) => rb.addEventListener('change', syncLink));
  syncLink();
  modal.style.display = 'flex';
}

function closeModal() {
  if (modal) modal.style.display = 'none';
}

function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
