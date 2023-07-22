const heightConst = 360;

export const dimensions = {
  width: heightConst * 1.25,
  height: heightConst,
};

export const getIsVertical = (width: number, height: number) => {
  return width < height;
};
