const SCREENSHOT_WIDTH = 1200;
const SCREENSHOT_HEIGHT = 630;

const GITHUB_REPO_RE =
  /^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/?#]+)/i;

function getGithubOgImage(url: string): string | undefined {
  const match = url.match(GITHUB_REPO_RE);
  if (!match) return undefined;

  const [, owner, repo] = match;
  return `https://opengraph.githubassets.com/HEAD/${owner}/${repo.replace(
    /\.git$/i,
    ''
  )}`;
}

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
 * - An explicit `image` always wins.
 * - GitHub-only projects use GitHub's repository OG card (not a screenshot of
 *   the github.com page), since there is no deployed site to preview.
 * - Projects with a live URL get a rendered screenshot of their front page.
 *
 * Later entries are fallbacks used when the previous image fails to load.
 */
export function getProjectPreviewSources(
  href?: string,
  image?: string
): string[] {
  if (image) return [image];

  const target = href?.trim();
  if (!target || !/^https?:\/\//i.test(target)) return [];

  const githubOgImage = getGithubOgImage(target);
  if (githubOgImage) {
    return [githubOgImage, getScreenshotUrl(target), getThumIoUrl(target)];
  }

  return [getScreenshotUrl(target), getThumIoUrl(target)];
}
