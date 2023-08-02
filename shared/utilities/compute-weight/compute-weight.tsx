const computeWeight = (unitWeight: string, weight: number) => {
  if (unitWeight === 'G') {
    return String(weight).length > 3 ? `${weight / 1000} Kg` : `${weight} Gr`;
  } else {
    return String(weight).length > 2 ? `${weight / 100} L` : `${weight} Cl`;
  }
};

export default computeWeight;
