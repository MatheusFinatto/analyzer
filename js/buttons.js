$(".botao-reiniciar").click(function () {
  $(".token").val("");
  $(".tbody-sintatico").html("");
  $(".botao-gerar").css("display", "");
  $(".botao-reiniciar").css("display", "none");
  click = 0;
});

//
//
//

const stack = (element) => `<td class='td-pilha'>${element}</td>`;
const entry = (element) => `<td class='td-entrada'>${element}</td>`;
const action = (element) => `<td class='td-acao'>${element}</td>`;
const tableRow = () => `<tr class='tr-sintatico'></tr>`;

$(".botao-testar").click(function () {
  // Adiciona uma linha na tabela de passos sintáticos
  $tabela.append(tableRow());
  // Adiciona informações de pilha inicial e entrada na linha sintática
  $(".tr-sintatico").append(stack("$S"));
  $(".tr-sintatico").append(entry($(".token").val() + "$"));
  // Obtém a célula na tabela de autômato para a entrada atual
  var cedula = $(".tabela-automato")
    .find(".linha-S")
    .find(".coluna-" + $(".token").val().split("")[0])
    .text();
  // Adiciona a ação correspondente na linha sintática
  $(".tr-sintatico").append(action(cedula));
  // Mostra o botão "Reiniciar"
  $(".botao-reiniciar").css("display", "");
  // Oculta os botões de passos e testar após clicar em "Testar"
  $(".botao-passos").css("display", "none");
  $(".botao-testar").css("display", "none");
  $(".botao-gerar").css("display", "none");

  // Loop para continuar o processo até encontrar "Erro" ou "OK"
  while (
    $(".td-acao").last().text().split(" ")[0] != "Erro" ||
    $(".td-acao").last().text().split(" ")[0] != "OK"
  ) {
    if ($(".td-acao").last().text().split(" ")[0] === "Lê") {
      // Se a ação for "Lê", desempilha
      popFromStack();
    } else {
      // Caso contrário, empilha
      empilha();
    }
    // Move a rolagem da página para o final
    $("html").prop("scrollTop", $("html").prop("scrollHeight"));
  }
});

//
//
//

var click = 0;
var $tabela = $(".tbody-sintatico");

$(".botao-passos").click(function () {
  click += 1;
  if (click <= 1) {
    $tabela.append(tableRow());
    $(".tr-sintatico").append(stack("$S"));
    $(".tr-sintatico").append(entry($(".token").val() + "$"));
    // Obtém a célula na tabela de autômato para a entrada atual
    var cedula = $(".tabela-automato")
      .find(".linha-S")
      .find(".coluna-" + $(".token").val().split("")[0])
      .text();
    // Adiciona a ação correspondente na linha sintática
    $(".tr-sintatico").append(action(cedula));
  } else if ($(".td-acao").last().text().split(" ")[0] === "Lê") {
    // Caso a última ação seja "Lê", desempilha
    popFromStack();
  } else empilha();

  $(".botao-testar").css("display", "none");
  $(".botao-gerar").css("display", "none");
  $("html").prop("scrollTop", $("html").prop("scrollHeight"));
});

//
//
//

// Gera tokens com base na gramática definida
function generateTokens(token) {
  if (token === "") {
    token =
      pathMapping("s")[Math.floor(Math.random() * pathMapping("s").length)];
  } else {
    token = token;
  }
  token = token.split("");
  var novo_token = [];
  token.forEach(function (e) {
    if (e === e.toUpperCase()) {
      var letra = pathMapping(e.toLowerCase());
      e = letra[Math.floor(Math.random() * letra.length)];
    }
    if (e != "&") {
      novo_token.push(e);
      token = novo_token.join("");
    }
  });
  return token;
}

// Armazena tokens gerados para evitar repetição
const alreadyGeneratedTokens = {};

// Gera uma sequência aleatória de tokens válidos
const generateRandomAcceptableString = () => {
  const maxSize = 20;
  let token = generateTokens("");
  token = token.split("");
  while (true) {
    token = generateTokens(token.join("")).split("");
    let isWrong = false;
    token.forEach(function (e) {
      if (e === e.toUpperCase()) {
        isWrong = true;
      }
    });
    if (isWrong) {
      if (token.length > maxSize) {
        return generateRandomAcceptableString();
      }

      generateTokens(token.join(""));
    } else {
      token = token.join("");

      if (!alreadyGeneratedTokens[token]) {
        $(".token").val(token);
        alreadyGeneratedTokens[token] = true;
        return token;
        break;
      }

      return generateRandomAcceptableString();
    }
  }
};

// Evento de clique no botão "Gerar" para iniciar a geração de tokens
$(".botao-gerar").click(function () {
  generateRandomAcceptableString();
});
