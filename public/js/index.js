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

// Ensure all the image in this category have the same aspect ratio
// Ensure the number of images are evenly
  const images = [
      { src: '/public/images/b1.jpg', name: 'Bird 1', engName: 'A bird' },
      { src: '/public/images/b2.jpg', name: 'Bird 2', engName: 'B bird' },
      { src: '/public/images/b3.jpg', name: 'Bird 3', engName: 'C bird' },
      { src: '/public/images/b1.jpg', name: 'Bird 1', engName: 'A bird' },
      { src: '/public/images/b2.jpg', name: 'Bird 2', engName: 'B bird' },
      { src: '/public/images/b3.jpg', name: 'Bird 3', engName: 'C bird' },
      { src: '/public/images/b1.jpg', name: 'Bird 1', engName: 'A bird' },
      { src: '/public/images/b2.jpg', name: 'Bird 2', engName: 'B bird' },
      { src: '/public/images/b3.jpg', name: 'Bird 3', engName: 'C bird' },
      { src: '/public/images/b1.jpg', name: 'Bird 1', engName: 'A bird' },
      { src: '/public/images/b2.jpg', name: 'Bird 2', engName: 'B bird' },
      { src: '/public/images/b3.jpg', name: 'Bird 3', engName: 'C bird' },
      { src: '/public/images/b1.jpg', name: 'Bird 1', engName: 'A bird' },
      { src: '/public/images/b2.jpg', name: 'Bird 2', engName: 'B bird' },
      { src: '/public/images/b3.jpg', name: 'Bird 3', engName: 'C bird' },
      { src: '/public/images/b1.jpg', name: 'Bird 1', engName: 'A bird' },

  ];

  const modalImage = document.querySelector('.modal-image');
  const modalName = document.querySelector('.modal-name');
  const modalEngName = document.querySelector('.modal-eng-name');
  const container = document.getElementById('carouselItemsContainer');

  let html = '';
  let rowContent = '';
  let itemCount = 0;

  images.forEach((image, index) => {
      // Start a new row every 4 images or continue filling the current row
      if (itemCount === 0) {
          rowContent += '<div class="row justify-content-center">'; // Start new row
      }

      // Add image to row
      rowContent += `
          <div class="col-md-3">
              <img src="${image.src}" class="img-fluid" alt="Image ${index + 1}" data-bs-toggle="modal" data-bs-target="#imageModal">
          </div>
      `;

      itemCount++;

      // If 4 images have been added or end of array, close row
      if (itemCount === 4 || index === images.length - 1) {
          rowContent += '</div>'; // Close current row
          itemCount = 0; // Reset counter
      }

      // Group rows into a single carousel item every 2 rows or at the end of the array
      if ((index + 1) % 8 === 0 || index === images.length - 1) {
          let itemClass = index < 8 ? 'carousel-item active' : 'carousel-item';
          html += `<div class="${itemClass}">${rowContent}</div>`;
          rowContent = ''; // Reset row content
      }
  });

  container.innerHTML = html;

  // Add event listeners to images for opening modal with details
  document.querySelectorAll('#carouselItemsContainer .img-fluid').forEach(img => {
      img.addEventListener('click', function () {
          const imageDetails = images.find(imgDetail => imgDetail.src.split('/').pop() === this.src.split('/').pop());
          modalImage.src = this.src;
          modalName.innerText = imageDetails ? imageDetails.name : 'Name not found';
          modalEngName.innerText = imageDetails ? imageDetails.engName : 'English name not found';
          document.querySelector('.modal-body .name').classList.remove('d-none');  // Show the names
      });
  });
});



//Display right-click and dragging all image elements (Warning: may affect the SEO and usability of this site)
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('img').forEach(img => {
      img.addEventListener('contextmenu', function(e) {
          e.preventDefault();
      });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('img').forEach(img => {
      img.addEventListener('dragstart', function(e) {
          e.preventDefault();
      });
  });
});


