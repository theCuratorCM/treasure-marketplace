export const truncateDecimal = (string: string) =>
  string.match(/^-?\d+(?:\.\d{0,2})?/)?.[0];

export const generateIpfsLink = (hash: string) => {
  const removedIpfs = hash.substring(7);

  return `https://gateway.pinata.cloud/ipfs/${removedIpfs}`;
};
