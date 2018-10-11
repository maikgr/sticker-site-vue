<template>
  <section class="section has-background-light">
    <div class="columns" v-for="row in currentPageStickers" :key="row">
      <div class="column is-one-fifth" v-for="sticker in row" :key="sticker">
        <div class="box has-text-centered">
          <img class="thumbs" :src="sticker.url" />
          <div class="level caption">
            <div class="level-left">
              {{ sticker.uploader }}
            </div>
            <div class="level-right">
              <font-awesome-icon class="icon" icon="comment-dots" />
              {{ sticker.count }}
            </div>
          </div>
        </div>
        <div class="control">
          <input class="input keyword" type="text" v-bind:value="sticker.keyword" readonly>
        </div>
      </div>
    </div>
    <pagination
      :current="currentPage"
      :total="totalPage"
      :itemsPerPage="1"
      :onChange="getStickersOnPage"
      class="has-background-light">
    </pagination>
  </section>
</template>

<script>
import stickerService from '../services/sticker_service.js'
import Pagination from 'vue-2-bulma-pagination'

export default {
  name: 'Content',
  components: { Pagination },
  props: {
    searchQuery: {
      type: String
    }
  },
  data () {
    return {
      repoStickers: [],
      stickers: [],
      currentPageStickers: [],
      rowsPerPage: 3,
      colPerRows: 5,
      currentPage: 1,
      totalPage: 0
    }
  },
  async created () {
    this.repoStickers = await stickerService.all()
    this.stickers = this.repoStickers
    this.totalPage = Math.ceil(this.stickers.length / (this.rowsPerPage * this.colPerRows))
    this.getStickersOnPage(this.currentPage)
  },
  watch: {
    searchQuery: function () {
      this.stickers = this.repoStickers.filter(s => s.keyword.includes(this.searchQuery))
      this.getStickersOnPage(1)
    }
  },
  methods: {
    getStickersOnPage: function (pageNumber) {
      const startIndex = (pageNumber - 1) * this.rowsPerPage * this.colPerRows
      const endIndex = Math.min(pageNumber * this.rowsPerPage * this.colPerRows, this.stickers.length)
      this.currentPage = pageNumber
      this.totalPage = Math.ceil(this.stickers.length / (this.rowsPerPage * this.colPerRows))
      this.currentPageStickers = this.parseStickersForDisplay(startIndex, endIndex)
    },
    parseStickersForDisplay: function (fromIndex, toIndex) {
      let stickerRows = []
      let stickerIndex = fromIndex

      for (let i = 0; i < this.rowsPerPage; ++i) {
        let stickerCol = []
        for (let j = 0; j < this.colPerRows; ++j) {
          if (stickerIndex >= toIndex) {
            break
          }

          let sticker = this.stickers[stickerIndex]
          stickerCol.push({
            keyword: sticker.keyword,
            url: sticker.url,
            count: sticker.useCount || 0,
            uploader: sticker.upload.username || ''
          })
          ++stickerIndex
        }

        stickerRows.push(stickerCol)
      }
      return stickerRows
    }
  }
}
</script>

<style scoped>
  .section {
    height: 90%;
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
</style>
