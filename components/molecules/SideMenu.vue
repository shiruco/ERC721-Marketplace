<template>
  <div class="sidemenu">
    <aside class="menu">
      <p class="menu-label is-white-text">General</p>
      <ul class="menu-list">
        <li class="item">マーケットプレイス</li>
      </ul>
    </aside>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"

@Component({})
export default class MainHeader extends Vue {}
</script>

<style scoped type="scss">
.sidemenu {
  margin: 0;
  padding: 20px;
  width: 250px;
  list-style: none;
  color: #fff;
  background-color: #464866;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
}
.item {
  color: #fff;
}
</style>
