const state = {
  visitedViews: [],
  cachedViews: []
};

const mutations = {
  addVisitedView(state, view) {
    if (state.visitedViews.some(v => v.path === view.path)) {
      return;
    }
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.localizationTitle || view.name
      })
    );
  },
  addCachedView(state, view) {
    if (state.cachedViews.includes(view.name)) {
      return;
    }
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name);
    }
  },

  deleteVisitedView(state, view) {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },
  deleteCachedView(state, view) {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i);
        state.cachedViews.splice(index, 1);
        break;
      }
    }
  },
  deleteOthersVisitedViews(state, view) {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path;
    });
  },
  deletedOthersCachedViews(state, view) {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i);
        state.cachedViews = state.cachedViews.slice(index, index + 1);
        break;
      }
    }
  },
  deleteAllVisitedViews: state => {
    // keep affix tags
    state.visitedViews = state.visitedViews.filter(tag => tag.meta.affix);
  },
  deleteAllCachedViews: state => {
    state.cachedViews = [];
  },

  updateVisitedView(state, view) {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  }
};

const actions = {
  addView ({ dispatch }, view) {
    dispatch('addVisitedView', view);
    dispatch('addCachedView', view);
  },
  addVisitedView ({ commit }, view) {
    commit('addVisitedView', view);
  },
  addCachedView ({ commit }, view) {
    commit('addCachedView', view);
  },

  delView ({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view);
      dispatch('delCachedView', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      });
    });
  },
  delVisitedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('deleteVisitedView', view);
      resolve([...state.visitedViews]);
    });
  },
  delCachedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('deleteCachedView', view);
      resolve([...state.cachedViews]);
    });
  },

  delOthersViews ({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view);
      dispatch('delOthersCachedViews', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      });
    });
  },
  delOthersVisitedViews ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('deleteOthersVisitedViews', view);
      resolve([...state.visitedViews]);
    });
  },
  delOthersCachedViews ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('deletedOthersCachedViews', view);
      resolve([...state.cachedViews]);
    });
  },

  delAllViews ({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view);
      dispatch('delAllCachedViews', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      });
    });
  },
  delAllVisitedViews ({ commit, state }) {
    return new Promise(resolve => {
      commit('deleteAllVisitedViews');
      resolve([...state.visitedViews]);
    });
  },
  delAllCachedViews ({ commit, state }) {
    return new Promise(resolve => {
      commit('deleteAllCachedViews');
      resolve([...state.cachedViews]);
    });
  },
  updateVisitedView ({ commit }, view) {
    commit('updateVisitedView', view);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
