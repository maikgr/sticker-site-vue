<template>
  <div id="app">
    <nav class="navbar has-background-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-item">
          <span class="is-size-4 has-text-light">Stickers</span>
        </div>
      </div>
    </nav>
    <div class="tile is-ancestor">
      <div id="section-tags" class="tile is-child is-2">
        <router-view name="tags" @searchQuery="onSearch($event)"/>
      </div>
      <div id="section-content" class="tile is-child">
        <router-view :searchQuery="queries" :currentPage="currentPage" @totalPage="onTotalPageSet($event)"/>
        <router-view name="pagination" :totalPage="totalPage" @currentPage="onPageSelected($event)"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      queries: '',
      totalPage: 1,
      currentPage: 1
    }
  },
  methods: {
    onSearch: function (query) {
      this.queries = query
    },
    onTotalPageSet: function (number) {
      this.totalPage = number
    },
    onPageSelected: function (number) {
      this.currentPage = number
    }
  }
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#section-tags {
  padding: 10px 0;
}

html, body {
  height: 100%;
}

.navbar-brand {
  padding: 5px 0;
}
</style>
