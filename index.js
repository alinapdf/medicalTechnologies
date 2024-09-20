// lazyload

lozad(".lozad", {
  load: function (el) {
    el.src = el.dataset.src;
  },
}).observe();

//nav

const aboutUsBtn = document.querySelector(".header__nav-list-item-btn ");

aboutUsBtn.addEventListener("click", () => {
  aboutUsBtn.classList.toggle("header__nav-list-item-btn-active");
});

const burgerBtn = document.querySelector(".header__burger-menu");
const headerRightPart = document.querySelector(".header__right-part");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("header__burger-menu-active");
  headerRightPart.classList.toggle("header__right-part-mobile");
  toggleHeaderRightPart();
});

function toggleHeaderRightPart() {
  if (headerRightPart.classList.contains("header__right-part-mobile")) {
    document.querySelector("body").classList.add("no-scroll");
  } else {
    document.querySelector("body").classList.remove("no-scroll");
  }
}

// swiper main

var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  loop: true,
});

// medial lists

const doctorsAdultWrapperInner = document.getElementById("doctors-list-adult");
const doctorsChildenWrapperInner = document.getElementById(
  "doctors-list-children"
);
const analysesWrapperInner = document.getElementById("analyses-list");
const diagnosticsWrapperIner = document.getElementById("diagnostics-list");
const diseasesWrapperInner = document.getElementById("diseases-list");

const adultDoctors = doctors.filter((doctor) => doctor.type === "adult");
const childDoctors = doctors.filter((doctor) => doctor.type === "child");

function renderItems(items, wrapper) {
  const uniqueLetters = [...new Set(items.map((item) => item.letter))];

  uniqueLetters.forEach((letter) => {
    const itemsContainer = document.createElement("div");
    itemsContainer.classList.add("items");

    const itemLetter = document.createElement("span");
    itemLetter.classList.add("item__letter");
    itemLetter.textContent = letter;
    itemsContainer.appendChild(itemLetter);

    const itemsList = document.createElement("ul");
    itemsList.classList.add("items-list");

    const filteredItems = items.filter((item) => item.letter === letter);

    filteredItems.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("item-list-item");
      listItem.textContent = item.name;
      itemsList.appendChild(listItem);
    });

    itemsContainer.appendChild(itemsList);

    wrapper.appendChild(itemsContainer);
  });
}

renderItems(adultDoctors, doctorsAdultWrapperInner);
renderItems(childDoctors, doctorsChildenWrapperInner);
renderItems(analyses, analysesWrapperInner);
renderItems(diagnostics, diagnosticsWrapperIner);
renderItems(diseases, diseasesWrapperInner);

// tabs

const medicalListSections = document.querySelectorAll(
  ".medical-lists__section"
);
const itemsContent = document.querySelectorAll(".items-wrapper");

medicalListSections.forEach((sectionBtn) => {
  sectionBtn.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (id) {
      const activeSections = document.querySelectorAll(
        ".medical-lists__section-active"
      );
      activeSections.forEach((activeSection) => {
        activeSection.classList.remove("medical-lists__section-active");
      });
      if (!sectionBtn.classList.contains("medical-lists__section-active")) {
        sectionBtn.classList.add("medical-lists__section-active");
      }
      itemsContent.forEach((item) => {
        item.classList.remove("item-active");
      });
      const element = document.getElementById(id);
      element.classList.add("item-active");
    }
  });
});

const doctorTypeBtns = document.querySelectorAll(".doctor-type");

doctorTypeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = e.target.dataset.id;

    doctorTypeBtns.forEach((button) => {
      button.classList.remove("doctor-type-active");
    });
    btn.classList.add("doctor-type-active");

    if (id === "doctors-list-adult") {
      doctorsAdultWrapperInner.classList.add("doctors-list-active");
      doctorsChildenWrapperInner.classList.remove("doctors-list-active");
    } else {
      doctorsChildenWrapperInner.classList.add("doctors-list-active");
      doctorsAdultWrapperInner.classList.remove("doctors-list-active");
    }
  });
});

// discount

const discountOptions = document.querySelectorAll(
  ".discount__doctors-options-item"
);

discountOptions.forEach((option) => {
  option.addEventListener("click", () => {
    option.classList.toggle("discount__doctors-options-item-active");
  });
});

//our doctors

var swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//для обновления свайпера
function updateSwiper(swiper, slidesQuantity) {
  if (window.innerWidth <= 1350) {
    swiper.params.slidesPerView = "auto";
  } else {
    swiper.params.slidesPerView = slidesQuantity;
  }
  swiper.update();
}

updateSwiper(swiper2, 4);

window.addEventListener("resize", () => updateSwiper(swiper2, 4));

// фильтрация докторов

const doctorsWrapper = document.querySelector(".our-doctors__wrapper-swiper");

const doctorsSpecialitesBtns = document.querySelectorAll(
  ".our-doctors__specialized-item-btn"
);

doctorsSpecialitesBtns.forEach((speciality) => {
  speciality.addEventListener("click", (e) => {
    const id = speciality.dataset.id;

    doctorsSpecialitesBtns.forEach((btn) => {
      btn.classList.remove("our-doctors__specialized-item-btn-active");
    });

    if (id && id !== "Все") {
      speciality.classList.add("our-doctors__specialized-item-btn-active");
      const filteredDoctors = doctorsInDetail.filter(
        (doctor) => doctor.speciality === id
      );
      console.log("Filtered Doctors:", filteredDoctors);

      doctorsWrapper.innerHTML = "";
      rederDoctorsInDetail(filteredDoctors);
    } else if (id === "Все") {
      speciality.classList.add("our-doctors__specialized-item-btn-active");
      doctorsWrapper.innerHTML = "";
      rederDoctorsInDetail(doctorsInDetail);
    }
  });
});

function rederDoctorsInDetail(doctors) {
  doctors.forEach((doctor) => {
    doctorsWrapper.innerHTML += `
  <div class="swiper-slide our-doctors__slide">
                  <div class="doctor__img">
                    <img src=${doctor.img} alt=${doctor.name} />
                    <span class="doctor__speciality doctor__inf">
                     ${doctor.speciality}
                    </span>
                    <span class="doctor__experience doctor__inf">
                      Стаж <span class="doctor__text-highlight">${doctor.experience}</span>
                    </span>
                    <span class="doctor__recommends doctor__inf">
                      <span class="doctor__text-highlight">${doctor.recommendationsPercent}</span>
                      рекомендаций
                    </span>
                  </div>
                  <div class="doctor__information-wrapper">
                  <p class="doctor__name">${doctor.name}</p>
                  <p class="doctor__speciality text">
                    ${doctor.desc}
                  </p>
                  </div>

                  
                  <button class="doctor__sign-up">
                    Записаться <span>${doctor.signIn}</span>
                  </button>
                </div>
  `;
  });
}

rederDoctorsInDetail(doctorsInDetail);

// отзывы
var swiper3 = new Swiper(".mySwiper3", {
  slidesPerView: 3,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

updateSwiper(swiper3, 3);

window.addEventListener("resize", () => updateSwiper(swiper3, 3));

//рендер отзывов

const feedbackSliderWrapper = document.querySelector(
  ".feedback__slider-wrapper-swiper"
);

feedback.forEach((item) => {
  const userName = item.userName;
  const firstLetter = userName.charAt(0);
  feedbackSliderWrapper.innerHTML += `
  <div class="feedback__slider-slide swiper-slide">
                <div class="feedback-slide__content-wrapper">
                  <p class="feedback-slide__header">
                    ${item.header}
                  </p>
                  <p class="feedback-slide__text">
                    ${item.text}
                  </p>
                  <div class="feedback-slide__doctor">
                    <span> Врач: </span>
                    <p>${item.doctor}</p>
                  </div>
                </div>

                <div class="feedback-slide__bottom-part">
                  <div class="feedback-slide__user">
                    <div class="feedback-slide__user-avatar">${firstLetter}</div>
                    <p class="feedback-slide__user-name">${item.userName}</p>
                    <div class="feedback-slide__user-stars">
                      <span>${item.stars}</span>
                      <img src="img/star-icon.svg" alt="star" />
                    </div>
                  </div>
                  <a href="#" class="feedback-slide__link">${item.link}</a>
                </div>
              </div>
  `;
});

// partnersfunction

function cloneLogos() {
  const rows = document.querySelectorAll(".partners__logos-row");

  rows.forEach((row) => {
    const clone = row.cloneNode(true);
    row.appendChild(clone);
  });
}

cloneLogos();

//анимация при прокрутке

function scrollLogos() {
  const scrollPosition = window.scrollY;
  const row1 = document.querySelector(".row-1");
  const row2 = document.querySelector(".row-2");

  row1.style.transform = `translateX(${scrollPosition * -0.05}px)`;
  const percentOffset = -400;
  const pixelOffset = scrollPosition * 0.05;

  row2.style.transform = `translateX(${percentOffset + pixelOffset}px)`;
}

window.addEventListener("scroll", scrollLogos);

//news

var swiper4 = new Swiper(".mySwiper4", {
  slidesPerView: 3,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

updateSwiper(swiper4, 3);

window.addEventListener("resize", () => updateSwiper(swiper4, 3));

//рендер новостей

const newsSwiper = document.querySelector(".news__swiper-wrapper");

newsList.forEach((newsItem) => {
  newsSwiper.innerHTML += `
    <div class="swiper-slide news__slide">
      <div class="news-slide__img">
        <img src="${newsItem.img}" alt="${newsItem.id}" />
        <span class="news-slide__date">${newsItem.date}</span>
      </div>
      <div class="news-slide__content">
        <p class="news-slide__header">
          ${newsItem.header}
        </p>
        <p class="news-slide__text">
          ${newsItem.text}
        </p>
      </div>
    </div>
  `;
});

// sertificate

const sertificats = document.querySelectorAll(".sertificate__item");

sertificats.forEach((sertificate) => {
  sertificate.addEventListener("mouseover", () => {
    sertificate.classList.add("sertificate__item-active");
  });

  sertificate.addEventListener("mouseout", () => {
    sertificate.classList.remove("sertificate__item-active");
  });
});

// pop up

const headerBtn = document.querySelector(".header__btn");
const connectWithClinicBtn = document.querySelector(".main__btn");

const popUp = document.querySelector(".pop-up");

headerBtn.addEventListener("click", () => {
  popUp.classList.toggle("display-none");
});

connectWithClinicBtn.addEventListener("click", () => {
  popUp.classList.toggle("display-none");
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".white-cross")) {
    popUp.classList.add("display-none");
  }
});

// валидация

const form = document.querySelector(".pop-up-wrapper-form");

const fioInput = document.querySelector("#fio");
const phoneInput = document.querySelector("#phone");
const personalDataCheckbox = document.querySelector("#checkbox-policy");

const regExFio = /^[A-Za-zА-Яа-яЁё\s]+$/;
const regExPhoneNumber =
  /^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;

function createErrorMessage(text) {
  const errorMessage = document.createElement("span");
  errorMessage.className = "error-message error-message-active";
  errorMessage.textContent = text;
  return errorMessage;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  form
    .querySelectorAll(".error-message.error-message-active")
    .forEach((el) => el.remove());

  let isValid = true;

  const fioValue = fioInput.value.trim();

  if (fioValue === "") {
    fioInput.parentElement.append(createErrorMessage("* Пустое поле"));

    isValid = false;
  } else if (!regExFio.test(fioValue)) {
    fioInput.parentElement.append(createErrorMessage("* Неверный формат ФИО"));
    isValid = false;
  }

  const phoneValue = phoneInput.value.trim();
  if (phoneValue === "") {
    const errorMessage = createErrorMessage("* Пустое поле");
    phoneInput.parentElement.append(errorMessage);
    isValid = false;
  } else if (!regExPhoneNumber.test(phoneValue)) {
    const errorMessage = createErrorMessage("* Неверный формат номера");
    phoneInput.parentElement.append(errorMessage);
    isValid = false;
  }

  if (!personalDataCheckbox.checked) {
    const errorMessage = createErrorMessage(
      "* Необходимо согласие с политикой конфиденциальности"
    );
    personalDataCheckbox.parentElement.append(errorMessage);
    isValid = false;
  }

  if (!isValid) {
    return;
  }
});
