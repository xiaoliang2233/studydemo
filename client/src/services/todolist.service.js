import axios from 'axios';
export default {
  test(){
    return axios.get('/api/test').then(res => {
      console.log('3')
      return res.data
    })
  },
  test1(){
    return axios.get('/api/test').then(res => {
      return res.data
    })
  },
  test2(){
    return axios.post('/api/test', {
      hello: 'safdoiafjoiaj'
    }).then(res => {
      return res.data
    })
  }
}
