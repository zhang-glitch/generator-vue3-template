<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '../store'

const store = useStore()

console.log(store.state.global.author)
</script>
