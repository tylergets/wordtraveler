import Vue from 'vue'
import Vuex from 'vuex'
import {finder} from "./api/muse";
import {dictionary} from "./api/googledict";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        results: null,
        word: null,
        defs: null,
        history: [],
    },
    mutations: {
        setLoading(state, loading) {
            state.loading = loading;
        },
        setResults(state, results) {
            state.results = results;
        },
        setDefinitions(state, defs) {
            state.defs = defs;
        },
        setWord(state, word) {
            document.title = word;
            state.word = word;
            state.history.push(word);
        }
    },
    actions: {
        searchWord({commit}, word) {
            commit('setWord', word);
            commit('setLoading', true);
            commit('setResults', null);
            commit('setDefinitions', null);
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
