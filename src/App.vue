<script setup>
import { ref, reactive } from "vue"

const showHomePage = ref(true)
const showGamePage = ref(false)
const showPopupTutorial = ref(false)
const showPopupMode = ref(false)
const showPopupEnd = ref(false)

const playerLog = ref([])
const round = ref(1)

const firstUint = ref(59)
const secondUint = ref(9)

let disableStart = false
let disablePlay = true

let gameRoundPointer = 0
const traceButtonIndex = ref(-1)
const traces = []

const logLst = []
let logIndex = 0

const togglePopupMode = () => {
  showPopupMode.value = !showPopupMode.value
}

const togglePopupTutorial = () => {
  showPopupTutorial.value = !showPopupTutorial.value
}

const togglePopupEnd = () => {
  showPopupEnd.value = !showPopupEnd.value
  round.value = 1
}

const startToggle = () => {
  showGamePage.value = true
  showHomePage.value = false
  showPopupMode.value = false
  showPopupEnd.value = false
}

const displayTrace = () => {
  disableStart = true
  disablePlay = true
  if (round.value === 1) {
    playerTimer()
  }
  const gameInterval = setInterval(() => {
    const randomButtonId = randomNumber(4)

    setTimeout(() => {
      if (gameRoundPointer < round.value) {
        traceButtonIndex.value = traces[gameRoundPointer - 1]
      }
      else {
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
      disablePlay = false
    }
  }, 750)
}

const randomNumber = (max) => {
  return Math.floor(Math.random() * max)
}

const buttons = reactive([
  { number: 0, color: "bg-[#FF0000]" },
  { number: 1, color: "bg-[#228B22]" },
  { number: 2, color: "bg-[#0000FF]" },
  { number: 3, color: "bg-[#FFFF00]" },
])

const showTraceState = (buttonNumber) => {
  return {
    "bg-[#fff]": traceButtonIndex.value === buttonNumber,
    [buttons[buttonNumber].color]: traceButtonIndex.value !== buttonNumber,
  }
}

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
  }
  else {
    console.log('lose')
    logLst.splice(0, logLst.length) // reset Array
    traces.splice(0, traces.length) // reset Array
    logIndex = 0
    disableStart = false
    showPopupEnd.value = true
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

    if (showPopupEnd.value || secondUint.value === 0) {
      clearInterval(timer)
      playerLog.value.push({
        time: `${secondUint.value}:${firstUint.value}`,
        round: round.value,
      })
      firstUint.value = 59
      secondUint.value = 9
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
  <div>
    <h3>Round : {{ round }}</h3>
  </div>
  <div class="w-full h-full">
    <section v-if="showHomePage" class="flex flex-col h-screen">
      <div class="max-w-screen-lg mx-auto flex flex-col gap-20 items-center justify-center h-screen px-4 md:flex-row">
        <div class="flex flex-col justify-center">
          <h1 class="text-2xl sm:text-7xl font-bold text-white">Simon Says</h1>
          <p class="text-gray-400 py-4 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas quos
            et vel recusandae illum, voluptates iusto deleniti dolorem obcaecati
            similique optio adipisci assumenda dignissimos, quo quisquam eaque
            rerum! Et, molestias?
          </p>
        </div>

        <div class="">
          <img
            src="https://cdn.discordapp.com/attachments/1196805209381404682/1203349161668247602/e6accda7-92b1-47e8-b317-1a6da0333512-removebg-preview.png?ex=65d0c53d&is=65be503d&hm=e6fd7ceaf9b3593b122400a06073c93a7ece7d9009b08583f5b14bc18ce53916&"
            alt="mr.Simon" class="rounded-2xl size-96 items-center" />
        </div>
      </div>

      <div class="flex justify-center">
        <button @click="togglePopupMode" class="btn btn-primary text-white w-20 h-10">
          PLAY
        </button>
      </div>

      <div class="flex justify-end m-5">
        <button @click="togglePopupTutorial" class="btn btn-circle btn-info btn-outline text-white size-auto">
          Tutorial
        </button>
      </div>
    </section>

    <!-- mode and size -->
    <section v-if="showPopupMode" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-80 h-80 bg-white rounded-lg flex flex-col justify-center items-center">
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

        <button @click="startToggle" class="btn btn-primary text-white w-20 h-10">
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
    <section v-if="showPopupTutorial" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-80 text-center bg-white p-8 rounded-lg">
        <h1 class="text-2xl font-bold mb-4">This is a tutorial</h1>

        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          incidunt mollitia alias enim! Hic pariatur, nisi magnam, accusamus
          excepturi corporis dolorum, libero eos aspernatur sequi totam odio ab
          recusandae facilis?
        </div>

        <button @click="togglePopupTutorial" class="btn btn-warning text-white px-4 py-2 mt-4">
          Close
        </button>
      </div>
    </section>

    <!-- game page -->
    <section v-if="showGamePage" class="min-h-screen flex flex-col items-center justify-center">
      <h1 class="font-bold text-5xl py-20">Simon Says</h1>
      <span class="countdown font-mono text-2xl">{{ secondUint }} : {{ firstUint }}</span>
      <main class="grid grid-cols-2 gap-x-5 gap-y-5 w-96 sm:h-96 max-sm:w-80">
        <button v-for="buttonNumber in buttons" :class="showTraceState(buttonNumber.number)" :disabled="disablePlay" :key="buttonNumber"
          :id="buttonNumber.number" class="rounded-md h-44 hover:brightness-90 active:brightness-150"
          @click="playerClick"></button>
      </main>
      <button class="btn btn-primary mt-20 max-sm:size-" @click="displayTrace" :disabled="disableStart">
        Start
      </button>
    </section>

    <section v-if="showPopupEnd" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-80 text-center bg-white p-8 rounded-lg">
        <h1 class="text-2xl font-bold mb-4">End!</h1>

        <div>
          {{ playerLog[playerLog.length - 1] }}
        </div>

        <button @click="togglePopupEnd" class="btn btn-warning text-white px-4 py-2 mt-4">
          Close
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped></style>