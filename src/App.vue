<template>
    <div class="h-full" id="app">
        <div class="bg-blue p-2 flex text-white items-center">
            <div class="text-lg mr-4">
                <router-link tag="div" to="/">Word Traveler</router-link>
                <a class="text-xs text-white" href="https://github.com/tylergets/wordtraveler" target="_blank">Find on GitHub!</a>
            </div>
            <div class="flex-1 mr-2">
                <input class="w-full rounded p-2" id="query" placeholder="Start with any word..." type="text" :value="word" @input="searchByInput">
            </div>
            <div>
                <router-link tag="button" to="/history" class="text-white border p-2 rounded">History</router-link>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import {mapActions, mapState} from "vuex";
    import _ from "lodash";

    export default {
        name: 'home',
        computed: {
            ...mapState(["word"]),
        },
        methods: {
            ...mapActions(["searchWord"]),
            searchByInput: _.debounce(function(event) {
                this.$router.push(event.target.value);
            }, 1000)
        }
    }
</script>

<style lang="postcss">
    @import 'assets/styles/tailwind.postcss';

    html, body {
        @apply h-full;
    }
</style>
