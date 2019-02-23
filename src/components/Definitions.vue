<template>
    <div class="p-2 bg-grey-lighter shadow-inner leading-loose">
        <div v-if="defs">
            <div v-if="!showingMore" class="flex justify-between">
                <div class="flex">
                    <div class="font-bold mr-2">{{firstDef.type}}</div>
                    <div class="mr-2">{{firstDef.definition}}</div>
                    <div class="text-grey">{{firstDef.example}}</div>
                </div>
                <div v-if="defs.length - 1 > 0">
                    <div @click="showingMore = true" class="underline cursor-pointer">Show {{defs.length - 1}} more
                    </div>
                </div>
            </div>
            <div v-if="showingMore">
                <div class="flex" v-for="def in defs" v-bind:key="def.definition">
                    <div class="font-bold mr-2">{{def.type}}</div>
                    <div class="mr-2">{{def.definition}}</div>
                    <div class="text-grey">{{def.example}}</div>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="loading">
                <span>Loading definitions...</span>
            </div>
            <div v-else>
                <span>No definitions found</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "Definitions",
        data() {
            return {
                showingMore: false
            }
        },
        watch: {
            defs() {
                this.showingMore = false;
            }
        },
        computed: {
            ...mapState(["loading", "defs"]),
            firstDef() {
                if (this.defs) {
                    return this.defs[0];
                }
                return null;
            },
        },

    }
</script>

<style scoped>

</style>