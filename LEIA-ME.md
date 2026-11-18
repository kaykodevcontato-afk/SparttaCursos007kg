# Spartta Cursos — Prévia comercial (Dev.Kayko)

Landing page estática para GitHub Pages. Projeto com HTML, CSS, JavaScript e imagens locais.

## Arquivos

- `index.html` — estrutura e conteúdo da página.
- `style.css` — layout, cores, responsividade e galeria.
- `script.js` — menu, formulário do WhatsApp, galeria e botão flutuante.
- `preview-access.js` — controla a prévia de **24 horas por navegador** e o redirecionamento.
- `assets/` — logo e imagens usadas no site.

## Como publicar

Envie **todos** os arquivos e a pasta `assets/` para a raiz do repositório que publica o site no GitHub Pages. Preserve os nomes dos arquivos. Não é necessário instalar dependências.

## Editar o acesso temporário

Abra `preview-access.js` e altere as opções em `PREVIEW`:

```js
const PREVIEW = Object.freeze({
  enabled: true, // false: desativa o prazo e deixa o site livre
  durationHours: 24, // horas da prévia por navegador
  redirectUrl: 'https://kaykodevcontato-afk.github.io/OrcamentoKG/',
  storageKey: 'devkayko_spartta_preview_start_v1',
});
```

O prazo começa **no primeiro acesso daquele navegador** após a publicação e segue contando mesmo que a aba seja fechada. O prazo não fica visível na página. Se o visitante deixar a página aberta, ela também é redirecionada ao vencer o prazo.

**Limitação essencial:** o contador usa `localStorage`. Não controla o mesmo prazo para todos os visitantes, nem impede acesso após limpeza do armazenamento, troca de navegador/dispositivo ou desativação de JavaScript. O código continua acessível por download, mesmo depois do prazo. Para um prazo **global e confiável**, configure uma verificação no servidor, por exemplo com Cloudflare Worker e uma data de expiração fixa.

## Testar o vencimento

Para testar com rapidez, altere temporariamente `durationHours` para `0.001` (3,6 segundos). Para reiniciar o teste no navegador atual, troque o valor de `storageKey` para uma chave nova. Depois, volte para `24` antes de publicar.

## Links e contatos

- Inscrição e informações: WhatsApp +55 (81) 9.8709-4694.
- Instagram da escola: https://www.instagram.com/sparttacursoscaruaru/?hl=pt-br
- Instagram do desenvolvedor: https://www.instagram.com/dev_okyak/?hl=pt-br

## Galeria

As fotos em **Preparação em Foco** exibem o mesmo fundo em grade do painel de mapa. Clique nas fotos para ampliar; feche clicando fora, no `×` ou pressionando `Esc`.
