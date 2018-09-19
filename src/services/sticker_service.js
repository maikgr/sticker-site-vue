import axios from 'axios'

export default {
  all: all
}

async function all () {
  const { data } = await axios.get('https://repulsion-stickers-api.herokuapp.com/api/stickers')
  return data.data
}
