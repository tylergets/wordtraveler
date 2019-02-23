<template>
    <div class="h-full" id="app">
        <router-view/>
    </div>
</template>

<style lang="postcss">
    @import 'assets/styles/tailwind.postcss';

    html, body {
        @apply h-full;
    }
</style>
