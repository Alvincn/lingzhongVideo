<template>
  <div class="layout">
    <Tabbar />
    <div class="container">
      <Menu />
      <div class="main">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script setup>
import Tabbar from '@/components/tabbar/index.vue'
import Menu from '@/components/menu/index.vue'
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;
  border-radius: 20px;

  .container {
    display: flex;
    height: 100%;
  }

  .main {
    padding: 10px;
    margin-left: 10px;
    width: calc(100% - $menu-width - 50px);
    height: calc(100% - $tabbar-height - 50px);
    border-radius: 10px;

    background-color: rgba(59, 59, 60, 0.9);
    backdrop-filter: blur(20px);
    padding: 10px;
  }
}
</style>