<template>
  <div class='notFound'>
    <el-empty description="404，您访问的页面不存在" :image="getImageUrl('404.png')" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getImageUrl } from '@/utils/utils.js'
</script>

<style scoped lang='scss'>
.notFound {
  width: 100%;
  height: 100%;
}
</style>