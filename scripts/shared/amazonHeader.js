export function toggleHamburgerMenu() {
  document.querySelector('.js-hamburger-menu').addEventListener('click', () => {
    const hamburgerMenuDropdown = document.querySelector('.js-hamburger-menu-dropdown');
    hamburgerMenuDropdown.classList.toggle('hamburger-menu-opened');
  });
};

export default toggleHamburgerMenu;