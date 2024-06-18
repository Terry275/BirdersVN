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



document.addEventListener('DOMContentLoaded', function () {
  const images = [
    '/public/images/b1.jpg', '/public/images/b2.jpg', 
    '/public/images/b3.jpg', '/public/images/b4.jpg',
    '/public/images/b5.jpg', '/public/images/b6.jpg', 
    '/public/images/b7.jpg', '/public/images/b8.jpg',
    '/public/images/b9.jpg', '/public/images/b10.jpg', 
  ];

  const container = document.getElementById('carouselItemsContainer');
  let html = '';
  let rowContent = '';

  images.forEach((src, index) => {
    rowContent += `
      <div class="col-md-3">
        <img src="${src}" class="img-fluid" alt="Image ${index + 1}">
      </div>
    `;

    // Every 4 images or at the end of the array, wrap the content into a carousel-item
    if ((index + 1) % 4 === 0 || index === images.length - 1) {
      let itemClass = index < 4 ? 'carousel-item active' : 'carousel-item';
      html += `<div class="${itemClass}"><div class="row justify-content-center">${rowContent}</div></div>`;
      rowContent = ''; // Reset for the next set of images
    }
  });

  container.innerHTML = html;
});
