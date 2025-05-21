// Primeira função lá pro coluna
function montarGraficoColunas(reciclagens) {
  const reciclagensPorMes = {};
  reciclagens.forEach(r => {
    const data = new Date(r.data_reciclagem);
    const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`;
    reciclagensPorMes[mesAno] = (reciclagensPorMes[mesAno] || 0) + 1;
  });

  const labels = Object.keys(reciclagensPorMes);
  const dados = Object.values(reciclagensPorMes);

  new Chart(document.querySelector(".grafico-coluna"), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Reciclagens por mês',
        data: dados,
        backgroundColor: '#48007d'
      }]
    }
  });
}

function montarGraficoPizza(reciclagens) {
}

function preencherTabela(reciclagens) {
}


window.initCharts = async function () {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  const usuario_id = usuario.id;

  const response = await fetch(`http://localhost:3000/api/reciclagens?usuario_id=${usuario_id}`);
  const reciclagens = await response.json();

  montarGraficoColunas(reciclagens);
  montarGraficoPizza(reciclagens);
  preencherTabela(reciclagens);
};
