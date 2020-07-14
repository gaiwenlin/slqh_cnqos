export default (value) => {
  const text = parseFloat(value * 100).toPrecision(4);
  return text + '%';
};
