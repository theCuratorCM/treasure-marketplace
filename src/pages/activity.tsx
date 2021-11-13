import { SearchAutocomplete } from "../components/SearchAutocomplete";
import { ChevronDownIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Listing_OrderBy } from "../../generated/graphql";
import { Menu, Transition } from "@headlessui/react";
import { formatDistanceToNow } from "date-fns";
import { formatPrice, generateIpfsLink } from "../utils";
import { shortenAddress } from "@yuyao17/corefork";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Image from "next/image";
import QueryLink from "../components/QueryLink";
import classNames from "clsx";
import client from "../lib/client";

const sortOptions = [
  { name: "Highest Price", value: "price" },
  { name: "Latest", value: "time" },
];

const Activity = () => {
  const router = useRouter();
  const { sort } = router.query;
  const sortParam = sort ?? "time";

  const { data } = useQuery(["activity", { sortParam }], () =>
    client.getActivity({
      orderBy:
        sortParam === "price"
          ? Listing_OrderBy.PricePerItem
          : Listing_OrderBy.BlockTimestamp,
    })
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden pt-24">
      <div className="flex-1 flex items-stretch overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="flex justify-between text-2xl font-bold text-gray-900 dark:text-gray-200">
              Activity
              <section aria-labelledby="filter-heading">
                <h2 id="filter-heading" className="sr-only">
                  Product filters
                </h2>

                <div className="flex items-center">
                  {/* <div className="mr-2 w-full">
                    <SearchAutocomplete
                      label="Search Item"
                      placeholder="Search Name..."
                      onSelectionChange={(name) => {
                        if (name != null) {
                          setSearchParams(name as string);
                        }
                      }}
                    >
                      {Object.keys(listingsWithoutDuplicates).map((listing) => (
                        <Item key={listing}>{listing}</Item>
                      ))}
                    </SearchAutocomplete>
                  </div> */}
                  <Menu
                    as="div"
                    className="relative z-20 inline-block text-left"
                  >
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-200">
                        Sort
                        <ChevronDownIcon
                          className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-100"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-left absolute right-0 z-10 mt-2 w-48 rounded-md shadow-2xl bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => {
                            const active = option.value === sortParam;
                            return (
                              <Menu.Item key={option.name}>
                                <QueryLink
                                  href={{
                                    pathname: router.pathname,
                                    query: {
                                      ...router.query,
                                      sort: option.value,
                                    },
                                  }}
                                  // passHref
                                  className={classNames(
                                    "block px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-500",
                                    {
                                      "text-red-500 dark:text-gray-100": active,
                                    }
                                  )}
                                >
                                  <span>{option.name}</span>
                                </QueryLink>
                              </Menu.Item>
                            );
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </section>
            </h1>

            <div className="mt-4">
              {/* <SearchAutocomplete
        placeholder="Search Token..."
        onSelectionChange={(key) => {
          if (!key) {
            setList(listingsWithoutDuplicates);
            return;
          }
          const targetCollection = { [key]: lists[key] };

          setList(targetCollection);
        }}
      >
        {Object.keys(listingsWithoutDuplicates).map((key) => (
          <Item key={key}>{key}</Item>
        ))}
      </SearchAutocomplete> */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-500 sticky top-0">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Price ($MAGIC)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      From
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      To
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.listings.map((listing, index) => {
                    return (
                      <tr
                        key={listing.id}
                        className={
                          index % 2 === 0
                            ? "bg-white dark:bg-gray-200"
                            : "bg-gray-50 dark:bg-gray-300"
                        }
                      >
                        <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-700">
                          <Image
                            alt={listing.token.name ?? ""}
                            height={48}
                            src={
                              listing.token.metadata?.image?.includes("ipfs")
                                ? generateIpfsLink(listing.token.metadata.image)
                                : listing.token.metadata?.image ?? ""
                            }
                            width={48}
                          />
                          <div className="pl-2">
                            <p className="text-gray-500 dark:text-gray-400 font-thin tracking-wide uppercase text-[0.5rem]">
                              {listing.token.metadata?.description}
                            </p>
                            <p className="text-xs text-gray-800 dark:text-gray-700 font-semibold truncate">
                              {listing.token.name}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-700">
                          {formatPrice(listing.pricePerItem)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-700">
                          {listing.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-700">
                          {shortenAddress(listing.seller.id)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-700">
                          {shortenAddress(listing.buyer?.id ?? "")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 dark:text-gray-700">
                          <a
                            className="flex flex-1 items-center"
                            href={listing.transactionLink ?? ""}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {formatDistanceToNow(
                              new Date(Number(listing.blockTimestamp) * 1000),
                              { addSuffix: true }
                            )}
                            <ExternalLinkIcon className="h-5 pl-2" />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Activity;
