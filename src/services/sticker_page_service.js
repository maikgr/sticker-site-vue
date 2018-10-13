import stickerService from './sticker_service'

export default {
  page: getStickerOnPage
}

const itemsPerRow = 6
const rowsPerPage = 3

async function getStickerOnPage (pageNumber, query = null, sort = 'alphabetically') {
  let stickers = await getStickers(query)
  const startIndex = (pageNumber - 1) * rowsPerPage * itemsPerRow
  const endIndex = Math.min(pageNumber * rowsPerPage * itemsPerRow, stickers.length)

  switch (sort.toLowerCase()) {
    case 'alphabetically':
      stickers.sort(compareKeyword)
      break
    case 'by popularity':
      stickers.sort(compareUsage)
      break
    default:
      stickers.sort(compareKeyword)
      break
  }

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

function compareKeyword (a, b) {
  if (a.keyword < b.keyword) {
    return -1
  } else if (a.keyword > b.keyword) {
    return 1
  }
  return 0
}

function compareUsage (a, b) {
  if (!a.useCount) {
    a.useCount = 0
  }
  if (!b.useCount) {
    b.useCount = 0
  }
  if (a.useCount < b.useCount) {
    return 1
  } else if (a.useCount > b.useCount) {
    return -1
  }
  return 0
}
