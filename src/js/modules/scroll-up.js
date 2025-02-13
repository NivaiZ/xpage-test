function scrollTop() {
	const topBtn = document.querySelector("[data-action='scroll-top']")
	const topDiv = document.querySelector(".scroll-top")

	// Проверяем, существуют ли элементы
	if (!topBtn || !topDiv) {
		console.warn('Scroll-top button or container not found')
		return
	}

	// Функция для управления видимостью кнопки
	const toggleButtonVisibility = () => {
		if (window.scrollY >= 1000) {
			topDiv.classList.remove('fade-out')
			topDiv.style.display = 'flex'
		} else {
			topDiv.classList.add('fade-out')
			setTimeout(() => {
				if (topDiv.classList.contains('fade-out')) {
					topDiv.style.display = 'none'
				}
			}, 500)
		}
	}

	// Устанавливаем начальное состояние кнопки при загрузке страницы
	toggleButtonVisibility()

	// Обработчик прокрутки
	window.onscroll = toggleButtonVisibility

	// Обработчик клика по кнопке
	topBtn.addEventListener('click', (event) => {
		event.preventDefault()
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	})
}

export default scrollTop