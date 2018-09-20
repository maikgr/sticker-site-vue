import axios from 'axios'

export default {
  all: all
}

async function all () {
  const { data } = await axios.get('https://varuzuapi.azurewebsites.net/api/stickers/all')
  return data.data
}
