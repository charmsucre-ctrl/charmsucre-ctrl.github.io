# Deploy rápido: Cloudflare Pages + Access

## O que você vai fazer
- Subir este site (pasta `site-doces/`) no Cloudflare Pages.
- Proteger somente o caminho `/admin/*` com Cloudflare Access (login por e-mail / magic link).
- Deixar o restante do site público no mesmo domínio.

## Passo a passo

### 1) Conta e login
1. Acesse https://dash.cloudflare.com/ e crie/login na sua conta.

### 2) Criar o projeto no Pages
1. No painel, menu lateral: **Pages** → **Create a project**.
2. Escolha **Upload assets** (mais fácil sem Git). 
3. Faça upload do conteúdo da pasta `site-doces/` (todos os arquivos, incluindo `admin/`).
4. Build command: deixe vazio (none). Output directory: deixe vazio também (raiz do upload).
5. Finalize. Você terá uma URL do tipo `https://<seu-projeto>.pages.dev`.

### 3) Proteger `/admin/*` com Access
1. No painel, menu: **Zero Trust** (ou **Access**) → **Applications** → **Add an application**.
2. Tipo: **Self-hosted**.
3. Nome: "Admin Charm" (ou o que quiser).
4. Domain: coloque seu domínio do Pages (ex.: `seu-projeto.pages.dev`). Path: `/admin/*`.
5. Policy: **Allow** apenas para seu e-mail. Em **Include**, escolha **Emails** e adicione seu endereço.
6. Salve. O Access vai pedir login (magic link/OTP) quando alguém abrir `/admin`.

### 4) Testar
1. Abra `https://<seu-projeto>.pages.dev/` → site público.
2. Abra `https://<seu-projeto>.pages.dev/admin/` → deve aparecer a tela de login do Access. Faça login com seu e-mail.

### 5) (Opcional) Domínio próprio
1. No projeto Pages, adicione um domínio custom (CNAME apontando para o Pages, o painel mostra o alvo).
2. Ajuste a aplicação Access para o domínio custom e path `/admin/*`.

## Notas
- Access é gratuito para 1 usuário, suficiente para seu uso.
- Se futuramente quiser listar pedidos na página admin, será preciso um backend (ex.: Firestore/Supabase). Por enquanto, `/admin` é só para ser restrita.
