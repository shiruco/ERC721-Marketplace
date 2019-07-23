import { NuxtApp } from 'nuxt'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootActionTree, RootState } from '../types'
import { BasicModalState } from '../types/basic_modal'
export const OPEN_BASIC_MODAL = 'OPEN_BASIC_MODAL'
export const CLOSE_BASIC_MODAL = 'CLOSE_BASIC_MODAL'
export const SHOW_BASIC_MODAL_LOADING = 'SHOW_BASIC_MODAL_LOADING'
export const HIDE_BASIC_MODAL_LOADING = 'HIDE_BASIC_MODAL_LOADING'

export const state = (): BasicModalState => ({
  isShow: false,
  isLoading: false,
  title: "",
  body: "",
  isDecideBtnActive: true,
  handleOnClickDecide: () => {},
  isOnlyConfirm: false,
  isFreezed: false,
  closeHook: () => {}
})

export const getters: GetterTree<BasicModalState, RootState> = {
  scene(state) {
    return {
      isShow: state.isShow,
      isLoading: state.isLoading,
      title: state.title,
      body: state.body,
      isBtnClickable: state.isDecideBtnActive,
      handleOnClickDecide: state.handleOnClickDecide,
      isOnlyConfirm: state.isOnlyConfirm,
      isFreezed: state.isFreezed,
      closeHook: state.closeHook
    }
  }
}

export const mutations: MutationTree<BasicModalState> = {
  OPEN_BASIC_MODAL(state: BasicModalState, payload) {
    state.isShow = true
    state.title = payload.title
    state.body = payload.body
    state.isDecideBtnActive = (payload.isDecideBtnActive === undefined) ? true : payload.isDecideBtnActive,
    state.handleOnClickDecide = payload.handleOnClickDecide
    state.isOnlyConfirm = (payload.isOnlyConfirm === undefined) ? false : payload.isOnlyConfirm,
    state.isFreezed = (payload.isFreezed === undefined) ? false : payload.isFreezed,
    state.closeHook = payload.closeHook
  },
  CLOSE_BASIC_MODAL(state: BasicModalState, payload) {
    state.isShow = false
  },
  SHOW_BASIC_MODAL_LOADING(state: BasicModalState, payload) {
    state.isLoading = true
  },
  HIDE_BASIC_MODAL_LOADING(state: BasicModalState, payload) {
    state.isLoading = false
  }
}

export const actions: ActionTree<BasicModalState, RootState> = {
  async openModal({ commit }, payload) {
    commit(OPEN_BASIC_MODAL, payload)
  },
  async closeModal({ commit }, payload) {
    commit(CLOSE_BASIC_MODAL, payload)
  },
  async showLoading({ commit }, payload) {
    commit(SHOW_BASIC_MODAL_LOADING, payload)
  },
  async hideLoading({ commit }, payload) {
    commit(HIDE_BASIC_MODAL_LOADING, payload)
  }
}
