import { useEffect } from "react";
import { site, seo } from "@/config/site";

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
}

/**
 * Lightweight per-page SEO: sets document title, meta description and
 * canonical link on mount. Crawlers also get the static defaults in index.html.
 */
export function Seo({ title, description, path = "/" }: SeoProps) {
  useEffect(() => {
    document.title = title ?? seo.defaultTitle;

    const desc = description ?? seo.defaultDescription;
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = desc;

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${site.url}${path}`;
  }, [title, description, path]);

  return null;
}
