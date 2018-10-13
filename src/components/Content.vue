<template>
  <section class="section has-background-light">
    <router-view name="pagination" />
    <div class="columns columns-wrap">
      <div class="column is-one-fifth" v-for="(sticker, index) in stickers" :key="index">
        <div class="box has-text-centered">
          <img class="thumbs" :src="sticker.url" />
          <div class="level caption">
            <div class="level-left">
              {{ sticker.upload.username }}
            </div>
            <div class="level-right">
              <font-awesome-icon class="icon" icon="comment-dots" />
              {{ sticker.useCount }}
            </div>
          </div>
        </div>
        <div class="control">
          <input class="input keyword" type="text" :value="sticker.keyword" readonly />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import stickerPageService from '../services/sticker_page_service'

export default {
  name: 'Content',
  props: {
    searchQuery: {
      type: String
    },
    currentPage: {
      type: Number
    }
  },
  data () {
    return {
      stickers: [],
      totalPage: 0
    }
  },
  async created () {
    await this.getStickersOnPage(this.currentPage)
  },
  methods: {
    getStickersOnPage: async function (page, searchQuery) {
      this.stickers = []

      const { totalPage, data } = await stickerPageService.page(page, searchQuery)
      this.emitTotalPage(totalPage)
      this.stickers = data
    },
    emitTotalPage: function (totalPage) {
      this.$emit('totalPage', totalPage)
    }
  },
  watch: {
    searchQuery: async function () {
      await this.getStickersOnPage(1, this.searchQuery)
    },
    currentPage: async function () {
      await this.getStickersOnPage(this.currentPage, this.searchQuery)
    }
  }
}
</script>

<style scoped>
  .section {
    min-height: 666px;
  }

  .pagination {
    margin: 10px 0;
  }

  .box {
    border-radius: 2px;
    padding: 10px;
    margin-bottom: 0px;
  }

  .box img.thumbs {
    height: 100px;
  }

  .box div.caption {
    font-size: 0.7rem;
    color: #aaaaaa;
    margin-bottom: -10px;
  }

  input.keyword {
    margin-top: 5px;
    border-radius: 2px;
    font-size: 0.8em;
    padding: 10px;
    text-align: center;
  }

  .caption .icon {
    margin-right: 5px;
  }

  .columns.columns-wrap {
    flex-wrap: wrap;
    flex-direction: row;
    max-width: 100%;
  }
</style>
