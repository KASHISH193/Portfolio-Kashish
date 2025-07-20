console.log('script.js is loaded!');
// Scroll Animation – Elements appear smoothly as you scroll down
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight * 0.85) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Skill Slider in Technical Section – Show skill level dynamically
const skillSliders = document.querySelectorAll('.skill-slider input[type=range]');
const skillLevels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
skillSliders.forEach(slider => {
  slider.addEventListener('input', function() {
    const level = skillLevels[this.value - 1] || '';
    this.nextElementSibling.textContent = level;
  });
  // Set initial label
  const level = skillLevels[slider.value - 1] || '';
  slider.nextElementSibling.textContent = level;
});

// Make skill sliders non-editable for all users by default
const isAdmin = false; // Change to true for admin

document.querySelectorAll('.skill-slider').forEach(slider => {
  slider.disabled = !isAdmin;
  // Also update the thumb style
  const thumb = slider.closest('.skill-bar')?.querySelector('.skill-thumb');
  if (thumb) {
    if (slider.disabled) {
      thumb.classList.add('disabled');
    } else {
      thumb.classList.remove('disabled');
    }
  }
});

document.querySelectorAll('.skill-bar').forEach(function(bar) {
  var progress = bar.querySelector('.skill-progress');
  var thumb = progress.querySelector('.skill-thumb');
  function setProgressFromEvent(e) {
    var rect = bar.getBoundingClientRect();
    var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    var percent = Math.max(0, Math.min(1, x / rect.width));
    var percentValue = Math.round(percent * 100);
    progress.style.width = percentValue + '%';
    progress.setAttribute('data-width', percentValue + '%');
  }
  // Bar click/drag
  bar.addEventListener('mousedown', function(e) {
    setProgressFromEvent(e);
    function onMove(ev) {
      setProgressFromEvent(ev);
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      if (thumb) thumb.classList.remove('dragging');
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    if (thumb) thumb.classList.add('dragging');
  });
  // Touch support for bar
  bar.addEventListener('touchstart', function(e) {
    setProgressFromEvent(e);
    function onMove(ev) {
      setProgressFromEvent(ev);
    }
    function onUp() {
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onUp);
      if (thumb) thumb.classList.remove('dragging');
    }
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onUp);
    if (thumb) thumb.classList.add('dragging');
  });
  // Thumb drag
  if (thumb) {
    thumb.addEventListener('mousedown', function(e) {
      e.stopPropagation();
      function onMove(ev) {
        setProgressFromEvent(ev);
      }
      function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        thumb.classList.remove('dragging');
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      thumb.classList.add('dragging');
    });
    thumb.addEventListener('touchstart', function(e) {
      e.stopPropagation();
      function onMove(ev) {
        setProgressFromEvent(ev);
      }
      function onUp() {
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onUp);
        thumb.classList.remove('dragging');
      }
      document.addEventListener('touchmove', onMove);
      document.addEventListener('touchend', onUp);
      thumb.classList.add('dragging');
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var downloadBtn = document.querySelector('a.btn-secondary[download][href="resume_kashish_nankani.pdf"]');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      var confirmed = confirm('Do you want to download the CV?');
      if (!confirmed) {
        e.preventDefault();
      }
      // If confirmed, browser will proceed to download
    });
  }
});
