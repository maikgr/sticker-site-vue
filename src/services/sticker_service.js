import axios from 'axios'

export default {
  stickers: stickers
}

async function stickers () {
  const { data } = await axios.get('https://repulsion-stickers-api.herokuapp.com/all')
  const colCount = 6
  const rowCount = (data.length / colCount) + 1
  let stickerRows = []
  let stickerIndex = 0

  for (let i = 0; i < rowCount; ++i) {
    let stickerCol = []
    for (let j = 0; j < colCount; ++j) {
      if (stickerIndex >= data.length) {
        break
      }

      let sticker = data[stickerIndex]
      stickerCol.push({
        keyword: sticker.keyword,
        url: sticker.url,
        count: sticker.count ? sticker.count : 0
      })
      ++stickerIndex
    }

    stickerRows.push(stickerCol)
  }
  return stickerRows
}
