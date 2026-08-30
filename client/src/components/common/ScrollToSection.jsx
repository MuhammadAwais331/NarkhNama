export const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);

  if (!section) return;

  // Change this to match your navbar height
  const navbarHeight = window.innerWidth < 1024 ? 64 : 80;

  const y =
    section.getBoundingClientRect().top +
    window.pageYOffset -
    navbarHeight;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};