import { ref, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '../stores/gameStore'

export function useSnakeGame() {
  const gameStore = useGameStore()
  const gameSpeed = ref(200)
  let gameLoop: number

  const moveSnake = () => {
    const head = { ...gameStore.snake[0] }
    
    switch (gameStore.direction) {
      case 'UP':
        head.y -= 1
        break
      case 'DOWN':
        head.y += 1
        break
      case 'LEFT':
        head.x -= 1
        break
      case 'RIGHT':
        head.x += 1
        break
    }

    // Verificar colisão com as paredes
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
      gameStore.isGameOver = true
      return
    }

    // Verificar colisão com o próprio corpo
    if (gameStore.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      gameStore.isGameOver = true
      return
    }

    // Adicionar nova cabeça
    gameStore.snake.unshift(head)

    // Verificar se comeu a comida
    if (head.x === gameStore.food.x && head.y === gameStore.food.y) {
      gameStore.score += 10
      gameStore.spawnFood()
      // Diminuir a taxa de aceleração
      gameSpeed.value = Math.max(100, gameSpeed.value - 2)
    } else {
      // Remover último segmento se não comeu
      gameStore.snake.pop()
    }
  }

  const startGame = () => {
    if (!gameStore.isGameOver) {
      gameLoop = window.setInterval(() => {
        moveSnake()
      }, gameSpeed.value)
    }
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key.toLowerCase()) {
      case 'w':
        gameStore.setDirection('UP')
        break
      case 's':
        gameStore.setDirection('DOWN')
        break
      case 'a':
        gameStore.setDirection('LEFT')
        break
      case 'd':
        gameStore.setDirection('RIGHT')
        break
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyPress)
    startGame()
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
    clearInterval(gameLoop)
  })

  return {
    gameSpeed,
    startGame
  }
} 