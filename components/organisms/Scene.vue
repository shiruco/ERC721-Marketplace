<template>
  <canvas :width="width" :height="height" class="canvas" />
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"

@Component({})
export default class Scene extends Vue {
  @Prop() width
  @Prop() height
}
</script>

<style scoped type="scss">
.canvas {
  border-style: none;
  outline: none;
}
</style>
