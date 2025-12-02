// funcionalidad a las secciones acerca de mí
document.querySelectorAll('#sidebar .section').forEach(section => {
  const header = section.querySelector('h2');

  header.addEventListener('click', () => {
    const content = section.querySelector('.section-content');

    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
});

// da funcionalidad a los botones dentro de My Work
document.querySelectorAll('.project-toggle').forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();

    const content = button.nextElementSibling;

    if (content.style.display === 'block') {
      content.style.display = 'none';
      button.classList.remove('open');
    } else {
      content.style.display = 'block';
      button.classList.add('open');
    }
  });
});
