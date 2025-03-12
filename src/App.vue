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
  color:rgb(53, 108, 179);
  margin-bottom: 20px;
}
</style>
