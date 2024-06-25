var click = 0;
var $tabela = $(".tbody-sintatico");

const stack = (element) => `<td class='td-pilha'>${element}</td>`;
const entry = (element) => `<td class='td-entrada'>${element}</td>`;
const action = (element) => `<td class='td-acao'>${element}</td>`;
const tableRow = () => `<tr class='tr-sintatico'></tr>`;

//
//
//
//
//
//

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

$(".botao-testar").click(function () {
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

  $(".botao-reiniciar").css("display", "");
  $(".botao-passos").css("display", "none");
  $(".botao-testar").css("display", "none");
  $(".botao-gerar").css("display", "none");

  //até OK ou Erro
  while (
    $(".td-acao").last().text().split(" ")[0] != "Erro" ||
    $(".td-acao").last().text().split(" ")[0] != "OK"
  ) {
    $(".td-acao").last().text().split(" ")[0] === "Lê"
      ? desempilha()
      : empilha();

    $("html").prop("scrollTop", $("html").prop("scrollHeight"));
  }
});

//
//
//

$(".botao-passos").click(function () {
  click += 1;
  if (click <= 1) {
    $tabela.append(tableRow());
    $(".tr-sintatico").append(stack("$S"));
    $(".tr-sintatico").append(entry($(".token").val() + "$"));

    var cedula = $(".tabela-automato")
      .find(".linha-S")
      .find(".coluna-" + $(".token").val().split("")[0])
      .text();

    $(".tr-sintatico").append(action(cedula));
  } else if ($(".td-acao").last().text().split(" ")[0] === "Lê") {
    desempilha();
  } else empilha();

  $(".botao-testar").css("display", "none");
  $(".botao-gerar").css("display", "none");
  $("html").prop("scrollTop", $("html").prop("scrollHeight"));
});

//
//
//

$(".botao-gerar").click(function () {
  generateRandomAcceptableString();
});

function pathMapping(path) {
  const mapping = {
    s: ["aBc", "bABC"],
    a: ["CA", "bA"],
    b: ["dC", "&"],
    c: ["aB", "cCb"],
  };

  return mapping[path];
}

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
      }

      return generateRandomAcceptableString();
    }
  }
};
