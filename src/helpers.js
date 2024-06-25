function reload() {
  document.location.reload();
}

// Mostrar/ocultar botões

$(".botao-passos").css("display", "none");
$(".botao-testar").css("display", "none");
$(".botao-reiniciar").css("display", "none");

$(".botao-gerar").click(function () {
  setTimeout(function () {
    toggleButtons();
  }, 200);
});

$(".token").on("input", function () {
  toggleButtons();
});

function toggleButtons() {
  if ($(".token").val() != "") {
    // Se o campo .token não estiver vazio, mostra os botões de passos e testar
    $(".botao-passos").css("display", "");
    $(".botao-testar").css("display", "");
    $(".botao-reiniciar").css("display", "");
    $(".botao-gerar").css("display", "none");
  } else {
    // Caso contrário, oculta os botões de passos e testar
    $(".botao-passos").css("display", "none");
    $(".botao-testar").css("display", "none");
    $(".botao-reiniciar").css("display", "");
  }
}
