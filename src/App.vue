<script setup>

import { ref } from 'vue'

const playerLog = ref([]) //[{score: x, round: x}]
const playerScore = ref(0)

const scoreCounting = () => { return playerScore++ }
const playerToLog = () => { playerLog.push({score: playerScore, round: playerScore}) }

const playerTimer = () => {
        
}

</script>

<template>

</template>

<style scoped>
</style>