<script setup>
import { ref } from 'vue'

const playerLog = ref([]) //[{score: x, round: x}]
const playerScore = ref(1)
const timeCounter = ref(1)
let gameRoundPointer = 0
let traceButtonIndex = ref(-1)

const scoreCounting = () => { return playerScore.value++ }
const playerToLog = () => { playerLog.push({ score: playerScore.value, round: playerScore.value }) }
const playerTimer = () => { 
        const timer = setInterval(() => { 
                timeCounter.value++
                /*
                        Endgame event.
                */
        }, 1000) 
}

const calculateScore = () => {
        // Temp....
        
        // if (playerLog.score < 5 && timeCounter.value >= 10) {
                
        // } else if (playerLog.score < 15 && timeCounter.value >= 20) {
 
        // } else if (playerLog.score < 20 && timeCounter.value >= 30) {

        // }
}

const displayTrace = () => {
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

const showTraceState = (buttonNumber) => {
        return {
                'whitebtn': traceButtonIndex.value === buttonNumber,
        }
}

</script>

<template>
        <section>
                <!-- Timer event test
                <button @click="playerTimer">Click</button>
                {{ timeCounter }} -->
        </section>
</template>

<style scoped>
.whitebtn {
        background-color: white;
}
</style>