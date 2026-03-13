# JobTracker

JobTracker é uma aplicação simples para **organizar e acompanhar candidaturas de emprego**.
O objetivo do projeto é permitir que o usuário registre vagas, acompanhe o status do processo seletivo e mantenha anotações importantes sobre cada candidatura.

O projeto foi desenvolvido como prática de **Next.js com API routes e Prisma**, utilizando um banco SQLite para persistência de dados.

---

## 🚀 Tecnologias Utilizadas

* **Next.js** – Framework React para frontend e backend
* **React** – Interface do usuário
* **Prisma ORM** – Acesso e gerenciamento do banco de dados
* **SQLite** – Banco de dados local
* **TailwindCSS** – Estilização da interface
* **shadcn/ui** – Componentes de interface
* **Sonner** – Sistema de notificações (toast)
* **Lucide Icons** – Ícones

---

## 📌 Funcionalidades

* Adicionar novas candidaturas
* Listar todas as vagas cadastradas
* Definir status da candidatura
* Adicionar link da vaga
* Adicionar notas sobre o processo seletivo
* Validação de formulário
* Notificações de sucesso ou erro
* Ordenação por data de criação

---

## 📊 Estrutura de Dados

Modelo principal utilizado no banco:

```ts
model Job {
  id        String   @id @default(uuid())
  company   String
  role      String
  status    String
  link      String?
  notes     String?
  createdAt DateTime @default(now())
}
```

---

## ⚙️ Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/jobtracker.git
```

Entre na pasta do projeto:

```bash
cd jobtracker
```

Instale as dependências:

```bash
npm install
```

---

## 🗄 Configuração do Banco

Gerar o cliente Prisma:

```bash
npx prisma generate
```

Criar o banco de dados e aplicar as migrations:

```bash
npx prisma migrate dev
```

---

## ▶️ Executar o Projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em:

```
http://localhost:3000
```

---

## 📡 API

A aplicação possui rotas de API integradas ao Next.js.

### Listar vagas

```
GET /api/jobs
```

### Criar nova vaga

```
POST /api/jobs
```

Body:

```json
{
  "company": "Google",
  "role": "Software Engineer",
  "status": "applied",
  "link": "https://jobs.google.com",
  "notes": "Enviar portfólio junto"
}
```

---

## 📁 Estrutura Simplificada

```
/app
  /api
    /jobs
      route.ts
  page.tsx

/lib
  prisma.ts

/prisma
  schema.prisma
```

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido como exercício prático para:

* Trabalhar com **Next.js fullstack**
* Utilizar **Prisma ORM**
* Criar **APIs simples**
* Implementar **validação e feedback de UI**
* Praticar **organização de código em aplicações modernas**

---

## 📌 Melhorias Futuras

* Edição de vagas
* Remoção de candidaturas
* Filtros por status
* Busca por empresa ou cargo
* Dashboard com estatísticas
* Autenticação de usuário

---

## 👨‍💻 Autor

Lucas Ladeira
