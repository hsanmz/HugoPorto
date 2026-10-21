const SCREENSHOT_WIDTH = 1200;
const SCREENSHOT_HEIGHT = 630;

/**
 * Returns candidate preview image URLs for a project, in priority order.
 *
 * If an explicit `image` is provided it is used as-is. Otherwise the first
 * URL is generated from the project's website/repository URL, so projects
 * only need a link and never an uploaded screenshot. Later entries are
 * fallbacks used when the previous image fails to load.
 */
export function getProjectPreviewSources(
  href?: string,
  image?: string
): string[] {
  if (image) return [image];

  const target = href?.trim();
  if (!target || !/^https?:\/\//i.test(target)) return [];

  return [
    `https://api.microlink.io/?url=${encodeURIComponent(
      target
    )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=${SCREENSHOT_WIDTH}&viewport.height=${SCREENSHOT_HEIGHT}`,
    `https://image.thum.io/get/width/${SCREENSHOT_WIDTH}/crop/${SCREENSHOT_HEIGHT}/noanimate/${target}`,
  ];
}
