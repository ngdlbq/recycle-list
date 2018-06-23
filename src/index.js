import Recycle from './index.vue'

Recycle.install = function($vue) {
  $vue.Component(Recycle, Recycle.name)
}

export default Recycle