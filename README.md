# Climeq — Centro Médico Multidisciplinar

Landing page da Climeq, clínica popular multidisciplinar em Teresópolis — RJ.

## Stack

| Camada       | Escolha                                                      |
| ------------ | ------------------------------------------------------------ |
| Build        | Vite 6                                                       |
| UI           | React 18 + TypeScript (strict)                               |
| Estilos      | Tailwind CSS 3 com tokens próprios da marca                  |
| Componentes  | shadcn/ui (Button, Accordion) sobre Radix UI                 |
| Ícones       | lucide-react                                                 |
| Animação     | CSS + IntersectionObserver (sem dependência de animação)      |

```bash
npm install
npm run dev          # desenvolvimento
npm run build        # build de produção
npm run preview      # servir o build
npm run typecheck    # TypeScript
npm run test:visual  # QA visual e funcional com Playwright (precisa do preview no ar)
```

O QA visual exige o navegador do Playwright uma única vez:
`npx playwright install chromium`.

## Conteúdo: regra de ouro

**Todo o conteúdo factual vive em [`src/data/clinic.ts`](src/data/clinic.ts).**
Os componentes apenas apresentam o que está declarado lá. Cada bloco de dados
carrega um comentário com a fonte de onde foi verificado.

Nada deve ser acrescentado àquele arquivo sem uma fonte verificável. A página
não contém depoimentos, preços, convênios, nomes de profissionais (além da
direção, informada pela própria clínica), CNPJ, registros ou estatísticas que
não tenham sido conferidos.

### Fontes utilizadas (verificação em 13/10/2026)

| Informação                               | Fonte                                                       |
| ---------------------------------------- | ----------------------------------------------------------- |
| Especialidades, direção, histórico, horário | Site institucional vigente da Climeq                      |
| 27 anos de história                      | Descrição oficial do perfil da Climeq no Google             |
| Prêmio IPP 2026 (Pesquisa Cliente Satisfeito) | Instagram da clínica, confirmado pela clínica          |
| Horário seg–sex, 8h–21h                  | Site institucional, confirmado pela clínica                  |
| Nota 4,9 em 338 avaliações               | Painel de conhecimento do Google (perfil público da clínica) |
| Endereço, CEP, telefone, WhatsApp        | Site institucional + perfil do Google                        |
| Especialidades (corroboração)            | Perfil da clínica no Doctoralia                              |

A nota de avaliações aparece como **texto visível com link para a fonte** e
com a data da conferência. Ela **não** é declarada como `aggregateRating` nos
dados estruturados — marcar avaliações de terceiros como se fossem próprias
contraria as diretrizes do Google.

## Identidade visual

A paleta foi **amostrada dos pixels do logo original** (`_assets_raw/climeq-logo.png`):

- **Verde institucional** — anel do logo: `#1C8255`, `#086848`, `#085828`
- **Azul institucional** — cruz do logo: `#0454B1`, `#0848A8`, `#0A70CC`

Esses valores viraram as escalas `verde` e `azul` em
[`tailwind.config.ts`](tailwind.config.ts), com `pedra` como neutro levemente
esverdeado.

**Tipografia:** Fraunces (display, serifada e humana) + Inter (texto e
interface). A escala é fluida, definida em variáveis `--passo-*` em
[`src/index.css`](src/index.css).

**Elemento gráfico recorrente:** a silhueta da serra, derivada do pictograma de
montanha do próprio logo — ver [`src/components/CenaSerra.tsx`](src/components/CenaSerra.tsx)
e o componente `Serra` em [`src/components/Marca.tsx`](src/components/Marca.tsx).
Ela amarra hero, seções escuras e rodapé, e referencia Teresópolis.

## Sobre as imagens

A página **não usa fotografias**. Essa foi uma decisão deliberada:

- Não existem fotos autênticas da clínica disponíveis no repositório.
- O site anterior usava um render genérico de recepção legendado como
  "Interior da Climeq" — ou seja, afirmava ser algo que não era.
- Em vez de inventar uma foto, o visual é construído com a identidade real da
  marca (logo, paleta e a serra).

**Quando houver fotos reais da clínica**, o lugar natural para elas é a seção
`AClimeq` ([`src/components/sections/AClimeq.tsx`](src/components/sections/AClimeq.tsx)),
substituindo o cartão de marcos, e o `figure` do hero
([`src/components/sections/Hero.tsx`](src/components/sections/Hero.tsx)).
Use `loading="lazy"` fora da primeira dobra e `fetchpriority="high"` na imagem
principal do hero.

## Ativos de marca

`scripts/build-assets.mjs` gera `public/brand/*`, o favicon, o ícone de toque e
a imagem de Open Graph a partir do logo original de 1024×1024, recortando o
círculo da marca para obter transparência. Rode `node scripts/build-assets.mjs`
após trocar o arquivo de origem. O logo servido caiu de 864 kB para 12 kB.

## Pendências de confirmação

Itens deliberadamente **não publicados** por falta de confirmação:

1. **Domínio final.** `index.html`, `public/robots.txt` e `public/sitemap.xml`
   apontam para a URL atual em `lovable.app`. Troque nos três arquivos ao
   publicar em domínio próprio.
2. **Política de privacidade.** Não existe página publicada, então o rodapé não
   traz link para uma — nenhuma foi inventada.

## Acessibilidade

- Marcação semântica, um único `<h1>`, hierarquia de headings sem saltos.
- Link "pular para o conteúdo", foco visível em todos os elementos interativos.
- Menu mobile com Radix Dialog (foco preso, fecha com `Escape`).
- Acordeão do FAQ com `aria-expanded` e navegação por teclado.
- Alvos de toque de no mínimo 44 px nos controles principais.
- `prefers-reduced-motion` respeitado: sem animações, a página continua
  completa e legível (a revelação progressiva nunca esconde conteúdo).

O script `npm run test:visual` verifica boa parte disso automaticamente, em
1440, 1280, 768, 390 e 360 px.
