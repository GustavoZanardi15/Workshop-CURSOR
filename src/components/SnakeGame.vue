<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSnakeGame } from '../composables/useSnakeGame'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
const { startGame } = useSnakeGame()
const canvasRef = ref<HTMLCanvasElement | null>(null)

const CELL_SIZE = 25
const GRID_SIZE = 20

const drawGame = () => {
  const ctx = canvasRef.value?.getContext('2d')
  if (!ctx) return

  // Limpar canvas
  ctx.clearRect(0, 0, CELL_SIZE * GRID_SIZE, CELL_SIZE * GRID_SIZE)

  // Desenhar grade sutil
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)'
  for (let i = 0; i <= GRID_SIZE; i++) {
    ctx.beginPath()
    ctx.moveTo(i * CELL_SIZE, 0)
    ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, i * CELL_SIZE)
    ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE)
    ctx.stroke()
  }

  // Desenhar cobra com gradiente
  gameStore.snake.forEach((segment, index) => {
    const gradient = ctx.createLinearGradient(
      segment.x * CELL_SIZE,
      segment.y * CELL_SIZE,
      (segment.x + 1) * CELL_SIZE,
      (segment.y + 1) * CELL_SIZE
    )
    gradient.addColorStop(0, '#388E3C')
    gradient.addColorStop(1, '#2E7D32')
    
    ctx.fillStyle = gradient
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
    ctx.shadowBlur = 4
    ctx.fillRect(
      segment.x * CELL_SIZE + 1,
      segment.y * CELL_SIZE + 1,
      CELL_SIZE - 2,
      CELL_SIZE - 2
    )
    ctx.shadowBlur = 0
    
    // Desenhar olhos na cabeça da cobra
    if (index === 0) {
      ctx.fillStyle = 'white'
      const eyeSize = 6
      const eyeOffset = CELL_SIZE / 4
      
      // Olhos brancos
      ctx.fillRect(
        segment.x * CELL_SIZE + eyeOffset,
        segment.y * CELL_SIZE + eyeOffset,
        eyeSize,
        eyeSize
      )
      ctx.fillRect(
        segment.x * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize,
        segment.y * CELL_SIZE + eyeOffset,
        eyeSize,
        eyeSize
      )
      
      // Pupilas pretas
      ctx.fillStyle = 'black'
      const pupilSize = 3
      ctx.fillRect(
        segment.x * CELL_SIZE + eyeOffset + 2,
        segment.y * CELL_SIZE + eyeOffset + 2,
        pupilSize,
        pupilSize
      )
      ctx.fillRect(
        segment.x * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize + 2,
        segment.y * CELL_SIZE + eyeOffset + 2,
        pupilSize,
        pupilSize
      )
    }
  })

  // Desenhar comida com gradiente
  const foodGradient = ctx.createRadialGradient(
    gameStore.food.x * CELL_SIZE + CELL_SIZE / 2,
    gameStore.food.y * CELL_SIZE + CELL_SIZE / 2,
    2,
    gameStore.food.x * CELL_SIZE + CELL_SIZE / 2,
    gameStore.food.y * CELL_SIZE + CELL_SIZE / 2,
    CELL_SIZE / 2
  )
  foodGradient.addColorStop(0, '#FF5252')
  foodGradient.addColorStop(1, '#D32F2F')
  
  ctx.fillStyle = foodGradient
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
  ctx.shadowBlur = 8
  ctx.beginPath()
  ctx.arc(
    gameStore.food.x * CELL_SIZE + CELL_SIZE / 2,
    gameStore.food.y * CELL_SIZE + CELL_SIZE / 2,
    CELL_SIZE / 2 - 2,
    0,
    Math.PI * 2
  )
  ctx.fill()
  ctx.shadowBlur = 0

  // Continuar animação
  if (!gameStore.isGameOver) {
    requestAnimationFrame(drawGame)
  } else {
    // Desenhar tela de game over
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.fillRect(0, 0, CELL_SIZE * GRID_SIZE, CELL_SIZE * GRID_SIZE)
    ctx.fillStyle = '#FFF'
    ctx.font = '30px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(
      'Game Over!',
      (CELL_SIZE * GRID_SIZE) / 2,
      (CELL_SIZE * GRID_SIZE) / 2
    )
    ctx.font = '20px Arial'
    ctx.fillText(
      `Score: ${gameStore.score}`,
      (CELL_SIZE * GRID_SIZE) / 2,
      (CELL_SIZE * GRID_SIZE) / 2 + 40
    )
  }
}

const restartGame = () => {
  gameStore.reset()
  startGame()
  drawGame()
}

onMounted(() => {
  drawGame()
})
</script>

<template>
  <div class="game-container">
    <div class="score">Score: {{ gameStore.score }}</div>
    <div class="canvas-wrapper">
      <canvas
        ref="canvasRef"
        :width="CELL_SIZE * GRID_SIZE"
        :height="CELL_SIZE * GRID_SIZE"
        class="game-canvas"
      />
    </div>
    <button
      v-if="gameStore.isGameOver"
      @click="restartGame"
      class="restart-button"
    >
      Play Again
    </button>
  </div>
</template>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(135deg,rgb(20, 104, 230) 0%, #e4e8eb 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.score {
  font-size: 32px;
  font-weight: bold;
  color:rgb(45, 108, 128);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.canvas-wrapper {
  padding: 10px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.game-canvas {
  border: 4px solidrgb(32, 112, 126);
  border-radius: 8px;
  background-color: #f8f9fa;
}

.restart-button {
  padding: 12px 32px;
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(145deg,rgb(42, 113, 122),rgb(11, 58, 97));
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(31, 73, 83, 0.3);
}

.restart-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(27, 71, 107, 0.4);
  background: linear-gradient(145deg,rgb(146, 197, 193),rgb(70, 132, 143));
}

.restart-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(16, 31, 63, 0.3);
}
</style> 