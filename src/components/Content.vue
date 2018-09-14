<template>
  <section class="section has-background-light">
    <div class="container">
      <div class="columns">
        <div class="column" v-for="sticker in stickers" :key="sticker">
          <div class="box has-text-centered">
              <img class="thumbs" :src="sticker.url" />
            <div class="level caption">
              <div class="level-left">
                {{ sticker.keyword }}
              </div>
              <div class="level-right">
                <font-awesome-icon icon="comment-dots" />
                12
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Content',
  data () {
    return {
      stickers: [{
        'upload': {
          'id': '140759547085193216',
          'username': 'VarZ',
          'date': {
            '$date': '2018-09-12T16:06:45.000Z'
          }
        },
        'keyword': 'kianajii',
        'url': 'https://cdn.discordapp.com/emojis/452458009222971412.png'
      },
      {
        'upload': {
          'id': '216604819173933056',
          'username': 'Grimmrist',
          'date': {
            '$date': '2018-09-13T02:33:58.000Z'
          }
        },
        'keyword': 'niiniicheer',
        'url': 'https://media.discordapp.net/attachments/474588210299666442/489624686276378645/unknown.png'
      },
      {
        'upload': {
          'id': '216604819173933056',
          'username': 'Grimmrist',
          'date': {
            '$date': '2018-09-13T02:51:28.000Z'
          }
        },
        'keyword': 'destroyschicksal',
        'url': 'https://media.discordapp.net/attachments/474588210299666442/489626636350783509/FB_IMG_15239440504806158.png'
      }
      ]
    }
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
