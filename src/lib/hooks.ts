import * as abis from "./abis";
import { ChainId } from "@yuyao17/corefork";
import { Contract } from "ethers";
import { Contracts } from "../const";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useEthers, useContractFunction } from "@yuyao17/corefork";
import { useMutation, useQueryClient } from "react-query";

/*
function createListing(
  address _nftAddress,
  uint256 _tokenId,
  uint256 _quantity,
  uint256 _pricePerItem,
  uint256 _expirationTime
) external notListed(_nftAddress, _tokenId, _msgSender()) {*/

export function useCreateListing() {
  const { library } = useEthers();
  const queryClient = useQueryClient();

  const sell = useContractFunction(
    new Contract(
      Contracts[ChainId.Rinkeby].marketplace,
      abis.marketplace,
      library
    ),
    "createListing"
  );

  useEffect(() => {
    switch (sell.state.status) {
      case "Exception":
      case "Fail":
        toast.error("Some error occurred");

        console.log("Error", sell.state);

        return;
      case "Success":
        console.log("Success", sell.state);

        queryClient.invalidateQueries("inventory");

        return;
    }
  }, [sell.state]);

  // return useMutation(
  //   async () => {
  //     return "";
  //   },
  //   {
  //     onSuccess: (id) => {
  //       queryClient.setQueriesData("inventory", (state: typeof data) => {
  //         if (state?.user?.tokens) {
  //           return {
  //             ...state,
  //             user: {
  //               ...state.user,
  //               tokens: state.user.tokens.filter((token) => token.id !== id),
  //             },
  //           };
  //         }

  //         return state;
  //       });

  //       // Not sure if this is needed since we are updating data above
  //       queryClient.invalidateQueries("inventory");
  //     },
  //   }
  // );
  return sell
}
