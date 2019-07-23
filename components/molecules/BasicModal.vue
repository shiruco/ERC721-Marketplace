<template>
  <div :class="{ 'is-active': isShow }" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-title modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body modal-parent">
        <slot></slot>
      </section>
      <footer v-if="!isOnlyConfirm" class="modal-card-foot">
        <button
          v-if="isDecideBtnActive"
          :disabled="isFreezed"
          class="button is-success"
          @click="decide"
        >
          OK
        </button>
        <button :disabled="isFreezed" class="button" @click="close">
          Cancel
        </button>
      </footer>
      <footer v-else class="modal-card-foot">
        <button :disabled="isFreezed" class="button" @click="close">
          Close
        </button>
      </footer>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { State, Action, namespace } from "vuex-class"

const BasicModalState = namespace("basicModal", State)
const BasicModalAction = namespace("basicModal", Action)

@Component({})
export default class BasicModal extends Vue {
  @BasicModalState
  isShow: boolean
  @BasicModalState
  title: string
  @BasicModalState
  body: string
  @BasicModalState
  isDecideBtnActive: boolean
  @BasicModalState
  handleOnClickDecide: Function
  @BasicModalState
  isOnlyConfirm: boolean
  @BasicModalState
  isFreezed: boolean
  @BasicModalState
  closeHook: Function

  @BasicModalAction
  closeModal: () => void

  /** methods */
  decide() {
    this.handleOnClickDecide()
  }
  close() {
    if (this.closeHook) {
      this.closeHook()
    }
    this.closeModal()
  }
}
</script>

<style scoped type="scss">
.modal-title {
  font-weight: 600;
  margin-bottom: 0 !important;
}
.modal-parent {
  position: relative;
}
</style>
