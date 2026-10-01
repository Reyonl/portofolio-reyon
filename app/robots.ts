import type { MetadataRoute } from "next";
import { productionUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(productionUrl ? { sitemap: `${productionUrl}/sitemap.xml` } : {}),
  };
}
