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

const playerToLog = () => {
        playerLog.value.push({ round: playerRound.value, score: playerScore.value, time: sumTimes.value })
}

let gameRoundPointer = 0
const traceButtonIndex = ref(-1)
const traces = []

const start = () => {
  showGamePage.value = true
  showHomePage.value = false
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

const displayTrace = () => {
  isPlaying = false
  playerTimer()
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
    if (gameRoundPointer > playerScore.value) {
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

const calculateScore = () => {
        // Temp....

        // if (playerLog.score < 5 && timeCounter.value >= 10) {

        // } else if (playerLog.score < 15 && timeCounter.value >= 20) {

        // } else if (playerLog.score < 20 && timeCounter.value >= 30) {

        // }
}
</script>

<template>
  <div>
    <h3>Round : {{ round }}</h3>
  </div>
  <div class="w-full h-full">
    <section v-if="showHomePage" class="flex flex-col h-screen">
      <div
        class="max-w-screen-lg mx-auto flex flex-col gap-20 items-center justify-center h-screen px-4 md:flex-row"
      >
        <div class="flex flex-col justify-center">
          <h1 class="text-2xl sm:text-7xl font-bold text-white">Simon Says</h1>
          <span class="countdown font-mono text-2xl"
            >{{ secondUint }} : {{ firstUint }}</span
          >
          <p class="text-gray-400 py-4 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas quos
            et vel recusandae illum, voluptates iusto deleniti dolorem obcaecati
            similique optio adipisci assumenda dignissimos, quo quisquam eaque
            rerum! Et, molestias?
          </p>
        </div>

        <div class="">
          <img
            src="https://cdn.discordapp.com/attachments/1196805209381404682/1200079939706302576/Z.png?ex=65c4e08a&is=65b26b8a&hm=7b9c6f2bf49d2006dac6f93cfc10ce7daefa398d3f0f61ed0090bdc2e90552a6&"
            alt="mr.Simon"
            class="rounded-2xl size-96 items-center"
          />
        </div>
      </div>

      <div class="flex justify-center">
        <button
          @click="togglePopupMode"
          class="btn btn-primary text-white w-20 h-10"
        >
          PLAY
        </button>
      </div>

      <div class="flex justify-end m-5">
        <button
          @click="togglePopupTutorial"
          class="btn btn-circle btn-info btn-outline text-white size-auto"
        >
          Tutorial
        </button>
      </div>
    </section>

    <!-- mode and size -->
    <section
      v-if="showPopupMode"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="w-80 h-80 bg-white rounded-lg flex flex-col justify-center items-center"
      >
        <div class="text-center">
          <h3 class="text-xl font-bold">Select Mode</h3>
          <div class="">
            <div>mode1</div>
            <div>mode2</div>
            <div>mode3</div>
          </div>
        </div>

        <div class="text-center">
          <h3 class="text-xl font-bold">Select Size</h3>
          <div class="">
            <div>Size1</div>
            <div>Size2</div>
            <div>Size3</div>
          </div>
        </div>

        <button @click="start" class="btn btn-primary text-white w-20 h-10">
          PLAY
        </button>

        <!-- <button
          @click="togglePopupMode"
          class="btn btn-warning  text-white px-4 py-2 mt-4"
        >
          Close
        </button> -->
      </div>
    </section>

    <!-- Tutorial pop-up -->
    <section
      v-if="showPopupTutorial"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="w-80 text-center bg-white p-8 rounded-lg">
        <h1 class="text-2xl font-bold mb-4">This is a tutorial</h1>

        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          incidunt mollitia alias enim! Hic pariatur, nisi magnam, accusamus
          excepturi corporis dolorum, libero eos aspernatur sequi totam odio ab
          recusandae facilis?
        </div>

        <button
          @click="togglePopupTutorial"
          class="btn btn-warning text-white px-4 py-2 mt-4"
        >
          Close
        </button>
      </div>
    </section>

    <!-- game page -->
    <section
      v-if="showGamePage"
      class="min-h-screen flex flex-col items-center justify-center"
    >
      <h1 class="font-bold text-5xl py-20">Simon Says</h1>
      <main class="grid grid-cols-2 gap-x-5 gap-y-5 w-96 sm:h-96 max-sm:w-80">
        <button
          v-for="buttonNumber in buttons"
          :class="showTraceState(buttonNumber.number)"
          :key="buttonNumber"
          :id="buttonNumber.number"
          class="rounded-md h-44 hover:brightness-90 active:brightness-150"
        ></button>
      </main>
      <button
        class="btn btn-primary mt-20 max-sm:size-"
        @click="displayTrace"
        :disabled="isPlaying"
      >
        Start
      </button>
    </section>
  </div>
</template>

<style scoped></style>
