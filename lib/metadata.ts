import * as cheerio from "cheerio";

export type ExtractedMetadata = {
  sourceUrl: string;
  domain: string;
  title: string;
  summary: string;
  thumbnailUrl: string | null;
  faviconUrl: string | null;
};

function resolveUrl(candidate: string | undefined, baseUrl: string) {
  if (!candidate) {
    return null;
  }

  try {
    return new URL(candidate, baseUrl).toString();
  } catch {
    return null;
  }
}

function textOrNull(value?: string | null) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

export async function fetchMetadata(inputUrl: string): Promise<ExtractedMetadata> {
  const response = await fetch(inputUrl, {
    headers: {
      "user-agent": "PortfolioCardBot/0.1"
    },
    signal: AbortSignal.timeout(8000),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Metadata fetch failed with ${response.status}.`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  const url = new URL(inputUrl);
  const domain = url.hostname.replace(/^www\./, "");

  const ogTitle = $('meta[property="og:title"]').attr("content");
  const pageTitle = $("title").text();
  const ogDescription = $('meta[property="og:description"]').attr("content");
  const metaDescription = $('meta[name="description"]').attr("content");
  const ogImage = $('meta[property="og:image"]').attr("content");
  const iconHref =
    $('link[rel="icon"]').attr("href") ||
    $('link[rel="shortcut icon"]').attr("href") ||
    $('link[rel="apple-touch-icon"]').attr("href");

  return {
    sourceUrl: inputUrl,
    domain,
    title: textOrNull(ogTitle) || textOrNull(pageTitle) || domain,
    summary:
      textOrNull(ogDescription) ||
      textOrNull(metaDescription) ||
      "No description available.",
    thumbnailUrl: resolveUrl(ogImage, inputUrl),
    faviconUrl: resolveUrl(iconHref, inputUrl)
  };
}
