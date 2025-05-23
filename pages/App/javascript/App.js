document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu li");
  const btnRegistrar = document.querySelector(".btn-registrar");
  const telas = ["home.html", "zmapa.html", "troca.html", "admin-registro.html", "registroreciclagem.html"];

  function loadPage(url) {
    let autenticado = JSON.parse(localStorage.getItem("logado"));
    if (!autenticado) {
      window.location.href = "../../auth/login.html";
      return;
    }

    fetch(url)
      .then((res) => res.text())
      .then((html) => {
        document.querySelector(".content").innerHTML = html;

        const oldScript = document.getElementById("parcial-script");
        if (oldScript) {
          oldScript.remove();
        }

        // Decide qual script deve ser carregado
        let scriptPath = "";

        if (url.includes("home.html")) {
          scriptPath = "../javascript/home.js";
        } else if (url.includes("registroreciclagem.html")) {
          scriptPath = "../javascript/registrar-recy.js";
        } else if (url.includes("troca.html")) {
          scriptPath = "../javascript/troca-pontos.js";
        } else if (url.includes("zmapa.html")) {
          scriptPath = "../javascript/zmapa.js";
        } else if (url.includes("admin-registro.html")) {
          scriptPath = "../javascript/admin.js";
        }

        if (scriptPath) {
          const newScript = document.createElement("script");
          newScript.src = scriptPath;
          newScript.id = "parcial-script";
          newScript.onload = () => {
            if (scriptPath.includes("home.js") && typeof initCharts === "function") {
              initCharts();
            }
            if (scriptPath.includes("zmapa.js") && typeof initZmapa === "function") {
              initZmapa();
            }
            if (scriptPath.includes("admin.js") && typeof initAdmin === "function") {
              initAdmin();
            }
          };
          document.body.appendChild(newScript);
        }
      });
  }

  // menu lateral que trocas as paginas
  menuItems.forEach((item, idx) => {
    item.addEventListener("click", function () {
      menuItems.forEach((li) => li.classList.remove("active"));
      this.classList.add("active");
      if (telas[idx]) {
        loadPage(`../html/${telas[idx]}`);
      }
    });
  });

  // botão Registrar Reciclagem
  if (btnRegistrar) {
    btnRegistrar.addEventListener("click", function () {
      // tira a seleção do menu
      menuItems.forEach((li) => li.classList.remove("active"));
      loadPage("../html/registroreciclagem.html");
    });
  }

  // carrega a primeira tela que é a home
  loadPage(`../html/${telas[0]}`);

  // coloca o nome do usuario logado na tela
  const nomeUsuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (nomeUsuario) {
    const spanNome = document.querySelector(".user-name");
    if (spanNome) {
      spanNome.textContent = nomeUsuario.nome;
    }
  }
  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("logado");
      localStorage.removeItem("usuarioLogado");
      window.location.href = "../../auth/login.html";
    });
  }
});
