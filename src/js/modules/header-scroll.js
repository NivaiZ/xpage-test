function headerScroll() {
	const header = document.querySelector("[data-action='header__scroll']");
	const mainContent = document.querySelector('.page-layout');
	if (!header || !mainContent) return;

	let lastScrollTop = 0;
	let isHeaderFixed = false;

	// Функция для получения высоты шапки
	function getHeaderHeight() {
		return header.offsetHeight;
	}

	// Функция для обновления состояния шапки
	function updateHeaderState() {
		const headerHeight = getHeaderHeight();

		if (window.scrollY === 0) {
			mainContent.style.marginTop = '0';
			header.style.position = "static";
			header.style.transform = "translateY(0)";
			header.style.opacity = "1";
			header.setAttribute("aria-expanded", "false"); // Устанавливаем aria-expanded в false
			isHeaderFixed = false;
		} else {
			mainContent.style.marginTop = `${headerHeight}px`;
			if (!isHeaderFixed) {
				header.style.position = "fixed";
				header.style.top = "0";
				header.setAttribute("aria-expanded", "true"); // Устанавливаем aria-expanded в true
				isHeaderFixed = true;
			}
		}
	}

	// Инициализация
	updateHeaderState();

	// Обработчик скролла
	window.addEventListener("scroll", () => {
		const currentScroll = window.scrollY;

		if (currentScroll > lastScrollTop) {
			// Скролл вниз
			header.style.transform = "translateY(-100%)";
			header.style.opacity = "0";
		} else {
			// Скролл вверх
			if (isHeaderFixed) {
				header.style.transform = "translateY(0)";
				header.style.opacity = "1";
			}
		}

		updateHeaderState();
		lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
	});

	window.addEventListener("resize", () => {
		updateHeaderState();
	});
	header.style.transition = "all 0.3s ease";
}

export default headerScroll;