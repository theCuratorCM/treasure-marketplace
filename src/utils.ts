import { formatEther } from "ethers/lib/utils";

export const generateIpfsLink = (hash: string) => {
  const removedIpfs = hash.substring(7);

  return `https://treasure-marketplace.mypinata.cloud/ipfs/${removedIpfs}`;
};

export const formatNumber = (number: number) =>
  new Intl.NumberFormat().format(number);

export const formatPrice = (price: string) =>
  formatNumber(parseFloat(formatEther(price)));
