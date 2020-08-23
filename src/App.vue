<template>
  <div id="app">
    <SearchBar />
    <UserInfo />
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import UserInfo from "@/components/UserInfo.vue";

export default {
  name: "App",
  components: {
    UserInfo,
    SearchBar
  }
};
</script>

<style lang="scss">
// Global style
* {
  box-sizing: border-box;
}
@mixin flexContainer($direction) {
  display: flex;
  flex-direction: $direction;
  justify-content: flex-start;
}

.row-container {
  @include flexContainer(row);
}
.col-container {
  @include flexContainer(column);
}

//Component style
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: 10px 15px;
}
</style>