if (!localStorage.getItem("usuarios")) {
  const usuariosIniciais = [
    { usuario: "admin", senha: "admin123" },
    { usuario: "paulo", senha: "1234" },
    // é aqui que adciona mais usuarios
  ];
  localStorage.setItem("usuarios", JSON.stringify(usuariosIniciais));
}

function getUsers() {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}

function userExists(username) {
  return getUsers().some((u) => u.usuario === username);
}

function validateUser(username, password) {
  return getUsers().some((u) => u.usuario === username && u.senha === password);
}

if (window.location.pathname.includes("/App/html/app.html")) {
  if (localStorage.getItem("logado") !== "true") {
    window.location.href = "../../landing/index.html";
  }
}

if (window.location.pathname.includes("/auth/login.html")) {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const usuario = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;
        if (validateUser(usuario, senha)) {
          localStorage.setItem("logado", "true");
          localStorage.setItem("usuarioLogado", usuario);
          window.location.href = "../App/html/app.html";
        } else {
          alert("Usuário ou senha inválidos!");
        }
      });
    }
  });
}
