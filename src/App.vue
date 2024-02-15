<script setup>
import { ref, reactive, watch } from "vue"
import simonIllust from './assets/simon-illust.vue'
import pocketWatch from './assets/pocket-watch.vue'
import simonHead from './assets/simon-head.vue'

// [Nxts0] Toggle Theme
const isDark = ref(false)
const toggleDark = () => {
  isDark.value = !isDark.value
}

// [papangkorn00] Homepage UI Variable , Handle Malfunction Player Input
let disableInterrupt = true
const showPage = ref(true)
const showPopupTutorial = ref(false)
const currentSize = ref(0)
const currentMode = ref(0)
const showPageTransition = ref(false)

// [phatcharadol] Game Result Variable , Game Result UI Variable , Timer Variable
const showPopupEnd = ref(false)
const firstUint = ref(59)
const secondUint = ref(9)
const playerLog = ref([{ round: 0 }])
const round = ref(0)

// [Tinnapop13] Show Trace Variable
let gameRoundPointer = 0
let currentPointer = 0
const traceButtonIndex = ref(-1)
const traces = []
const openMouthState = ref(null)

// [Nxts0] Handle Player Click Variable
const logLst = []
let logIndex = 0

// Game Properties Variable
const buttons = reactive([
  { number: 0, color: "bg-[#FF0000]" },
  { number: 1, color: "bg-[#228B22]" },
  { number: 2, color: "bg-[#0000FF]" },
  { number: 3, color: "bg-[#FFFF00]" },
  { number: 4, color: "bg-[#15F5BA]" },
  { number: 5, color: "bg-[#836FFF]" },
  { number: 6, color: "bg-[#F57D1F]" },
  { number: 7, color: "bg-[#F72798]" },
  { number: 8, color: "bg-[#7E1717]" },
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
    time: `${secondUint.value}:${firstUint.value}`,
    round: round.value,
  })
  gameRoundPointer = 0
  currentPointer = 0
  traceButtonIndex.value = -1
  traces.splice(0, traces.length)
  logLst.splice(0, logLst.length)
  logIndex = 0
}

const selectSize = (size) => {
  currentSize.value = size
}

// [Tinnapop13] Display Trace function
const randomNumber = (max) => {
  return Math.floor(Math.random() * max)
}

const showTraceState = (buttonNumber) => {
  return {
    "bg-[#fff]": traceButtonIndex.value === buttonNumber,
    [buttons[buttonNumber].color]: traceButtonIndex.value !== buttonNumber,
  }
}

const selectDifficulties = (mode) => {
  currentMode.value = mode
}

//reset ออกมาไวไป
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
      if (currentPointer === (round.value - 1)) {
        traceButtonIndex.value = randomButtonId
        traces.push(traceButtonIndex.value)
      } else {
        traceButtonIndex.value = traces[currentPointer]
      }
      openMouthState.value = 'lower-teeth'
    },currentMode.value *200)
    setTimeout(() => {
      traceButtonIndex.value = -1
      openMouthState.value = null
      currentPointer++
      if(round.value === 1){
        disableInterrupt = false
      }
      if(gameRoundPointer === currentPointer){
        disableInterrupt = false
      }
    }, (currentMode.value * 400))
    gameRoundPointer++
    if (gameRoundPointer > (round.value - 1)) {
      clearInterval(gameInterval)
    }
  }, (currentMode.value * 400))
}

// [Nxts0] Handle Player Click function
const playerClick = (event) => {
  let itemClick = Number(event.target.id)
  traceButtonIndex.value = itemClick
  logLst.push(itemClick)
  setTimeout(() => {
    traceButtonIndex.value = -1
  }, 100)
  if (logLst[logIndex] === traces[logIndex]) {
    new Audio(
      "https://cdn.discordapp.com/attachments/1196805209381404682/1203715260742238268/pop-cat-original-meme.mp3?ex=65d21a32&is=65bfa532&hm=011af7cfcb702bb425a2ca043e29decd78bcb3b7ce4751ed44d573dffd27ad4a&"
    ).play()
    logIndex++
    if (logLst.length === traces.length) {
      logLst.splice(0, logLst.length) // reset Array
      logIndex = 0
      round.value++
      gameRoundPointer = 0 //add
      currentPointer = 0 //add
      displayTrace()
    }
  } else {
    logLst.splice(0, logLst.length) // reset Array
    traces.splice(0, traces.length) // reset Array
    logIndex = 0
    disableInterrupt = true
    showPopupEnd.value = true
  }
}

// [phatcharadol] Game Result function , Timer function , Calculate Score Level
const togglePopupEnd = () => {
  showPopupEnd.value = !showPopupEnd.value
  round.value = 0
  firstUint.value = 59
  secondUint.value = 9
  disableInterrupt = true
  playerLog.value = [{ round: 0 }]
}

const playerTimer = () => {
  const timer = setInterval(() => {
    firstUint.value--
    if (firstUint.value < 10) firstUint.value = `0${firstUint.value}`

    if (firstUint.value == 0) {
      secondUint.value--
      secondUint.value === 0 ? (firstUint.value = 0) : (firstUint.value = 59)
    }
  }, 1000)

  const checkTimer = setInterval(() => {
    if (showPopupEnd.value || secondUint.value <= 0) {
      clearInterval(timer)
      clearInterval(checkTimer)
      resetGame()
      var audio = new Audio(
        "https://cdn.discordapp.com/attachments/1196805209381404682/1203710805413986344/rock-eyebrow-raise-sound-effect.mp3?ex=65d2160b&is=65bfa10b&hm=289ed8577d1a08479c2cd3f9607a37cb48240dac25744204c1ab4181e91992c1&"
      )
      audio.play()
    }
  }, 100)
}
</script>

<template>
  <!-- Homepage -->
  <section v-if="showPage" class="flex flex-col h-full min-h-screen justify-center "
    :class="isDark ? 'bg-[#121212]' : ''">
    <div class="flex justify-end margin m-3 mr-5" v-if="isDark">
      <input type="checkbox" class="toggle" checked @click="toggleDark()" />
    </div>
    <div class="flex justify-end margin m-3 mr-5" v-else>
      <input type="checkbox" class="toggle" @click="toggleDark()" />
    </div>
    <div class="max-w-screen-lg mx-auto flex flex-col gap-10 items-center justify-center  px-4 md:flex-row">
      <div class="flex flex-col justify-center">
        <h1 class="text-2xl sm:text-7xl font-bold" :class="isDark ? 'text-white' : ''" style=" font-family: Honk; ">
          Simon Says
        </h1>
        <p class="text-gray-400 py-4 max-w-md indent-12" :class="isDark ? 'text-white' : ''">
          Prepare to embark on an exhilarating journey of color and concentration with "Simon Says" – a web-based game
          that puts your memory and reflexes to the ultimate chromatic test!
        </p>
        <div>
          <p class="text-2xl divider" :class="isDark ? 'text-[#FFFF]' : ''">Size</p>
          <button @click="selectSize(2)" class="btn  btn-secondary mr-2" :class="currentSize === 2 ? '' : 'btn-outline'">
            2 x 2
          </button>
          <button @click="selectSize(3)" class="btn btn-secondary  mr-2" :class="currentSize === 3 ? '' : 'btn-outline'">
            3 x 3
          </button>
        </div>

        <div>
          <p class="text-2xl divider" :class="isDark ? 'text-[#FFFF]' : ''">Difficulty</p>
          <button @click="selectDifficulties(3)" class="btn btn-success  mr-2"
            :class="currentMode === 3 ? '' : 'btn-outline'" :disabled="currentSize === 0">
            EASY
          </button>
          <button @click="selectDifficulties(2)" class="btn btn-warning  mr-2"
            :class="currentMode === 2 ? '' : 'btn-outline'" :disabled="currentSize === 0">
            NORMAL
          </button>
          <button @click="selectDifficulties(1)" class="btn btn-error mr-2"
            :class="currentMode === 1 ? '' : 'btn-outline'" :disabled="currentSize === 0">
            HARD
          </button>
        </div>
      </div>

      <div>
        <simonIllust class="rounded-3xl size-[30rem] items-center max-sm:rounded-full max-sm:size-56" />
      </div>
    </div>

    <div class="flex flex-col items-center gap-5">


      <div>
        <button @click="pageTransition"
          class="btn btn-outline btn-primary rounded-2xl w-64 text-white transition duration-300 ease-in-out my-8"
          :disabled="currentMode === 0">
          PLAY
        </button>
      </div>
    </div>

    <div class="flex justify-end m-5 fixed right-0 bottom-0">
      <button @click="togglePopupTutorial" class="btn btn-circle btn-primary  text-white size-14 text-xl">
        ?
      </button>
    </div>
  </section>
  <!-- Tutorial pop-up -->
  <section v-if="showPopupTutorial" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="w-full sm:w-96 lg:w-1/2 text-center bg-white p-8 rounded-lg">
      <h1 class="text-2xl font-bold mb-4">This is a tutorial</h1>

      <div class="mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
        incidunt mollitia alias enim! Hic pariatur, nisi magnam, accusamus
        excepturi corporis dolorum, libero eos aspernatur sequi totam odio ab
        recusandae facilis?
      </div>

      <button @click="togglePopupTutorial" class="btn btn-warning text-white px-4 py-2">
        Close
      </button>
    </div>
  </section>

  <div class="flex  fixed top-0 left-0 w-screen z-10 ">
    <Transition name="slide-to-right">
      <div class="h-screen w-1/2 bg-[#3c3b3b] " v-if="showPageTransition === true">
      </div>
    </Transition>
    <Transition name="slide-to-left">
      <div class="h-screen w-1/2 bg-[#3c3b3b]" v-if="showPageTransition === true">
      </div>
    </Transition>

    <Transition name="pocket-watch">
      <pocketWatch class="fixed -top-1/3 left-auto right-auto h-screen w-screen" v-if="showPageTransition === true" />
    </Transition>
  </div>


  <!-- Gamepage UI -->
  <section v-if="!showPage" class="h-full min-h-screen flex flex-col items-center justify-center"
    :class="isDark ? 'bg-[#121212]' : ''">
    <div class="flex margin mt-3" v-if="isDark">
      <input type="checkbox" class="toggle" checked @click="toggleDark()" />
    </div>
    <div class="flex margin mt-3" v-else>
      <input type="checkbox" class="toggle" @click="toggleDark()" />
    </div>
    <div class="flex justify-center items-center">
      
  <Transition name="simonHead">
    <simonHead :lowerTeeth="openMouthState" class="h-1/6 w-72" v-if="round!==0"/>
  </Transition>
  </div>
  
    <div class="flex justify-between w-96 my-4 max-sm:w-80">
      <span class="countdown font-mono text-2xl" :class="isDark ? 'text-white' : ''">Round : {{ round }}</span>
      <span class="countdown font-mono text-2xl" :class="isDark ? 'text-white' : ''"
        style="--value:${secondUint} : ${firstUint} ">{{ secondUint }} : {{ firstUint }}</span>
    </div>

    <main v-if="currentSize === 2" class="grid grid-cols-2 gap-5 w-96 sm:h-96 max-sm:w-80">
      <button v-for="buttonNumber in buttons.slice(0, 4)" :class="showTraceState(buttonNumber.number)"
        :disabled="disableInterrupt" :key="buttonNumber.number" :id="buttonNumber.number"
        class="rounded-md h-44 shadow-md hover:brightness-90 active:brightness-150" @click="playerClick"></button>
    </main>

    <main v-else-if="currentSize === 3" class="grid grid-cols-3 gap-5 w-96 max-sm:w-80">
      <button v-for="buttonNumber in buttons" :class="showTraceState(buttonNumber.number)" :disabled="disableInterrupt"
        :key="buttonNumber.number" :id="buttonNumber.number"
        class="rounded-md h-32 shadow-md hover:brightness-90 active:brightness-150" @click="playerClick"></button>
    </main>

    <div class="flex my-4 gap-x-10 w-96 max-sm:w-80 justify-between ">
      <button class="btn btn-success w-44 max-sm:w-28 bg-green-500 shadow-md hover:shadow-green-500/50"
        @click="displayTrace" :disabled="round > 0">
        START
      </button>

      <button class="btn btn-warning w-40 max-sm:w-28 shadow-md hover:shadow-yellow-500/50" @click="showPopupEnd = true"
        :disabled="disableInterrupt">
        RESTART
      </button>
    </div>
    <button class="btn mb-4 btn-primary w-96 max-sm:w-80 shadow-md hover:shadow-indigo-500/50" @click="pageTransition"
      :disabled="round > 0">
      HOME
    </button>
  </section>

  <section v-if="showPopupEnd" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="w-80 text-center bg-white p-8 rounded-lg">
      <h1 class="text-2xl font-bold mb-4">End!</h1>
      <div class="flex flex-col items-center">
        <div v-if="playerLog[playerLog.length - 1].round <= 10" class="font-bold">
          TRY AGAIN NOOB!
        </div>
        <div v-else-if="playerLog[playerLog.length - 1].round > 10 &&
          playerLog[playerLog.length - 1].round < 30
          " class="font-bold">
          THAT KINDA DECENT...
        </div>
        <div v-else class="font-bold">EXCELLENT!</div>
        <p>Finished Round: {{ playerLog[playerLog.length - 1].round }}</p>
        <p>Finished Time: {{ playerLog[playerLog.length - 1].time }}</p>
        <p>Difficulty: {{ currentMode }}</p>
        <p>Size: {{ currentSize }} x {{ currentSize }}</p>
      </div>

      <button @click="togglePopupEnd" class="btn btn-warning text-white px-4 py-2 mt-4">
        Close
      </button>
    </div>
  </section>
</template>

<style>
#eye-right,
#eye-left {
  animation-name: eye-ball;
  animation-duration: 5s;
  animation-iteration-count: infinite;
}

.simonHead-enter-active{
  transition: all 1s ;
  animation: rotate 3s;

}

.simonHead-leave-active{
  transition: all 1s ;
  animation: rotate 3s reverse;
  
}


.slide-to-right-enter-active {
  animation: slide-to-right 1s;
}

.slide-to-right-leave-active {
  animation: slide-to-right 1s reverse;
}

.slide-to-left-leave-active {
  animation: slide-to-left 1s reverse;
}

.slide-to-left-enter-active {
  animation: slide-to-left 1s;
}

.pocket-watch-enter-active {
  animation: pocket-watch 1s
}

.pocket-watch-leave-active {
  animation: pocket-watch 1s reverse
}

.lower-teeth {
  animation: open-mouth 1s 1;
}

@keyframes rotate {
  0% {
   transform: rotate(0deg);
   opacity: 0;
   width: 0;
  }

  100% {
    transform: rotate(360deg);
    opacity: 1;
    width: 18rem;

  }
  
  
}

@keyframes pocket-watch {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0%);
  }

}

@keyframes slide-to-right {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);

  }
}

@keyframes open-mouth {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(10px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes slide-to-left {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);

  }
}

@keyframes eye-ball {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0);
  }

}
</style>
