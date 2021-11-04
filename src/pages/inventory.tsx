import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid";
import classNames from "clsx";
import { useQuery } from "react-query";
import client from "../../lib/client";
import { useEthers } from "@yuyao17/corefork";
import { AddressZero } from "@ethersproject/constants";
import { GetUserTokensQuery } from "../../generated/graphql";
import { generateIpfsLink } from "../utils";

const date = [
  { id: 1, expireDate: "1 Week" },
  { id: 2, expireDate: "2 Weeks" },
  { id: 3, expireDate: "1 Month" },
  { id: 4, expireDate: "3 Months" },
];

const tabs = [
  { name: "Collected", href: "#", current: true },
  { name: "Listed", href: "#", current: false },
  { name: "Sold", href: "#", current: false },
];

const Inventory = () => {
  const [selectedDate, setSelectedDate] = useState(date[3]);
  const [drawerProps, setDrawerProps] = useState<{
    isOpen: boolean;
    selectedNft: null | {
      name: string;
      source: string;
      collection: string;
      quantity: string;
      tokenId: string;
    };
  }>({
    isOpen: false,
    selectedNft: null,
  });

  const { account } = useEthers();

  const { data } = useQuery(
    "inventory",
    () => client.getUserTokens({ id: account?.toLowerCase() ?? AddressZero }),
    {
      enabled: !!account,
    }
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 flex items-stretch overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="flex-1 text-2xl font-bold text-gray-900">
              Inventory
            </h1>

            <div className="mt-3 sm:mt-2">
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                  defaultValue="Collected"
                >
                  <option>Collected</option>
                  <option>Listed</option>
                  <option>Sold</option>
                </select>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center border-b border-gray-200">
                  <nav
                    className="flex-1 -mb-px flex space-x-6 xl:space-x-8"
                    aria-label="Tabs"
                  >
                    {tabs.map((tab) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        aria-current={tab.current ? "page" : undefined}
                        className={classNames(
                          tab.current
                            ? "border-red-500 text-red-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                          "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                        )}
                      >
                        {tab.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            <section className="mt-8 pb-16">
              <ul
                role="list"
                className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8"
              >
                {data?.user?.tokens.map(
                  (
                    token // TODO: if no tokens, show empty state
                  ) => (
                    <Item
                      key={token.id}
                      data={token}
                      setDrawerProps={setDrawerProps}
                    />
                  )
                )}
              </ul>
            </section>
          </div>
        </main>

        <Transition.Root show={drawerProps.isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 overflow-hidden"
            onClose={() =>
              setDrawerProps((props) => ({
                ...props,
                isOpen: false,
              }))
            }
          >
            <div className="absolute inset-0 overflow-hidden">
              <Dialog.Overlay className="absolute inset-0 bg-gray-300 opacity-60" />

              <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <div className="w-screen max-w-md">
                    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Sell {drawerProps.selectedNft?.name}
                          </Dialog.Title>
                          <div className="ml-3 h-7 flex items-center">
                            <button
                              type="button"
                              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              onClick={() =>
                                setDrawerProps((props) => ({
                                  ...props,
                                  isOpen: false,
                                }))
                              }
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 relative flex-1 px-4 sm:px-6 pb-24">
                        <div className="space-y-6">
                          <div>
                            <div className="block w-full aspect-w-1 aspect-h-1 sm:aspect-w-5 sm:aspect-h-5 rounded-lg overflow-hidden">
                              <img
                                src={drawerProps.selectedNft?.source}
                                alt={drawerProps.selectedNft?.name}
                                className="object-fill object-center"
                              />
                            </div>
                            <div className="mt-4 flex items-start justify-between">
                              <div>
                                <h2 className="text-lg font-medium text-gray-900">
                                  <span className="sr-only">Details for </span>
                                  {drawerProps.selectedNft?.name}
                                </h2>
                                <p className="text-sm font-medium text-gray-500">
                                  {drawerProps.selectedNft?.collection}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <label
                                htmlFor="price"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Price
                              </label>
                              <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                  type="text"
                                  name="price"
                                  id="price"
                                  className="focus:ring-red-500 focus:border-red-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                                  placeholder="0.00"
                                  aria-describedby="price-currency"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                  <span
                                    className="text-gray-500 sm:text-sm"
                                    id="price-currency"
                                  >
                                    MAGIC
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <Listbox
                                value={selectedDate}
                                onChange={setSelectedDate}
                              >
                                <Listbox.Label className="block text-sm font-medium text-gray-700">
                                  Expire Date
                                </Listbox.Label>
                                <div className="mt-1 relative">
                                  <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm">
                                    <span className="block truncate">
                                      {selectedDate.expireDate}
                                    </span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                      <SelectorIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>

                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                      {date.map((person) => (
                                        <Listbox.Option
                                          key={person.id}
                                          className={({ active }) =>
                                            classNames(
                                              active
                                                ? "text-white bg-red-600"
                                                : "text-gray-900",
                                              "cursor-default select-none relative py-2 pl-3 pr-9"
                                            )
                                          }
                                          value={person}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <span
                                                className={classNames(
                                                  selected
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                  "block truncate"
                                                )}
                                              >
                                                {person.expireDate}
                                              </span>

                                              {selected ? (
                                                <span
                                                  className={classNames(
                                                    active
                                                      ? "text-white"
                                                      : "text-red-600",
                                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                                  )}
                                                >
                                                  <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                  />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                            </div>
                            <div>
                              <Listbox
                                value={drawerProps.selectedNft?.quantity}
                                onChange={(e) => {
                                  console.log(e);
                                }}
                              >
                                <Listbox.Label className="block text-sm font-medium text-gray-700">
                                  Quantity
                                </Listbox.Label>
                                <div className="mt-1 relative">
                                  <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm">
                                    <span className="block truncate">
                                      {drawerProps.selectedNft?.quantity}
                                    </span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                      <SelectorIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </Listbox.Button>

                                  <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                      {Array.from({
                                        length:
                                          Number(
                                            drawerProps.selectedNft?.quantity
                                          ) || 0,
                                      }).map((_, idx) => (
                                        <Listbox.Option
                                          key={idx}
                                          className={({ active }) =>
                                            classNames(
                                              active
                                                ? "text-white bg-red-600"
                                                : "text-gray-900",
                                              "cursor-default select-none relative py-2 pl-3 pr-9"
                                            )
                                          }
                                          value={idx + 1}
                                        >
                                          {({ selected, active }) => (
                                            <>
                                              <span
                                                className={classNames(
                                                  selected
                                                    ? "font-semibold"
                                                    : "font-normal",
                                                  "block truncate"
                                                )}
                                              >
                                                {idx + 1}
                                              </span>

                                              {selected ? (
                                                <span
                                                  className={classNames(
                                                    active
                                                      ? "text-white"
                                                      : "text-red-600",
                                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                                  )}
                                                >
                                                  <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                  />
                                                </span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      ))}
                                    </Listbox.Options>
                                  </Transition>
                                </div>
                              </Listbox>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="flex-1 bg-red-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full"
                          >
                            Sell
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
};

const Item = ({
  data,
  setDrawerProps,
}: {
  data: Exclude<GetUserTokensQuery["user"], null | undefined>["tokens"][number];
  setDrawerProps: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      selectedNft: null | {
        name: string;
        source: string;
        collection: string;
        quantity: string;
      };
    }>
  >;
}) => {
  const {
    data: metadata,
    isLoading,
    error,
  } = useQuery<{
    description: string;
    image: string;
    name: string;
  }>(
    ["item", data.id],
    // @ts-expect-error
    async () => await (await fetch(data.metadataUri)).json() // TODO: fix this typescript error
  );

  if (isLoading || !metadata) return <div>Loading..</div>; // TODO: better loading indicator

  return (
    <li key={data.id} className="relative">
      <div className="group block w-full aspect-w-1 aspect-h-1 rounded-sm overflow-hidden sm:aspect-w-3 sm:aspect-h-3 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-red-500">
        <img
          src={generateIpfsLink(metadata.image)}
          alt={metadata.name}
          className="object-fill object-center pointer-events-none group-hover:opacity-80"
        />
        <button
          type="button"
          className="absolute inset-0 focus:outline-none"
          onClick={() =>
            setDrawerProps({
              isOpen: true,
              selectedNft: {
                name: data.name || "",
                source: generateIpfsLink(metadata.image),
                collection: metadata.description,
                quantity: data.quantity,
              },
            })
          }
        >
          <span className="sr-only">View details for {metadata.name}</span>
        </button>
      </div>
      <div className="flex justify-between mt-2">
        <div>
          <p className="block text-sm font-medium text-gray-900 truncate pointer-events-none">
            {data.name}
          </p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">
            {metadata.description}
          </p>
        </div>
        <p className="text-xs font-medium text-gray-500 pointer-events-none">
          {data.quantity}
        </p>
      </div>
    </li>
  );
};

Inventory.showSamuraiBg = false;

export default Inventory;
