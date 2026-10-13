/**
 * QA visual e funcional da landing page.
 *
 * Abre a página em cinco larguras reais, captura screenshots, e verifica:
 * rolagem horizontal, erros de console, falhas de rede, alvos de toque,
 * destinos de links, menu mobile, âncoras e acordeão.
 *
 * Uso: node scripts/visual-qa.mjs [url]
 */
import { chromium, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const URL_BASE = process.argv[2] ?? "http://localhost:4173/";
const SAIDA = "qa-screenshots";

const VIEWPORTS = [
  { nome: "desktop-1440", largura: 1440, altura: 900, movel: false },
  { nome: "notebook-1280", largura: 1280, altura: 800, movel: false },
  { nome: "tablet-768", largura: 768, altura: 1024, movel: true },
  { nome: "celular-390", largura: 390, altura: 844, movel: true },
  { nome: "celular-360", largura: 360, altura: 740, movel: true },
];

const SECOES = [
  "#inicio",
  "#a-climeq",
  "#especialidades",
  "#avaliacoes",
  "#localizacao",
  "#duvidas",
];

const problemas = [];
const registrar = (viewport, tipo, detalhe) => {
  problemas.push({ viewport, tipo, detalhe });
  console.log(`  [!] ${tipo}: ${detalhe}`);
};

await mkdir(SAIDA, { recursive: true });
// Usa o Chromium do Playwright; se indisponível, o Chrome instalado no sistema.
const navegador = await chromium
  .launch()
  .catch(() => chromium.launch({ channel: "chrome" }));

for (const vp of VIEWPORTS) {
  console.log(`\n=== ${vp.nome} (${vp.largura}x${vp.altura}) ===`);

  const contexto = await navegador.newContext({
    viewport: { width: vp.largura, height: vp.altura },
    deviceScaleFactor: 2,
    locale: "pt-BR",
    ...(vp.movel ? { ...devices["Pixel 5"], viewport: { width: vp.largura, height: vp.altura } } : {}),
  });
  const pagina = await contexto.newPage();

  pagina.on("console", (msg) => {
    if (msg.type() === "error") registrar(vp.nome, "console", msg.text().slice(0, 240));
  });
  pagina.on("pageerror", (e) => registrar(vp.nome, "pageerror", String(e).slice(0, 240)));
  pagina.on("requestfailed", (req) => {
    const motivo = req.failure()?.errorText ?? "";
    // Requisições externas bloqueadas pelo ambiente de teste não são defeito da página.
    if (/fonts\.g/.test(req.url())) return;
    registrar(vp.nome, "rede", `${req.url().slice(0, 120)} (${motivo})`);
  });
  pagina.on("response", (res) => {
    if (res.status() >= 400 && new URL(res.url()).origin === new URL(URL_BASE).origin) {
      registrar(vp.nome, "http", `${res.status()} em ${res.url()}`);
    }
  });

  await pagina.goto(URL_BASE, { waitUntil: "networkidle" });
  await pagina.waitForTimeout(400);

  // --- rolagem horizontal ---
  const overflow = await pagina.evaluate(() => {
    const doc = document.documentElement;
    const excesso = doc.scrollWidth - doc.clientWidth;
    if (excesso <= 1) return { excesso, culpados: [] };
    const culpados = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      if (r.right > doc.clientWidth + 1 || r.left < -1) {
        culpados.push(
          `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} [${Math.round(r.left)}..${Math.round(r.right)}]`,
        );
      }
      if (culpados.length > 5) break;
    }
    return { excesso, culpados };
  });
  if (overflow.excesso > 1) {
    registrar(vp.nome, "overflow-x", `${overflow.excesso}px — ${overflow.culpados.join(" | ")}`);
  }

  // --- alvos de toque (mínimo recomendado pela WCAG 2.2: 24x24) ---
  if (vp.movel) {
    const pequenos = await pagina.evaluate(() => {
      const fora = [];
      for (const el of document.querySelectorAll("a[href], button")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (getComputedStyle(el).display === "inline") continue;
        if (el.classList.contains("sr-only")) continue; // skip-link: só aparece com foco
        if (r.width < 24 || r.height < 24) {
          fora.push(`${el.tagName.toLowerCase()} "${(el.textContent || "").trim().slice(0, 28)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
        }
      }
      return fora;
    });
    for (const alvo of pequenos) registrar(vp.nome, "alvo-toque", alvo);
  }

  // --- destinos dos links ---
  const links = await pagina.evaluate(() =>
    [...document.querySelectorAll("a[href]")].map((a) => ({
      href: a.getAttribute("href"),
      texto: (a.textContent || "").trim().slice(0, 40),
      alvo: a.getAttribute("target"),
      rel: a.getAttribute("rel"),
      rotulo: a.getAttribute("aria-label"),
    })),
  );
  for (const link of links) {
    const href = link.href ?? "";
    if (href === "#" || href === "") registrar(vp.nome, "link-vazio", link.texto);
    if (href.startsWith("https://wa.me/") && !href.includes("5521989864137")) {
      registrar(vp.nome, "whatsapp", `número inesperado: ${href}`);
    }
    if (link.alvo === "_blank" && !(link.rel || "").includes("noopener")) {
      registrar(vp.nome, "rel-noopener", href);
    }
    if (!link.texto && !link.rotulo) registrar(vp.nome, "link-sem-nome", href);
  }
  const temWhats = links.some((l) => (l.href ?? "").startsWith("https://wa.me/5521989864137"));
  const temTel = links.some((l) => (l.href ?? "").startsWith("tel:+5521"));
  if (!temWhats) registrar(vp.nome, "cta", "nenhum link de WhatsApp encontrado");
  if (!temTel) registrar(vp.nome, "cta", "nenhum link de telefone encontrado");

  // --- âncoras existem ---
  for (const ancora of SECOES) {
    const existe = await pagina.locator(ancora).count();
    if (existe === 0) registrar(vp.nome, "ancora", `${ancora} não existe no documento`);
  }

  // --- hierarquia de headings ---
  const headings = await pagina.evaluate(() =>
    [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => Number(h.tagName[1])),
  );
  const h1 = headings.filter((n) => n === 1).length;
  if (h1 !== 1) registrar(vp.nome, "headings", `esperado exatamente 1 <h1>, encontrado ${h1}`);
  for (let i = 1; i < headings.length; i++) {
    if (headings[i] - headings[i - 1] > 1) {
      registrar(vp.nome, "headings", `salto h${headings[i - 1]} -> h${headings[i]}`);
      break;
    }
  }

  // --- screenshots por seção ---
  await pagina.screenshot({ path: `${SAIDA}/${vp.nome}-00-dobra.png` });
  for (const [i, ancora] of SECOES.entries()) {
    const alvo = pagina.locator(ancora).first();
    if ((await alvo.count()) === 0) continue;
    await alvo.scrollIntoViewIfNeeded();
    await pagina.waitForTimeout(650);
    await pagina.screenshot({
      path: `${SAIDA}/${vp.nome}-${String(i + 1).padStart(2, "0")}${ancora.replace("#", "-")}.png`,
    });
  }
  await pagina.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pagina.waitForTimeout(650);
  await pagina.screenshot({ path: `${SAIDA}/${vp.nome}-99-rodape.png` });

  // Checada após rolar a página inteira, para que imagens com lazy-load já tenham carregado.
  const imagensQuebradas = await pagina.evaluate(() =>
    [...document.images]
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src),
  );
  for (const src of imagensQuebradas) registrar(vp.nome, "imagem", src);


  // --- interação: menu mobile ---
  if (vp.largura < 1024) {
    await pagina.evaluate(() => window.scrollTo(0, 0));
    const abrir = pagina.getByRole("button", { name: /abrir menu/i });
    if ((await abrir.count()) === 0) {
      registrar(vp.nome, "menu", "botão de abrir o menu não encontrado");
    } else {
      await abrir.click();
      await pagina.waitForTimeout(450);
      const dialogo = pagina.getByRole("dialog");
      if (!(await dialogo.isVisible())) registrar(vp.nome, "menu", "o menu não abriu");
      await pagina.screenshot({ path: `${SAIDA}/${vp.nome}-menu-aberto.png` });

      const excessoMenu = await pagina.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      if (excessoMenu > 1) registrar(vp.nome, "overflow-x", `menu aberto: ${excessoMenu}px`);

      await pagina.keyboard.press("Escape");
      await pagina.waitForTimeout(350);
      if (await pagina.getByRole("dialog").count()) {
        registrar(vp.nome, "menu", "o menu não fecha com Escape");
      }
    }
  }

  // --- interação: filtro de especialidades ---
  const aba = pagina.getByRole("button", { name: /^Equipe multidisciplinar$/i });
  if ((await aba.count()) === 0) {
    registrar(vp.nome, "filtro", "botão de grupo não encontrado");
  } else {
    await aba.scrollIntoViewIfNeeded();
    await aba.click();
    await pagina.waitForTimeout(500);
    const cartoes = await pagina.locator("#especialidades article").count();
    if (cartoes !== 3) registrar(vp.nome, "filtro", `esperado 3 cartões, obtido ${cartoes}`);
    await pagina.screenshot({ path: `${SAIDA}/${vp.nome}-filtro.png` });
    await pagina.getByRole("button", { name: /^Todas$/ }).click();
    await pagina.waitForTimeout(350);
  }

  // --- interação: acordeão ---
  const gatilho = pagina.getByRole("button", { name: /onde fica a climeq/i });
  if ((await gatilho.count()) === 0) {
    registrar(vp.nome, "faq", "pergunta do FAQ não encontrada");
  } else {
    await gatilho.scrollIntoViewIfNeeded();
    await gatilho.click();
    await pagina.waitForTimeout(500);
    if ((await gatilho.getAttribute("aria-expanded")) !== "true") {
      registrar(vp.nome, "faq", "o acordeão não expandiu");
    }
    await pagina.screenshot({ path: `${SAIDA}/${vp.nome}-faq-aberto.png` });
  }

  // --- interação: mapa sob demanda ---
  const botaoMapa = pagina.getByRole("button", { name: /carregar o mapa/i });
  if ((await botaoMapa.count()) === 0) {
    registrar(vp.nome, "mapa", "botão de carregar o mapa não encontrado");
  } else {
    await botaoMapa.scrollIntoViewIfNeeded();
    await botaoMapa.click();
    await pagina.waitForTimeout(1600);
    if ((await pagina.locator("#localizacao iframe").count()) === 0) {
      registrar(vp.nome, "mapa", "o iframe do mapa não foi inserido");
    }
    await pagina.screenshot({ path: `${SAIDA}/${vp.nome}-mapa.png` });
  }

  // --- foco visível por teclado ---
  await pagina.reload({ waitUntil: "networkidle" });
  await pagina.keyboard.press("Tab");
  const focado = await pagina.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const estilo = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      texto: (el.textContent || "").trim().slice(0, 40),
      contorno: estilo.outlineStyle !== "none" && parseFloat(estilo.outlineWidth) > 0,
    };
  });
  if (!focado) registrar(vp.nome, "foco", "Tab não moveu o foco para nenhum elemento");
  else if (!focado.contorno) registrar(vp.nome, "foco", `sem contorno visível em <${focado.tag}>`);

  await contexto.close();
}

await navegador.close();

console.log("\n==================== RESUMO ====================");
if (problemas.length === 0) {
  console.log("Nenhum problema encontrado.");
} else {
  const porTipo = problemas.reduce((acc, p) => {
    (acc[p.tipo] ??= []).push(`${p.viewport}: ${p.detalhe}`);
    return acc;
  }, {});
  for (const [tipo, lista] of Object.entries(porTipo)) {
    console.log(`\n## ${tipo} (${lista.length})`);
    for (const linha of [...new Set(lista)]) console.log(`   - ${linha}`);
  }
}
console.log(`\nScreenshots em ./${SAIDA}`);
process.exitCode = problemas.length > 0 ? 1 : 0;
