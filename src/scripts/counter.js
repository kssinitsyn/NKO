const remain = document.querySelector('.donate__help-info')
const lineProgress = document.querySelector('.donate__line-progress')


export default function getCounter () {
  const url = 'https://api.sheety.co/b601df00-1e6b-4e24-9a29-04e87ba639c7'
  fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
    })
    .then((data) => {
      remain.textContent = 'Собрали ' + data[0].sum_remaining + ' из ' + data[0].total
      const percent = (data[0].sum_remaining * 100) / data[0].total
      if (percent > 100) {
        lineProgress.setAttribute('style', 'width:100%')
      } else {
        lineProgress.setAttribute('style', `width:${percent}%`)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}


