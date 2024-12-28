const starSize = (rating: number): number => {
  const rate: number = (Number.parseFloat(rating.toFixed(1)) / 5) * 100;
  console.log("rate:", rate);

  return rate;
};

export default starSize;
