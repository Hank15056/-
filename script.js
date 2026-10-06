// Шаг 11. Мобильное меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

// Открыть / закрыть меню по нажатию на бургер
burger.addEventListener('click', function () {
    nav.classList.toggle('open');
    burger.classList.toggle('active');
    burger.setAttribute('aria-expanded', nav.classList.contains('open'));
});

// Закрыть меню после выбора пункта
nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        nav.classList.remove('open');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
    });
});

// ===== Окно заявки =====
const modal = document.getElementById('modal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const form = document.getElementById('requestForm');
const formError = document.getElementById('formError');
const formSuccess = document.getElementById('formSuccess');
const successText = document.getElementById('successText');
const okButton = document.getElementById('okButton');

// Открыть окно
function showModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById('name').focus();
}

// Закрыть окно и вернуть анкету в исходное состояние
function hideModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    form.reset();
    form.hidden = false;
    formSuccess.hidden = true;
    formError.textContent = '';
    form.querySelectorAll('.invalid').forEach(function (field) {
        field.classList.remove('invalid');
    });
}

openModal.addEventListener('click', showModal);
closeModal.addEventListener('click', hideModal);
okButton.addEventListener('click', hideModal);

// Закрыть по клику на тёмный фон
modal.addEventListener('click', function (event) {
    if (event.target === modal) {
        hideModal();
    }
});

// Закрыть клавишей Esc
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('open')) {
        hideModal();
    }
});

// Проверка и «отправка» анкеты
form.addEventListener('submit', function (event) {
    event.preventDefault(); // не перезагружаем страницу

    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const device = document.getElementById('device');
    const errors = [];

    // Сбрасываем старые подсветки
    [name, phone, device].forEach(function (field) {
        field.classList.remove('invalid');
    });

    if (name.value.trim().length < 2) {
        errors.push('введите имя');
        name.classList.add('invalid');
    }

    // В телефоне должно быть хотя бы 9 цифр
    const digits = phone.value.replace(/\D/g, '');
    if (digits.length < 9) {
        errors.push('введите номер телефона');
        phone.classList.add('invalid');
    }

    if (device.value === '') {
        errors.push('выберите устройство');
        device.classList.add('invalid');
    }

    if (errors.length > 0) {
        formError.textContent = 'Пожалуйста, ' + errors.join(', ') + '.';
        return;
    }

    // Сервера нет (учебный проект), поэтому просто показываем сообщение
    successText.textContent = name.value.trim() + ', спасибо! Мы перезвоним вам по номеру '
        + phone.value.trim() + ' в течение 15 минут.';
    form.hidden = true;
    formSuccess.hidden = false;
});
