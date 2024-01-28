<script setup>
import { ref } from "vue"

const playerScore = ref(1)
let gameRoundPointer = 0
let traceButtonIndex = ref(-1)

const displayTrace = () => {
  const gameInterval = setInterval(() => {
    const randomButtonId = randomNumber(4)
    setTimeout(() => {traceButtonIndex.value = randomButtonId},500)
    setTimeout(() => {traceButtonIndex.value = -1},750)
    gameRoundPointer++
    if (gameRoundPointer >= playerScore.value) {
      clearInterval(gameInterval)
      gameRoundPointer = 0
    }
  },750)
}

const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
}

const showTraceState = (buttonNumber)=>{
  return {
        'whitebtn': traceButtonIndex.value === buttonNumber,
  }
}

</script>

<template>
   <div class="flex  justify-center items-center">
    <button class="btn btn-square btn-outline m-2" :class="showTraceState(0)"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24"
        stroke="currentColor"></svg></button>
    <button class="btn btn-square btn-outline m-2" :class="showTraceState(1)"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24"
        stroke="currentColor"></svg></button>
  </div>

  <div class="flex  justify-center items-center">
    <button class="btn btn-square btn-outline m-2 " :class="showTraceState(2)"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24"
        stroke="currentColor"></svg></button>
    <button class="btn btn-square btn-outline m-2" :class="showTraceState(3)"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24"
        stroke="currentColor"></svg></button>
    </div>

  <div class="flex justify-center">
    <button class="btn btn-outline btn-accent text-center" @click="mainGame">Start</button>
  </div>
  

</template>

<style scoped>
.whitebtn {
  background-color: white;
}</style>  
