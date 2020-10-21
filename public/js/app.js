
const titulo = document.querySelector('#titulo');



titulo.addEventListener("mouseover", () => {
  titulo.style = 'color:red';
});

titulo.addEventListener("mouseleave", () => {
  titulo.style = 'color:black';
});
