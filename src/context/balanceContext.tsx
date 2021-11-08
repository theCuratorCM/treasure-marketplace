import * as React from "react";
import { useEthers, useTokenBalance } from "@yuyao17/corefork";
import { Contracts } from "../const";
import { Zero } from "@ethersproject/constants";
import { BigNumber } from "@ethersproject/bignumber";

const BalanceContext = React.createContext<null | BigNumber>(null);

export const BalanceContextProvider = ({ children }) => {
  const { account, chainId } = useEthers();

  const magicBalance =
    useTokenBalance(Contracts[chainId || 4]?.magic, account) || Zero;

  return (
    <BalanceContext.Provider value={magicBalance}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  const balance = React.useContext(BalanceContext);

  if (!balance) {
    throw new Error("useBalance must be used within a BalanceContextProvider");
  }

  return balance;
};
