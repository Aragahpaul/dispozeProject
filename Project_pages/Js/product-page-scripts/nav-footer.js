export function getNavBarHTML() {
  return `
  <section id="header">
      <a href="#" class="logo d-none d-lg-flex">Dispoze</a>

      <div>
        <ul id="navlink" class="noShow-nav">
          <li><a href="../../Project_pages/home.html">Home</a></li>
          <li><a href="../../Project_pages/shop/container.html" class="active">Shop</a></li>
          <li><a href="../../Project_pages/aboutus.html">About Us</a></li>
          <li><a href="../../Project_pages/contactus.html">contact Us</a></li>
        </ul>
      </div>

      <div>
        <ul id="navbar">
          <li class="heading">
            <span>Dispoze</span
            ><a href="#" id="close"><i class="fa-solid fa-xmark closed"></i></a>
          </li>
          <hr />
          <li>
            <a href="../../Project_pages/home.html"><i class="bx bx-home-alt"></i>Home</a>
          </li>
          <li>
            <a href="../../Project_pages/profile.html"><i class="bx bx-user-circle"></i>Profile</a>
          </li>
          <li>
            <a href="../../Project_pages/shop/container.html"><i class="bx bx-store"></i>Shop</a>
          </li>
          <li>
            <a href="#"><i class="bx bx-bell"></i>Notification</a>
          </li>
          <li>
            <a href="../../Project_pages/aboutus.html"><i class="bx bx-group"></i>About Us</a>
          </li>
          <li>
            <a href="#"><i class="bx bx-chat"></i>Contact Us</a>
          </li>
           <li>
                  <a href="../../Project_pages/login.html" class="log-mobile text-danger"
                    ><i class="bx bx-log-out log-mobile text-danger"></i>Logout</a
                  >
                </li>
        </ul>
      </div>
      <div id="last-bar">
        <div class="noti-bar">
          <a href="#"><i class="fa-regular fa-bell"></i></a>
          <div class="cart-count">3</div>
        </div>
        <div class="profile-bar">
          <a href="#"><i class="bx bx-user-circle"></i></a>
          <a href="#"><i class="fa-solid fa-chevron-down"></i></a>
        </div>
      </div>
      <div id="mobile">
        <i id="bar" class="fa-solid fa-bars"></i>
      </div>
    </section>

  
  `;
}

export function getFooterHTML() {
  return `
  
  <section id="footer-section">
      <div class="footer-container">
        <div class="f1-content">
          <h4>Stay Connected</h4>
          <p>
            Subscribe to our newsletter to join over 1,500 <br />
            persons who receive updates about our offers and <br />
            changes in policy. You can unsubscribe anytime!
          </p>

          <form>
            <input type="email" placeholder="example@domain.com" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <div class="f2-content">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="../../Project_pages/aboutus.html">About</a></li>
            <li><a href="#">Recent Projects</a></li>
            <li><a href="../../Project_pages/schedule-pickup.html">Request Pickup</a></li>
          </ul>
        </div>

        <div class="f3-content">
          <h4>Contact Us</h4>
          <ul>
            <li>
              <a href="#"
                ><i class="fa-brands fa-instagram socials"></i>Instagram</a
              >
            </li>
            <li>
              <a href="#"
                ><i class="fa-brands fa-x-twitter socials"></i>Twitter</a
              >
            </li>
            <li>
              <a href="#"
                ><i class="fa-brands fa-linkedin-in socials"></i>LinkedIn</a
              >
            </li>
            <li>
              <a href="#"
                ><i class="fa-brands fa-facebook-f socials"></i>Facebook</a
              >
            </li>
            <li>
              <a href="#"
                ><i class="fa-regular fa-envelope socials"></i>Email</a
              >
            </li>
          </ul>
        </div>
      </div>
    </section>
  
  `;
}

export function handleNavBar() {
  // Script for navigation bar
  const bar = document.getElementById("bar");
  const close = document.getElementById("close");
  const nav = document.getElementById("navbar");
  if (bar) {
    bar.addEventListener("click", () => {
      nav.classList.add("active");
    });
  }

  if (close) {
    close.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  }
}
