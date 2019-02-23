<template>
    <div>
        <definitions/>
        <div class="flex justify-around font-mono" v-if="results">
            <div class="flex-1 shadow-md" v-bind:class="backgroundColor(key)" v-bind:key="key"
                 v-for="(value, key) in filteredResults">
                <div class="font-bold mb-2 p-2 bg-grey-light text-lg">{{key | title}}</div>
                <div class="list-item" v-bind:key="word.word" v-for="word in value">
                    <router-link :to="word.word" class="p-2 hover:bg-grey-light  cursor-pointer" tag="div">
                        <span>{{formatForKey(key, word.word) | title}}</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import _ from "lodash";
    import {mapActions, mapState} from "vuex";
    import Definitions from "../components/Definitions";

    export default {
        name: 'home',
        components: {Definitions},
        props: ['query'],
        mounted() {
            this.searchWord(this.query)
        },
        beforeRouteUpdate(to, from, next) {
            this.searchWord(to.params.query);
            next();
        },
        computed: {
            ...mapState(["loading", "results"]),
            filteredResults() {
                const result = {};
                for (var property in this.results) {
                    if (this.results.hasOwnProperty(property)) {
                        if (this.results[property].length > 0) {
                            result[property] = this.results[property];
                        }
                    }
                }
                return result;
            }
        },
        methods: {
            ...mapActions(["searchWord"]),
            formatForKey(key, word) {
                switch (key) {
                    case "predecessors":
                        return word + " " + this.query;
                    case "followers":
                        return this.query + " " + word;
                    default:
                        return word;
                }
            },
            backgroundColor(value) {
                switch (value) {
                    case "related":
                    case "synonyms":
                    case "general":
                        return ["bg-green-lighter"];
                    case "antonyms":
                        return ["bg-red-lightest"];
                    case "describes":
                    case "adjectives":
                        return ["bg-orange-lighter"];
                    case "compromises":
                        return ["bg-indigo-lightest"];
                    case "rhymes":
                    case "homophones":
                        return ["bg-yellow-light"];
                    case "predecessors":
                        return ["bg-blue-lighter"];
                    case "followers":
                    case "triggers":
                        return ["bg-blue-lightest"];
                    default:
                        console.log(value);
                        return [];
                }
            },
            changeRootWord: _.debounce(function () {
                return this.searchWord(this.query);
            }, 500)
        }
    }
</script>

<style>
</style>