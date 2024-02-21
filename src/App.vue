<script setup>
import {ref, reactive, watch} from "vue"
import {randomNumber, randomColor} from "./utilities/utility.js"
import simonIllust from "./assets/animation_components/simon-illust.vue"
import pocketWatch from "./assets/animation_components/pocket-watch.vue"
import simonHead from "./assets/animation_components/simon-head.vue"

// [Nxts0] Toggle Theme , Handle Player Click Variable

const isDark = ref(false)
const logList = []
let logIndex = 0
const clickSound = new URL("/src/assets/sounds/clickSound.mp3", import.meta.url)
const endGameSound = new URL(
  "/src/assets/sounds/endGameSound.mp3",
  import.meta.url
)

// [papangkorn00] Homepage UI Variable , Handle Malfunction Player Input
let disableInterrupt = true
const showPage = ref(true)
const showPopupTutorial = ref(false)
const currentSize = ref(0)
const currentMode = ref(0)

// [phatcharadol] Game Result Variable , Game Result UI Variable , Timer Variable
const showPopupEnd = ref(false)
const firstUnit = ref(59)
const secondUnit = ref(9)
const playerLog = ref([{round: 0}])
const round = ref(0)
const selectedDiff = ref("")
let timeOutCount = 0

// [Tinnapop13] Show Trace Variable , Animation
let gameRoundPointer = 0
let currentPointer = 0
const traceButtonIndex = ref(-1)
const traces = []
const openMouthState = ref(null)
const animationColor = ref("")
const showPageTransition = ref(false)
setInterval(() => {
  animationColor.value = randomColor()
}, 2000)

// Game Properties Variable
const buttons = reactive([
  {number: 0, color: "bg-[#FF0000]"},
  {number: 1, color: "bg-[#228B22]"},
  {number: 2, color: "bg-[#0000FF]"},
  {number: 3, color: "bg-[#FFFF00]"},
  {number: 4, color: "bg-[#15F5BA]"},
  {number: 5, color: "bg-[#836FFF]"},
  {number: 6, color: "bg-[#F57D1F]"},
  {number: 7, color: "bg-[#F72798]"},
  {number: 8, color: "bg-[#7E1717]"},
])

// [papangkorn00] Homepage UI function (Tutorial,Start Button)
const togglePopupTutorial = () => {
  showPopupTutorial.value = !showPopupTutorial.value
}

const pageTransition = () => {
  showPageTransition.value = true
  setTimeout(() => {
    showPage.value = !showPage.value
    showPageTransition.value = false
  }, 2000)
}

const resetGame = () => {
  playerLog.value.push({
    time: `${secondUnit.value}:${firstUnit.value}`,
    round: round.value,
  })
  gameRoundPointer = 0
  currentPointer = 0
  traceButtonIndex.value = -1
  traces.splice(0, traces.length)
  logList.splice(0, logList.length)
  logIndex = 0
}

const selectSize = (size) => {
  currentSize.value = size
}

// [Tinnapop13] Display Trace function
const showTraceState = (buttonNumber) => {
  return {
    "bg-[#fff]": traceButtonIndex.value === buttonNumber,
    [buttons[buttonNumber].color]: traceButtonIndex.value !== buttonNumber,
  }
}

const displayTrace = () => {
  // Block Player From Clicking
  disableInterrupt = true
  // Start Timer While Game Start Once
  if (round.value === 0) {
    round.value++
    gameRoundPointer = 1
    playerTimer()
  }

  // Set Button to Change Style while Show Trace
  const gameInterval = setInterval(() => {
    const randomButtonId = randomNumber(currentSize.value === 2 ? 4 : 9)
    setTimeout(() => {
      if (currentPointer === round.value - 1) {
        traceButtonIndex.value = randomButtonId
        traces.push(traceButtonIndex.value)
      } else {
        traceButtonIndex.value = traces[currentPointer]
      }
      openMouthState.value = "lower-teeth"
    }, currentMode.value * 200)
    setTimeout(() => {
      traceButtonIndex.value = -1
      openMouthState.value = null
      currentPointer++
      if (round.value === 1) {
        disableInterrupt = false
      }
      if (gameRoundPointer === currentPointer) {
        disableInterrupt = false
      }
    }, currentMode.value * 400)
    gameRoundPointer++
    if (gameRoundPointer > round.value - 1) {
      clearInterval(gameInterval)
    }
  }, currentMode.value * 400)
}

// [Nxts0] Handle Player Click function
const toggleDark = () => {
  isDark.value = !isDark.value
}

const playerClick = (event) => {
  let itemClick = Number(event.target.id)
  traceButtonIndex.value = itemClick
  logList.push(itemClick)
  setTimeout(() => {
    traceButtonIndex.value = -1
  }, 100)
  if (logList[logIndex] === traces[logIndex]) {
    new Audio(clickSound).play()
    logIndex++
    if (logList.length === traces.length) {
      logList.splice(0, logList.length) // reset Array
      logIndex = 0
      round.value++
      gameRoundPointer = 0
      currentPointer = 0
      displayTrace()
    }
  } else {
    logList.splice(0, logList.length)
    traces.splice(0, traces.length)
    logIndex = 0
    disableInterrupt = true
    showPopupEnd.value = true
  }
}

// [phatcharadol] Game Result function , Timer function , Calculate Score Level
const togglePopupEnd = () => {
  showPopupEnd.value = !showPopupEnd.value
  round.value = 0
  firstUnit.value = 59
  secondUnit.value = 9
  disableInterrupt = true
  playerLog.value = [{round: 0}]
}

const playerTimer = () => {
  const timer = setInterval(() => {
    firstUnit.value--
    if (firstUnit.value < 10) firstUnit.value = `0${firstUnit.value}`
    if (firstUnit.value == 0) {
      if (secondUnit.value > 0) {
        secondUnit.value--
      }
      if (secondUnit.value === 0) {
        timeOutCount++
      }
      if (timeOutCount === 2) {
        clearInterval(timer)
        showPopupEnd.value = true
      }
      if (timeOutCount !== 2) {
        firstUnit.value = 59
      }
    }
  }, 1000)
  watch(showPopupEnd, () => {
    if (showPopupEnd.value) {
      clearInterval(timer)
      resetGame()
      new Audio(endGameSound).play()
    }
  })
}

const selectDifficulties = (mode) => {
  currentMode.value = mode
  switch (mode) {
    case 3:
      selectedDiff.value = "EASY"
      break
    case 2:
      selectedDiff.value = "NORMAL"
      break
    case 1:
      selectedDiff.value = "HARD"
      break
  }
}
</script>

<template>
  <!-- Homepage -->
  <section
    v-if="showPage"
    class="flex flex-col h-full min-h-screen justify-center"
    :style="{
      'background-color': isDark
        ? 'rgba(0, 0, 0, 0.2)'
        : 'rgba(255, 255, 255, .9)',
    }"
  >
    <div class="flex mt-3 items-center justify-end" v-if="isDark">
      <img src="/src/assets/svg/dark-theme-moon.svg" class="size-6 mx-3" />
      <input type="checkbox" class="toggle" checked @click="toggleDark()" />
    </div>
    <div class="flex mt-3 items-center justify-end" v-else>
      <img src="/src/assets/svg/light-theme-sun.svg" class="size-6 mx-3" />
      <input type="checkbox" class="toggle" @click="toggleDark()" />
    </div>
    <div
      class="max-w-screen-lg mx-auto flex flex-col gap-10 items-center justify-center px-4 md:flex-row"
    >
      <div class="flex flex-col justify-center">
        <h1 class="text-2xl sm:text-7xl font-bold" style="font-family: Honk">
          Simon Says
        </h1>
        <p
          class="py-4 max-w-md indent-12"
          :class="isDark ? 'text-white' : 'text-slate-700'"
        >
          Prepare to embark on an exhilarating journey of color and
          concentration with "Simon Says" – a web-based game that puts your
          memory and reflexes to the ultimate chromatic test!
        </p>
        <div>
          <p
            class="text-2xl divider"
            :class="isDark ? 'text-[#FFFF]' : 'text-slate-700'"
          >
            Size
          </p>
          <button
            @click="selectSize(2)"
            class="btn btn-secondary mr-2"
            :class="currentSize === 2 ? '' : 'btn-outline'"
          >
            2 x 2
          </button>
          <button
            @click="selectSize(3)"
            class="btn btn-secondary mr-2"
            :class="currentSize === 3 ? '' : 'btn-outline'"
          >
            3 x 3
          </button>
        </div>

        <div>
          <p
            class="text-2xl divider"
            :class="isDark ? 'text-[#FFFF]' : 'text-slate-700'"
          >
            Difficulty
          </p>
          <button
            @click="selectDifficulties(3)"
            class="btn btn-success mr-2"
            :class="currentMode === 3 ? '' : 'btn-outline'"
            :disabled="currentSize === 0"
          >
            EASY
          </button>
          <button
            @click="selectDifficulties(2)"
            class="btn btn-warning mr-2"
            :class="currentMode === 2 ? '' : 'btn-outline'"
            :disabled="currentSize === 0"
          >
            NORMAL
          </button>
          <button
            @click="selectDifficulties(1)"
            class="btn btn-error mr-2"
            :class="currentMode === 1 ? '' : 'btn-outline'"
            :disabled="currentSize === 0"
          >
            HARD
          </button>
        </div>
      </div>

      <div>
        <simonIllust
          class="rounded-3xl size-[30rem] items-center max-sm:rounded-full max-sm:size-56"
        />
      </div>
    </div>

    <div class="flex flex-col items-center gap-5">
      <div>
        <button
          @click="pageTransition"
          class="btn btn-outline btn-primary rounded-2xl w-64 text-white transition duration-300 ease-in-out my-8"
          :disabled="currentMode === 0"
        >
          PLAY
        </button>
      </div>
    </div>

    <div class="flex justify-end m-5 fixed right-0 bottom-0">
      <button
        @click="togglePopupTutorial"
        class="btn btn-circle btn-primary text-white size-14 text-xl"
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
    <div
      class="max-sm:h-4/5 max-sm:overflow-y-scroll text-center bg-white p-8 rounded-lg"
    >
      <h1 class="text-2xl font-bold underline mb-4 text-black">Tutorial</h1>

      <div class="flex flex-col gap-y-10 max-sm:gap-y-5">
        <div
          class="flex gap-x-5 max-sm:flex-col items-center justify-between text-black"
        >
          The player must choose at least one difficulty level and game size to
          be able to play.
          <img
            src="/src/assets/gif/tutorial/step-1.gif"
            width="200px"
            height="250px"
          />
        </div>

        <div
          class="flex gap-x-5 max-sm:flex-col items-center justify-between text-black"
        >
          The player needs to click the play button to start the game.
          <img
            src="/src/assets/gif/tutorial/step-2.gif"
            width="200px"
            height="250px"
          />
        </div>

        <div
          class="flex gap-x-5 max-sm:flex-col items-center justify-between text-black"
        >
          The player needs to click the correct colors based on what Simon has
          told them to do.
          <img
            src="/src/assets/gif/tutorial/step-3.gif"
            width="200px"
            height="250px"
          />
        </div>
      </div>

      <button
        @click="togglePopupTutorial"
        class="btn btn-warning text-white px-4 py-2 mt-5"
      >
        Close
      </button>
    </div>
  </section>

  <ul class="floating-square">
    <li
      v-for="i in 10"
      :style="{
        background: isDark ? animationColor : 'rgba(255, 255, 255, 0.8)',
      }"
    ></li>
  </ul>

  <div class="flex fixed top-0 left-0 w-screen z-10">
    <Transition name="slide-to-right">
      <img
        class="h-screen w-1/2"
        src="/src/assets/gif/curtain.png"
        v-if="showPageTransition === true"
      />
    </Transition>
    <Transition name="slide-to-left">
      <img
        class="h-screen w-1/2 -scale-x-[1]"
        src="/src/assets/gif/curtain.png"
        v-if="showPageTransition === true"
      />
    </Transition>

    <Transition name="pocket-watch">
      <pocketWatch
        class="fixed -top-1/3 left-auto right-auto h-screen w-screen"
        v-if="showPageTransition === true"
      />
    </Transition>
  </div>

  <!-- Gamepage UI -->
  <section
    v-if="!showPage"
    class="h-full min-h-screen flex flex-col items-center justify-center z-50"
    :style="{
      'background-color': isDark
        ? 'rgba(0, 0, 0, 0.2)'
        : 'rgba(255, 255, 255, 0.9)',
    }"
  >
    <div class="flex mt-3 items-center" v-if="isDark">
      <img src="/src/assets/svg/dark-theme-moon.svg" class="size-6 mx-3" />
      <input type="checkbox" class="toggle" checked @click="toggleDark()" />
    </div>
    <div class="flex mt-3 items-center" v-else>
      <img src="/src/assets/svg/light-theme-sun.svg" class="size-6 mx-3" />
      <input type="checkbox" class="toggle" @click="toggleDark()" />
    </div>
    <div class="flex justify-center items-center">
      <Transition name="simonHead">
        <simonHead
          :lowerTeeth="openMouthState"
          class="h-1/6 w-1/3"
          v-if="round !== 0"
        />
      </Transition>
    </div>
    <h1 class="text-2xl sm:text-7xl font-bold" style="font-family: Honk">
      Simon Says
    </h1>

    <div
      class="flex justify-between w-96 my-4 max-sm:w-80 rainbow p-4 rounded-2xl border-8 transition-colors"
      :style="{'border-color': animationColor}"
    >
      <span
        class="countdown font-mono text-2xl"
        :class="isDark ? 'text-white' : 'text-slate-700'"
        >Round : {{ round }}</span
      >
      <span
        class="countdown font-mono text-2xl"
        :class="isDark ? 'text-white' : 'text-slate-700'"
        style="--value:${secondUnit} : ${firstUnit} "
        >{{ secondUnit }} : {{ firstUnit }}</span
      >
    </div>

    <main
      v-if="currentSize === 2"
      class="grid grid-cols-2 gap-5 w-96 sm:h-96 max-sm:w-80"
    >
      <button
        v-for="buttonNumber in buttons.slice(0, 4)"
        :class="showTraceState(buttonNumber.number)"
        :disabled="disableInterrupt"
        :key="buttonNumber.number"
        :id="buttonNumber.number"
        class="rounded-md h-44 shadow-md hover:brightness-90 active:brightness-150"
        @click="playerClick"
      ></button>
    </main>

    <main
      v-else-if="currentSize === 3"
      class="grid grid-cols-3 gap-5 w-96 max-sm:w-80"
    >
      <button
        v-for="buttonNumber in buttons"
        :class="showTraceState(buttonNumber.number)"
        :disabled="disableInterrupt"
        :key="buttonNumber.number"
        :id="buttonNumber.number"
        class="rounded-md h-32 shadow-md hover:brightness-90 active:brightness-150"
        @click="playerClick"
      ></button>
    </main>

    <div class="flex my-4 gap-x-10 w-96 max-sm:w-80 justify-between">
      <button
        class="btn btn-success w-44 max-sm:w-28 bg-green-500 shadow-md hover:shadow-green-500/50"
        @click="displayTrace"
        :disabled="round > 0"
      >
        START
      </button>
      <button
        class="btn btn-warning w-40 max-sm:w-28 shadow-md hover:shadow-yellow-500/50"
        @click="showPopupEnd = true"
        :disabled="disableInterrupt"
      >
        RESTART
      </button>
    </div>
    <button
      class="btn mb-4 btn-primary w-96 max-sm:w-80 shadow-md hover:shadow-indigo-500/50"
      @click="pageTransition"
      :disabled="round > 0"
    >
      HOME
    </button>
  </section>

  <section
    v-if="showPopupEnd"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full h-full"
  >
    <div
      class="flip relative flex justify-center items-center text-center w-full h-full"
      style="transition: transform 0.8s; transform-style: preserve-3d"
    >
      <div
        class="flex flex-col justify-between text-center bg-white p-8 rounded-lg absolute max-md:w-screen w-1/3 h-[80%] overflow-y-auto"
        style="backface-visibility: hidden"
      >
        <h1 class="text-4xl xl:text-6xl font-bold" style="font-family: Honk">
          Simon Says
        </h1>
        <div class="flex flex-col items-center text-center text-slate-700">
          <div
            v-if="playerLog[playerLog.length - 1].round <= 5"
            class="font-bold flex items-center flex-col"
          >
            <img
              src="/src/assets/gif/blink.gif"
              class="w-[200px] h-[200px] rounded-lg"
            />
            <p class="text-4xl divider divider-error">R..Really??</p>
          </div>
          <div
            v-else-if="playerLog[playerLog.length - 1].round <= 10"
            class="font-bold flex items-center flex-col"
          >
            <img
              src="/src/assets/gif/noice.gif"
              class="w-[200px] h-[200px] rounded-lg"
            />
            <p class="text-4xl divider divider-error">N O I C E</p>
          </div>
          <div v-else class="font-bold flex items-center flex-col">
            <img
              src="/src/assets/gif/chad.gif"
              class="w-[200px] h-[200px] rounded-lg"
            />
            <p class="text-4xl divider divider-error">
              Average Simon Says Player
            </p>
          </div>
          <div class="text-base xl:text-xl">
            <p>Finished Round: {{ playerLog[playerLog.length - 1].round }}</p>
            <p>Finished Time: {{ playerLog[playerLog.length - 1].time }}</p>
            <p>Difficulty: {{ selectedDiff }}</p>
            <p>Size: {{ currentSize }} x {{ currentSize }}</p>
          </div>
        </div>
        <button
          @click="togglePopupEnd"
          class="btn btn-warning text-white px-4 py-2 mt-4"
        >
          Close
        </button>
      </div>
      <div
        class="absolute w-full h-full flex justify-center"
        style="backface-visibility: hidden; transform: rotateY(180deg)"
      >
        <img src="/src/assets/svg/back-card.svg" />
      </div>
    </div>
  </section>
</template>
