const produtos = [
  { id: 1, nome: 'Maracujá', categoria: 'tortas', preco: 23.5, descricao: 'Irresistível torta com cremoso creme de maracujá, mousse de chocolate com base de biscoito amanteigado de chocolate e coroada com uma deliciosa geleia de maracujá.', imagem: 'img/WhatsApp Image 2025-11-28 at 14.32.40.jpeg', selo: 'R$23,50' },


  { id: 2, nome: 'Doce de Leite', categoria: 'tortas', preco: 20.0, descricao: 'Base de biscoito amanteigado, mousse de doce de leite e finalizada com deliciosa cobertura de doce de leite e crocante de amendoim.', imagem: 'img/WhatsApp Image 2025-11-28 at 14.00.11.jpeg', selo: 'R$20,00' },



  { id: 3, nome: 'Pistache Dubai', categoria: 'tortas', preco: 30.0, descricao: 'Base crocante, delicado mousse de pistache, com uma camada de pasta pura de pistache, finalizada com ganache de chocolate branco e pistaches triturados para decorar.', imagem: 'img/WhatsApp Image 2025-11-28 at 14.32.15.jpeg', selo: 'R$21,00' },


  { id: 4, nome: 'Red Velvet', categoria: 'tortas', preco: 29.0, descricao: 'Deliciosa torta Red Velvet, com base de biscoito amanteigado, mousse de cream cheese e finalizado com uma deliciosa geleia de morango.', imagem: 'img/WhatsApp Image 2025-11-28 at 14.32.42.jpeg', selo: 'R$29,00' },



  { id: 5, nome: 'Ninho com nutella', categoria: 'tortas', preco: 26.5, descricao: 'Base biscoito amanteigado de chocolate, suave creme mousse de ninho, recheado com nutella e uma generosa cobertura de nutella.', imagem: 'img/WhatsApp Image 2025-11-27 at 01.09.26.jpeg', selo: 'Esgotado' },



  { id: 6, nome: 'Triplo Chocolate', categoria: 'tortas', preco: 29.0, descricao: 'Deliciosa combinação de três camadas de mousse: chocolate meio amargo, chocolate ao leite e chocolate branco. Finalizada com uma suave ganache de chocolate branco e um Kinder Bueno como toque especial. Uma experiência cremosa e irresistível para os verdadeiros amantes de chocolate.', imagem: 'img/WhatsApp Image 2025-11-29 at 11.03.40.jpeg', selo: 'R$29,00' },


  { id: 7, nome: 'Ferrero Rocher', categoria: 'tortas', preco: 26.5, descricao: 'Base de biscoito amanteigado de chocolate recheada com nossa mousse de avelã coberta com ganache de chocolate belga e amendoim torrado. Perfeita para amantes de ferreiro rocher.', imagem: 'img/WhatsApp Image 2025-11-28 at 14.32.14.jpeg', selo: 'R$26,50' },


  { id: 8, nome: 'Banoffe', categoria: 'tortas', preco: 17.0, descricao: 'Base crocante, doce de leite, bananas frescas e uma capa irresistível de chantilly, adicionamos ainda mais encanto com canela polvilhada.', imagem: 'img/WhatsApp Image 2025-12-08 at 18.58.43.jpeg', selo: 'Esgotado' },


  { id: 9, nome: 'Choco oreo', categoria: 'tortas', preco: 24.0, descricao: 'Base biscoito oreo, creme mousse de oreo, mousse de chocolate coberto com nossa deliciosa ganache de chocolate belga.', imagem: 'img/WhatsApp Image 2025-11-28 at 14.00.12.jpeg', selo: 'R$24,00' },


  { id: 10, nome: 'Pink', categoria: 'tortas', preco: 26.0, descricao: 'Base crocante de biscoito amanteigado, coberta por um mousse de morango delicado com pedacinhos de frutas vermelhas frescas, finalizada com mousse de limão cremoso que traz equilíbrio e frescor a cada fatia.', imagem: 'img/WhatsApp Image 2025-11-28 at 14.00.13.jpeg', selo: 'R$26,00' },


  { id: 11, nome: 'Limão', categoria: 'tortas', preco: 20.0, descricao: 'Deliciosa torta de limão com base de biscoito amanteigado, mousse de limão, finalizada com merengue flambado.', imagem: 'img/WhatsApp Image 2025-12-08 at 19.17.36.jpeg', selo: 'R$20,00' },
];


const chips = document.querySelectorAll('.chip');
const cardsContainer = document.getElementById('cards');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.modal .close');
const productIndex = new Map(produtos.map((p) => [p.nome, p]));

function generateOrderNumber() {
  const rand = Math.floor(1 + Math.random() * 9999);
  return String(rand);
}

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
    const isSoldOut = (produto.selo || '').toLowerCase().includes('esgotado');
    if (isSoldOut) {
      card.classList.add('soldout');
      card.setAttribute('aria-disabled', 'true');
      card.title = 'Indisponível para pedir (Esgotado)';
    }
    card.innerHTML = `
      <div class="img-shell">
        <span class="pill">${capitalize(produto.categoria)}</span>
        ${produto.selo ? `<span class="tag">${produto.selo}</span>` : ''}
        <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
      </div>
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
    `;
    card.addEventListener('click', () => {
      if (isSoldOut) return;
      abrirModal(produto);
    });
    cardsContainer.appendChild(card);
  });
}

function abrirModal(produto) {
  if ((produto.selo || '').toLowerCase().includes('esgotado')) return;
  if (!modal || !modalBody) return;
  const outrosSabores = produtos.filter((p) => p.nome !== produto.nome);
  // Use api.whatsapp.com for melhor compatibilidade mobile/web.
  const waBase = 'https://api.whatsapp.com/send?phone=5598999696130&text=';
  const waAppBase = 'whatsapp://send?phone=5598999696130&text='; // tenta abrir app

  const getPagamento = () => {
    const paySelected = document.querySelector('input[name="pay-option"]:checked');
    return paySelected ? paySelected.value : '';
  };

  const getClienteNome = () => {
    const nomeInput = document.getElementById('cliente-nome');
    return nomeInput ? nomeInput.value.trim() : '';
  };

  const getPedidoNumero = () => {
    const numInput = document.getElementById('pedido-numero');
    return numInput ? numInput.value.trim() : '';
  };

  const getEntrega = () => {
    const entregaSelected = document.querySelector('input[name="entrega-option"]:checked');
    return entregaSelected ? entregaSelected.value : '';
  };

  const collectOrder = () => {
    const qtdeInput = document.getElementById('qtde');
    const qtd = Math.max(1, Number(qtdeInput?.value || 1));
    const clienteNome = getClienteNome();
    const pedidoNumero = getPedidoNumero();
    const extras = Array.from(document.querySelectorAll('.extra-row')).flatMap((row) => {
      const cb = row.querySelector('input[type="checkbox"]');
      const qty = row.querySelector('input[type="number"]');
      if (!cb?.checked) return [];
      const q = Math.max(1, Number(qty?.value || 1));
      const nome = cb.dataset.nome || '';
      const base = productIndex.get(nome);
      return nome ? [{ nome, q, selo: base?.selo, preco: base?.preco }] : [];
    });
    const pagamento = getPagamento();
    const entrega = getEntrega();
    const total = calcTotal(produto, qtd, extras);
    return { qtd, extras, pagamento, entrega, total, clienteNome, pedidoNumero };
  };

  const buildMessageText = () => {
    const { qtd, extras, pagamento, entrega, total, clienteNome, pedidoNumero } = collectOrder();
    const itens = [`➡ ${qtd}x ${produto.nome}`];
    if (extras.length) {
      extras.forEach((e) => itens.push(`➡ ${e.q}x ${e.nome}`));
    }

    const pagamentoIcon = pagamento?.toLowerCase().includes('pix')
      ? '📲'
      : pagamento?.toLowerCase().includes('cartão')
        ? '💳'
        : '💵';
    const entregaLabel = entrega
      ? (entrega.toLowerCase().includes('entrega') ? '🛵 Entrega' : '🛍️ Retirada')
      : '';

    const partes = [];
    if (pedidoNumero) partes.push(`Pedido nº ${pedidoNumero}`);
    if (clienteNome) partes.push(`Cliente: ${clienteNome}`);
    partes.push('', 'Itens:',...itens);
    if (pagamento) partes.push('', `${pagamentoIcon} ${pagamento}`);
    if (entregaLabel) partes.push('', entregaLabel);
    partes.push('', `Total: ${formatPrice(total)}`, '', 'Obrigado, a Charm agradece sua preferência! 💕');
    // Usa CRLF para forçar quebra de linha no WhatsApp (iOS gosta de \r\n).
    return partes.join('\r\n');
  };

  const buildMessage = () => encodeURIComponent(buildMessageText());

  const persistComanda = (texto) => {
    try {
      const raw = localStorage.getItem('comanda-list');
      const list = raw ? JSON.parse(raw) : [];
      const updated = [...list, { id: Date.now(), texto }].slice(-50);
      localStorage.setItem('comanda-list', JSON.stringify(updated));
    } catch (err) {
      console.error('Erro ao salvar comanda', err);
    }
  };

  modalBody.innerHTML = `
    <div class="img-shell" style="height:240px; margin-bottom: 1rem;">
      <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
    </div>
    <h3>${produto.nome}</h3>
    <p>${produto.descricao}</p>
    <div class="order-form">
      <label class="fancy-block">
        Nome do cliente
        <div class="input-chip">
          <span class="pill-label">Charm</span>
          <input id="cliente-nome" type="text" placeholder="Seu nome completo" autocomplete="name">
        </div>
        <small class="muted">Personalizamos seu pedido com seu nome.</small>
      </label>
      <label>
        Quantidade
        <input id="qtde" type="number" min="1" value="1">
      </label>
      <div class="extras">
        <p class="extras-title">Adicionar outros sabores Charm. 🍰</p>
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
          <span> 📲 PIX - (enviamos a chave na confirmação)</span>
        </label>
        <label class="payment-option">
          <input type="radio" name="pay-option" value="Cartão (crédito)">
          <span> 💳 Cartão - (crédito / mandamos o link de pagamento)</span>
        </label>
        <label class="payment-option">
          <input type="radio" name="pay-option" value="Dinheiro (preciso de troco)">
          <span> 💵 Dinheiro - (informar troco)</span>
        </label>
      </div>
      <div class="payments">
        <p class="extras-title">Entrega / Retirada</p>
        <label class="payment-option">
          <input type="radio" name="entrega-option" value="Entrega!">
          <span> 🛵 Entrega - (consultar taxa e informar endereço de entrega)</span>
        </label>
        <label class="payment-option">
          <input type="radio" name="entrega-option" value="Retirada">
          <span> 🛍️ Retirada </span>
        </label>
      </div>
      <label class="fancy-block">
        Número do pedido
        <div class="input-chip readonly">
          <span class="pill-label">Pedido</span>
          <input id="pedido-numero" type="text" placeholder="Nº 1234" inputmode="numeric" readonly aria-readonly="true">
        </div>
        <small class="muted">Geramos automaticamente para controle de entregas.</small>
      </label>
      <div class="total-line">
        <span>Total estimado</span>
        <strong id="total-valor"></strong>
      </div>
      <small class="muted" style="margin-top: -0.2rem;">Verificar disponibilidade do sabor escolhido.</small>
    </div>
    <div style="display:flex; gap:0.5rem; flex-direction:column;">
      <a
        id="cta-whatsapp"
        class="cta"
        style="width:100%; text-align:center;"
        href="${waBase}${buildMessage()}"
        target="_blank"
        rel="noopener noreferrer"
      >Pedir pelo WhatsApp</a>
    </div>
  `;

  const cta = modalBody.querySelector('#cta-whatsapp');
  const qtdeInput = modalBody.querySelector('#qtde');
  const clienteNomeInput = modalBody.querySelector('#cliente-nome');
  const pedidoNumeroInput = modalBody.querySelector('#pedido-numero');
  const extraChecks = modalBody.querySelectorAll('.extra-row input[type="checkbox"]');
  const extraQtys = modalBody.querySelectorAll('.extra-row input[type="number"]');
  const payRadios = modalBody.querySelectorAll('input[name="pay-option"]');
  const entregaRadios = modalBody.querySelectorAll('input[name="entrega-option"]');
  const totalValor = modalBody.querySelector('#total-valor');

  const syncLink = () => {
    if (!cta) return;
    const { total, clienteNome, pedidoNumero } = collectOrder();
    if (totalValor) totalValor.textContent = formatPrice(total);
    const pagamento = getPagamento();
    const entrega = getEntrega();
    const ready = Boolean(clienteNome && pedidoNumero && pagamento && entrega);
    if (ready) {
      cta.classList.remove('disabled');
      cta.removeAttribute('aria-disabled');
      cta.href = `${waBase}${buildMessage()}`;
    } else {
      cta.classList.add('disabled');
      cta.setAttribute('aria-disabled', 'true');
      cta.removeAttribute('href');
    }
  };

  qtdeInput?.addEventListener('input', syncLink);
  clienteNomeInput?.addEventListener('input', syncLink);
  extraChecks.forEach((cb, idx) => {
    const qty = extraQtys[idx];
    cb.addEventListener('change', () => {
      if (qty) qty.disabled = !cb.checked;
      syncLink();
    });
  });
  extraQtys.forEach((qty) => qty.addEventListener('input', syncLink));
  payRadios.forEach((rb) => rb.addEventListener('change', syncLink));
  entregaRadios.forEach((rb) => rb.addEventListener('change', syncLink));
  if (cta) {
    cta.addEventListener('click', (e) => {
      if (cta.classList.contains('disabled')) return;
      e.preventDefault();
      const msg = buildMessage();
      persistComanda(buildMessageText());
      // tenta abrir o app do WhatsApp; se não abrir, cai para o link web
      window.location.href = `${waAppBase}${msg}`;
      setTimeout(() => {
        window.location.href = `${waBase}${msg}`;
      }, 600);
    });
  }
  if (pedidoNumeroInput) pedidoNumeroInput.value = generateOrderNumber();
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

function calcTotal(produto, qtd, extras = []) {
  const base = getPreco(produto) * qtd;
  const extrasTotal = extras.reduce((sum, e) => sum + getPreco(e) * e.q, 0);
  return base + extrasTotal;
}

function getPreco(item) {
  if (!item) return 0;
  if (item.selo) {
    const parsed = parsePriceFromSelo(item.selo);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return Number(item.preco || 0);
}

function parsePriceFromSelo(selo = '') {
  // Converte "R$23,50" em 23.50
  const match = selo.match(/([0-9]+,[0-9]{2}|[0-9]+)/);
  if (!match) return NaN;
  const normalized = match[1].replace('.', '').replace(',', '.');
  return Number(normalized);
}
