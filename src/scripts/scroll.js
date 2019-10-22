
export default function scroll() {
  const fixedTop = document.querySelector('.header')
  const finish = document.querySelector('.help')

  const windowScroll = document.documentElement.scrollTop

  if (windowScroll > (finish.offsetTop - 300)) {
    fixedTop.style.visibility = 'hidden'
  } else {
    fixedTop.style.visibility = 'visible'
  }
}

window.addEventListener("scroll", scroll);