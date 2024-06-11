$(function () {
    $(window).on('scroll', function () {
      if ($(this).scrollTop() >= 200) {
        $('.navbar').addClass('fixed-top');
      } else if ($(this).scrollTop() == 0) {
        $('.navbar').removeClass('fixed-top');
      }
    });
  
    function adjustNav() {
      var winWidth = $(window).width(),
        dropdown = $('.dropdown'),
        dropdownMenu = $('.dropdown-menu');
  
      if (winWidth >= 768) {
        dropdown.on('mouseenter', function () {
          $(this).addClass('show')
            .children(dropdownMenu).addClass('show');
        });
  
        dropdown.on('mouseleave', function () {
          $(this).removeClass('show')
            .children(dropdownMenu).removeClass('show');
        });
      } else {
        dropdown.off('mouseenter mouseleave');
      }
    }
  
    $(window).on('resize', adjustNav);
  
    adjustNav();
  });





  // To top button display
// Get the "To Top" button element
const toTopBtn = document.querySelector('#toTopBtn');

// Add scroll event listener to window
window.addEventListener('scroll', () => {
    // Check if the user has scrolled down by at least 240px
    if (window.scrollY > 240) {
        // If scrolled down, show the button
        toTopBtn.style.display = 'flex';
    } else {
        // If not scrolled down enough, hide the button
        toTopBtn.style.display = 'none';
    }
});

