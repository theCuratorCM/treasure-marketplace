import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/solid";
import ancientRelic from "../../public/img/gifs/ANCIENT-RELIC.gif";
import bagOfMushrooms from "../../public/img/gifs/Bag-of-Mushrooms.gif";
import beetleWings from "../../public/img/gifs/BEETLE-WINGS.gif";
import bottomlessElixir from "../../public/img/gifs/Bottomless-Elixir.gif";

const sortOptions = [
  { name: "Price: Low to High", href: "#" },
  { name: "Price: High to Low", href: "#" },
];

const products1 = [
  {
    id: 1,
    name: "Ancient Relic",
    href: "#",
    price: "5,000",
    description: "Relic that is old",
    imageSrc: ancientRelic.src,
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 2,
    name: "Bag of Mushrooms",
    href: "#",
    price: "5,000",
    description: "Mushroom in a bag",
    imageSrc: bagOfMushrooms.src,
    imageAlt: "Paper card sitting upright in walnut card holder on desk.",
  },
  {
    id: 3,
    name: "Beetle Wings",
    href: "#",
    price: "500",
    description: "...Beetle wings",
    imageSrc: beetleWings.src,
    imageAlt:
      "Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.",
  },
  {
    id: 4,
    name: "Bottomless Elixir",
    href: "#",
    price: "5,000",
    description: "So much elixir",
    imageSrc: bottomlessElixir.src,
    imageAlt:
      "Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Market() {
  return (
    <main>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="py-24 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
            Treasures
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-base text-gray-500">
            Looks Rare
          </p>
        </div>

        <section
          aria-labelledby="filter-heading"
          className="border-t border-gray-200 pt-6"
        >
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <div className="flex items-center justify-between">
            <div className="relative flex items-stretch flex-grow focus-within:z-10 mr-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                className="focus:ring-red-500 focus:border-red-500 block w-full rounded-md pl-10 sm:text-sm border-gray-300 placeholder-gray-400"
                placeholder="Filter by keyword"
              />
            </div>
            <Menu as="div" className="relative z-10 inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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
                <Menu.Items className="origin-top-left absolute right-0 z-10 mt-2 w-48 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm font-medium text-gray-900"
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </section>

        <section aria-labelledby="products-heading" className="mt-8">
          <h2 id="products-heading" className="sr-only">
            Treasures
          </h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {products1.map((product) => (
              <a key={product.id} href={product.href} className="group">
                <div className="w-full aspect-w-1 aspect-h-1 rounded-sm overflow-hidden sm:aspect-w-3 sm:aspect-h-3">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-fill group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                  <h3>{product.name}</h3>
                  <p>
                    {product.price}{" "}
                    <span className="text-xs font-light">$MAGIC</span>
                  </p>
                </div>
                <p className="mt-1 text-sm italic text-gray-500">
                  {product.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

Market.showSamuraiBg = true;
