import Vue from 'vue';
import Vuex from 'vuex';

import faker from 'faker';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: [],
    selectedUser: {},
  },
  getters: {
    GET_SELECTED_USER(state) {
      return state.selectedUser;
    },
  },
  mutations: {
    SET_USERS_TO_STATE(state, users) {
      state.users = users;
    },
    SET_SELECTED_USER_TO_STATE(state, user) {
      state.selectedUser = user;
    },
  },
  actions: {
    async FETCH_USERS({ commit }) {
      const users = await generateUsers(40000);
      commit('SET_USERS_TO_STATE', users);
    },
  },
  modules: {},
});

function createUser() {
  faker.locale = 'uk';
  return {
    id: faker.random.number(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    image: faker.image.avatar(),
  };
}

async function generateUsers(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(createUser());
  }
  return users;
}

export const useStore = () => store;
