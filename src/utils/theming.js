const getThemeColor = (target, prefix = "layout") => {
  const color = getComputedStyle(document.documentElement).getPropertyValue(
    `--${prefix}-${target}-color`
  );

  return color.trim();
};

export default getThemeColor;
