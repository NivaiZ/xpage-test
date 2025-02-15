function mobileNav() {
  const burger = document.querySelector(".header__right-button[data-action='burger-button']");
  const nav = document.querySelector(".header__aside[data-action='burger-menu']");
  const body = document.body;

  if (!burger || !nav) {
    console.warn('Burger or Nav element not found');
    return;
  }

  burger.addEventListener("click", function () {
    const isOpen = burger.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      nav.classList.add("is-close");

      nav.addEventListener("animationend", handleAnimationEnd, { once: true });

      function handleAnimationEnd() {
        nav.classList.remove("is-open", "is-close");
        burger.setAttribute("aria-expanded", "false");
        nav.setAttribute("aria-haspopup", "false");
        body.classList.remove("body__lock");

        nav.style.visibility = "hidden";
      }
    } else {
      burger.setAttribute("aria-expanded", "true");
      nav.setAttribute("aria-haspopup", "true");
      nav.classList.add("is-open");
      body.classList.add("body__lock");

      nav.style.visibility = "visible";
    }
  });

  document.addEventListener("click", function (event) {
    if (nav.getAttribute("aria-haspopup") === "true") {
      const isClickInsideBurger = burger.contains(event.target);
      const isClickInsideNav = nav.contains(event.target);

      if (!isClickInsideBurger && !isClickInsideNav) {

        nav.classList.add("is-close");

        nav.addEventListener("animationend", handleAnimationEnd, { once: true });

        function handleAnimationEnd() {
          nav.classList.remove("is-open", "is-close");
          burger.setAttribute("aria-expanded", "false");
          nav.setAttribute("aria-haspopup", "false");
          body.classList.remove("body__lock");

          nav.style.visibility = "hidden";
        }
      }
    }
  });
}

export default mobileNav;