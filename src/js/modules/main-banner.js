import Swiper from 'swiper';
import 'swiper/css';

export default function initBanner() {
	const element = document.querySelector('.general-banner__swiper.swiper');
	if (!element) return;

	// Инициализация Swiper
	const swiper = new Swiper(element, {
		slidesPerView: 1,
		spaceBetween: 20,
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		watchSlidesProgress: true,
		slideToClickedSlide: true,
		cssMode: true,
	});

	// Определяем, является ли устройство touch-устройством
	const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

	// Находим все кнопки пагинации
	const buttons = document.querySelectorAll('[data-action="choose-button"]');

	// Функция для переключения слайдов
	function handleSlideChange(event) {
		const slideIndex = parseInt(event.currentTarget.dataset.button, 10);
		swiper.slideToLoop(slideIndex - 1);
	}

	// Навешиваем обработчики событий на кнопки
	buttons.forEach((button) => {
		if (isTouchDevice) {
			// Для touch-устройств добавляем обработчик click
			button.addEventListener('click', handleSlideChange);
		} else {
			// Для не-touch устройств добавляем обработчик mouseenter
			button.addEventListener('mouseenter', handleSlideChange);
		}
	});

	// Функция для обновления активной кнопки
	function updateActiveButton(activeIndex) {
		// Удаляем активный класс у всех кнопок
		buttons.forEach((button) => {
			button.classList.remove('general-banner__pagination-active');
		});

		// Находим кнопку, соответствующую активному слайду
		const activeButton = Array.from(buttons).find(
			(button) => parseInt(button.dataset.button, 10) === activeIndex + 1
		);

		// Добавляем активный класс к соответствующей кнопке
		if (activeButton) {
			activeButton.classList.add('general-banner__pagination-active');
		}
	}

	// Инициализация первого слайда по умолчанию
	if (swiper.slides.length > 0) {
		swiper.slideToLoop(0);
		updateActiveButton(swiper.realIndex); // Обновляем активную кнопку при инициализации
	}

	// Отслеживаем изменение слайда
	swiper.on('slideChange', () => {
		updateActiveButton(swiper.realIndex); // Обновляем активную кнопку при смене слайда
	});
}