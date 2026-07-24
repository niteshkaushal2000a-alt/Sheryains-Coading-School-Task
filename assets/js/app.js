document.addEventListener('DOMContentLoaded', () => {

  const currentPage = localStorage.getItem('currentPage') || 'dashboard';

  navigatePage(currentPage);

});

function navigatePage(pageId) {
  const pages = document.querySelectorAll('.page-section');
  const navItems = document.querySelectorAll('.nav-item');

  pages.forEach((page) => {
    page.classList.remove('active-page');
  });

  navItems.forEach((item) => {
    item.classList.remove('active');
  });

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active-page');
  }

  const activeNav = document.querySelector(`[data-page="${pageId}"]`);
  if (activeNav) {
    activeNav.classList.add('active');
  }

  localStorage.setItem('currentPage', pageId);
}

function backToDashboard() {
  navigatePage('dashboard');
}

function togglePlannerForm() {
  const plannerFormWrapper = document.getElementById('plannerFormWrapper');
  if (plannerFormWrapper) {
    plannerFormWrapper.classList.toggle('expanded');
  }
}

function toggleGoalForm() {
  const goalFormWrapper = document.getElementById('goalFormWrapper');
  if (goalFormWrapper) {
    goalFormWrapper.classList.toggle('expanded');
  }
}

function showToast(message, type = "error") {

  const colors = {
    success: "linear-gradient(135deg, #22c55e, #16a34a)",
    error: "linear-gradient(135deg, #ef4444, #dc2626)",
    warning: "linear-gradient(135deg, #f59e0b, #d97706)",
    info: "linear-gradient(135deg, #3b82f6, #2563eb)"
  };

  Toastify({
    text: message,
    duration: 5000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    className: "custom-toast",
    style: {
      background: colors[type],
      borderRadius: "12px",
      padding: "14px 18px",
      fontSize: "14px",
      fontWeight: "600",
      boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
      backdropFilter: "blur(10px)"
    }
  }).showToast();
}

function formValidation(formId) {
  const form = document.querySelector(`#${formId}`);
  const fields = form.querySelectorAll('[data-required="true"]');

  for (let field of fields) {
    const value = field.value.trim();

    if (!value) {
      showToast(`${field.dataset.name} is required`, 'error');
      field.focus();
      return false;
    }
     if (field.type === 'date') {

            const selectedDate = new Date(value);
            const today = new Date();
            // Remove time part
            today.setHours(0, 0, 0, 0);
            selectedDate.setHours(0, 0, 0, 0);

            if (selectedDate < today) {

                showToast(
                    `${field.dataset.name} cannot be in the past`,
                    'error'
                );

                field.focus();
                return false;
            }
        }
  }
  return true;
}

// function getFormValue(formId) {
//   const form = document.querySelector(`#${formId}`);
//   const fields = form.querySelectorAll('input, select, textarea');

//   const formData = {};

//   fields.forEach(field => {

//     if (!field.name) return

//     if (field.type === 'checkbox')
//       formData[field.name] = field.checked;
//     else {
//       formData[field.name] = field.value.trim();
//     }
//   });

//   return formData;
// }

function getFormValue(formId, extraField = {}) {

  const form = document.getElementById(formId);
  const formData = Object.fromEntries(new FormData(form).entries());
  return {
       ...formData,
       ...extraField
  }
}

// #region Local Storage Helper

function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  }
  catch (error) {
    console.error('Something Went wrong');
  }
}

function getLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
  catch (error) {
    console.error('Something Went wrong');
  }
}

function removeKey(key) {
  try {
    localStorage.removeItem(key);
  }
  catch (error) {
    console.error('Something Went wrong');
  }
}

function clear() {
  try {
    localStorage.clear();
  }
  catch (error) {
    console.error('Something Went wrong');
  }
}
// #endregion


function formateDate(date) {
    if (!date) return '-';
    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) {
        return '-';
    }
    return formattedDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit'
    });
}

