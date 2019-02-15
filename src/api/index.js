import { get } from './axios'

const getSeller = get('/api/seller')
const getGoods = get('/api/goods')
export {
  getSeller,
  getGoods
}
