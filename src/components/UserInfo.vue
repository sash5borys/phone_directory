<template>
  <div id="user-info" class="col-container" v-if="localState.user.name">
    <div class="photo">
      <img :src="localState.user.image" :alt="localState.user.name" />
    </div>
    <h1>{{ localState.user.name }}</h1>
    <p class="address">{{ localState.user.address }}</p>
    <p>
      <a :href="`mailto:${localState.user.email}`" class="contact">Сконтактуватися</a>
    </p>
  </div>
</template>

<script>
import { watch, reactive } from "@vue/composition-api";
import { useStore } from "@/store";

export default {
  name: "UserInfo",
  setup() {
    const { state } = useStore();
    const localState = reactive({
      user: state.selectedUser
    });

    watch(
      () => state.selectedUser,
      () => {
        localState.user = state.selectedUser;
      }
    );
    return { localState };
  }
};
</script>

<style scoped lang="scss">
#user-info {
  width: 300px;
  align-items: center;
  margin-bottom: 20px;
  text-align: center;

  .photo {
  }
  .address {
    color: grey;
    font-size: 18px;
  }
  .contact {
    border: none;
    outline: 0;
    padding: 8px;
    color: white;
    background-color: #8a2be2;
    cursor: pointer;
    font-size: 18px;
    &:hover {
      background-color: #b592d9;
    }
  }
}
</style>
