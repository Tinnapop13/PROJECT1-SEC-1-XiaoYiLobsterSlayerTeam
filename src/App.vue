<script setup>
import {openBlock, ref} from "vue"

const showHomePage = ref(true)
const showGamePage = ref(false)
const showPopup = ref(false)
const showScore = ref(false)

const togglePopup = () => {
  showPopup.value = !showPopup.value
}

const start = () => {
  showGamePage.value = true
  showHomePage.value = false
}

const end = () => {
  showHomePage.value = true
  showGamePage.value = false
}

const resetGame = () => {
  // everything to zero
}
</script>

<template>
  <div class="w-full h-full">
    <!-- Home page  -->
    <!-- TODO: gameDesc, mode, sizeOfBlock, playButton, tutorialBtn-->
    <!-- <section v-if="showHomePage" class="flex h-screen w-full">
      <div
        class="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row"
      >
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
            src="https://cdn.discordapp.com/attachments/1196805209381404682/1200079939706302576/Z.png?ex=65c4e08a&is=65b26b8a&hm=7b9c6f2bf49d2006dac6f93cfc10ce7daefa398d3f0f61ed0090bdc2e90552a6&"
            alt="mr.Simon"
            class="rounded-2xl w-2/3 md:w-full items-center"
          />
        </div>
      </div>

      <div class="">
        <h3 class="text-xl font-bold ">Select Mode</h3>
        <div >
          <div>mode1</div>
          <div>mode2</div>
          <div>mode3</div>
        </div>
      </div>

      <div>
        <h3 class="text-xl font-bold mb-2">Select Size</h3>
        <div>Size1</div>
        <div>Size2</div>
        <div>Size3</div>
      </div>

      <button @click="start" class="btn btn-primary text-white px-4 py-2 mt-4">
        PLAY
      </button>

      <button
        @click="togglePopup"
        class="btn btn-secondary text-white px-4 py-2 mt-4"
      >
        Tutorial
      </button>
    </section> -->

    <!-- Tutorial pop-up -->
    <!-- <section
      v-if="showPopup"
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
          @click="togglePopup"
          class="bg-blue-500 text-white px-4 py-2 mt-4"
        >
          Close
        </button>
      </div>
    </section> -->

    <!-- Game page -->
    <!-- <section
      v-if="showGamePage"
      class="min-h-screen flex flex-col items-center justify-center"
    >
      <main class="grid grid-cols-2 auto-rows-auto gap-x-5 gap-y-5 w-96 h-96">
        
      </main>

      <button class="btn btn-primary mt-10">Start</button>
      <button @click="end" class="btn btn-success mt-10">Home</button>
    </section> -->

    <section class="min-h-screen flex flex-col items-center justify-center">
      <main class="grid grid-cols-2 auto-rows-auto gap-x-5 gap-y-5 w-96 h-96">
        <button
          v-for="(button, buttonNumber) in buttons"
          :key="index"
          :class="{active: button.isActive}"
          @click="showTraceState(buttonNumber)"
        >
          Button {{ index + 1 }}
        </button>
      </main>
      <button class="btn btn-primary mt-10" @click="start">Start</button>
      <p v-if="gameOver">Game Over! Your score: {{ score }}</p>
    </section>

    <!-- score page pop-up-->

    <!-- <section
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

        <button class="bg-blue-500 text-white px-4 py-2 mt-4">
          Play Again
        </button>
      </div>
    </section> -->
  </div>
</template>

<style scoped></style>
