import { Listing_OrderBy } from "../../generated/graphql";

import { useRouter } from "next/router";
import { useQuery } from "react-query";

import client from "../lib/client";
import Listings from "../components/Listings";
import { CenterLoadingDots } from "../components/CenterLoadingDots";

const Activity = () => {
  const router = useRouter();
  const { activitySort } = router.query;
  const sortParam = activitySort ?? "time";

  const { data, isLoading } = useQuery(["activity", { sortParam }], () =>
    client.getAllActivities({
      orderBy:
        sortParam === "price"
          ? Listing_OrderBy.PricePerItem
          : Listing_OrderBy.BlockTimestamp,
    })
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden pt-24">
      {isLoading && <CenterLoadingDots className="h-60" />}
      {data?.listings && <Listings listings={data.listings} sort={sortParam} />}
    </div>
  );
};

export default Activity;
