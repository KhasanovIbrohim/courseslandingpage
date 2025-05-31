const startingCommands = (() => {
  let executed = false;
  return () => {
    if (executed) return;
    executed = true;

    const getOrSet = (key, fallback, callback) => {
      const value = localStorage.getItem(key) ?? fallback;
      if (value === fallback) localStorage.setItem(key, fallback);
      callback(value);
    };

    getOrSet('selectedCourse', '1', courseSelector);
    getOrSet('activeCarusel', '1', num => platformsCarusel("", num));
  };
})();


const courseSelector = (num) => {
  localStorage.setItem('selectedCourse', num);

  [...document.getElementsByClassName("courses_container_right_box")].forEach(el => {
    el.style.display = el.id === `courses_${num}` ? "flex" : "none";
  });

  [...document.getElementsByClassName("courses_container_left_button")].forEach(btn => {
    btn.id = btn.classList.contains(`course_button_${num}`) ? "course_selected" : "";
  });
};


const platformsCarusel = (action, num) => {
  const allCards = document.getElementsByClassName("platforms_carousel_box");
  const dots = document.querySelectorAll(".platforms_dot");
  let active = parseInt(localStorage.getItem("activeCarusel"), 10);

  if (action === "" && num) {
    localStorage.setItem("activeCarusel", num);
    [...allCards].forEach((e, i) => {
      e.style.display = e.id === `platforms_carousel_${num}` ? "flex" : "none";
    });
  } else if (action) {
    if (action === "prev") {
      active = active === 1 ? 4 : active - 1;
    } else if (action === "next") {
      active = active === 4 ? 1 : active + 1;
    }
    localStorage.setItem("activeCarusel", active);
    platformsCarusel("", active);
    return;
  }

  dots.forEach(e => {
    const dotNum = parseInt(e.classList[1]?.slice(14, 15), 10);
    e.id = dotNum === parseInt(localStorage.getItem("activeCarusel"), 10) ? "platforms_dots_active" : "";
  });
};


startingCommands();

let lastScrollTop = 0;
let timeout;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      navbar.classList.add('navbar-hidden');
    }, 150);
  } 
  else {
    clearTimeout(timeout);
    navbar.classList.remove('navbar-hidden');
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});


const openNavbarBurger = () => {
  const navbar_mobile_menu = document.querySelector(".navbar_mobile_menu")
  navbar_mobile_menu.style.display = "flex"
}

const closeNavbarBurger = () => {
  const navbar_mobile_menu = document.querySelector(".navbar_mobile_menu")
  navbar_mobile_menu.style.display = "none"
}