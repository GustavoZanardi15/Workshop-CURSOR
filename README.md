🐍 Snake Game em Vue.js
Um jogo da cobrinha (Snake Game) moderno desenvolvido com Vue.js, TypeScript e Vite.
📋 Pré-requisitos
Node.js (versão 14 ou superior)
npm (gerenciador de pacotes do Node.js)
🚀 Instalação
Clone o repositório:
git clone "https://github.com/GustavoZanardi15/Workshop-CURSOR.git"
cd Workshop-CURSOR

Instale as dependências:
npm install

Instale o Pinia (gerenciamento de estado):
npm install pinia

Como Rodar
Para iniciar o jogo em modo de desenvolvimento:
npm run dev

O jogo estará disponível em http://localhost:5173
🎮 Como Jogar
Use as teclas WASD para controlar a cobra:
W: Mover para cima
A: Mover para esquerda
S: Mover para baixo
D: Mover para direita
Colete as comidas (círculos vermelhos) para crescer e aumentar sua pontuação
Evite colidir com as paredes ou com o próprio corpo
Pressione "Play Again" para reiniciar quando perder
🛠️ Tecnologias Utilizadas
Vue.js 3
TypeScript
Vite
Pinia (gerenciamento de estado)
HTML5 Canvas

📁 Estrutura do Projeto
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



