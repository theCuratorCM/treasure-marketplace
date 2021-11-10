export const generateIpfsLink = (hash: string) => {
  const removedIpfs = hash.substring(7);

  return `https://gateway.pinata.cloud/ipfs/${removedIpfs}`;
};

export const formatNumber = (number: number) =>
  new Intl.NumberFormat().format(number);
