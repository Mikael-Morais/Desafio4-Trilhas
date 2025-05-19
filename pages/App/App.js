document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu li");
  const content = document.querySelector(".content");
  const btnRegistrar = document.querySelector(".btn-registrar");
  const telas = ["home.html", "zmapa.html", "troca.html", "admin-registro.html", "registroreciclagem.html"];

  function loadPage(url) {
    fetch(url)
      .then((res) => res.text())
      .then((html) => {
        document.querySelector(".content").innerHTML = html;
        if (url.includes("admin-registro.html")) {
          window.initAdminRegistro();
        }
        if (url.includes("home.html")) {
          const script = document.createElement("script");
          script.src = "/pages/App/home.js";
          script.onload = () => {
            if (typeof initCharts === "function") initCharts();
          };
          document.body.appendChild(script);
        } else if (url.includes("troca.html")) {
          const script = document.createElement("script");
          script.src = "/pages/App/troca-pontos.js";
          document.body.appendChild(script);
        } else {
          if (typeof initCharts === "function") initCharts();
        }
      });
  }

  // menu lateral que trocas as paginas
  menuItems.forEach((item, idx) => {
    item.addEventListener("click", function () {
      menuItems.forEach((li) => li.classList.remove("active"));
      this.classList.add("active");
      if (telas[idx]) {
        loadPage(`/pages/App/html/${telas[idx]}`);
      }
    });
  });

  // botão Registrar Reciclagem
  if (btnRegistrar) {
    btnRegistrar.addEventListener("click", function () {
      // tira a seleção do menu
      menuItems.forEach((li) => li.classList.remove("active"));
      loadPage("/pages/App/html/registroreciclagem.html");
    });
  }

  // carrega a primeira tela que é a home
  loadPage(`/pages/App/html/${telas[0]}`);

  // coloca o nome do usuario logado na tela
  const nomeUsuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (nomeUsuario) {
    const spanNome = document.querySelector(".user-name");
    if (spanNome) {
      spanNome.textContent = nomeUsuario.nome;
    }
  }
});
