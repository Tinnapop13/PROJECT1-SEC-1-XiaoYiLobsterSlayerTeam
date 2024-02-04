<script setup>
import {ref, reactive} from "vue"

const showHomePage = ref(true)
const showGamePage = ref(false)
const showPopupTutorial = ref(false)

const showProgressBar = ref(false)

const showPopupEnd = ref(false)

const playerLog = ref([{round: 0}])
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

const i = ref(0)
const progressBarWidth = ref(0)

const togglePopupTutorial = () => {
  showPopupTutorial.value = !showPopupTutorial.value
}

const togglePopupEnd = () => {
  showPopupEnd.value = !showPopupEnd.value
  round.value = 1
  firstUint.value = 59
  secondUint.value = 9
}

const startToggle = () => {
  showHomePage.value = false
  showProgressBar.value = true
  move()
  progressBarShow()
  setTimeout(() => {
    showGamePage.value = true
  }, 1000)
}

const progressBarShow = () => {
  setTimeout(() => {
    showProgressBar.value = false
  }, 1000)
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
      disablePlay = false
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
      secondUint.value === 0 ? (firstUint.value = 0) : (firstUint.value = 59)
    }

    if (showPopupEnd.value || secondUint.value <= 0) {
      clearInterval(timer)
      playerLog.value.push({
        time: `${secondUint.value}:${firstUint.value}`,
        round: round.value - 1,
      })
      showPopupEnd.value = true
    }
  }, 1000)
}

const calculateScore = () => {
  // Temp....
  // if (playerLog.score < 5 && timeCounter.value >= 10) {
  // } else if (playerLog.score < 15 && timeCounter.value >= 20) {
  // } else if (playerLog.score < 20 && timeCounter.value >= 30) {
  // }
  // if (playerLog.score < 5 && timeCounter.value >= 10) {
  // } else if (playerLog.score < 15 && timeCounter.value >= 20)
  // } else if (playerLog.score < 20 && timeCounter.value >= 30)
}

const move = () => {
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
  <!-- Homepage -->
  <section v-if="showHomePage" class="flex flex-col h-screen">
    <div
      class="max-w-screen-lg mx-auto my-4 flex flex-col gap-20 items-center justify-center h-screen px-4 md:flex-row"
    >
      <div class="flex flex-col justify-center">
        <h1 class="text-2xl sm:text-7xl font-bold text-white">Simon Says</h1>
        <p class="text-gray-400 py-4 max-w-md">
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
        class="btn btn-primary rounded-2xl w-64 text-white transition duration-300 ease-in-out"
      >
        PLAY
      </button>
    </div>

    <div class="flex justify-end m-5">
      <button
        @click="togglePopupTutorial"
        class="btn btn-circle btn-primary bg-blue-400 text-white size-14 text-xl"
      >
        ?
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

  <!--Loading progress bar -->
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

  <!-- Gamepage UI -->
  <section
    v-if="showGamePage"
    class="min-h-screen flex flex-col items-center justify-center"
  >
    <h1 class="font-bold text-5xl my-10">Simon Says</h1>
    <div class="flex justify-between w-96 my-4 max-sm:w-80">
      <span class="countdown font-mono text-2xl">Round : {{ round }}</span>
      <span class="countdown font-mono text-2xl"
        >{{ secondUint }} : {{ firstUint }}</span
      >
    </div>

    <main class="grid grid-cols-2 gap-x-5 gap-y-5 w-96 sm:h-96 max-sm:w-80">
      <button
        v-for="buttonNumber in buttons"
        :class="showTraceState(buttonNumber.number)"
        :disabled="disablePlay"
        :key="buttonNumber"
        :id="buttonNumber.number"
        class="rounded-md h-44 hover:brightness-90 active:brightness-150"
        @click="playerClick"
      ></button>
    </main>
    <button
      class="btn btn-primary m-10 max-sm:size- w-96 max-sm:w-80"
      @click="displayTrace"
      :disabled="disableStart"
    >
      START
    </button>
  </section>

  <section
    v-if="showPopupEnd"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="w-80 text-center bg-white p-8 rounded-lg">
      <h1 class="text-2xl font-bold mb-4">End!</h1>
      <div>
        Round: {{ playerLog[playerLog.length - 1].round }}
        <br />
        Time: {{ playerLog[playerLog.length - 1].time }}
      </div>

      <button
        @click="togglePopupEnd"
        class="btn btn-warning text-white px-4 py-2 mt-4"
      >
        Close
      </button>
    </div>
  </section>
</template>

<style scoped></style>
