<script setup>
import {ref, reactive} from "vue"

const showHomePage = ref(true)
const showGamePage = ref(false)
const showPopupTutorial = ref(false)

const showProgressBar = ref(false)

const playerLog = ref([])
const isEndPopup = ref(false)
const playerScore = ref(1)
const playerRound = ref(0)
const sumTimes = ref(0)
const round = ref(1)

const defaultTimes = ref(59)

const togglePopupTutorial = () => {
  showPopupTutorial.value = !showPopupTutorial.value
}

const startToggle = () => {
  showGamePage.value = true
  showHomePage.value = false

  showProgressBar.value = true
  moveProgress()
  progressBarShow()
}

const progressBarShow = () => {
  setTimeout(() => {
    showProgressBar.value = false
  }, 1001)
}

const firstUint = ref(defaultTimes.value)
const secondUint = ref(defaultTimes.value)

const playerToLog = () => {
  playerLog.value.push({
    round: playerRound.value,
    score: playerScore.value,
    time: sumTimes.value,
  })
}

let gameRoundPointer = 0
const traceButtonIndex = ref(-1)
const traces = []

const displayTrace = () => {
  isPlaying = true
  playerTimer()
  const gameInterval = setInterval(() => {
    const randomButtonId = randomNumber(4)

    setTimeout(() => {
      if (gameRoundPointer < round.value) {
        traceButtonIndex.value = traces[gameRoundPointer - 1]
      } else {
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
  if (logLst[logIndex] === traces[logIndex]) {
    logIndex++
    if (logLst.length === traces.length) {
      logLst.splice(0, logLst.length) // reset Array
      logIndex = 0
      round.value++
      displayTrace()
    }
  } else {
    console.log("lose")
    logLst.splice(0, logLst.length) // reset Array
    traces.splice(0, traces.length) // reset Array
    logIndex = 0
    round.value = 0
    isPlaying = false
  }
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

const i = ref(0)
const progressBarWidth = ref(0)

const moveProgress = () => {
  if (i.value === 0) {
    i.value = 1
    let width = 1
    const id = setInterval(() => {
      if (width >= 100) {
        clearInterval(id)
        i.value = 0
      } else {
        width++
        progressBarWidth.value = `${width}%`
      }
    }, 10)
  }
}
</script>

<template>
  <section v-if="showHomePage" class="flex flex-col max-h-screen">
    <div
      class="max-w-screen-2xl h-screen mx-auto flex flex-row gap-10 items-center justify-center max-sm:flex-col"
    >
      <div class="">
        <h1
          class="text-2xl sm:text-7xl font-bold text-white max-sm:text-center"
        >
          Simon Says
        </h1>

        <p class="text-gray-400 py-4 max-w-xl max-sm:mx-10">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas quos et
          vel recusandae illum, voluptates iusto deleniti dolorem obcaecati
          similique optio adipisci assumenda dignissimos, quo quisquam eaque
          rerum! Et, molestias?
        </p>
      </div>

      <div class="">
        <img
          src="https://cdn.discordapp.com/attachments/1196805209381404682/1203349161668247602/e6accda7-92b1-47e8-b317-1a6da0333512-removebg-preview.png?ex=65d0c53d&is=65be503d&hm=e6fd7ceaf9b3593b122400a06073c93a7ece7d9009b08583f5b14bc18ce53916&"
          alt="mr.Simon"
          class="rounded-3xl size-[30rem] items-center max-sm:rounded-full max-sm:size-56"
        />
      </div>
    </div>

    <div class="flex justify-center">
      <button
        @click="startToggle"
        class="btn btn-primary bg-orange-500 rounded-3xl text-white size-20 max-sm:size-14"
      >
        PLAY
      </button>
    </div>

    <div class="flex justify-end m-5">
      <button
        @click="togglePopupTutorial"
        class="btn btn-circle btn-primary bg-blue-400 text-white size-14"
      >
        Tutorial
      </button>
    </div>
  </section>

  <!-- Tutorial pop-up -->
  <section
    v-if="showPopupTutorial"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="w-full sm:w-96 lg:w-1/2 text-center bg-white p-8 rounded-lg">
      <h1 class="text-2xl font-bold mb-4">This is a tutorial</h1>

      <div class="mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
        incidunt mollitia alias enim! Hic pariatur, nisi magnam, accusamus
        excepturi corporis dolorum, libero eos aspernatur sequi totam odio ab
        recusandae facilis?
      </div>

      <button
        @click="togglePopupTutorial"
        class="btn btn-warning text-white px-4 py-2"
      >
        Close
      </button>
    </div>
  </section>

  <!-- progress bar -->
  <section
    v-if="showProgressBar"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="w-64 bg-gray-300 rounded-md">
      <div
        class="w-[1%] h-8 bg-gradient-to-r from-red-500 from-10% via-green-500 via-30% to-blue-500 to-90% rounded-md"
        :style="{width: progressBarWidth}"
      ></div>
    </div>
  </section>

  <!-- game page -->
  <section
    v-if="showGamePage"
    class="h-full flex flex-col gap-5 items-center justify-center"
  >
    <h3 class="text-3xl">Round : {{ round }}</h3>

    <img
      src="https://cdn.discordapp.com/attachments/1196805209381404682/1203349161668247602/e6accda7-92b1-47e8-b317-1a6da0333512-removebg-preview.png?ex=65d0c53d&is=65be503d&hm=e6fd7ceaf9b3593b122400a06073c93a7ece7d9009b08583f5b14bc18ce53916&"
      class="w-48 rounded-full"
    />
    <span class="countdown font-mono text-2xl"
      >{{ secondUint }} : {{ firstUint }}</span
    >
    <main class="h-full grid grid-cols-2 gap-x-5 gap-y-5 w-96">
      <button
        v-for="buttonNumber in buttons"
        :class="showTraceState(buttonNumber.number)"
        :key="buttonNumber"
        :id="buttonNumber.number"
        class="rounded-md h-44 hover:brightness-90 active:brightness-150"
        @click="playerClick"
      ></button>
    </main>
    <button class="btn btn-primary" @click="displayTrace" :disabled="isPlaying">
      Start
    </button>
  </section>
</template>

<style scoped></style>
