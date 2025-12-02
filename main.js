
// Toggle sections (Accordion behavior)
const sections = document.querySelectorAll('.section');

sections.forEach(sec => {
  sec.addEventListener('click', () => {
    const content = sec.querySelector('.section-content');

    // Cierra todas las demás secciones
    sections.forEach(other => {
      if (other !== sec) {
        const otherContent = other.querySelector('.section-content');
        if (otherContent) {
          otherContent.style.display = 'none';
        }
      }
    });

    // Alterna la sección actual
    content.style.display =
      content.style.display === 'block' ? 'none' : 'block';
  });
});
