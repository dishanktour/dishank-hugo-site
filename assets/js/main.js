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
  const messages = document.querySelectorAll(".lang-message");
  const leftArrow = document.querySelector(".lang-arrow.left");
  const rightArrow = document.querySelector(".lang-arrow.right");

  let currentIndex = 0;

  /* Detect language from <html lang=""> */
  const pageLang = document.documentElement.lang;

  /* Map languages to message index */
  const langMap = {
    "en": 0,
    "hi": 1,
    "bn": 2,
    "or": 3
  };

  if (langMap[pageLang] !== undefined) {
    currentIndex = langMap[pageLang];
  }

  function showMessage(index) {
    messages.forEach((msg) => msg.classList.remove("active"));
    messages[index].classList.add("active");
  }

  /* IMPORTANT: show correct language initially */
  showMessage(currentIndex);

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

  // Close overlay on click outside popup
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.classList.add("hidden");
    }
  });

  // Close on scroll
  window.addEventListener("scroll", function () {
    overlay.classList.add("hidden");
  }, { once: true });

  // Close on any key press
  window.addEventListener("keydown", function () {
    overlay.classList.add("hidden");
  }, { once: true });

});

/* ==========================
   ODISHA EXPLORER
========================== */

document.addEventListener("DOMContentLoaded", function () {

  const districtSelect = document.getElementById("district-select");
  const tableContainer = document.getElementById("places-table");
  
  if(!districtSelect) return;
  
  const places = {
  
  puri: [
  
  ["Jagannath Temple","Spiritual","The living temple of Lord Jagannath and one of the four Char Dham pilgrimage sites."],
  
  ["Konark Sun Temple","Historical","13th-century chariot temple of Surya and UNESCO World Heritage Site."],
  
  ["Chilika Lake","Nature","Asia’s largest brackish water lagoon famous for dolphins and migratory birds."],
  
  ["Satapada","Nature","Gateway to dolphin watching in Chilika lagoon."],
  
  ["Raghurajpur","Cultural","Heritage village known for Pattachitra painters and classical artisans."],
  
  ["Sakhi Gopal Temple","Spiritual","Temple of Krishna linked to the legend of the witnessing deity."],
  
  ["Alarnath Temple","Spiritual","Important during Jagannath’s Anasara period when devotees worship here."],
  
  ["Balighai Beach","Nature","Quiet coastal ecosystem near the Bhargavi river mouth."],
  
  ["Baliharachandi Temple","Spiritual","Temple of Goddess Harachandi overlooking the sea."],
  
  ["Astaranga Beach","Nature","Peaceful coastal village known for vibrant sunsets."],
  
  ["Pipili","Cultural","Famous town for traditional appliqué craft work."],
  
  ["Chandrabhaga Beach","Nature","Historic beach associated with the Konark Sun Temple."],
  
  ["Narendra Tank","Spiritual","Sacred tank where Chandana Yatra rituals take place."],
  
  ["Swargadwar","Spiritual","Sacred cremation ghat near the Jagannath temple."],
  
  ["Loknath Temple","Spiritual","Important Shiva shrine in Puri town."],
  
  ["Markandeshwar Temple","Spiritual","Ancient Shiva temple connected with Markandeya legend."],
  
  ["Atharnala Bridge","Historical","Historic nine-arched bridge marking the entrance to Puri."],
  
  ["Konark Archaeological Museum","Historical","Museum preserving sculptures from Konark temple complex."],
  
  ["Chilika Kalijai Island","Spiritual","Island shrine dedicated to Goddess Kalijai in Chilika Lake."],
  
  ["Ramachandi Temple","Spiritual","Temple of Goddess Ramachandi near the Kushabhadra river."],
  
  ],
  
  
  cuttack: [
  
  ["Barabati Fort","Historical","Ruins of the medieval fort that once guarded the capital of Odisha."],
  
  ["Barabati Stadium","Modern","One of Odisha’s largest cricket stadiums."],
  
  ["Netaji Birthplace Museum","Historical","Birthplace of Subhas Chandra Bose preserved as a museum."],
  
  ["Dhabaleswar Temple","Spiritual","Shiva temple on an island in the Mahanadi river."],
  
  ["Mahanadi Riverfront","Nature","Beautiful riverside landscape surrounding Cuttack."],
  
  ["Stone Revetment","Historical","Historic flood protection structure built along the Mahanadi."],
  
  ["Chandi Temple","Spiritual","Temple of the city’s presiding goddess Cuttack Chandi."],
  
  ["Qadam-e-Rasool","Historical","Important Islamic shrine from Mughal era."],
  
  ["Ansupa Lake","Nature","One of Odisha’s largest freshwater lakes."],
  
  ["Deojhar Waterfall","Nature","Hidden forest waterfall near Narasinghpur."],
  
  ["Naraj Barrage","Nature","Scenic point where the Mahanadi branches."],
  
  ["Kataka Chandi Temple","Spiritual","Another revered shrine of Goddess Chandi."],
  
  ["Barabati Mosque","Historical","Historic Mughal-period mosque."],
  
  ],
  
  
  khordha: [
  
  ["Lingaraj Temple","Spiritual","Masterpiece of Kalinga architecture and sacred heart of Ekamra Kshetra."],
  
  ["Mukteswar Temple","Historical","Gem of Odishan temple architecture known for its exquisite torana."],
  
  ["Rajarani Temple","Historical","Temple famous for sculptural elegance and red sandstone."],
  
  ["Ananta Vasudeva Temple","Spiritual","Krishna temple within the old temple town."],
  
  ["Udayagiri Caves","Historical","Ancient Jain cave complex from the era of King Kharavela."],
  
  ["Khandagiri Caves","Historical","Rock-cut caves used by Jain monks."],
  
  ["Dhauli Shanti Stupa","Historical","Peace pagoda near Ashoka’s famous Kalinga war edicts."],
  
  ["Dhauli Ashokan Edicts","Historical","Rock inscriptions marking Emperor Ashoka’s transformation."],
  
  ["Ekamra Kanan","Nature","Botanical garden and urban forest park."],
  
  ["Nandankanan Zoo","Nature","Zoological park famous for white tigers and safari."],
  
  ["Deras Dam","Nature","Scenic reservoir surrounded by forests."],
  
  ["Chandaka Wildlife Sanctuary","Nature","Elephant reserve and forest ecosystem near Bhubaneswar."],
  
  ["Bindu Sagar","Spiritual","Sacred tank surrounded by ancient temples."],
  
  ["Kedar Gouri Temple","Spiritual","Twin temple complex of Shiva and Parvati."],
  
  ["Parsurameswar Temple","Historical","One of the earliest surviving temples of Bhubaneswar."],
  
  ["Brahmeswar Temple","Historical","11th century temple with rich sculptural work."],
  
  ["Odisha State Museum","Historical","Major museum of Odisha’s history and culture."],
  
  ["Kala Bhoomi Museum","Cultural","Craft museum dedicated to Odisha’s traditional arts."],
  
  ]
  
  };
  
  
  districtSelect.addEventListener("change", function(){
  
  const district = this.value;
  
  if(!district){
  tableContainer.innerHTML = "";
  return;
  }
  
  let table = "<table class='places-table'>";
  table += "<tr><th>Place</th><th>Category</th><th>Description</th></tr>";
  
  places[district].forEach(function(place){
  
  let category = place[1].toLowerCase();

  table += `<tr>
  <td class="place-name">${place[0]}</td>
  <td class="place-category category-${category}">${place[1]}</td>
  <td class="place-desc">${place[2]}</td>
  </tr>`;
  
  });
  
  table += "</table>";
  
  tableContainer.innerHTML = table;
  
  });
  
  });

const header = document.querySelector(".nav-logo-only");

  if(header){
  window.addEventListener("scroll", function(){
  if(window.scrollY > 20){
  header.classList.add("scrolled");
  }else{
  header.classList.remove("scrolled");
  }
  });
  }