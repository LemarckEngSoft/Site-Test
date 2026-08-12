# 📘 Guia de Deployment - Render

## Preparação para o Render

Este projeto está configurado para fazer deploy no [Render.com](https://render.com), uma plataforma moderna de hospedagem.

### ✅ O que foi preparado

- ✓ `render.yaml` — Configuração automática de deployment
- ✓ `package.json` — Dependências e scripts Node.js
- ✓ `server.js` — Servidor HTTP estático otimizado
- ✓ `.gitignore` — Exclusões de arquivo para versionamento
- ✓ Todos os assets (HTML, CSS, JS, imagens, vídeos)

### 🚀 Como fazer o deploy no Render

#### 1. Preparar o repositório GitHub
```bash
git add .
git commit -m "Preparar para deployment no Render"
git push origin main
```

#### 2. Conectar ao Render
1. Acesse [https://dashboard.render.com](https://dashboard.render.com)
2. Clique em **New +** → **Web Service**
3. Selecione seu repositório GitHub `Site-Test`
4. O Render detectará automaticamente o `render.yaml`

#### 3. Configurações automáticas
O Render aplicará automaticamente:
- **Nome do serviço:** `fisica-radiacao-portal`
- **Ambiente:** Node.js
- **Plano:** Free (ou superior, conforme necessário)
- **Porta:** 3000
- **Build command:** `npm install`
- **Start command:** `npm start`

#### 4. Deploy
Clique em **Create Web Service** e aguarde o deploy.

Seu site estará disponível em: `https://fisica-radiacao-portal.onrender.com`

---

## ⚙️ Detalhes técnicos

### Servidor (`server.js`)
- Serve arquivos estáticos com tipos MIME corretos
- Suporta HTML, CSS, JS, imagens (PNG, JPG, JFIF, etc.), vídeos, PDFs
- Redireciona automaticamente `/` para `/index.html`
- Implementa proteção contra directory traversal
- Cache HTTP otimizado para recursos estáticos

### Estrutura de arquivos esperada
```
Site-Test/
├── index.html          (entrada principal)
├── style.css           (estilos)
├── script.js           (scripts)
├── package.json        (configuração Node.js)
├── server.js           (servidor HTTP)
├── render.yaml         (configuração Render)
├── .gitignore          (exclusões)
├── images/             (imagens do site)
├── videos/             (vídeos do site)
├── documents/          (documentos)
└── [outros arquivos]   (assets)
```

---

## 🔧 Desenvolvimento local

Para testar localmente antes do deploy:

```bash
# Instalar dependências
npm install

# Rodar servidor local
npm start
```

Acesse `http://localhost:3000` no navegador.

---

## 📊 Monitoramento no Render

Após o deploy:
1. Acesse seu dashboard no [Render](https://dashboard.render.com)
2. Clique no serviço `fisica-radiacao-portal`
3. Visualize logs, métricas e status em tempo real

---

## ✨ Diferenciais

- **Sem custo de build:** Render não cobra por builds com plano free
- **HTTPS automático:** Certificado SSL incluído
- **Redeploy automático:** Cada push para `main` faz deploy automaticamente
- **Customizável:** Upgrade para plano pago se precisar de mais recursos

---

## 📞 Suporte

- Documentação Render: https://render.com/docs
- GitHub Issues: Use para reportar problemas
- Email: contact@lemarckengsoft.com

**Bon voyage! 🚀**
