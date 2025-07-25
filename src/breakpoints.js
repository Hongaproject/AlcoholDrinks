const breakpoints = {
    mobileSmall: "375px",
    mobile: "480px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1280px",
    wideScreen: "1440px",
};

export const device = {
    mobileSmall: `(max-width: ${breakpoints.mobileSmall})`,
    mobile: `(max-width: ${breakpoints.mobile})`,
    tablet: `(max-width: ${breakpoints.tablet})`,
    laptop: `(max-width: ${breakpoints.laptop})`,
    desktop: `(max-width: ${breakpoints.desktop})`,
    wideScreen: `(max-width: ${breakpoints.wideScreen})`,
};
