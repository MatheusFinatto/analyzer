function empilha() {
  // Obtém a última sequência da ação
  var ultima_seq = $(".td-acao")
    .last()
    .text()
    .split("> ")[1]
    .split("")
    .reverse()
    .join("");

  var texto_pilha = $(".td-pilha").last().text();

  $tabela.append(tableRow());
  // Verifica se a última sequência é "&" (vazio)
  if ($(".td-acao").last().text().split("> ")[1] === "&") {
    $(".tr-sintatico")
      .last()
      .append(stack(texto_pilha.substr(0, texto_pilha.length - 1)));
    $(".tr-sintatico")
      .last()
      .append(entry($(".td-entrada").last().text()));
  } else {
    $(".tr-sintatico")
      .last()
      .append(
        stack(texto_pilha.substr(0, texto_pilha.length - 1) + ultima_seq)
      );
    $(".tr-sintatico")
      .last()
      .append(entry($(".td-entrada").last().text()));
  }

  var texto_entrada = $(".td-entrada").last().text();

  compare(
    $(".td-pilha").last().text().split("").pop(),
    texto_entrada.split("")[0]
  );
}

function desempilha() {
  var texto_pilha = $(".td-pilha").last().text();

  $tabela.append(tableRow());

  // Remove primeiro caracter da pilha
  $(".tr-sintatico")
    .last()
    .append(stack(texto_pilha.substr(0, texto_pilha.length - 1)));

  // Remove primeiro ultimo caracter da entrada
  $(".tr-sintatico")
    .last()
    .append(entry($(".td-entrada").last().text().substr(1)));

  var texto_entrada = $(".td-entrada").last().text();
  // Compara o último caractere da pilha com o primeiro da entrada
  compare(
    $(".td-pilha").last().text().split("").pop(),
    texto_entrada.split("")[0]
  );
}

function compare(linha, coluna) {
  // Ajusta valores especiais
  if (coluna == "$") {
    coluna = "s";
  }
  if (linha == "$") {
    linha = "k";
  }

  if (linha === "k" && coluna === "s") {
    $(".botao-reiniciar").css("display", "");
    $(".botao-passos").css("display", "none");

    return $(".tr-sintatico")
      .last()
      .append(
        action(
          "OK em " + $(".tbody-sintatico").find("tr").length + " iterações"
        )
      );
  } else if (coluna === linha) {
    var ultima_letra_pilha = $(".td-pilha").last().text().split("").pop();

    $(".tr-sintatico")
      .last()
      .append(action("Lê " + ultima_letra_pilha));
  } else {
    var cedula = $(".tabela-automato")
      .find(".linha-" + linha)
      .find(".coluna-" + coluna)
      .text();
    if (cedula != "") {
      return $(".tr-sintatico").last().append(action(cedula));
    } else {
      $(".botao-reiniciar").css("display", "");
      $(".botao-passos").css("display", "none");

      return $(".tr-sintatico")
        .last()
        .append(
          action(
            "Erro em " + $(".tbody-sintatico").find("tr").length + " iterações"
          )
        );
    }
  }
}
