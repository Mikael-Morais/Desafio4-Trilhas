(function () {
  // Elementos DOM
  const searchInput = document.getElementById("item-search");
  const categoryTitles = document.querySelectorAll(".category-title");
  const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
  const historyList = document.getElementById("history-list");
  const clearHistoryBtn = document.getElementById("clear-history");
  const pointsValue = document.querySelector(".points-value");
  const detailsModal = document.getElementById("details-modal");
  const modalClose = document.getElementById("modal-close");
  const modalCancel = document.getElementById("modal-cancel");
  const modalExchange = document.getElementById("modal-exchange");

  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  pointsValue.textContent = usuario.pontos


  // Dados
  const historyItems = [
    {
      id: 1,
      name: "Conta de Energia (15%)",
      date: "20/05/2023",
      points: 750,
      icon: "bolt",
      category: "energy",
    },
    {
      id: 2,
      name: "Transporte Público",
      date: "18/05/2023",
      points: 500,
      icon: "bus",
      category: "transport",
    },
  ];

  let currentItem = null;

  // Funções principais
  function filterItems() {
    const activeFilters = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id.replace("filter-", ""));

    document.querySelectorAll(".item-card").forEach((item) => {
      const categories = item.dataset.categories.split(" ");
      item.style.display = activeFilters.some((filter) => categories.includes(filter)) ? "flex" : "none";
    });
  }

  function renderHistory() {
    historyList.innerHTML =
      historyItems.length === 0
        ? '<div class="empty-history">Nenhuma troca realizada</div>'
        : historyItems
            .map(
              (item) => `
                <div class="history-item">
                    <div class="history-item-icon">
                        <i class="fas fa-${item.icon}"></i>
                    </div>
                    <div class="history-item-content">
                        <div class="history-item-name">${item.name}</div>
                        <div class="history-item-details">
                            <span class="history-item-date">${item.date}</span>
                            <span class="history-item-points">-${item.points} pontos</span>
                        </div>
                    </div>
                </div>
            `
            )
            .join("");
  }

  function updatePoints(change) {
    pointsValue.textContent = parseInt(pointsValue.textContent) + change;
  }

  function openDetailsModal(item) {
    currentItem = item;
    const categoryMap = {
      energy: "Energia",
      water: "Água",
      transport: "Transporte",
      food: "Alimentação",
    };

    document.getElementById("modal-item-title").textContent = item.querySelector(".item-name").textContent;
    document.getElementById("modal-item-description").textContent = item.querySelector(".item-description").textContent;
    document.getElementById("modal-item-points").textContent = item.querySelector(".item-price").textContent;
    document.getElementById("modal-item-image").src = item.querySelector(".item-image").src;
    document.getElementById("modal-item-category").textContent = categoryMap[item.dataset.categories.split(" ")[0]] || "Outros";

    detailsModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    detailsModal.classList.remove("active");
    document.body.style.overflow = "auto";
    currentItem = null;
  }

  // Event Listeners
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const term = this.value.toLowerCase();
      document.querySelectorAll(".item-card").forEach((item) => {
        const text =
          item.querySelector(".item-name").textContent.toLowerCase() + item.querySelector(".item-description").textContent.toLowerCase();
        item.style.display = text.includes(term) ? "flex" : "none";
      });
    });
  }

  categoryTitles.forEach((title) => {
    title.addEventListener("click", function () {
      this.classList.toggle("collapsed");
      this.nextElementSibling.classList.toggle("collapsed");
    });
  });

  checkboxes.forEach((checkbox) => checkbox.addEventListener("change", filterItems));

  clearHistoryBtn.addEventListener("click", () => {
    if (confirm("Limpar todo o histórico?")) {
      historyItems.length = 0;
      renderHistory();
    }
  });

  document.querySelectorAll(".details-button").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      openDetailsModal(this.closest(".item-card"));
    });
  });

  modalClose.addEventListener("click", closeModal);
  modalCancel.addEventListener("click", closeModal);
  detailsModal.addEventListener("click", (e) => e.target === detailsModal && closeModal());

  modalExchange.addEventListener("click", function () {
    if (!currentItem) return;
    const itemPrice = parseInt(currentItem.querySelector(".item-price").textContent);
    const currentPoints = parseInt(pointsValue.textContent);

    if (currentPoints >= itemPrice) {
      historyItems.unshift({
        id: Date.now(),
        name: currentItem.querySelector(".item-name").textContent,
        date: new Date().toLocaleDateString("pt-BR"),
        points: itemPrice,
        icon: currentItem.dataset.categories.includes("energy")
          ? "bolt"
          : currentItem.dataset.categories.includes("transport")
          ? "bus"
          : currentItem.dataset.categories.includes("food")
          ? "utensils"
          : "gift",
        category: currentItem.dataset.categories.split(" ")[0],
      });
      updatePoints(-itemPrice);
      renderHistory();
      closeModal();
    } else {
      alert("Pontos insuficientes");
    }
  });

  // Inicialização
  renderHistory();
})();
