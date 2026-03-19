/**
 * A list of block-based programming languages supported in TeleWarp.
 * @type {Record<string, { name: string, url: string, edit: string }>}
 */

export const languages = {
  tw: {
    name: "TurboWarp",
    url: "https://turbowarp.org",
    edit: "https://turbowarp.org/editor?project_url={url}",
  },
  omniblocks: {
    name: "OmniBlocks",
    url: "https://omniblocks.github.io",
    edit: "https://omniblocks.github.io/editor.html?project_url={url}",
  },
  lk: {
    name: "LibreKitten",
    url: "https://librekitten.org",
    edit: "https://librekitten.org/editor.html?project_url={url}",
  },
};
