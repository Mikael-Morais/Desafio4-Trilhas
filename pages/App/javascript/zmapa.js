window.initZmapa = function () {
  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = btn.closest(".card-eco");
      const title = card.querySelector(".card-title").textContent;
      const endereco = card.querySelector(".card-text").innerHTML.replace(/<br\s*\/?>/gi, ", ");
      const iframe = card.querySelector("iframe");
      document.getElementById("modal-mapa-title").textContent = title;
      document.getElementById("modal-mapa-endereco").textContent = endereco;
      document.getElementById("modal-mapa-iframe").src = iframe.src;
      document.getElementById("mapa-modal").classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  document.getElementById("modal-mapa-close").onclick = function () {
    document.getElementById("mapa-modal").classList.remove("active");
    document.getElementById("modal-mapa-iframe").src = "";
    document.body.style.overflow = "auto";
  };

  document.getElementById("mapa-modal").onclick = function (e) {
    if (e.target === this) {
      this.classList.remove("active");
      document.getElementById("modal-mapa-iframe").src = "";
      document.body.style.overflow = "auto";
    }
  };
};
