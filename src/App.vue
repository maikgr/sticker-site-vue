<template>
  <div id="app">
    <nav class="navbar has-background-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-item">
          <span class="is-size-4 has-text-light">Stickers</span>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <p class="control has-icons-left">
            <input class="input" type="text" placeholder="search"
              @keyup.enter="onSearch($event.target.value)" />
            <span class="icon is-left">
              <font-awesome-icon icon="search" />
            </span>
          </p>
        </div>
      </div>
    </nav>
    <nav class="navbar navbar-center has-background-white">
      <div class="navbar-item has-text-weight-bold">
        Sort
      </div>
      <div class="navbar-item has-text-weight-bold has-dropdown is-hoverable">
        <a class="navbar-link">
          {{ activeSortState }}
        </a>
        <div class="navbar-dropdown">
          <a class="navbar-item"
            v-for="(state, index) in sortStates" :key="index"
            v-if="state !== activeSortState"
            @click="onChangeSort(state)"
            >
            {{ state }}
          </a>
        </div>
      </div>
    </nav>
    <div class="tile is-ancestor">
      <div id="section-content" class="tile is-child">
        <router-view :searchQuery="queries" :currentPage="currentPage" :sortState="activeSortState" @totalPage="onTotalPageSet($event)"/>
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
      currentPage: 1,
      sortStates: [],
      activeSortState: ''
    }
  },
  created () {
    this.sortStates = ['Alphabetically', 'By Popularity']
    this.activeSortState = this.sortStates[0]
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
    },
    onChangeSort: function (sortState) {
      this.activeSortState = sortState
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

  .navbar.navbar-center {
    justify-content: center
  }

  .navbar-link::after {
    border-color: #4a4a4a;
  }

  .navbar-dropdown {
    border-top: none;
  }
</style>
