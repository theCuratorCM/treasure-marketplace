import { useState, Fragment } from "react";
import { MenuIcon, CollectionIcon, XIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { useEthers, shortenAddress, useTokenBalance } from "@yuyao17/corefork";
import { Zero } from "@ethersproject/constants";
import { formatEther } from "ethers/lib/utils";
import { Contracts } from "../const";
import { truncateDecimal } from "../utils";

const navigation = {
  pages: [
    { name: "Legions", href: "#" },
    { name: "Smol Brains", href: "#" },
    { name: "Getting Bodied", href: "#" },
    { name: "Treasures", href: "#" },
    { name: "Life", href: "#" },
  ],
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activateBrowserWallet, account, chainId } = useEthers();

  const magicBalance = formatEther(
    useTokenBalance(Contracts[chainId || 4]?.magic, account) || Zero
  );

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
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
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

              <div className="py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a
                      href={page.href}
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-16 flex items-center justify-between">
                <div className="hidden h-full lg:flex">
                  <div className="px-4 bottom-0 inset-x-0">
                    <div className="h-full flex justify-center space-x-8">
                      {navigation.pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          {page.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:flex-1 flex items-center lg:hidden">
                  <button
                    type="button"
                    className="-ml-2 bg-white p-2 rounded-md text-gray-400"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex-1 flex items-center justify-end">
                  <div className="flex items-center">
                    {account && (
                      <div className="px-3 py-2 sm:px-4 sm:py-2 rounded-md text-xs md:text-sm bg-red-100">
                        <span className="text-red-500">
                          {truncateDecimal(magicBalance)}
                        </span>{" "}
                        <span className="text-red-800">MAGIC</span>
                      </div>
                    )}
                    <button
                      className="ml-4 inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-500 rounded text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-gray-700"
                      onClick={() => {
                        if (!account) {
                          activateBrowserWallet((err) => {
                            console.log(err);
                          });
                        }
                      }}
                    >
                      {account ? shortenAddress(account) : "Connect"}
                    </button>
                    <div className="ml-4 flow-root">
                      <Link href="/inventory" passHref>
                        <a className="group -m-2 px-4 flex items-center">
                          <CollectionIcon
                            className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="sr-only">View Inventory</span>
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
  );
};

export default Header;
