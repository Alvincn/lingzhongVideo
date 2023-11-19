<template>
  <div>
    <div class="searchInput">
      <SearchComponent @inputHandle="inputHandle" />
    </div>
    <hr />
    <div class="empty" v-if="videoEmpty">
      <img src="../../assets/images/svg/noLike.svg" alt="">
      <span style="color: gray;user-select: none;">没有搜索到内容，换个搜索词试试</span>
    </div>
    <videoItem v-if="videoResult.value && videoResult.value.length" :videoList="videoResult.value" />
  </div>
</template>

<script setup>
import { ref, reactive, toRefs } from 'vue'
// 引入搜索框
import SearchComponent from '@/components/inputComponent/index.vue'
// 根据搜索获取内容
import useVideoElseStore from '@/store/videoElse';
import videoItem from '@/components/videoItem/index.vue'
let videoResult = reactive({
  value: []
})
const videoEmpty = ref(false)
const videoElseStore = useVideoElseStore()
const inputHandle = async (value) => {
  let result = await videoElseStore.getSearchVideo(value.value, 100, 0)
  videoResult.value = result.obj
  if (videoResult.value === undefined) {
    return videoEmpty.value = true
  }
  if (videoResult.value.length === 0) {
    return videoEmpty.value = true
  }
  return videoEmpty.value = false

}
</script>

<style scoped lang="scss">
.searchInput {
  margin: 20px 0;
  display: flex;
  justify-content: center;


}

.empty {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;

  img {
    height: 80%;
  }
}
</style>