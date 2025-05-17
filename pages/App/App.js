document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu li");
  const content = document.querySelector(".content");
  const telas = ["home.html", "zmapa.html", "dashboard.html", "troca.html", "admin-registro.html", "registroreciclagem.html", "test.html"];
  function loadPage(url) {
    fetch(url)
      .then((res) => res.text())
      .then((html) => {
        document.querySelector(".content").innerHTML = html;

        // carregue o home.js manualmente
        if (url.includes("home.html")) {
          const script = document.createElement("script");
          script.src = "/pages/App/home.js";
          script.onload = () => {
            if (typeof initCharts === "function") initCharts();
          };
          document.body.appendChild(script);
        } else {
          // chamar initCharts se existir
          if (typeof initCharts === "function") initCharts();
        }
      });
  }
  // Menu lateral - troca de páginas
  menuItems.forEach((item, idx) => {
    item.addEventListener("click", function () {
      menuItems.forEach((li) => li.classList.remove("active"));
      this.classList.add("active");
      if (telas[idx]) {
        loadPage(`/pages/App/html/${telas[idx]}`);
      }
    });
  });

  // substitui o case, roda a primeira tela
  fetch(telas[0])
    .then((res) => res.text())
    .then((html) => (content.innerHTML = html));

});
