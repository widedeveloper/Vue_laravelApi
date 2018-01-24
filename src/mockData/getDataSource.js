import {getData} from '../api/service'

var api = new getData()
const total = 120 
const tabledata = api.getData()

export default tabledata
