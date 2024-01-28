<script setup>
import { ref } from 'vue'

const playerLog = ref([]) //[{score: x, round: x}]
const playerScore = ref(0)

const scoreCounting = () => { return playerScore++ }
const playerToLog = () => { playerLog.push({score: playerScore, round: playerScore}) }

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
</template>

<style scoped>
.whitebtn {
  background-color: white;
}</style>