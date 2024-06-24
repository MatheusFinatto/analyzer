//const action = (element) => `<td class='td-acao'>${element}</td>`;

// Mapeamento de caminhos na gramática
function pathMapping(path) {
  const mapping = {
    s: ["aBc", "bABC"],
    a: ["CA", "bA"],
    b: ["dC", "&"],
    c: ["aB", "cCb"],
  };

  return mapping[path];
}

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

  // Verifica se a última sequência é "&" (vazio)
  if ($(".td-acao").last().text().split("> ")[1] === "&") {
    $tabela.append(tableRow());
    $(".tr-sintatico")
      .last()
      .append(stack(texto_pilha.substr(0, texto_pilha.length - 1)));
    $(".tr-sintatico")
      .last()
      .append(entry($(".td-entrada").last().text()));
  } else {
    $tabela.append(tableRow());
    $(".tr-sintatico")
      .last()
      .append(
        stack(texto_pilha.substr(0, texto_pilha.length - 1) + ultima_seq)
      );
    $(".tr-sintatico")
      .last()
      .append(entry($(".td-entrada").last().text()));
  }

  // Obtém o texto atual da entrada
  var texto_entrada = $(".td-entrada").last().text();
  // Compara o último caractere da pilha com o primeiro da entrada
  compare(
    $(".td-pilha").last().text().split("").pop(),
    texto_entrada.split("")[0]
  );
}

// Função para comparar a pilha com a entrada atual
function compare(linha, coluna) {
  // Ajusta valores especiais
  if (coluna == "$") {
    coluna = "s";
  }
  if (linha == "$") {
    linha = "k";
  }

  // Verifica ação baseada na comparação da célula da tabela de autômato
  if (linha === "k" && coluna === "s") {
    // Caso seja "OK", exibe mensagem de sucesso
    $(".botao-reiniciar").css("display", "");
    $(".botao-passos").css("display", "none");
    // Adiciona o token correto na caixa de texto
    $(".tokens-corretos").val(
      $(".tokens-corretos").val() + " " + $(".token").val()
    );
    return $(".tr-sintatico")
      .last()
      .append(
        action(
          "OK em " + $(".tbody-sintatico").find("tr").length + " iterações"
        )
      );
  } else if (coluna === linha) {
    // Caso haja correspondência, realiza ação de "Lê"
    var ultima_letra_pilha = $(".td-pilha").last().text().split("").pop();
    var primeira_letra_entrada = $(".td-entrada").last().text().split("")[0];

    $(".tr-sintatico")
      .last()
      .append(action("Lê " + ultima_letra_pilha));
  } else {
    // Caso contrário, busca ação na tabela de autômato ou exibe erro
    var cedula = $(".tabela-automato")
      .find(".linha-" + linha)
      .find(".coluna-" + coluna)
      .text();
    if (cedula != "") {
      return $(".tr-sintatico").last().append(action(cedula));
    } else {
      $(".botao-reiniciar").css("display", "");
      $(".botao-passos").css("display", "none");
      // Adiciona o token incorreto na caixa de texto
      $(".tokens-incorretos").val(
        $(".tokens-incorretos").val() + " " + $(".token").val()
      );
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

// Função para realizar a ação de desempilhar na simulação sintática
function popFromStack() {
  // Obtém o texto atual da pilha
  var texto_pilha = $(".td-pilha").last().text();
  // Adiciona uma linha na tabela de passos sintáticos
  $tabela.append(tableRow());
  // Adiciona a pilha atualizada na linha sintática
  $(".tr-sintatico")
    .last()
    .append(stack(texto_pilha.substr(0, texto_pilha.length - 1)));
  // Atualiza a entrada na linha sintática (removendo o primeiro caractere)
  $(".tr-sintatico")
    .last()
    .append(entry($(".td-entrada").last().text().substr(1)));

  // Obtém o texto atual da entrada
  var texto_entrada = $(".td-entrada").last().text();
  // Compara o último caractere da pilha com o primeiro da entrada
  compare(
    $(".td-pilha").last().text().split("").pop(),
    texto_entrada.split("")[0]
  );
}
