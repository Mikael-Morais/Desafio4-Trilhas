document.addEventListener('DOMContentLoaded', function () {
  const lista = document.querySelectorAll('.registro-lista li');
  const nome = document.getElementById('info-nome');
  const data = document.getElementById('info-data');
  const id = document.getElementById('info-id');
  const material = document.getElementById('info-material');

  console.log(nome, data, id, material); 

  lista.forEach(item => {
    item.addEventListener('click', function () {
      
      lista.forEach(li => li.classList.remove('selected'));
      this.classList.add('selected');

      nome.textContent = this.getAttribute('data-nome');
      data.textContent = this.getAttribute('data-data');
      id.textContent = this.getAttribute('data-id');
      material.textContent = this.getAttribute('data-material');
    });
  });
});