export type colorsType =
  | "brand-tangerine-accent"
  | "brand-tangerine-subtle"
  | "brand-peach-accent"
  | "brand-peach-subtle"
  | "brand-ivory-accent"
  | "brand-ivory-subtle"
  | "grayscale-black-accent"
  | "grayscale-black-subtle"
  | "grayscale-charcoal-accent"
  | "grayscale-charcoal-subtle"
  | "grayscale-gray-accent"
  | "grayscale-gray-subtle"
  | "grayscale-850"
  | "grayscale-silver-accent"
  | "grayscale-silver-subtle"
  | "grayscale-white-accent"
  | "grayscale-white-with-opacity"
  | "secondary-pacific-blue-accent"
  | "secondary-ok-green-accent"
  | "secondary-ok-green-subtle"
  | "secondary-alert-red-accent"
  | "overlay-20";

export const colors: Record<colorsType, string> = {
  /* Brand colors */
  "brand-tangerine-accent": "#F45800",
  "brand-tangerine-subtle": "#FF7B2E",
  "brand-peach-accent": "#FF8B47",
  "brand-peach-subtle": "#FFA36C",
  "brand-ivory-accent": "#F5E8D9",
  "brand-ivory-subtle": "#F8F3ED",

  /* Grayscale colors */
  "grayscale-black-accent": "#000000",
  "grayscale-black-subtle": "#222222",
  "grayscale-charcoal-accent": "#3F3F3F",
  "grayscale-charcoal-subtle": "#494949",
  "grayscale-gray-accent": "#9B9B9B",
  "grayscale-gray-subtle": "#E9EAEB",
  "grayscale-850": "#3F3F3F",
  "grayscale-silver-accent": "#E3E6EA",
  "grayscale-silver-subtle": "#F2F5F8",
  "grayscale-white-accent": "#FFFFFF",
  "grayscale-white-with-opacity": "#FFFFFF80",

  /* Secondary colors */
  "secondary-pacific-blue-accent": "#359DD9",
  "secondary-ok-green-accent": "#29A76C",
  "secondary-ok-green-subtle": "#E2F9EE",
  "secondary-alert-red-accent": "#E54D4D",

  /* Overlay colors */
  "overlay-20": "rgba(0,0,0,0.2)"
};
