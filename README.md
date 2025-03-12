# 🐍 Snake Game em Vue.js

Um jogo da cobrinha (Snake Game) moderno desenvolvido com Vue.js, TypeScript e Vite.

---

## 📋 Pré-requisitos
- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

---

## 🚀 Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/GustavoZanardi15/Workshop-CURSOR.git
   cd Workshop-CURSOR
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Instale o Pinia (gerenciamento de estado):
   ```sh
   npm install pinia
   ```

---

## ▶️ Como Rodar
Para iniciar o jogo em modo de desenvolvimento, execute:
```sh
npm run dev
```
O jogo estará disponível em: [http://localhost:5173](http://localhost:5173)

---

## 🎮 Como Jogar
- **Use as teclas WASD para controlar a cobra:**
  - `W` → Mover para cima
  - `A` → Mover para esquerda
  - `S` → Mover para baixo
  - `D` → Mover para direita
- **Objetivo:**
  - Colete as comidas (círculos vermelhos) para crescer e aumentar sua pontuação.
  - Evite colidir com as paredes ou com o próprio corpo.
- **Para reiniciar:**
  - Pressione **"Play Again"** quando perder.

---

## 🛠️ Tecnologias Utilizadas
- Vue.js 3
- TypeScript
- Vite
- Pinia (gerenciamento de estado)
- HTML5 Canvas

---

## 📁 Estrutura do Projeto
```
src/
├── components/
│   └── SnakeGame.vue
├── composables/
│   └── useSnakeGame.ts
├── stores/
│   └── gameStore.ts
├── types/
│   └── game.ts
├── App.vue
└── main.ts
```

---

## ⚙️ Configurações Personalizadas
- **Velocidade inicial:** 200ms
- **Tamanho do grid:** 20x20
- **Tamanho da célula:** 25px
- **A velocidade aumenta gradualmente conforme você coleta comidas.**

---

## 🎨 Características Visuais
- Design moderno com gradientes
- Efeitos de sombra
- Grid sutil no fundo
- Animações suaves
- Interface responsiva
- Cobra com olhos animados
- Comida com efeito de brilho

---

## 🤝 Contribuindo
Sinta-se à vontade para contribuir com o projeto. Abra uma **issue** ou envie um **pull request**!

---

## 📝 Licença
Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.
