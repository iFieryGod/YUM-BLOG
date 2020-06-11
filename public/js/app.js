let newsButton =  document.querySelector('#news-button')
let newsLoading = document.querySelector('#newsloading')
newsButton.addEventListener('click', () => {
  newsLoading.classList.toggle('d-none')
  setTimeout(() => {
  newsLoading.classList.add('d-none')
  }, 2000)
})
