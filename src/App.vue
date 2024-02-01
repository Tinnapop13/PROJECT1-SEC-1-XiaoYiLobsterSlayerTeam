<script setup>

import {ref, reactive} from "vue"

const playerLog = ref([])
const isEndPopup = ref(false)
const playerScore = ref(1)
const playerRound = ref(0)
const sumTimes = ref(0)
const round = ref(1)

const defaultTimes = ref(59)

const firstUint = ref(defaultTimes.value)
const secondUint = ref(defaultTimes.value)

const scoreCounting = () => {
        return playerScore.value++
}

const playerToLog = () => {
        playerLog.value.push({ round: playerRound.value, score: playerScore.value, time: sumTimes.value })

}

let gameRoundPointer = 0
const traceButtonIndex = ref(-1)
const traces = []


const displayTrace = () => {
  isPlaying = false
  const gameInterval = setInterval(() => {
    const randomButtonId = randomNumber(4)

    setTimeout(() => {
      if(gameRoundPointer < round.value){
        traceButtonIndex.value = traces[gameRoundPointer-1]
        
      }
      else{
        traceButtonIndex.value = randomButtonId
        traces.push(traceButtonIndex.value)
       
      }
      
      
      
    }, 500)

    setTimeout(() => {
      traceButtonIndex.value = -1
      
      
    }, 750)

    gameRoundPointer++
    if (gameRoundPointer > round.value) {
      console.log(traces)
      clearInterval(gameInterval)
      gameRoundPointer = 0
      isPlaying = true
      
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

const logLst = []
let logIndex = 0
let isPlaying = false

const playerClick = (event) => {
  let itemClick = Number(event.target.id)
  traceButtonIndex.value = itemClick
  logLst.push(itemClick)
  setTimeout(() => {
    traceButtonIndex.value = -1
  }, 100)
  if(logLst[logIndex] === traces[logIndex] ){
    logIndex++
    if( logLst.length === traces.length ){
      logLst.splice(0,logLst.length) // reset Array
      logIndex = 0
      round.value++
      displayTrace()
    }
  }
  else{
    console.log('lose')
    logLst.splice(0,logLst.length) // reset Array
    traces.splice(0,traces.length) // reset Array
    logIndex = 0
    round.value = 0
    isPlaying = false
  }


const playerTimer = () => {
        const timer = setInterval(() => {
                firstUint.value--

                if (firstUint.value < 10) firstUint.value = `0${firstUint.value}`

                if (firstUint.value == 0) {
                        secondUint.value--
                        if (secondUint.value < 10) secondUint.value = `0${secondUint.value}`
                        firstUint.value = 59
                }

                if (secondUint.value == 0) {
                        clearInterval(timer)
                        sumTimes.value = `${secondUint.value}:${firstUint.value}`
                        playerToLog()
                        console.log(playerLog.value)
                        firstUint.value = defaultTimes.value
                        secondUint.value = defaultTimes.value
                        isEndPopup.value = true
                }
        }, 1000)
}

const calculateScore = () => {
        // Temp....

        // if (playerLog.score < 5 && timeCounter.value >= 10) {

        // } else if (playerLog.score < 15 && timeCounter.value >= 20) {

        // } else if (playerLog.score < 20 && timeCounter.value >= 30) {

        // }
}



</script>

<template>

  <div><h3>Round : {{ round }}</h3></div>
  <div class="w-full h-full">
    <section class="min-h-screen flex flex-col items-center justify-center">
    <span class="countdown font-mono text-2xl">{{ secondUint }} : {{ firstUint }}</span>
      <h1 class="font-bold text-5xl py-20">Simon Says</h1>
      <main class="grid grid-cols-2 auto-rows-auto gap-x-5 gap-y-5 w-96 h-96">
        <button
          v-for="buttonNumber in buttons"
          :class="showTraceState(buttonNumber.number) "
          :key="buttonNumber"
          class="rounded-md h-44 hover:brightness-90" @click="playerClick"
          :id="buttonNumber.number"
          :disabled="!isPlaying"
        ></button>
      </main>
      <button class="btn btn-primary mt-10" @click="displayTrace" :disabled="isPlaying">Start</button>
    </section>
  </div>
  
          
  
</template> 





<style scoped>

</style>

