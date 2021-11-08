import * as React from "react";
import { useEthers, useTokenBalance } from "@yuyao17/corefork";
import { Contracts } from "../const";
import { Zero } from "@ethersproject/constants";
import { BigNumber } from "@ethersproject/bignumber";

const BalanceContext = React.createContext<null | {
  magicBalance: BigNumber;
  magicPrice: number;
}>(null);

export const MagicProvider = ({ children }) => {
  const { account, chainId } = useEthers();
  const [price, setPrice] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchMagicPrice = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=magic&vs_currencies=usd"
        );

        const data = await res.json();

        setPrice(data.magic.usd);
      } catch (e) {
        // If we can't fetch the price, just use the previous value
        setPrice((price) => price);
      }
    };

    fetchMagicPrice();

    const interval = setInterval(fetchMagicPrice, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const magicBalance =
    useTokenBalance(Contracts[chainId || 4]?.magic, account) || Zero;

  return (
    <BalanceContext.Provider value={{ magicBalance, magicPrice: price }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useMagic = () => {
  const balance = React.useContext(BalanceContext);

  if (!balance) {
    throw new Error("useMagic must be used within a MagicProvider");
  }

  return balance;
};
