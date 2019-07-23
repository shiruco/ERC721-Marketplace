<template>
  <header>
    <nav
      class="navbar is-main is-mobile"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link to="/">
          <img class="logo" src="~/assets/images/logo_b.png" width="110" />
        </nuxt-link>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span> <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start"></div>
        <div class="navbar-end">
          <div class="navbar-item">
            <a class="button is-link is-small">有料プラン</a>
          </div>
          <div class="navbar-item">
            <span class="badge" data-badge="8">
              <img src="~/assets/images/info.png" width="30" />
            </span>
          </div>
          <div class="navbar-item">
            <img src="~/assets/images/folder.png" width="30" />
          </div>
          <div
            class="menu navbar-item has-dropdown user-menu"
            @click="handleOnClickMenu"
          >
            <div class="navbar-link">
              <div class="user-thumb">
                <img src="~/assets/images/user.png" width="30" />
              </div>
              <p class="is-white-text">user name</p>
            </div>
            <div class="navbar-dropdown">
              <a class="navbar-item"> プロフィール設定 </a>
              <a class="navbar-item"> 言語設定 </a>
              <a class="navbar-item"> プラン変更 </a>
              <hr class="navbar-divider" />
              <a class="navbar-item"> ログアウト </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"

@Component({})
export default class MainHeader extends Vue {
  handleOnClickMenu() {
    const dropdown = document.querySelector(".user-menu") as HTMLElement
    if (dropdown.classList.contains("is-active")) {
      dropdown.classList.remove("is-active")
    } else {
      dropdown.classList.add("is-active")
    }
  }
}
</script>

<style scoped type="scss">
.logo {
  margin: 17px 0 0 10px;
}
.menu {
  margin-left: 68px;
}
.user-thumb {
  display: inline-flex;
  margin-right: 10px;
}
.badge {
  display: inline-flex;
}
</style>
