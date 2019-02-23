<template>
    <div>
        <div class="bg-blue p-2 flex text-white items-center">
            <div class="text-lg">
                <div>Word Traveler</div>
                <a class="text-xs text-white" href="http://github.com" target="_blank">Find on GitHub!</a>
            </div>
            <div class="flex-1 mx-8">
                <input @input="changeRootWord" class="w-full rounded p-2" id="query"
                       placeholder="Start with any word..." type="text"
                       v-model="query">
            </div>
        </div>
        <div class="p-2" v-if="loading">
            <p>Loading...</p>
        </div>
        <div class="p-2 bg-grey-lighter shadow-inner leading-loose" v-if="!loading && this.query">
            <div v-if="defs">
                <div class="leading" v-for="(value, key) in defs.meaning" v-bind:key="key">
                    <div v-bind:key="def.definition" v-for="def in value">
                        <span class="font-bold">{{key | title}}: </span><span>{{def.definition}}</span>
                    </div>
                </div>
            </div>
            <div v-else>
                No definitions found
            </div>
        </div>
        <div class="flex justify-around font-mono" v-if="results">
            <div class="flex-1 shadow-md" v-bind:class="backgroundColor(key)" v-bind:key="key"
                 v-for="(value, key) in filteredResults">
                <div class="font-bold mb-2 p-2 bg-grey-light text-lg">{{key | title}}</div>
                <div class="list-item" v-bind:key="word.word" v-for="word in value">
                    <div @click="setWord(word.word)" class="p-2 hover:bg-grey-light  cursor-pointer">
                        <span>{{formatForKey(key, word.word) | title}}</span>
                        <span class="text-grey text-xs"> - {{word.score}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-4">
            <div class="text-center leading-loose">
                <h1>Word Traveler</h1>
                <p>Explore words and their siblings instantly by typing any word or phrase above.</p>
                <p>Made for writers, programmers, etc</p>
                <div class="">
                    <div>Sample Words:</div>
                    <div class="flex justify-center">
                        <div class="mr-2"><a @click.prevent="setWord('airplane')" href="#">airplane</a></div>
                        <div class="mr-2"><a @click.prevent="setWord('tame')" href="#">tame</a></div>
                        <div class="mr-2"><a @click.prevent="setWord('mountainous')" href="#">mountainous</a></div>
                        <div class="mr-2"><a @click.prevent="setWord('colorful')" href="#">colorful</a></div>
                        <div class="mr-2"><a @click.prevent="setWord('fireman')" href="#">fireman</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import _ from "lodash";
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'home',
        data() {
            return {
                query: null,
            }
        },
        filters: {
            title(word) {
                return word.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            }
        },
        computed: {
            ...mapState(["word", "loading", "results", "defs"]),
            filteredResults() {
                const result = {};
                for (var property in this.results) {
                    if (this.results.hasOwnProperty(property)) {
                        if(this.results[property].length > 0) {
                            result[property] = this.results[property];
                        }
                    }
                }
                return result;
            }
        },
        methods: {
            ...mapActions(["searchWord"]),
            setWord(word) {
                this.query = word;
                this.searchWord(word);
            },
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