const state = {
  logs: []
};

const mutations = {
  addErrorLog: (state, log) => {
    state.logs.push(log);
  },
  clearErrorLog: (state) => {
    state.logs.splice(0);
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
