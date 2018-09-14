<template>
  <section class="section has-background-light">
    <div class="container">
      <div class="columns" v-for="stickerCol in stickerRows" :key="stickerCol">
        <div class="column" v-for="sticker in stickerCol" :key="sticker">
          <div class="box has-text-centered">
            <img class="thumbs" :src="sticker.url" />
            <div class="level caption">
              <div class="level-left">
                {{ sticker.keyword }}
              </div>
              <div class="level-right">
                <font-awesome-icon icon="comment-dots" />
                {{ sticker.count }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import stickerService from '../services/sticker_service.js'

export default {
  name: 'Content',
  data () {
    return {
      stickerRows: []
    }
  },
  async created () {
    this.stickerRows = stickerService.stickers()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .section {
    height: 90%;
  }

  .box img.thumbs {
    height: 150px;
  }

  .box div.caption {
    margin: 0 0 -10px 0;
  }
</style>
