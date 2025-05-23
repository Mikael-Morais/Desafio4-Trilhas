document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const usuario = document.getElementById("usuario").value;
      const senha = document.getElementById("senha").value;

      fetch("https://deploy-desafio4-trilhas.onrender.com/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Usuário ou senha inválidos");
          return res.json();
        })
        .then((data) => {
          localStorage.setItem("logado", "true");
          localStorage.setItem("usuarioLogado", data.user);
          window.location.href = "../App/html/app.html";
        })
        .catch((err) => alert(err.message));
    });
  }
});
