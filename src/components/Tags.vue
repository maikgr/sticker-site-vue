<template>
  <nav class="panel">
    <div class="panel-heading">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="search"
          @keyup.enter="searchQuery($event.target.value)" />
        <span class="icon is-left">
          <font-awesome-icon icon="search" />
        </span>
      </p>
    </div>
    <label class="panel-block" v-if="tags.length > 0">
      <input type="checkbox" />
      tags (in development)
    </label>
  </nav>
</template>

<script>
export default {
  name: 'Tags',
  data () {
    return {
      tags: []
    }
  },
  methods: {
    searchQuery: function (query) {
      this.$emit('searchQuery', query)
    }
  }
}
</script>

<style>
  .panel-block {
    margin-left: 10px;
  }
</style>
