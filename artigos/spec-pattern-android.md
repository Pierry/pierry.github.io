Specifications Pattern no Android
====================

## Introdução

Considerando que nos dias atuais trabalhamos com "Mobile First", que significa primeiramente imaginar sua aplicação rodando em ambiente móvel, sendo o sistema operacional Android o lider em dispositivos e aceitação, tendemos a imaginar desenvolver iniciamente para esta plataforma. O desenvolvimento, aos olhos de gerentes/empresários com pouco conhecimento técnico ou deslumbrados com notícias sensacionalistas (super aplicativos em tempo recorde), imaginam que a arquitetura do aplicativo pode ser dispensada.
Como é papel do desenvolvedor manter a aplicação, tornando ela escalável, robusta e sólida, também é função deste, aplicar os melhores padrões para ajudar a manter um domínio autossuficiente e concreto.
Specification Pattern é um padrão descrito por Martin Fowler e Eric Evans em 19 páginas, que ajuda a manter a classe capaz de entregar o que é proposto de forma organizada e facilitada.

## Entendendo melhor

Cada entidade do domínio tem suas responsabilidades, e é interessante imaginar que um classe tem que ser capaz de verificar se o que ela "promete" entregar, é válido.
A melhor maneira é criar um método capaz de certificar que certos atributos estão dentro do esperado.
Existem validações complexas, que podem envolver mais de uma classe, que geralmente são criadas em classes diferentes com o sufixo Specification. São inseridos apenas os métodos de validação nela.

## Aplicando no domínio

Exemplo simples de aplicação:
Classe pertence ao domínio:






## Referências

http://martinfowler.com/apsupp/spec.pdf
