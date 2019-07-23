import { NuxtContext } from 'nuxt'
import { ActionContext, ActionTree } from 'vuex'
import { SceneState } from './scene';

export type RootState = State & ModulesState

export interface State {
  version: string
}

export interface ModulesState {
  scene: SceneState
}

export interface RootActionTree<S, R> extends ActionTree<S, R> {
  nuxtServerInit(context: ActionContext<S, R>, NuxtContext: NuxtContext): Promise<void>;
}