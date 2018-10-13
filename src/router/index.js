import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/Content'
import Tags from '@/components/Tags'
import Pagination from '@/components/Pagination'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'Content',
      components: {
        default: Content,
        pagination: Pagination,
        tags: Tags
      }
    }
  ]
})
