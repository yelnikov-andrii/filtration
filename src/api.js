const url = 'https://sanofi-headless-demo.crescendo.io/.rest/delivery/articles/v1/'

export const getData = () => {
  return fetch(url)
    .then(response => {
      return response.json()
        .then(res => {
          return res
        })
    })
}
