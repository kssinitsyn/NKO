export default function popup() {
  'use strict'

  // объявляем классы

  // открытие и закрытие модальных окон
  class PopUp {
    open(event) {
      if (event.target.classList.contains('user_info_button')) {
        userPopUpDialog.classList.add('popup_is-opened')
        userPopUpDialog.classList.add('popup_is-opened')
        userInfoForm.elements.name.value = ''
        userInfoForm.elements.email.value = ''
        disableSubmitButton(submitFormButton)
        document.querySelector('.header').setAttribute('style', 'visibility:hidden')
        body.style.overflow = 'hidden';
      }
      if (event.target.classList.contains('payment_button')) {
        paymentPopUpDialog.classList.add('popup_is-opened')
        checkOutForm.elements.username.value = ''
        checkOutForm.elements.usermail.value = ''
        disableSubmitButton(submitPaymentButton)
        let body = document.querySelector("body");
        body.style.overflow = 'hidden';
        document.querySelector('.header').setAttribute('style', 'visibility:hidden')
        document.querySelector('.area__budget').style.zIndex = '0'
      }
    }

    close(event) {
      let x = event.target
      if (x.classList.contains('popup__close')) {
        x.closest('.popup').classList.remove('popup_is-opened')
        inputAndValueAndHeader()
        if (x.closest('#user-info__button')) {
          resetErrorMessages(userInfoForm)
        }
        if (x.closest('#payment_button')) {
          resetErrorMessages(checkOutForm)
        }
      }
      if (x.classList.contains('thanks__close')) {
        document.getElementById('thanks').classList.remove('popup_is-opened')
        inputAndValueAndHeader()
      }
    }
  }



  // объявляем переменные
  const thanksTitle = document.querySelector('.thanks__title')
  const popUpContent = document.getElementById('payment_content')
  // модальные окна
  const body = document.querySelector("body");
  const userPopUpDialog = document.querySelector('#help')
  const paymentPopUpDialog = document.querySelector('#final-payment')
  const thanksPopUp = document.getElementById('thanks')
  const popup = new PopUp()
  // формы
  const userInfoForm = document.forms.new
  const checkOutForm = document.forms.checkout
  // кнопки оплаты (отправка формы)  
  const submitFormButton = document.querySelector('.submit__button')
  const submitPaymentButton = document.querySelector('.payment__pay-button')
  // поля ввода имени и почты в формах
  const paymentInputName = document.getElementById('name').value
  const paymentInputMail = document.getElementById('email').value
  // кнопки открытия/закрытия всех модальных окон
  const userInfoButtonArray = document.querySelectorAll('.user_info_button')
  const paymentButtonArray = document.querySelectorAll('.payment_button')
  const closeButtonArray = document.querySelectorAll('.popup__close')
  // лейблы в формах
  const userInfoFormNameLabel = document.getElementById('user-info_name-label')
  const userInfoFormMailLabel = document.getElementById('user-info_mail-label')
  const checkoutFormNameLabel = document.getElementById('checkout_name-label')
  const checkoutFormMailLabel = document.getElementById('checkout_mail-label')
  // кнопки с суммами 
  const paymentList = document.querySelector('.payment__list')
  const helpList = document.querySelector('.help__list')
  const donateList = document.querySelector('.donate__list')
  // изменение placeholder в модальном окне



  const buttonsForDonateForm = [
    { value: 100 },
    { value: 300 },
    { value: 500, active: true },
    { value: 1000 },
    { value: 5000 },
    { custom: true }
  ]

  const buttonsForHelpForm = [
    { value: 100 },
    { value: 300 },
    { value: 500, active: true },
    { value: 1000 },
    { value: 5000 },
    { custom: true }
  ]

  const buttonsForPaymentForm = [
    { value: 100 },
    { value: 300 },
    { value: 500, active: true },
    { value: 1000 },
    { value: 5000 },
    { custom: true }
  ]

  buttonsForPaymentForm.forEach(item => {
    const resize = window.matchMedia('(max-width: 320px)')
    let controlItem
    const listItem = document.createElement('li')
    if (!item.custom) {
      controlItem = document.createElement('button')
      controlItem.innerText = `${item.value} ₽`
      controlItem.setAttribute('data-value', item.value)
    } else {
      controlItem = document.createElement('input')
      controlItem.setAttribute('placeholder', 'Другая сумма')
      controlItem.setAttribute('data-value', 'custom')
      controlItem.classList.add('donate__button_input', 'random__sum')

      if (resize.matches) {
        controlItem.placeholder = 'Другая сумма';
      } else {
        controlItem.placeholder = '0';
      }
      resize.addListener(controlItem)
      controlItem.type = 'number'
    }

    controlItem.classList.add('payment__sum')
    if (item.active) {
      controlItem.classList.add('donate__button_active')
      controlItem.getAttribute('data-value')
      document.getElementById('payment_content').setAttribute('data-value', item.value)
    }

    controlItem.addEventListener('click', function (event) {
      const paymentSumArray = document.querySelectorAll('.payment__sum')
      for (var x = 0; x < paymentSumArray.length; x++) {
        if (event.currentTarget === paymentSumArray[x]) {
          paymentSumArray[x].classList.add('donate__button_active')
          controlItem.getAttribute('data-value')
          document.getElementById('payment_content').setAttribute('data-value', item.value)
        } else {
          paymentSumArray[x].classList.remove('donate__button_active')
        }
      }
    })
    listItem.classList.add('payment__item')
    listItem.appendChild(controlItem)
    paymentList.appendChild(listItem)
  })

  buttonsForDonateForm.forEach(item => {
    let controlItem
    const listItem = document.createElement('li')
    if (!item.custom) {
      controlItem = document.createElement('button')
      controlItem.innerText = `${item.value} ₽`
      controlItem.setAttribute('data-value', item.value)
    } else {
      controlItem = document.createElement('input')
      controlItem.setAttribute('placeholder', 'Другая сумма')
      controlItem.setAttribute('data-value', 'custom')
      controlItem.classList.add('donate__button_input')
      controlItem.type = 'number'
    }

    controlItem.classList.add('donate__button')
    if (item.active) {
      controlItem.classList.add('donate__button_active')
      controlItem.getAttribute('data-value')
      document.getElementById('payment_help').setAttribute('data-value', item.value)
    }

    controlItem.addEventListener('click', function (event) {
      const donateButtonsArray = document.querySelectorAll('.donate__button')
      for (var x = 0; x < donateButtonsArray.length; x++) {
        if (event.currentTarget === donateButtonsArray[x]) {
          donateButtonsArray[x].classList.add('donate__button_active')
          controlItem.getAttribute('data-value')
          document.getElementById('payment_help').setAttribute('data-value', item.value)
        } else {
          donateButtonsArray[x].classList.remove('donate__button_active')
        }
      }
    })
    listItem.classList.add('donate__item')
    listItem.appendChild(controlItem)
    donateList.appendChild(listItem)
  })

  buttonsForHelpForm.forEach(item => {
    let controlItem
    const listItem = document.createElement('li')
    if (!item.custom) {
      controlItem = document.createElement('button')
      controlItem.innerText = `${item.value} ₽`
      controlItem.setAttribute('data-value', item.value)
    } else {
      controlItem = document.createElement('input')
      controlItem.setAttribute('placeholder', 'Другая сумма')
      controlItem.setAttribute('data-value', 'custom')
      controlItem.classList.add('donate__button_input')
      controlItem.type = 'number'
    }

    controlItem.classList.add('donate__button')
    if (item.active) {
      controlItem.classList.add('donate__button_active')
      controlItem.getAttribute('data-value')
      document.getElementById('payment_help').setAttribute('data-value', item.value)
    }

    controlItem.addEventListener('click', function (event) {
      const helpButtonsArray = document.querySelectorAll('.donate__button')
      for (var x = 0; x < helpButtonsArray.length; x++) {
        if (event.currentTarget === helpButtonsArray[x]) {
          helpButtonsArray[x].classList.add('donate__button_active')
          controlItem.getAttribute('data-value')
          document.getElementById('payment_help').setAttribute('data-value', item.value)
        } else {
          helpButtonsArray[x].classList.remove('donate__button_active')
        }
      }
    })
    listItem.classList.add('payment__item')
    listItem.appendChild(controlItem)
    helpList.appendChild(listItem)
  })

  userInfoButtonArray.forEach(button => {
    button.addEventListener('click', e => {
      const currentForm = e.currentTarget.getAttribute('data-form')
      const currentType = e.currentTarget.getAttribute('data-type')
      const currentItem = document.querySelector(`.${currentForm}__list .donate__button_active`)
      let currentValue
      if (currentItem.classList.contains('donate__button_input')) {
        currentValue = currentItem.value
      } else {
        currentValue = currentItem.getAttribute('data-value')
      }
      popup.open(event)
    })
  })

  paymentButtonArray.forEach(button => {
    button.addEventListener('click', e => {
      const currentForm = e.currentTarget.getAttribute('data-form')
      const currentType = e.currentTarget.getAttribute('data-type')
      const currentItem = document.querySelector(`.${currentForm}__list .donate__button_active`)
      let currentValue
      if (currentItem.classList.contains('donate__button_input')) {
        currentValue = currentItem.value
      } else {
        currentValue = currentItem.getAttribute('data-value')
      }
      popup.open(event)
    })
  })

  closeButtonArray.forEach(function (elem) {
    elem.addEventListener('click', function () {
      popup.close(event)
    })
  })



  const inputButtonArray = document.querySelectorAll('.donate__button_input')

  inputButtonArray.forEach(function (elem) {
    elem.addEventListener('keyup', function (event) {
      let currentValue = event.currentTarget.getAttribute('data-value')
      document.getElementById('payment_help').setAttribute('data-value', event.currentTarget.value)
      document.getElementById('payment_content').setAttribute('data-value', event.currentTarget.value)
    })
  })


  // платежный виджет

  window.pay = function ({ price, paymentInputName = '', paymentInputMail = '' }) {
    var widget = new cp.CloudPayments()

    var receipt = {
      Items: [// товарные позиции
        {
          label: 'Наименование товара', // наименование товара
          price: Number(price).toFixed(2), // цена
          quantity: 1, // количество
          amount: Number(price).toFixed(2), // сумма
          vat: 20, // ставка НДС
          method: 0, // тег-1214 признак способа расчета - признак способа расчета
          object: 0 // тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
        }
      ],
      taxationSystem: 0, // система налогообложения; необязательный, если у вас одна система налогообложения
      email: 'user@example.com', // e-mail покупателя, если нужно отправить письмо с чеком
      phone: '', // телефон покупателя в любом формате, если нужно отправить сообщение со ссылкой на чек
      isBso: false, // чек является бланком строгой отчётности
      amounts:
      {
        electronic: 900.00, // Сумма оплаты электронными деньгами
        advancePayment: 0.00, // Сумма из предоплаты (зачетом аванса) (2 знака после запятой)
        credit: 0.00, // Сумма постоплатой(в кредит) (2 знака после запятой)
        provision: 0.00 // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после запятой)
      }
    }

    var data = {}
    data.cloudPayments = { recurrent: { interval: 'Month', period: 1, customerReceipt: receipt } } // создание ежемесячной подписки

    widget.charge({ // options
      publicId: 'pk_64ebf2e00a9c77ccaa40561f54c21', // id из личного кабинета
      description: 'Спасибо за помощь студентам Центра «Антон тут рядом»!', // назначение
      amount: Number(price), // сумма
      currency: 'RUB', // валюта
      accountId: 'Ваша почта', // идентификатор плательщика (необязательно)
      skin: 'mini', // дизайн виджета
      data: {
        name: paymentInputName,
        mail: paymentInputMail // произвольный набор параметров
      }
    },
      function (options) { // success
        // действие при успешной оплате
        const inputButtonArray = document.querySelectorAll('.donate__button_input')
        paymentPopUpDialog.classList.remove('popup_is-opened')
        userPopUpDialog.classList.remove('popup_is-opened')
        thanksPopUp.classList.add('popup_is-opened')
        getClientNumber()
        inputButtonArray.forEach(function (elem) {
          elem.value = '';
        })
        console.log('Оплата прошла')
      },
      function (reason, options) { // fail
        // действие при неуспешной оплате
        const inputButtonArray = document.querySelectorAll('.donate__button_input')
        inputButtonArray.forEach(function (elem) {
          elem.value = '';
        })
        console.log('Оплата не прошла')
      })
  }

  // объявляем функции

  function disableSubmitButton(button) {
    button.setAttribute('disabled', true)
    button.classList.add('submit__button_disabled')
  }

  function enableSubmitButton(button) {
    button.removeAttribute('disabled')
    button.classList.remove('submit__button_disabled')
  }

  function isValid(elementToCheck) {
    const errorElement = document.querySelector(`#error-${elementToCheck.name}`)

    if (!elementToCheck.validity.valid) {
      if (elementToCheck.validity.typeMismatch) {
        errorElement.textContent = 'Email указан с ошибкой. Пожалуйста, проверьте введённые данные'
        userInfoFormMailLabel.style.color = 'red'
        checkoutFormMailLabel.style.color = 'red'
      }
      if (elementToCheck.value.length < Number(elementToCheck.getAttribute('minlength'))) {
        if (elementToCheck.validity.valueMissing) {
          userInfoFormNameLabel.style.color = 'red'
          checkoutFormNameLabel.style.color = 'red'
        } else { errorElement.textContent = 'Длина должна быть от 2 до 35 символов' }
      }
      return false
    } else {
      errorElement.textContent = ''
      userInfoFormNameLabel.style.color = 'black'
      userInfoFormMailLabel.style.color = 'black'
      checkoutFormNameLabel.style.color = 'black'
      checkoutFormMailLabel.style.color = 'black'
      return true
    }
  }

  function resetErrorMessages(parentNode) {
    const errorsCollection = Array.from(parentNode.getElementsByTagName('span'))
    errorsCollection.forEach(function (item) {
      const idToCheck = item.id
      if (idToCheck.includes('error')) { item.textContent = '' }
    })
  }

  function userInputHandler() {
    const validateName = isValid(userInfoForm.elements.name)
    const validateMail = isValid(userInfoForm.elements.email)
    if (validateName && validateMail) {
      enableSubmitButton(submitFormButton)
    } else {
      disableSubmitButton(submitFormButton)
    }
  }

  function checkoutInputHandler() {
    const validateUserName = isValid(checkOutForm.elements.username)
    const validateUserMail = isValid(checkOutForm.elements.usermail)
    if (validateUserName && validateUserMail) {
      enableSubmitButton(submitPaymentButton)
    } else {
      disableSubmitButton(submitPaymentButton)
    }
  }

  function scrollUp() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80)
      setTimeout(scrollUp, 0)
    }
  }

  function getClientNumber() {
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
        thanksTitle.textContent = 'Спасибо, вы стали ' + data[0].number_donate + ' жертвователем Центра «Антон тут рядом»! '
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function inputAndValueAndHeader() {
    document.querySelector('.header').style.visibility = 'visible'
    body.style.overflow = '';
    document.querySelector('.area__budget').style.zIndex = '1'
    const inputButtonArray = document.querySelectorAll('.donate__button_input')
    inputButtonArray.forEach(function (elem) {
      elem.value = '';
      document.getElementById('payment_content').setAttribute('data-value', '500')
      document.getElementById('payment_help').setAttribute('data-value', '500')
    })
  }

  // слушатели событий

  userInfoForm.addEventListener('input', userInputHandler)
  checkOutForm.addEventListener('input', checkoutInputHandler)
  document.getElementById('backToTop').addEventListener('click', scrollUp)
  document.querySelector('.thanks__close').addEventListener('click', function () {
    popup.close(event)
  })


  submitPaymentButton.addEventListener('click', function () {
    event.preventDefault()
    const currentValue = document.getElementById('payment_content').getAttribute('data-value')
    popup.close(event)
    window.pay({ price: currentValue })
  })

  submitFormButton.addEventListener('click', function () {
    event.preventDefault()
    const currentValue = document.getElementById('payment_help').getAttribute('data-value')
    window.pay({ price: currentValue })
  })


};