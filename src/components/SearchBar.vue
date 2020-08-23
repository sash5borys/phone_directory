<template>
  <form id="search-form" class="col-container">
    <div class="search-line row-container">
      <input
        v-model.trim="bar.search"
        type="text"
        class="search-input"
        placeholder="Ім'я..."
        @input="onInput"
        @keydown.esc="onEsc('')"
        @keydown.enter.prevent="selectDropElement"
        @keydown.down="onDown"
        @keydown.up="onUp"
      />
    </div>
    <ul v-if="dropdown.isOpened" class="search-list">
      <li
        v-for="(user, i) in localState.usersList"
        :key="user.id"
        ref="dropdownLi"
        :class="{'selected': i === dropdown.selected}"
        @mouseover="dropdown.selected = i"
        @mousedown="selectDropElement"
      >{{ user.name }}</li>
      <IObserver @intersect="loadMoreEmements" />
    </ul>
  </form>
</template>

<script>
import { onMounted, reactive, watch, ref } from "@vue/composition-api";
import { useStore } from "@/store";
import IObserver from "@/components/IObserver.vue";

export default {
  name: "SearchBar",
  components: { IObserver },
  setup() {
    const dropdownLi = ref();
    const { state, dispatch, commit } = useStore();

    const localState = reactive({
      users: [],
      usersList: []
    });

    const bar = reactive({
      search: ""
    });

    const dropdown = reactive({
      isOpened: false,
      selected: 0,
      from: 0,
      count: 20
    });

    // Methods
    function getUsersFromState() {
      dispatch("FETCH_USERS");
    }
    function setSelectedUserToState(user) {
      commit("SET_SELECTED_USER_TO_STATE", user);
    }

    function filteringUsers(search) {
      const condition = new RegExp(search, "i");
      return state.users.filter(user => user.name.match(condition));
    }

    function selectDropElement() {
      const selectedElement = localState.usersList[dropdown.selected];

      onEsc(selectedElement.name);
      setSelectedUserToState(selectedElement);
    }

    function onInput() {
      dropdown.selected = 0;
      dropdown.isOpened = true;
    }

    function onDown() {
      dropdown.selected =
        dropdown.selected < localState.usersList.length - 1
          ? dropdown.selected + 1
          : localState.usersList.length - 1;
    }

    function onUp() {
      dropdown.selected = dropdown.selected > 0 ? dropdown.selected - 1 : 0;
    }

    function onEsc(text = "") {
      bar.search = text;
      dropdown.isOpened = false;
    }

    function loadMoreEmements() {
      dropdown.from = dropdown.count;
      dropdown.count += 10;
      localState.usersList = [
        ...localState.usersList,
        ...localState.users.slice(dropdown.from, dropdown.count)
      ];
    }

    // Watchers
    watch(
      () => bar.search,
      () => {
        dropdown.from = 0;
        dropdown.count = 20;

        localState.users = filteringUsers(bar.search);
        localState.usersList = localState.users.slice(
          dropdown.from,
          dropdown.count
        );
      }
    );

    watch(
      () => dropdown.selected,
      () => {
        dropdownLi.value[dropdown.selected].scrollIntoView({
          block: "nearest"
        });
      }
    );

    // Lifecycle Events
    onMounted(() => {
      getUsersFromState();
    });

    return {
      dropdownLi,
      localState,
      bar,
      dropdown,
      selectDropElement,
      onInput,
      onDown,
      onUp,
      onEsc,
      loadMoreEmements
    };
  }
};
</script>

<style scoped lang="scss">
#search-form {
  position: relative;
  width: 250px;
  margin-bottom: 20px;

  .search-line {
    align-items: center;
    height: 40px;
    outline: none;
    border: none;

    * {
      border: none;

      &:focus {
        outline: none;
      }
    }

    .search-input {
      flex: 2;
      height: 100%;
      border: blueviolet solid;
      border-width: 3px;
      border-radius: 3px;
    }
  }

  .search-list {
    position: absolute;
    top: 40px;
    width: 100%;
    height: 350px;
    margin: 0;
    color: #fff;
    list-style: none;
    padding: 0;
    overflow: auto;
    cursor: pointer;

    li {
      padding: 15px 3px;

      &:nth-child(2n + 1) {
        background-color: #b592d9;
      }

      &:nth-child(2n) {
        background-color: #8a2be2;
      }

      &.selected {
        background-color: #e0dbe4;
      }
    }
  }
}
</style>
