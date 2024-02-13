<script setup>
import {ref, reactive} from "vue"

// [Nxts0] Toggle Theme
const isDark = ref(false)
const toggleDark = () => {
  isDark.value = !isDark.value
}

// [papangkorn00] Homepage UI Variable , Handle Malfunction Player Input,
const showHomePage = ref(true)
const showGamePage = ref(false)
const showPopupTutorial = ref(false)
let disableStart = false
let disableBlock = true
let disableReset = true
const gameSize = ref(1)
const disablePlayBtn = ref(true)
const currentSize = ref(0)
const currentMode = ref(0)
const disableModeBtn = ref(true)

// [phatcharadol] Game Result Variable , Game Result UI Variable , Timer Variable
const showPopupEnd = ref(false)
const firstUint = ref(59)
const secondUint = ref(9)
const playerLog = ref([{round: 0}])
const round = ref(0)
const btnSpeed = ref(0)
const gameMode = ref(0)

// [Tinnapop13] Show Trace Variable
let gameRoundPointer = 0
const traceButtonIndex = ref(-1)
const traces = []

// [Nxts0] Handle Player Click Variable
const logLst = []
let logIndex = 0

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

const startToggle = () => {
  setTimeout(
    () => {
      showHomePage.value = !showHomePage.value
    },
    showHomePage.value === true ? 0 : 500
  )
  setTimeout(
    () => {
      showGamePage.value = !showGamePage.value
    },
    showGamePage.value === true ? 0 : 500
  )
}

const resetGame = () => {
  playerLog.value.push({
    time: `${secondUint.value}:${firstUint.value}`,
    round: round.value,
  })
  gameRoundPointer = 0
  traceButtonIndex.value = -1
  traces.splice(0, traces.length)
  logLst.splice(0, logLst.length)
  logIndex = 0
  disableStart = false
  togglePopupEnd()
}

const selectSize = (size) => {
  gameSize.value = size
  currentSize.value = size
  if (size) {
    disableModeBtn.value = false
  }
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
  gameMode.value = mode
  if (gameMode.value === 3) {
    btnSpeed.value = 300
    disablePlayBtn.value = false
  } else if (gameMode.value === 2) {
    btnSpeed.value = 200
    disablePlayBtn.value = false
  } else {
    btnSpeed.value = 100
    disablePlayBtn.value = false
  }
  currentMode.value = mode
}

const displayTrace = () => {
  // Block Player From Clicking
  disableStart = true
  disableBlock = true
  disableReset = true
  // Start Timer While Game Start Once
  if (round.value === 0) {
    round.value++
    playerTimer()
  }
  // Set Button to Change Style while Show Trace
  const gameInterval = setInterval(() => {
    const randomButtonId = randomNumber(currentSize.value === 2 ? 4 : 9)
    setTimeout(() => {
      if (gameRoundPointer < round.value) {
        traceButtonIndex.value = traces[gameRoundPointer - 1]
      } else {
        traceButtonIndex.value = randomButtonId
        traces.push(traceButtonIndex.value)
      }
    }, btnSpeed.value - gameMode.value * 100)

    setTimeout(() => {
      traceButtonIndex.value = -1
    }, btnSpeed.value)

    gameRoundPointer++

    if (gameRoundPointer > round.value) {
      clearInterval(gameInterval)
      gameRoundPointer = 0
      disableBlock = false
      disableReset = false
    }
    console.log(btnSpeed.value)
  }, 500)
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
      displayTrace()
    }
  } else {
    logLst.splice(0, logLst.length) // reset Array
    traces.splice(0, traces.length) // reset Array
    logIndex = 0
    disableStart = false
    disableBlock = true
    showPopupEnd.value = true
    disableReset = true
  }
}

// [phatcharadol] Game Result function , Timer function , Calculate Score Level
const togglePopupEnd = () => {
  showPopupEnd.value = !showPopupEnd.value
  round.value = 0
  firstUint.value = 59
  secondUint.value = 9
  disableBlock = true
  disableReset = true
  disableStart = false
  playerLog.value = []
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
  <Transition name="homepage">
    <section
      v-if="showHomePage"
      class="flex flex-col h-screen"
      :class="isDark ? 'bg-[#121212]' : ''"
    >
      <div class="flex justify-end margin mt-3 mr-5" v-if="isDark">
        <input type="checkbox" class="toggle" checked @click="toggleDark()" />
      </div>
      <div class="flex justify-end margin mt-3 mr-5" v-else>
        <input type="checkbox" class="toggle" @click="toggleDark()" />
      </div>
      <div
        class="max-w-screen-lg mx-auto flex flex-col gap-10 items-center justify-center h-screen px-4 md:flex-row"
      >
        <div class="flex flex-col justify-center">
          <h1
            class="text-2xl sm:text-7xl font-bold"
            :class="isDark ? 'text-white' : ''"
            style="font-family: Honk"
          >
            Simon Says
          </h1>
          <p
            class="text-gray-400 py-4 max-w-md indent-12"
            :class="isDark ? 'text-white' : ''"
          >
            Prepare to embark on an exhilarating journey of color and
            concentration with "Simon Says" – a web-based game that puts your
            memory and reflexes to the ultimate chromatic test!
          </p>
          <div>
            <p class="text-2xl divider" :class="isDark ? 'text-[#FFFF]' : ''">
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
            <p class="text-2xl divider" :class="isDark ? 'text-[#FFFF]' : ''">
              Difficulty
            </p>
            <button
              @click="selectDifficulties(3)"
              class="btn btn-success mr-2"
              :class="currentMode === 3 ? '' : 'btn-outline'"
              :disabled="disableModeBtn"
            >
              EASY
            </button>
            <button
              @click="selectDifficulties(2)"
              class="btn btn-warning mr-2"
              :class="currentMode === 2 ? '' : 'btn-outline'"
              :disabled="disableModeBtn"
            >
              NORMAL
            </button>
            <button
              @click="selectDifficulties(1)"
              class="btn btn-error mr-2"
              :class="currentMode === 1 ? '' : 'btn-outline'"
              :disabled="disableModeBtn"
            >
              HARD
            </button>
          </div>
        </div>

        <div>
          <img
            src="https://media.discordapp.net/attachments/1196805209381404682/1203348841080819812/e6accda7-92b1-47e8-b317-1a6da0333512.jpg?ex=65d9ff70&is=65c78a70&hm=4bbae31468fb64cc0cbc715062f44177d5cc0e7653187bb9965d96794036f2bd&=&format=webp&width=655&height=655"
            alt="Mr.Simon"
            class="rounded-3xl size-[30rem] items-center max-sm:rounded-full max-sm:size-56"
          />
        </div>
      </div>

      <div class="flex flex-col items-center gap-5">
        <div>
          <button
            @click="startToggle"
            class="btn btn-outline btn-primary rounded-2xl w-64 text-white transition duration-300 ease-in-out my-8"
            :disabled="disablePlayBtn"
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
  </Transition>
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

  <!-- Gamepage UI -->
  <Transition name="gamepage">
    <section
      v-if="showGamePage"
      class="h-screen min-h-screen flex flex-col items-center justify-center"
      :class="isDark ? 'bg-[#121212]' : ''"
    >
      <div class="flex margin mt-3" v-if="isDark">
        <input type="checkbox" class="toggle" checked @click="toggleDark()" />
      </div>
      <div class="flex margin mt-3" v-else>
        <input type="checkbox" class="toggle" @click="toggleDark()" />
      </div>
      <h1 class="font-bold text-5xl my-10" :class="isDark ? 'text-white' : ''">
        Simon Says
      </h1>
      <div class="flex justify-between w-96 my-4 max-sm:w-80">
        <span
          class="countdown font-mono text-2xl"
          :class="isDark ? 'text-white' : ''"
          >Round : {{ round }}</span
        >
        <span
          class="countdown font-mono text-2xl"
          :class="isDark ? 'text-white' : ''"
          style="--value:${secondUint} : ${firstUint} "
          >{{ secondUint }} : {{ firstUint }}</span
        >
      </div>

      <main
        v-if="gameSize === 2"
        class="grid grid-cols-2 gap-5 w-96 sm:h-96 max-sm:w-80"
      >
        <button
          v-for="buttonNumber in buttons.slice(0, 4)"
          :class="showTraceState(buttonNumber.number)"
          :disabled="disableBlock"
          :key="buttonNumber.number"
          :id="buttonNumber.number"
          class="rounded-md h-44 shadow-md hover:brightness-90 active:brightness-150"
          @click="playerClick"
        ></button>
      </main>

      <main
        v-else-if="gameSize === 3"
        class="grid grid-cols-3 gap-5 w-96 max-sm:w-80"
      >
        <button
          v-for="buttonNumber in buttons"
          :class="showTraceState(buttonNumber.number)"
          :disabled="disableBlock"
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
          :disabled="disableStart"
        >
          START
        </button>

        <button
          class="btn btn-warning w-40 max-sm:w-28 shadow-md hover:shadow-yellow-500/50"
          @click="resetGame"
          :disabled="disableReset"
        >
          RESTART
        </button>
      </div>
      <button
        class="btn mb-4 btn-primary w-96 max-sm:w-80 shadow-md hover:shadow-indigo-500/50"
        @click="startToggle()"
        :disabled="disableStart"
      >
        HOME
      </button>
    </section>
  </Transition>

  <section
    v-if="showPopupEnd"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="w-80 text-center bg-white p-8 rounded-lg">
      <h1 class="text-2xl font-bold mb-4">End!</h1>
      <div>
        <div v-if="playerLog[playerLog.length - 1].round <= 10">
          TRY AGAIN NOOB!
        </div>
        <div
          v-else-if="
            playerLog[playerLog.length - 1].round > 10 &&
            playerLog[playerLog.length - 1].round < 30
          "
        >
          THAT KINDA DECENT...
        </div>
        <div v-else>EXCELLENT!</div>
        <br />
        Finished Round: {{ playerLog[playerLog.length - 1].round }}
        <br />
        Finished Time: {{ playerLog[playerLog.length - 1].time }}
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

<style scoped>
.gamepage-enter-active {
  animation: gamepage 0.5s;
}

.gamepage-leave-active {
  animation: gamepage 0.5s;
  animation-direction: reverse;
}

.homepage-enter-active {
  animation: homepage 0.5s;
  animation-direction: reverse;
}

.homepage-leave-active {
  animation: homepage 0.5s;
}
@keyframes homepage {
  0% {
    transform: translateX(0vw);
  }

  100% {
    transform: translateX(-100vw);
  }
}

@keyframes gamepage {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
</style>
