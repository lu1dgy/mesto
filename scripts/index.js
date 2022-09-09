let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
let popupForm = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#profile-name');
let roleInput = document.querySelector('#profile-role');

editButton.addEventListener('click', function () {
    popupForm.classList.add('popup_opened');
});
closeButton.addEventListener('click', function () {
    popupForm.classList.remove('popup_opened');
});

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    let nameValue = nameInput.value;
    let roleValue = roleInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let name = document.querySelector('.profile__name');
    let role = document.querySelector('.profile__role');
    // Вставьте новые значения с помощью textContent
    name.textContent = nameValue;
    role.textContent = roleValue;
    popupForm.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 