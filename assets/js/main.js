console.log("Language overlay JS loaded");

document.addEventListener("DOMContentLoaded", function () {

  /* ==========================
     MOBILE NAVBAR
  ========================== */

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");

  if (toggle && menu) {

    toggle.addEventListener("click", function () {
      menu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
      link.addEventListener("click", function () {
        menu.classList.remove("active");
      });
    });

    // Close when clicking outside
    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.remove("active");
      }
    });
  }

  /* ==========================
     FADE IN ANIMATION
  ========================== */

  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    fadeElements.forEach(el => observer.observe(el));
  }

  /* ==========================
     CONTACT FORM
  ========================== */

  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", async function(e) {
      e.preventDefault();

      const formData = {
        name: this.name.value,
        phone: this.phone.value,
        time: this.time.value,
        place: this.place.value,
        message: this.message.value
      };

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          this.style.display = "none";

          const msg = document.createElement("div");
          msg.innerHTML = `
            <h3>Your message has been received.</h3>
            <p>In Dishank, nothing is automated — every conversation is personal.</p>
            <p>Dishank will respond to you soon.</p>

            <p>Until then — explore Odisha. Explore quietly.</p>
          `;
          this.parentNode.appendChild(msg);

          setTimeout(() => {
            window.location.href = "/";
          }, 9000);
        }

      } catch (error) {
        alert("Something went wrong. Please try again.");
      }
    });
  }

});

document.addEventListener("DOMContentLoaded", function () {

  const overlay = document.getElementById("language-overlay");
  const popup = document.querySelector(".lang-popup");
  const messages = document.querySelectorAll(".lang-message");
  const leftArrow = document.querySelector(".lang-arrow.left");
  const rightArrow = document.querySelector(".lang-arrow.right");

  let currentIndex = 0;

  function showMessage(index) {
    messages.forEach((msg) => msg.classList.remove("active"));
    messages[index].classList.add("active");
  }

  rightArrow.addEventListener("click", function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % messages.length;
    showMessage(currentIndex);
  });

  leftArrow.addEventListener("click", function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + messages.length) % messages.length;
    showMessage(currentIndex);
  });

  // Close only if user clicks directly on overlay (not popup)
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.classList.add("hidden");
    }
  });

});