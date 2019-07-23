import { NuxtApp } from 'nuxt'
import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootActionTree, RootState } from '../types'
import { SceneState } from '../types/scene'
export const SET_SIZE = 'SET_SIZE'

export const state = (): SceneState => ({
  width: 500,
  height: 500
})

export const getters: GetterTree<SceneState, RootState> = {
  scene(state) {
    return {
      width: state.width,
      height: state.height,
    }
  }
}

export const mutations: MutationTree<SceneState> = {
  SET_SIZE(state: SceneState, payload) {
    state.width = payload.width
    state.height = payload.height
  }
}

export const actions: ActionTree<SceneState, RootState> = {
  async setSize({ commit }, payload) {
    commit(SET_SIZE, payload)
  }
}