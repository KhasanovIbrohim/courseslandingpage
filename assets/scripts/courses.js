const filters = document.getElementById('filters');
const courseList = document.getElementById('courseList');
const durationRange = document.getElementById('duration');
const durationValue = document.getElementById('durationValue');
const resultCount = document.getElementById('courses_result_count');

function getSelected(name) {
  return [...filters.querySelectorAll(`input[name="${name}"]:checked`)].map(cb => cb.value);
}

function filterCourses() {
  const selectedSchools = getSelected('school');
  const selectedLevels = getSelected('level');
  const selectedPrices = getSelected('price');
  const maxDuration = parseInt(durationRange.value);

  const filtered = courses.filter(course => {
    const matchSchool = !selectedSchools.length || selectedSchools.includes(course.school);
    const matchLevel = !selectedLevels.length || selectedLevels.includes(course.level);
    const matchPrice = !selectedPrices.length || selectedPrices.includes(course.paid ? 'paid' : 'free');
    const matchDuration = course.duration <= maxDuration;
    return matchSchool && matchLevel && matchPrice && matchDuration;
  });

  renderCourses(filtered);
}

function renderCourses(data) {
  courseList.innerHTML = '';
  resultCount.textContent = `Найдено ${data.length} курсов`;

  data.forEach(course => {
    const div = document.createElement('div');
    div.className = 'course';
    div.innerHTML = `
        <div class="course-info">
          <div class="course-title">${course.title}</div>
          <div class="course-meta">${course.school}<br><img src="../images/starIcon.svg" alt=""> 4.5<br><span>Отзывы о школе 58</span></div>
          <div class="course-prices">${course.paid ? course.price + ' ₽' : 'Бесплатно'}</div>
          <div class="course-time"><img src="../images/clockIcon.svg" alt=""><br>В любое<br>время</div>
          <div class="course-finish">
            <span class="badge"><img src="../images/calendarIcon.svg" alt=""> ${course.level}</span>
            <span class="badge"><img src="../images/traficIcon.svg" alt=""> ${course.duration} мес</span>
          </div>
          <div class="course-links">
            <button>На сайт курса</button>
            <a href="#">Подробнее</a>
          </div>
        </div>
      `;
    courseList.appendChild(div);
  });
}

filters.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', () => {
    if (input.id === 'duration') {
      durationValue.textContent = input.value;
    }
    filterCourses();
  });
});

// Инициализация
filterCourses();










const openFilterInMobile = () => {
  filters.style.display = "flex"
}

const closeFilterInMobile = () => {
  filters.style.display = "none"
}