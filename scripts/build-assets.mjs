/**
 * Gera os ativos de marca servidos em /public a partir do logo institucional
 * original (_assets_raw/climeq-logo.png, 1024x1024).
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const ORIGEM = "_assets_raw/climeq-logo.png";
await mkdir("public/brand", { recursive: true });

// O PNG original vem com fundo branco opaco. Recortamos o círculo da marca
// para obter uma versão com transparência utilizável sobre qualquer fundo.
const LADO = 1024;
const mascara = Buffer.from(
  `<svg width="${LADO}" height="${LADO}"><circle cx="512" cy="512" r="470" fill="#fff"/></svg>`,
);

const recortado = await sharp(ORIGEM)
  .resize(LADO, LADO)
  .composite([{ input: mascara, blend: "dest-in" }])
  .png()
  .toBuffer();

for (const tamanho of [192, 512]) {
  await sharp(recortado)
    .resize(tamanho, tamanho)
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(`public/brand/climeq-logo-${tamanho}.png`);
}
await sharp(recortado).resize(512, 512).webp({ quality: 92 }).toFile("public/brand/climeq-logo.webp");
await sharp(recortado).resize(180, 180).png().toFile("public/apple-touch-icon.png");
await sharp(recortado).resize(32, 32).png().toFile("public/favicon.png");

// Imagem de compartilhamento (Open Graph) construída com a identidade da marca.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="f" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#073623"/><stop offset="0.55" stop-color="#0A5235"/><stop offset="1" stop-color="#052F6B"/>
    </linearGradient>
    <linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2A9A63" stop-opacity="0.5"/><stop offset="1" stop-color="#2A9A63" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#f)"/>
  <path d="M0 500 L150 420 L250 462 L400 345 L520 436 L640 332 L760 436 L900 372 L1040 446 L1200 390 L1200 630 L0 630 Z" fill="url(#s)"/>
  <text x="232" y="152" font-family="Helvetica, Arial, sans-serif" font-size="25" font-weight="bold" fill="#FBFCFB" letter-spacing="5">CLIMEQ</text>
  <text x="232" y="190" font-family="Helvetica, Arial, sans-serif" font-size="23" fill="#7FCFA6">Centro Médico Multidisciplinar</text>
  <text x="96" y="372" font-family="Georgia, serif" font-size="66" fill="#FBFCFB" letter-spacing="-1.2">Há 27 anos, cuidando de você</text>
  <text x="96" y="452" font-family="Georgia, serif" font-size="66" fill="#7FCFA6" letter-spacing="-1.2">em Teresópolis.</text>
  <text x="96" y="528" font-family="Helvetica, Arial, sans-serif" font-size="27" fill="#B4E5CC">Teresópolis — RJ · WhatsApp (21) 98986-4137</text>
</svg>`;
await writeFile("public/brand/og.svg", og);
const logoOg = await sharp(recortado).resize(112, 112).toBuffer();
await sharp(Buffer.from(og))
  .composite([{ input: logoOg, top: 76, left: 96 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile("public/brand/og-climeq.jpg");

console.log("ativos de marca gerados");
