import Vue from 'vue'
import Vuex from 'vuex'
import {finder} from "./api/muse";
import {dictionary} from "./api/googledict";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        results: {},
        word: null,
        defs: null,
    },
    mutations: {
        changeWord(state, word) {
            state.word = word;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        setResults(state, results) {
            state.results = results;
        },
        setDefinitions(state, defs) {
            state.defs = defs;
        }
    },
    actions: {
        searchWord({commit}, word) {
            document.title = "WT: word";
            commit('setLoading', true);
            Promise.all([
                finder(word).then((words) => {
                    commit('setResults', words);
                }),
                dictionary(word).then((defs) => {
                    commit('setDefinitions', defs);
                })
            ]).then(() => {
                commit('setLoading', false);
            })
        }
    }
})
