document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('.main-header');
    const topBarHeight = document.querySelector('.top-bar').offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > topBarHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Add sticky header styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .main-header.sticky {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            animation: slideDown 0.3s;
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(-100%);
            }
            to {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Language selector
    const languageLinks = document.querySelectorAll('.language-selector a');
    
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            languageLinks.forEach(el => el.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Here you would typically handle language change
            // This is just a placeholder
            console.log('Language changed to:', this.querySelector('img').alt);
        });
    });
});

//Boats 
// Object mapping boat names to their info image paths
const boatInfoImages = {
    "Quicksilver 875": "assets/img/boats/Screenshot 2025-03-27 at 22.29.29.png",
    "Monterey 268": "assets/img/boats/Screenshot 2025-03-27 at 22.53.38.png",
    "Key Largo 27": "assets/img/boats/Screenshot 2025-03-27 at 22.31.34.png",
    "Rand 27": "assets/img/boats/Screenshot 2025-03-27 at 22.32.26.png",
    "Alfastreet Marine 28": "assets/img/boats/Screenshot 2025-03-27 at 22.29.29.png",
    "Pershing 37": "assets/img/boats/Screenshot 2025-03-27 at 22.37.43.png",
    "De Antonio 36": "assets/img/boats/Screenshot 2025-03-30 at 22.33.57.png",
    "Sea Ray 290" : "assets/img/boats/Screenshot 2025-03-30 at 22.44.07.png",
    "Vanquish 58" : "assets/img/boats/Screenshot 2025-03-30 at 22.49.32.png",
    "Pardo 50" : "assets/img/boats/Screenshot 2025-03-30 at 22.55.20.png",
    "Sunseeker Predator 62" : "assets/img/boats/Screenshot 2025-03-30 at 23.11.08.png",
    "Riva Argo 90" : "assets/img/boats/Screenshot 2025-03-30 at 23.17.27.png"
  };
  
  // Variable to store currently selected boat
  let currentSelectedBoat = null;
  
  // Function to open the image modal
  function openImageModal(boatName) {
    // Store the selected boat name
    currentSelectedBoat = boatName;
    
    const imagePath = boatInfoImages[boatName];
    if (!imagePath) return;
    
    // Create or get modal container
    let modalContainer = document.getElementById('image-modal-container');
    if (!modalContainer) {
      modalContainer = document.createElement('div');
      modalContainer.id = 'image-modal-container';
      document.body.appendChild(modalContainer);
    }
    
    // Create modal HTML
    const modalHTML = `
      <div class="image-modal-backdrop"></div>
      <div class="image-modal">
        <button class="close-image-modal">&times;</button>
        <img src="${imagePath}" alt="${boatName} Information" class="boat-info-image">
        <div class="availability-button-container">
          <button class="check-availability-btn">CHECK AVAILABILITY</button>
        </div>
      </div>
    `;
    
    // Add the modal HTML to the container
    modalContainer.innerHTML = modalHTML;
    
    // Add event listeners
    document.querySelector('.close-image-modal').addEventListener('click', closeImageModal);
    document.querySelector('.image-modal-backdrop').addEventListener('click', closeImageModal);
    document.querySelector('.check-availability-btn').addEventListener('click', handleCheckAvailability);
    
    // Show the modal with animation
    setTimeout(() => {
      modalContainer.classList.add('active');
    }, 10);
    
    // Prevent page scrolling
    document.body.style.overflow = 'hidden';
  }
  
  // Function to close the image modal
  function closeImageModal() {
    const modalContainer = document.getElementById('image-modal-container');
    if (modalContainer) {
      modalContainer.classList.remove('active');
      
      // Remove modal after animation completes
      setTimeout(() => {
        modalContainer.innerHTML = '';
      }, 300);
      
      // Re-enable page scrolling
      document.body.style.overflow = '';
    }
  }
  
  // Function to handle "Check Availability" button click
  function handleCheckAvailability() {
    // Close the modal first
    closeImageModal();
    
    // Create a hidden input field for the boat name if it doesn't exist
    let boatNameInput = document.getElementById('selected-boat');
    if (!boatNameInput) {
      boatNameInput = document.createElement('input');
      boatNameInput.type = 'hidden';
      boatNameInput.id = 'selected-boat';
      boatNameInput.name = 'selected_boat';
      document.getElementById('charter-form').appendChild(boatNameInput);
    }
    
    // Set the value of the hidden input
    boatNameInput.value = currentSelectedBoat;
    
    // Add a visual indication that a boat is selected
    const contactForm = document.querySelector('.contact-form');
    
    // Add a class to the form to indicate a boat is selected
    contactForm.classList.add('boat-selected');
    
    // If there's an existing boat notification, remove it
    const existingNotification = document.querySelector('.boat-selection-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create and add a notification showing which boat is selected
    const notification = document.createElement('div');
    notification.className = 'boat-selection-notification';
    notification.innerHTML = `<span>You're checking availability for <strong>${currentSelectedBoat}</strong></span>
      <button type="button" class="clear-selection" aria-label="Clear selection">&times;</button>`;
    contactForm.insertBefore(notification, contactForm.firstChild);
    
    // Add event listener to clear selection button
    notification.querySelector('.clear-selection').addEventListener('click', function() {
      clearBoatSelection();
    });
    
    // Scroll to the contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      setTimeout(() => {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Flash effect on the form to draw attention
        contactForm.classList.add('highlight');
        setTimeout(() => {
          contactForm.classList.remove('highlight');
        }, 1000);
      }, 300);
    }
  }
  
  // Function to clear boat selection
  function clearBoatSelection() {
    currentSelectedBoat = null;
    
    // Reset the form
    const contactForm = document.querySelector('.contact-form');
    contactForm.classList.remove('boat-selected');
    
    // Remove notification
    const notification = document.querySelector('.boat-selection-notification');
    if (notification) {
      notification.remove();
    }
    
    // Clear the hidden input
    const boatNameInput = document.getElementById('selected-boat');
    if (boatNameInput) {
      boatNameInput.value = '';
    }
  }
  
  // Update form submission to include boat information
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('charter-form');
    
    if (form) {
      // The original form submission logic can be preserved
      // Just make sure the hidden field value is included in the submission
      
      form.addEventListener('submit', function(e) {
        // If there's any form validation or processing you need to do,
        // you can add it here
        
        // Example: Make sure the full phone field includes the country code
        const countryCode = document.getElementById('country-code').value;
        const phoneNumber = document.getElementById('phone').value;
        const fullPhoneField = document.getElementById('full-phone');
        
        if (fullPhoneField && countryCode && phoneNumber) {
          fullPhoneField.value = countryCode + phoneNumber;
        }
      });
    }
    
    // Get all price links
    const priceLinks = document.querySelectorAll('.price-link');
    
    // Add click events to each link
    priceLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the boat name from the card
        const boatCard = this.closest('.boat-card');
        const boatName = boatCard.querySelector('.boat-name').innerText;
        
        // Open the image modal
        openImageModal(boatName);
      });
    });
  });

  //More Boats
  // Add this JavaScript to your website
document.addEventListener('DOMContentLoaded', function() {
    // Get the "CHECK OUT MORE MODELS" button
    const moreBoatsButton = document.querySelector('.more-boats-button');
    
    // Get the contact form section
    const contactSection = document.getElementById('contact');
    const contactForm = document.querySelector('.contact-form');
    
    if (moreBoatsButton && contactSection && contactForm) {
      // Add click event listener to the button
      moreBoatsButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create a hidden field to track that user came from "more boats" section
        const sourceField = document.createElement('input');
        sourceField.type = 'hidden';
        sourceField.name = 'source';
        sourceField.value = 'more_boats_section';
        contactForm.appendChild(sourceField);
        
        // Update the form heading to personalize the experience
        const contactHeading = document.querySelector('.contact-heading');
        if (contactHeading) {
          contactHeading.innerHTML = '<span class="heading-accent">Find your perfect boat</span> from our +50 models';
        }
        
        // Add a special class to the form for animation
        contactForm.classList.add('highlight-form');
        
        // Smooth scroll to the contact section
        contactSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // After scrolling is complete, add an attention-grabbing effect
        setTimeout(function() {
          // Add a brief pulse animation to the form
          contactForm.classList.add('pulse-animation');
          
          // Remove the animation class after it completes
          setTimeout(function() {
            contactForm.classList.remove('pulse-animation');
          }, 1500);
        }, 1000);
      });
    }
  });