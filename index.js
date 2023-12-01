var now = new Date();
var dayWeek = now.getDay();
var hours = now.getHours();

/**
 * @type {HTMLElement}
 */
var content = document.querySelector(".banner-webcallback");
/**
 * @type {HTMLElement}
 */
var isSticky = document.querySelector(".isSticky");
/**
 * @type { object }
 */
var observer = new IntersectionObserver(callback);

/**
 * les jours férié
 */
var holidaysData = [
  { day: 1, month: 1 },
  { day: 1, month: 5 },
  { day: 8, month: 5 },
  { day: 14, month: 7 },
  { day: 15, month: 8 },
  { day: 1, month: 11 },
  { day: 25, month: 12 },
];
/**
 *
 * @param {object} date
 * @returns
 */
function isHoliday(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  return holidaysData.some((h) => h.day === day && h.month === month);
}


// function openWebCallback() {
//   sdcInteract.api.openFeatureStickyPanel({
//     feature: sdcInteract.api.constants.FEATURES.WEBCALLBACK,
//   });
// }

/**
 *
 * @param {number} day
 * @param {number} hour
 */

function updateDisplay(day, hour) {
  if (!isHoliday(now) && content) {
    if (
      (day === 1 && hour >= 8 && hour < 12) ||
      (day >= 2 && day <= 5 && hour >= 8 && hour < 20) ||
      (day === 6 && hour >= 8 && hour < 19)
    ) {
      content.classList.remove("none");
      if (!content.classList.contains("none")) {
        observer.observe(content);
      }
    } else {
      content.classList.add("none");
    }

    // var lesBtn = [...document.querySelectorAll(".openFeatureStickyPanel")];

    // lesBtn.forEach((btn) => {
    //   btn.addEventListener("click", function name(e) {
    //     e.preventDefault();
    //     setTimeout(openWebCallback, 100);
    //   });
    // });
  } else {
    content.id = "banner-back";
    return;
  }
}

addEventListener("DOMContentLoaded", updateDisplay(dayWeek, hours));

/**
 *
 * @param {object} entries
 */
function callback(entries) {
  var { isIntersecting } = entries[0];

  if (isIntersecting) {
    window.addEventListener("scroll", indicatorAnimation);
  } else {
    window.removeEventListener("scroll", indicatorAnimation);
  }

  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight ||
    window.innerHeight + window.scrollY > content.offsetTop
  ) {
    window.addEventListener("scroll", indicatorAnimation);
  }
}

var ticking = false;

function indicatorAnimation() {
  if (!ticking) {
    ticking = true;
    if (
      window.pageYOffset <
      content.offsetTop + (content.offsetTop * 15) / 100
    ) {
      isSticky.classList.add("none");
    } else if (
      window.pageYOffset >
      content.offsetTop + (content.offsetTop * 15) / 100
    ) {
      isSticky.classList.remove("none");
    }

    ticking = false;
  }
}
