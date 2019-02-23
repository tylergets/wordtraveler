<template>
    <div class="p-4">
        <div class="text-center leading-loose">
            <div v-for="(hist, key) in history" v-bind:key="key">
                <router-link :to="hist" class="cursor-pointer" tag="div">
                    <span class="font-bold">{{key}}</span><span> - {{hist}}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: 'home',
        computed: {
            ...mapState(["history"])
        }
    }
</script>

<style>
</style>