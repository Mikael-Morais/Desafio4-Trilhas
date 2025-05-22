// Primeira função lá pro coluna
function montarGraficoColunas(reciclagens) {
  const reciclagensIDS = [];
  const reciclagensPorMes = {};
  reciclagens.forEach(r => {
    if (!reciclagensIDS.includes(r.id)) {
      reciclagensIDS.push(r.id)
      const data = new Date(r.data_reciclagem);
      const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`;
      reciclagensPorMes[mesAno] = (reciclagensPorMes[mesAno] || 0) + 1;
    }
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
        backgroundColor: '#59a098'
      }]
    }
  });
}

function montarGraficoPizza(reciclagens) {
  // Contar a quantidade de cada material
  const materiaisContagem = {};

  reciclagens.forEach(r => {
    if (r.material_nome) {
      materiaisContagem[r.material_nome] = (materiaisContagem[r.material_nome] || 0) + 1;
    }
  });

  // Calcular o total de registros
  const total = Object.values(materiaisContagem).reduce((acc, val) => acc + val, 0);

  // Calcular porcentagem para cada material
  const labelsPizza = Object.keys(materiaisContagem);
  const dadosPizza = labelsPizza.map(material => {
    const contagem = materiaisContagem[material];
    return ((contagem / total) * 100).toFixed(2); // porcentagem com 2 casas
  });

  new Chart(document.querySelector(".grafico-pizza"), {
    type: 'pie',
    data: {
      labels: labelsPizza.map((label, i) => `${label} (${dadosPizza[i]}%)`),
      datasets: [{
        data: dadosPizza,
        backgroundColor: ['#9AEF30', '#0B6549', '#AD6CF1', '#8AB8ED', '#0B4DD1', '#325638']
      }]
    }
  });
}


function preencherTabela(reciclagens) {
  const tbody = document.querySelector("#tabelaReciclagens tbody");
  tbody.innerHTML = ""; // Limpar conteúdo anterior

  // Agrupar por ID de reciclagem
  const reciclagensAgrupadas = {};

  reciclagens.forEach(r => {
    const id = r.id;

    if (!reciclagensAgrupadas[id]) {
      reciclagensAgrupadas[id] = {
        data: new Date(r.data_reciclagem).toLocaleDateString(),
        origem: r.origem,
        peso: r.peso,
        pontos: r.pontos_gerados,
        materiais: [r.material_nome]
      };
    } else {
      reciclagensAgrupadas[id].materiais.push(r.material_nome);
    }
  });

  // Montar a tabela com uma linha por reciclagem
  Object.values(reciclagensAgrupadas).forEach(rec => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${rec.data}</td>
      <td>${rec.origem}</td>
      <td>${rec.peso}</td>
      <td>${rec.pontos}</td>
      <td>${rec.materiais.join(", ")}</td>
    `;
    tbody.appendChild(row);
  });
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
