import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934', 'skyblue', '#7e3d2d'],
  color: '#ccc',
  models: ['duck', 'dog', 'bear'],
  model: 'bear'
})

export { state }