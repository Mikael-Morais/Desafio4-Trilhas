window.initCharts = function () {
  const graficoColuna = document.querySelector(".grafico-coluna");
  const graficoPizza = document.querySelector(".grafico-pizza");

  if (graficoColuna && graficoPizza && typeof Chart !== "undefined") {
    new Chart(graficoColuna, {
      type: "bar",
      data: {
        labels: ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3, 7, 8, 6, 4, 10, 11],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    new Chart(graficoPizza, {
      type: "doughnut",
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
            hoverOffset: 4,
          },
        ],
      },
    });
  }
};
