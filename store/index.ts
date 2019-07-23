import { NuxtApp } from 'nuxt'
import { GetterTree, MutationTree } from 'vuex'

import { RootActionTree, RootState, State } from '../types/'

export const state = (): State => ({
  version: '0.0.1'
})

export const getters: GetterTree<State, RootState> = {
  version: state => state.version
}

export const mutations: MutationTree<State> = {
  
}

export const actions: RootActionTree<State, RootState> = {
  async nuxtServerInit(this: NuxtApp, { commit }, { app, req }) {
    
  }
}