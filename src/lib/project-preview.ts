const SCREENSHOT_WIDTH = 1200;
const SCREENSHOT_HEIGHT = 630;

function getScreenshotUrl(url: string): string {
  return `https://api.microlink.io/?url=${encodeURIComponent(
    url
  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=${SCREENSHOT_WIDTH}&viewport.height=${SCREENSHOT_HEIGHT}`;
}

function getThumIoUrl(url: string): string {
  return `https://image.thum.io/get/width/${SCREENSHOT_WIDTH}/crop/${SCREENSHOT_HEIGHT}/noanimate/${url}`;
}

/**
 * Returns candidate preview image URLs for a project, in priority order.
 *
 * An explicit `image` wins. Otherwise the card screenshots the live project
 * URL. A GitHub repository is not a project preview, so those links return no
 * image. Later entries are fallbacks used when the previous image fails.
 */
export function getProjectPreviewSources(
  href?: string,
  image?: string
): string[] {
  if (image) return [image];

  const target = href?.trim();
  if (!target || !/^https?:\/\//i.test(target)) return [];
  if (/^https?:\/\/(?:www\.)?github\.com\//i.test(target)) return [];

  return [getScreenshotUrl(target), getThumIoUrl(target)];
}
