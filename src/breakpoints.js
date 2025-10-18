const breakpoints = {
    mobile: "480px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1280px",
    wideScreen: "1440px",
};

export const device = {
    mobile: `(max-width: ${breakpoints.mobile})`,
    tablet: `(min-width: 481px) and (max-width: ${breakpoints.tablet})`,
    laptop: `(min-width: 769px) and (max-width: ${breakpoints.laptop})`,
    desktop: `(min-width: 1025px) and (max-width: ${breakpoints.desktop})`,
    wideScreen: `(max-width: ${breakpoints.wideScreen})`,
};
