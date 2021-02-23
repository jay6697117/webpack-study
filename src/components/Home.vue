<template>
  <div class="home-component">
    <div class="title">
      <div>我是注释，表明当前组件是根组件 App.vue</div>
      <button @click="$router.push('/page1')">Page1</button>
      <button @click="$router.push('/page2')">Page2</button>
      <button @click="$router.push('/page3')">Page3</button>
      <button @click="$router.push('/')">Home</button>
      <hr />
    </div>

    <router-view class="home-router-view" />
  </div>
</template>

<script>
export default {
  //根组件
  name: 'Home'
};
</script>

<style></style>
