async function salvaPontos(usuario_pontos) {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  
  const usuario_id = usuario.id;
  const usuario_senha = usuario.senha;
  const pontos_antigos = usuario.pontos;
  usuario_pontos += pontos_antigos;
  usuario.pontos = usuario_pontos;

  try {
    await fetch("http://localhost:3000/api/usuarios/pontos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ usuario_id, usuario_senha, usuario_pontos })
    });
  } catch (error) {
  }
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  alert(`Pontos atualizados: ${usuario_pontos} pontos`);
}


window.initAdmin = async function () {
  const ul = document.querySelector(".registro-lista");
  const nome = document.getElementById("info-nome");
  const data = document.getElementById("info-data");
  const id = document.getElementById("info-id");
  const material = document.getElementById("info-material");
  const peso = document.getElementById("info-peso");
  const origem = document.getElementById("info-origem");

  try {
    const response = await fetch("http://localhost:3000/api/admin/admregistro");
    const reciclagens = await response.json();

    reciclagens.forEach(rec => {
      const li = document.createElement("li");

      // Transforma array de materiais em uma string (ex: "Plástico, Papel")
      const nomesMateriais = Array.isArray(rec.materiais) && rec.materiais.length > 0
        ? rec.materiais.map(m => m.nome).join(", ")
        : "Material não informado";

      // Definindo atributos personalizados
      li.setAttribute("data-id", rec.recicl_id); // atenção: era rec.id
      li.setAttribute("data-nome", rec.nome_usuario || "Usuário Desconhecido");
      li.setAttribute("data-data", new Date(rec.data_reciclagem).toLocaleDateString());
      li.setAttribute("data-material", nomesMateriais);
      li.setAttribute("data-peso", `${rec.peso || "0"}kg`);
      li.setAttribute("data-origem", rec.origem || "Origem não especificada");

      // Texto do item
      li.textContent = `Usuário: ${rec.nome_usuario} ; Identificador: 000${rec.usuario_id} - (Reciclagem: 00${rec.recicl_id}) - ${rec.origem} em ${new Date(rec.data_reciclagem).toLocaleDateString()}`;

      // Evento de clique para exibir os dados no painel lateral
      li.addEventListener("click", () => {
        nome.textContent = li.getAttribute("data-nome");
        data.textContent = li.getAttribute("data-data");
        id.textContent = li.getAttribute("data-id");
        material.textContent = li.getAttribute("data-material");
        peso.textContent = li.getAttribute("data-peso");
        origem.textContent = li.getAttribute("data-origem");
      });

      // Adiciona o item à lista
      ul.appendChild(li);
    });
  } catch (err) {
    console.error("Erro ao buscar reciclagens:", err);
  }

  const aceitarBtn = document.querySelector(".botao-aceitar");

  aceitarBtn.addEventListener("click", async () => {    
    const idReciclagem = document.getElementById("info-id").textContent;

    if (!idReciclagem) {
      alert("Nenhuma reciclagem selecionada.");
      return;
    }

    try {
      await fetch("http://localhost:3000/api/admin/verificar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: idReciclagem })
      });

      const pesoReal = peso.textContent.replace('kg', '');
      salvaPontos(Math.round(parseFloat(pesoReal)*20));

    } catch (error) {
      console.error("Erro ao verificar reciclagem:", error);
      alert("Erro ao conectar ao servidor.");
    }
  });
};
