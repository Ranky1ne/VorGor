function burgerMenu(selector) {
  let menu = $(selector);
  let button = menu.find(".burger-menu_button", ".burger-menu_lines");
  let links = menu.find(".burger-menu_link");
  let overlay = menu.find(".burger-menu_overlay");

  button.on("click", e => {
    e.preventDefault();
    toggleMenu();
  });

  links.on("click", () => toggleMenu());
  overlay.on("click", () => toggleMenu());

  function toggleMenu() {
    menu.toggleClass("burger-menu_active");

    if (menu.hasClass("burger-menu_active")) {
      $("body").css("overlow", "hidden");
      menu.find(".burger-menu_button").css("top","300px")
    } else {
      $("body").css("overlow", "visible");
      menu.find(".burger-menu_button").css("top","10px")
    }
  }
}

burgerMenu(".burger-menu");

