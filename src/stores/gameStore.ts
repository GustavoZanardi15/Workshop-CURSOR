import { defineStore } from 'pinia'
import type { GameState, Position, Direction } from '../types/game'

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    snake: [{ x: 10, y: 10 }],
    food: { x: 5, y: 5 },
    direction: 'RIGHT',
    score: 0,
    isGameOver: false
  }),

  actions: {
    setDirection(direction: Direction) {
      // Previne movimento na direção oposta
      const opposites = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT'
      }
      
      if (opposites[direction] !== this.direction) {
        this.direction = direction
      }
    },

    spawnFood() {
      const gridSize = 20
      let newFood: Position
      
      do {
        newFood = {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize)
        }
      } while (this.snake.some(segment => 
        segment.x === newFood.x && segment.y === newFood.y
      ))

      this.food = newFood
    },

    reset() {
      this.snake = [{ x: 10, y: 10 }]
      this.direction = 'RIGHT'
      this.score = 0
      this.isGameOver = false
      this.spawnFood()
    }
  }
}) 