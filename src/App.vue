<script setup>

import { ref, reactive } from "vue"


const playerLog = ref([])
const isEndPopup = ref(false)
const playerScore = ref(1)
const playerRound = ref(0)
const sumTimes = ref(0)

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
        }, 1)
}

const calculateScore = () => {
        // Temp....

        // if (playerLog.score < 5 && timeCounter.value >= 10) {

        // } else if (playerLog.score < 15 && timeCounter.value >= 20) {

        // } else if (playerLog.score < 20 && timeCounter.value >= 30) {

        // }
}

const displayTrace = () => {
        playerTimer()
        playerRound.value++
        const gameInterval = setInterval(() => {
                const randomButtonId = randomNumber(4)

                setTimeout(() => {
                        if (gameRoundPointer < playerScore.value) {
                                traceButtonIndex.value = traces[gameRoundPointer - 1]
                        }
                        else {
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

        const gameInterval = setInterval(() => {
                const randomButtonId = randomNumber(4)
                setTimeout(() => { traceButtonIndex.value = randomButtonId }, 500)
                setTimeout(() => { traceButtonIndex.value = -1 }, 750)
                gameRoundPointer++
                if (gameRoundPointer >= playerScore.value) {
                        clearInterval(gameInterval)
                        gameRoundPointer = 0
                }
        }, 750)
}

const randomNumber = (max) => {
        return Math.floor(Math.random() * max);
}

</script>

<template>
        <div class="w-full h-full">
                <section class="min-h-screen flex flex-col items-center justify-center">
                        <h1 class="font-bold text-5xl py-20">Simon Says</h1>
                        <span class="countdown font-mono text-2xl">{{ secondUint }} : {{ firstUint }}</span>
                        <br>
                        <main class="grid grid-cols-2 auto-rows-auto gap-x-5 gap-y-5 w-96 h-96">
                                <button v-for="buttonNumber in buttons" :class="showTraceState(buttonNumber.number)"
                                        :key="buttonNumber" class="rounded-md h-44 hover:brightness-90"></button>
                        </main>
                        <div>
                                <button class="btn btn-primary mt-10" @click="displayTrace">Start</button>
                        </div>
                        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" v-if="isEndPopup">
                                <div class="w-80 text-center bg-white p-8 rounded-lg">
                                        <h1 class="text-2xl font-bold mb-4">This is a tutorial</h1>

                                        <div>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
                                                incidunt mollitia alias enim! Hic pariatur, nisi magnam, accusamus
                                                excepturi corporis dolorum, libero eos aspernatur sequi totam odio ab
                                                recusandae facilis?
                                        </div>
                                </div>
                        </div>
                </section>
        </div>
</template> 

<style scoped>
.whitebtn {
        background-color: white;
}
</style>