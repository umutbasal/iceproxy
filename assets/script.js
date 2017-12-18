let api = "https://free-proxy-list.herokuapp.com/json/"
let apis = ["http", "ssl", "socks4", "socks5"]

Vue.filter('limit', (arr, value) => {
  return arr.slice(0, value)
})

apis.map(type => {
  fetch(api+type)
  .then(response => {
    response.json()
    .then(json => {
      let clear = ""
      json.data.map(proxy => {
        clear += proxy.ip+":"+proxy.port+"\r\n"
      })
      new Vue({
        el: "#"+type,
        data: {
          showModal: false,
          proxies: json.data,
        },
        methods: {
          prompt: (event) => {
            window.prompt('Copy and paste TXT file.', clear)
          }
        }
      })
    })
  })
})