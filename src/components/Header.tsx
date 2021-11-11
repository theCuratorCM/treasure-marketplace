import { useState, Fragment, useEffect } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { useEthers, shortenAddress } from "@yuyao17/corefork";
import { formatEther } from "ethers/lib/utils";
import { formatNumber } from "../utils";
import * as HoverCard from "@radix-ui/react-hover-card";
import { Modal } from "./Modal";
import { Item } from "react-stately";
import { SearchAutocomplete } from "./SearchAutocomplete";
import { useRouter } from "next/router";
import { useMagic } from "../context/magicContext";
import { collections, coreCollections } from "../const";
import classNames from "clsx";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activateBrowserWallet, account } = useEthers();
  const Router = useRouter();
  const { address } = Router.query;
  const { magicBalance, sushiModalOpen, setSushiModalOpen } = useMagic();

  useEffect(() => {
    // Close dialog on sidebar click
    setMobileMenuOpen(false);
  }, [address]);

  return (
    <div>
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setMobileMenuOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white dark:bg-gray-900 shadow-xl flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="py-6 px-4 space-y-6 flex-1">
                {collections.map((page) => (
                  <div key={page.name} className="flow-root">
                    <Link href={`/collection/${page.address}`} passHref>
                      <a className="-m-2 p-2 block font-medium text-gray-900 dark:text-gray-200">
                        {page.name}
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
              {account && (
                <div className="flex-shrink-0 flex flex-col items-center border-t border-gray-200 dark:border-gray-500 p-4">
                  <div className="w-full items-center rounded-lg dark:bg-gray-500 bg-red-500 p-0.5 whitespace-nowrap font-bold select-none pointer-events-auto mx-2 flex-col">
                    <div className="px-2 py-2 text-bold flex items-center justify-center text-xs sm:text-sm">
                      <span className="text-white block">
                        {formatNumber(parseFloat(formatEther(magicBalance)))}
                      </span>{" "}
                      <span className="text-white block ml-2">$MAGIC</span>
                      {/* <HoverCard.Root openDelay={100} closeDelay={100}>
                        <HoverCard.Trigger asChild>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-white inline-block ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </HoverCard.Trigger>
                        <HoverCard.Content
                          align="center"
                          side="bottom"
                          sideOffset={2}
                        >
                          <div className="mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <div>
                                <button
                                  className="text-gray-700 block px-4 py-2 text-sm dark:text-gray-200"
                                  onClick={() => setSushiModalOpen(true)}
                                >
                                  Purchase MAGIC
                                </button>
                              </div>
                            </div>
                          </div>
                        </HoverCard.Content>
                      </HoverCard.Root> */}
                    </div>
                    <div className="flex items-center justify-center px-2 sm:px-3 py-2 rounded-lg dark:bg-gray-800 bg-red-600 text-white text-xs sm:text-sm">
                      {shortenAddress(account)}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSushiModalOpen(true);
                    }}
                    className="text-[0.5rem] block underline place-self-end mt-2 dark:text-gray-300"
                  >
                    Buy more MAGIC &gt;
                  </button>
                </div>
              )}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      <div className="fixed w-full shadow z-10">
        <div className="sticky inset-0 z-10 border-t-4 border-red-500"></div>
        <header className="relative">
          <nav aria-label="Top">
            <div className="bg-white dark:bg-black shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between">
                  <div className="hidden h-full lg:flex lg:items-center">
                    <div className="h-full justify-center space-x-6 mr-6 hidden xl:flex">
                      {collections
                        .filter((collection) =>
                          coreCollections.includes(collection.name)
                        )
                        .map((collection) => {
                          const active = collection.address === address;
                          return (
                            <Link
                              href={`/collection/${collection.address}`}
                              passHref
                              key={collection.name}
                            >
                              <a
                                className={classNames(
                                  "flex items-center text-sm font-medium dark:hover:text-gray-200 hover:text-gray-800",
                                  {
                                    "dark:text-gray-200 text-red-700": active,
                                    "dark:text-gray-500 text-gray-700": !active,
                                  }
                                )}
                              >
                                {collection.name}
                              </a>
                            </Link>
                          );
                        })}
                    </div>
                    <div className="bottom-0 inset-x-0">
                      <SearchAutocomplete
                        label="Search Collection"
                        allowsCustomValue
                        onSelectionChange={(name) => {
                          const targetCollection = collections.find(
                            (collection) => collection.name === name
                          );

                          if (targetCollection) {
                            Router.push(
                              `/collection/${targetCollection.address}`
                            );
                          }
                        }}
                      >
                        {collections.map((collection) => (
                          <Item key={collection.name}>{collection.name}</Item>
                        ))}
                      </SearchAutocomplete>
                    </div>
                  </div>

                  <div className="lg:flex-1 flex items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 bg-white dark:bg-transparent p-2 rounded-md text-gray-400"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex-1 flex items-center justify-end">
                    <div className="flex items-center">
                      {account ? (
                        <div className="w-auto items-center rounded-lg dark:bg-gray-500 bg-red-500 p-0.5 whitespace-nowrap font-bold select-none pointer-events-auto mx-2 hidden sm:flex">
                          <div className="px-2 sm:px-3 py-1 sm:py-2 text-bold flex items-center text-xs sm:text-sm">
                            <span className="text-white block">
                              {formatNumber(
                                parseFloat(formatEther(magicBalance))
                              )}
                            </span>{" "}
                            <span className="text-white block ml-2">
                              $MAGIC
                            </span>
                            <HoverCard.Root openDelay={100} closeDelay={100}>
                              <HoverCard.Trigger asChild>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-white inline-block ml-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </HoverCard.Trigger>
                              <HoverCard.Content
                                align="center"
                                side="bottom"
                                sideOffset={2}
                              >
                                <div className="mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="py-1">
                                    <div>
                                      <button
                                        className="text-gray-700 block px-4 py-2 text-sm dark:text-gray-200"
                                        onClick={() => setSushiModalOpen(true)}
                                      >
                                        Purchase MAGIC
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </HoverCard.Content>
                            </HoverCard.Root>
                          </div>
                          <div className="flex items-center px-2 sm:px-3 py-2 rounded-lg dark:bg-gray-800 bg-red-600 text-white text-xs sm:text-sm">
                            {shortenAddress(account)}
                          </div>
                        </div>
                      ) : (
                        <button
                          className="mx-2 inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-red-300 dark:border-gray-500 rounded text-xs md:text-sm font-bold text-white dark:text-gray-300 bg-red-500 dark:bg-gray-800 hover:bg-red-600 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-gray-700"
                          onClick={() => {
                            activateBrowserWallet((err) => {
                              console.log(err);
                            });
                          }}
                        >
                          Connect Wallet
                        </button>
                      )}

                      <div className="ml-4 flow-root sm:border-l border-gray-200 pl-4 sm:pl-6 text-sm">
                        <Link href="/inventory" passHref>
                          <a className="hover:text-gray-900 text-gray-500 dark:hover:text-gray-200">
                            Inventory
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <Modal
        title="Convert between ETH and MAGIC"
        onClose={() => setSushiModalOpen(false)}
        isOpen={sushiModalOpen}
      >
        <div className="h-[400px] sm:h-[610px] py-4">
          <iframe
            src="https://app.sushi.com/swap?inputCurrency=&outputCurrency=0x539bdE0d7Dbd336b79148AA742883198BBF60342"
            width="100%"
            style={{
              border: 0,
              borderRadius: "10px",
              margin: "0px auto",
              display: "block",
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Header;
