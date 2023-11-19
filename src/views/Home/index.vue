<template>
  <div class="home">
    <VideoComponent />
  </div>
</template> 

<script setup>
import { ref, reactive } from 'vue'
import VideoComponent from './videoItem/index.vue'
</script>

<style scoped lang="scss">
.home {
  height: 100%;
}
</style>