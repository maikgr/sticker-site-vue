<template>
  <div class="pagination-container has-background-light">
    <div class="field pagination-arrow">
      <div class="control">
        <button
          v-if="currentPage > leftmost"
          class="button is-info is-outlined"
          @click="emitSelectedPage(currentPage - 1)"
          >
          <i class="fas fa-angle-left"></i>
        </button>
      </div>
    </div>
    <div class="field pagination-container">
      <div class="control">
        <button
          v-if="leftmost > 1"
          class="button is-info is-outlined"
          @click="emitSelectedPage(1)"
          >
          <span>1</span>
        </button>
      </div>
      <div class="control">
        <button
          v-if="leftmost > 2"
          class="button is-outlined is-static"
          >
          <i class="fas fa-ellipsis-h"></i>
        </button>
      </div>
      <div class="control" v-for="page in rightmost" :key="page">
        <button
          v-if="page >= leftmost"
          :class="{ 'button is-info': true, 'is-outlined': page !== currentPage }"
          @click="emitSelectedPage(page)"
          >
          <span>{{ page }}</span>
        </button>
      </div>
    </div>
    <div class="control">
      <button
        v-if="rightmost < totalPage - 1"
        class="button is-static"
        >
        <i class="fas fa-ellipsis-h"></i>
      </button>
    </div>
    <div class="control">
      <button
        v-if="rightmost < totalPage"
        class="button is-info is-outlined"
        @click="emitSelectedPage(totalPage)"
        >
        <span>{{ totalPage }}</span>
      </button>
    </div>
    <div class="field pagination-arrow">
      <div class="control">
        <button
          v-if="currentPage < rightmost"
          class="button is-info is-outlined"
          @click="emitSelectedPage(currentPage + 1)"
          >
          <i class="fas fa-angle-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalPage: {
      type: Number
    }
  },
  data () {
    return {
      currentPage: 1,
      numberOfPagesOnDisplay: 5
    }
  },
  created () {
    this.emitSelectedPage(this.currentPage)
  },
  computed: {
    rightmost: function () {
      const half = Math.floor(this.numberOfPagesOnDisplay / 2)
      return Math.max(Math.min(this.currentPage + half, this.totalPage), Math.min(this.numberOfPagesOnDisplay, this.totalPage))
    },
    leftmost: function () {
      const half = Math.floor(this.numberOfPagesOnDisplay / 2)
      return Math.max(1, Math.min(this.currentPage - half, this.totalPage - this.numberOfPagesOnDisplay + 1))
    }
  },
  methods: {
    emitSelectedPage: function (number) {
      this.currentPage = Math.min(Math.max(1, number), this.totalPage)
      this.$emit('currentPage', this.currentPage)
    }
  }
}
</script>

<style>
@import url("https://use.fontawesome.com/releases/v5.4.1/css/all.css");
  .pagination-container, .field.pagination-container {
    display: flex;
    justify-content: center;
  }

  .pagination-container .button {
    margin: 0px 10px;
  }

  .pagination-container .pagination-arrow {
    margin: 0 10px 0 10px;
  }
</style>
