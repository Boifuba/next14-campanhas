import "./tutorial.css";
import Image from "next/image";
export default function Tutorial() {
  return (
    <div className="wrapper">
      <h1>Tutorial de como postar</h1>
      <p>
        Primeiro meu muito obrigado, se você está aqui significa que está
        contribuindo para o desenvolvimento desse projeto e espero que juntos
        façamos algo grande capaz de influenciar o universo do RPG.
      </p>
      <h2>Entendendo a tecnologia</h2>
      <p>
        Esse site não é uma rede social onde vc gera um conteúdo e clica em
        botão e o quê você escreveu vai imediatamente para o ar. Aqui é um blog,
        e todo conteúdo deve atender uma série de exigência de qualidade e
        questões técnicas, mas calma! Eu sei que tu talvez não manje disso e
        estamos aqui para ajudar. Vai ter gente que manja de paranauê de design,
        google, TI te ajudandando sempre.
      </p>
      <h2>Enviando o conteúdo</h2>
      <p>
        O conteúdo pode ser enviado por qualquer meio que desejar ou você pode
        usar o editor do site para isso. Quando vc clica em enviar ele não vai
        diretamente para o ar mas sim para a base de dados. Então não se
        preocupe com isso. Entenda que clicando em enviar você não vai ver a
        página renderizada imediatamente ou seja, finalizada como o leitor vai
        ver.
      </p>
      <h3>Imagens</h3>
      <p>
        As imagens de testa ou principal você pode se sentir livre para
        escolher, mas, o editor é quem vai dar a palavra final sobre isso. As
        imagens tem requirementos de formato, tamanho, direitos autorais e
        estética que tem que ser oobservada. Você pode gerar com inteligência
        artificial no formato 16x9 e o resto a gente se vira! Imagens únicas são
        um boost enorme no fator de relevância na busca do Google. Imagens de
        conteúdo dentro do texto podem ser enviadas físicamente ou por url, se
        você estiver usando o editor do site, basta apenas colar e tá tudo
        certo, a formatação de HTML outra pessoa faz pra você.
      </p>
      <h3>Texto</h3>
      <p>
        Eles precisam ser autorais obviamente! Se for uma resenha você não pode
        ter mais de 30% da obra original em quotes. Infelizmente você não pode
        copiar seu texto de outro lugar e colocar aqui ou Google vai colocar as
        duas postagens no limbo. Provocações, clickbaits, títulos
        sensacionalistas ou como quiser chamar são aceitos desde que estejam
        dentro da ética. Isso realmente atrai leitores e é uma boa estratégia
        mas o retorno a longo prazo é ruim. Fazemos isso aqui por hobby e não
        por dinheiro, então não há nenhuma razão para forçar essa barra.
      </p>
      <h3>Código</h3>
      <p>
        Você pode querer enviar um código ou tem algum material formatado que
        pode ser trasnformado em um programa. Você pode enviar o código em JS
        pronto ou o conteúdo e nós implementamos para você dentro nossa
        capacidade.
      </p>
      <p className="quote">
        Aplicações com lógica não poderão rodar dentro de um post por questões
        de escolhas técnicas, será necessário uma página separada para isso.
        <small class="quote--author">&ndash; Boicis Bacon</small>
      </p>
      <h2>Mão na massa!</h2>
      <p>
        Sinta-se livre para falar de RPG, de diferentes sistemas e formas de se
        jogar.
      </p>
      <h3>Escolhendo o título</h3>
      <p>
        Títulos mais buscados são aqueles que contém algum verbo, lembre-se que
        as pessoas usam oo Google como busca. Nãoo é estritamente necessário
        mais isso vai melhorar demais a visualização da sua postagem. <br />
      </p>
      <p>
        <br />
        Exemplos:
        <br />
        Título Ruim: &quot;Ritual Path Magic no GURPS.&quot;
        <br />
        Título Bom: &quot;Como usar o Ritual Path Magic em GURPS&quot;
      </p>
      <p>
        Pense em como você buscaria seu post no Google e sempre terá a melhor
        resposta para a escolha do título.
      </p>
      <h3>Escolhendo o texto introdutório</h3>
      <p>
        Esse é o texto que vai aparecer em todas as descrições dentro do blog e
        no google, ele tem que ser convidativo e que não passe de 60 caracteres
        ou ficará mega esquisito na pesquisa. No exemplo abaixo não se consegue
        ler o texto inteiro e a pessoa não consegue entender a totalidade do
        conteúdo.
      </p>
      <div
        style={{ display: "flex", margin: "20px", justifyContent: "center" }}
      >
        <Image
          style={{ width: "60%" }}
          src="https://lh3.googleusercontent.com/TVLmttPu4rrBc0D8ztCkz1h8rbuetucIEX57_rBNatZ4PSnA6rGj3ZvSxIFO8_riCg7zgbRhgEs0vqdW-DX3l4h8l8TEUY-MkrPjGkSiqa8gs14pQuWdLq1FAhpshmqQnmm7REMnh0nkV_KrQjcfUuxZiBOj-1wVZbDfuIKnpAzwS0_xa5LOqM00-g"
          alt="exemplo"
          width={500}
          height={120}
        />
      </div>
    </div>
  );
}
