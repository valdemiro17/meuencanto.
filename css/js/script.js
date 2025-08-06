document.getElementById("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const frase = document.getElementById("frase").value;
  const imagem = document.getElementById("imagem").files[0];
  const youtube = document.getElementById("youtube").value;

  let imagemUrl = "";

  if (imagem) {
    const reader = new FileReader();
    reader.onload = function () {
      imagemUrl = reader.result;
      gerarQRCode(nome, frase, imagemUrl, youtube);
    };
    reader.readAsDataURL(imagem);
  } else {
    gerarQRCode(nome, frase, "", youtube);
  }
});

function gerarQRCode(nome, frase, img, yt) {
  const fraseParam = encodeURIComponent(frase);
  const imgParam = encodeURIComponent(img);
  const ytParam = encodeURIComponent(yt);
  const nomeParam = encodeURIComponent(nome);

  const url = `${window.location.origin}/espaco.html?nome=${nomeParam}&frase=${fraseParam}&img=${imgParam}&yt=${ytParam}`;

  const qrDiv = document.getElementById("qrcode");
  qrDiv.innerHTML = "";
  const imgQr = document.createElement("img");
  imgQr.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=200x200`;
  imgQr.alt = "QR Code gerado";
  qrDiv.appendChild(imgQr);
}
