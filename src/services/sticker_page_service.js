import stickerService from './sticker_service'

export default {
  page: getStickerOnPage
}

const itemsPerRow = 5
const rowsPerPage = 3

async function getStickerOnPage (pageNumber, query = null) {
  const stickers = await getStickers(query)
  const startIndex = (pageNumber - 1) * rowsPerPage * itemsPerRow
  const endIndex = Math.min(pageNumber * rowsPerPage * itemsPerRow, stickers.length)

  return {
    'totalPage': Math.ceil(stickers.length / (rowsPerPage * itemsPerRow)),
    'data': stickers.slice(startIndex, endIndex)
  }
}

async function getStickers (query) {
  let stickers = await stickerService.all()
  if (query) {
    stickers = stickers.filter(s => s.keyword.includes(query))
  }

  return stickers
}
