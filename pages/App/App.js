document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu li");
  const content = document.querySelector(".content");
  const telas = ["home.html", "zmapa.html", "dashboard.html", "troca.html", "admin-registro.html","registroreciclagem.html", "home.html", "test.html"];

  menuItems.forEach((item, idx) => {
    item.addEventListener("click", () => {
      menuItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      fetch(telas[idx])
        .then((res) => res.text())
        .then((html) => (content.innerHTML = html))
        .catch(() => (content.innerHTML = "<div>Erro ao carregar tela.</div>"));
    });
  });

  // substitui o case, roda a primeira tela
  fetch(telas[0])
    .then((res) => res.text())
    .then((html) => (content.innerHTML = html));

  document.querySelectorAll('.pedidos-lista li').forEach(item => {
    item.addEventListener('click', function() {
        
        document.querySelectorAll('.pedidos-lista li').forEach(li => li.classList.remove('selected'));
        this.classList.add('selected');
        
        document.getElementById('nome-transferencia').textContent = this.dataset.nome;
        document.getElementById('data-transferencia').textContent = this.dataset.data;
        document.getElementById('id-transferencia').textContent = this.dataset.id;
        document.getElementById('img-transferencia').src = this.dataset.img;
    });
  });
});
