const registroForm = document.getElementById("form-registro");
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (registroForm) {
  registroForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const pesoInput = registroForm.querySelector('input[name="peso"]');
    const origemSelect = registroForm.querySelector('select[name="origem"]');
    const checkboxes = registroForm.querySelectorAll('.materiais-container input[type="checkbox"]');

    const peso = parseFloat(pesoInput.value.replace(",", "."));
    const origem = origemSelect.value;

    const usuario_id = usuario.id;
    if (!usuario_id) {
      alert("usuário não autenticado");
      return;
    }

    const materiaisSelecionados = [];
    const materialMap = {
      papel: 1,
      plastico: 2,
      vidro: 3,
      metal: 4,
      organico: 5,
      eletronico: 6,
    };

    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        const classe = checkbox.parentElement.className;
        const id = materialMap[classe];
        if (id) {
          materiaisSelecionados.push(id);
        }
      }
    });

    if (materiaisSelecionados.length === 0) {
      alert("Selecione pelo menos um tipo de material.");
      return;
    }
    if (!peso || peso <= 0 || !origem) {
      alert("Preencha todos os campos obrigatórios corretamente.");
      return;
    }

    const pontos_gerados = Math.round(peso * 10);

    const dados = {
      usuario_id: parseInt(usuario_id),
      origem: origem,
      peso: peso,
      pontos_gerados: pontos_gerados,
      materiais: materiaisSelecionados,
    };

    try {
      const response = await fetch("http://localhost:3000/api/reciclagens/adicionar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const resultado = await response.json();

      if (response.ok) {
        alert("Reciclagem registrada com sucesso!");
        registroForm.reset();
      } else {
        alert("Erro: " + resultado.mensagem);
      }
    } catch (err) {
      console.error("Erro ao enviar dados:", err);
      alert("Erro ao conectar com o servidor.");
    }
  });
}

function mostrarPreviewImagem(input) {
  const preview = document.getElementById("img-preview");
  const uploadLabel = document.getElementById("upload-label");
  preview.innerHTML = "";
  const file = input.files[0];
  if (file && file.type.startsWith("image/")) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.className = "preview-img";
    img.onclick = () => input.click();
    preview.appendChild(img);
    preview.style.display = "block";
    if (uploadLabel) uploadLabel.style.display = "none";
    img.onload = () => URL.revokeObjectURL(img.src);
  } else {
    preview.style.display = "none";
    if (uploadLabel) uploadLabel.style.display = "flex";
  }
}
