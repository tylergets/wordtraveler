<template>
    <div>
        <div class="p-4">
            <div class="text-center leading-loose">
                <h1>Word Traveler</h1>
                <p>Explore words and their siblings instantly by typing any word or phrase above.</p>
                <p>Made for writers, programmers, etc</p>
                <div class="">
                    <div>Sample Words:</div>
                    <div class="flex justify-center">
                        <div class="mr-2"><router-link to="/airplane">airplane</router-link></div>
                        <div class="mr-2"><router-link to="/tame">tame</router-link></div>
                        <div class="mr-2"><router-link to="/headphones">headphones</router-link></div>
                        <div class="mr-2"><router-link to="/computer">computer</router-link></div>
                        <div class="mr-2"><router-link to="/landscape">landscape</router-link></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
    }
</script>

<style>
</style>