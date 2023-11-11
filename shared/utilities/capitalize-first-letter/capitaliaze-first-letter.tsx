export const capitalizeFirstLetter = (word: string) => {
  if (typeof word !== 'string' || word.length === 0) {
    return word; // Retourne le mot inchangé si ce n'est pas une chaîne de caractères ou si la longueur est 0
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
};
