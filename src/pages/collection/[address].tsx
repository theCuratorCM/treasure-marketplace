import * as React from "react";
import { useRouter } from "next/router";

const Collection = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <div>
      <h1>Collection</h1>
      <p>{address}</p>
    </div>
  );
};

export default Collection;
