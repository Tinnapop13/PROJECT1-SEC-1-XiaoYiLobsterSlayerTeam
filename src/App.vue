<script setup>


import {ref, reactive} from "vue"


const playerLog = ref([]) //[{score: x, round: x}]
const playerScore = ref(1)
const scoreCounting = () => {
  return playerScore.value++
}
const playerToLog = () => {
  playerLog.push({score: playerScore, round: playerScore})
}

let gameRoundPointer = 0
const traceButtonIndex = ref(-1)
const traces = []

const displayTrace = () => {
  const gameInterval = setInterval(() => {
    const randomButtonId = randomNumber(4)

    setTimeout(() => {
      if(gameRoundPointer < playerScore.value){
        traceButtonIndex.value = traces[gameRoundPointer-1]
      }
      else{
        traceButtonIndex.value = randomButtonId
        traces.push(traceButtonIndex.value)
        console.log(traces);
      }
      console.log(gameRoundPointer);
      
      
    }, 500)

    setTimeout(() => {
      traceButtonIndex.value = -1
      
    }, 750)

    gameRoundPointer++
    if (gameRoundPointer > playerScore.value) {
      clearInterval(gameInterval)
      gameRoundPointer = 0
      playerScore.value++
    }

  }, 750)
  
  
}

const randomNumber = (max) => {
  return Math.floor(Math.random() * max)
}

const buttons = reactive([
  {number: 0, color: "bg-[#FF0000]"},
  {number: 1, color: "bg-[#228B22]"},
  {number: 2, color: "bg-[#0000FF]"},
  {number: 3, color: "bg-[#FFFF00]"},
])

const showTraceState = (buttonNumber) => {
  return {
    "bg-[#fff]": traceButtonIndex.value === buttonNumber,
    [buttons[buttonNumber].color]: traceButtonIndex.value !== buttonNumber,
    }
  
}
</script>

<template>

  <div class="w-full h-full">
    <section class="min-h-screen flex flex-col items-center justify-center">
      <h1 class="font-bold text-5xl py-20">Simon Says</h1>
      <main class="grid grid-cols-2 auto-rows-auto gap-x-5 gap-y-5 w-96 h-96">
        <button
          v-for="buttonNumber in buttons"
          :class="showTraceState(buttonNumber.number)"
          :key="buttonNumber"
          class="rounded-md h-44 hover:brightness-90"
        ></button>
      </main>
      <button class="btn btn-primary mt-10" @click="displayTrace">Start</button>
    </section>
  </div>

</template> 

<style scoped>
</style>
