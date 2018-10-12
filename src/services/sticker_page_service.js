import stickerService from './sticker_service'

export default {
  page: getStickerOnPage,
  totalPage: getStickerTotalPage
}

const itemsPerRow = 5
const rowsPerPage = 3

async function getStickerOnPage (pageNumber, query = null) {
  const stickers = await getStickers(query)
  const startIndex = (pageNumber - 1) * rowsPerPage * itemsPerRow
  const endIndex = Math.min(pageNumber * rowsPerPage * itemsPerRow, stickers.length)
  let stickerRows = stickers.slice(startIndex, endIndex)

  return stickerRows
}

async function getStickerTotalPage (query) {
  let stickers = await getStickers(query)

  return Math.ceil(stickers.length / (rowsPerPage * itemsPerRow))
}

async function getStickers (query) {
  let stickers = await stickerService.all()
  if (query) {
    stickers = stickers.filter(s => s.keyword === query)
  }

  return stickers
}
