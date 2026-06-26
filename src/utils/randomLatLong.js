export const getRandomCoordinates = () => {
  const latitude = (Math.random() * 180 - 90).toFixed(4);   // -90 to +90
  const longitude = (Math.random() * 360 - 180).toFixed(4); // -180 to +180

  return {
    latitude,
    longitude,
    precision: `± ${Math.floor(Math.random() * 10 + 1)}m`, // 1m – 10m
  };
};
