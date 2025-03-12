<script setup lang="ts">
import SnakeGame from './components/SnakeGame.vue'
</script>

<template>
  <div class="app">
    <h1>Snake Game</h1>
    <SnakeGame />
  </div>
</template>

<style>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #fafafa;
}

h1 {
  color: #4CAF50;
  margin-bottom: 20px;
}
</style>
