<script setup>

import { ref } from 'vue';

const user_event_log = ref([]) //[{x: x, x: x}]
const score_counting = ref([]) //[{round: x, score: x}]

const push_log = (user_event) => { user_event_log.push(user_event) }
const push_score = (user_score) => { score_counting.push(user_score) }

</script>

<template>
	<h1>Simon Says</h1>
</template>

<style scoped>
</style>