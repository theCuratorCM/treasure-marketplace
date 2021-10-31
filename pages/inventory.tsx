import * as React from "react";
import Image from "next/image";
import DungeonImg from "../public/img/cave.jpeg";
import MarketplaceLogo from "../public/img/treasure-marketplace-logo.png";

const IMGS = [
  {
    src: "/img/1.png",
    type: "Ancient Relic",
  },
  {
    src: "/img/2.png",
    type: "Bottomless Elixir",
  },
  {
    src: "/img/3.png",
    type: "Grin",
  },
  {
    src: "/img/4.png",
    type: "Immovable Stone",
  },
  {
    src: "/img/5.png",
    type: "Castle",
  },
  {
    src: "/img/6.png",
    type: "Bait for Monsters",
  },
  {
    src: "/img/7.png",
    type: "Thread of Divine Silk",
  },
  {
    src: "/img/8.png",
    type: "Ancient Relic",
  },
  {
    src: "/img/9.png",
    type: "Bottomless Elixir",
  },
  {
    src: "/img/10.png",
    type: "Grin",
  },
  {
    src: "/img/11.png",
    type: "Immovable Stone",
  },
  {
    src: "/img/12.png",
    type: "Castle",
  },
  {
    src: "/img/13.png",
    type: "Bait for Monsters",
  },
  {
    src: "/img/14.png",
    type: "Thread of Divine Silk",
  },
  {
    src: "/img/15.png",
    type: "Ancient Relic",
  },
  {
    src: "/img/16.png",
    type: "Bottomless Elixir",
  },
  {
    src: "/img/17.png",
    type: "Grin",
  },
  {
    src: "/img/18.png",
    type: "Immovable Stone",
  },
];

const Inventory = () => {
  const [select, onSelect] = React.useState<typeof IMGS[number]>(null);
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url("${DungeonImg.src}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backgroundBlendMode: "darken",
      }}
    >
      <div className="absolute filter invert left-4 top-4">
        <Image
          src={MarketplaceLogo.src}
          width={MarketplaceLogo.width / 3}
          height={MarketplaceLogo.height / 3}
        />
      </div>

      <div className="max-w-7xl w-full mx-auto flex items-center justify-center min-h-screen">
        <div
          className="p-1 relative flex border-4 border-white"
          style={{
            boxShadow: "12px 12px 2px 1px rgba(255, 255, 255, 0.3)",
          }}
        >
          <div className="p-6 flex-1 bg-brown-600 border-8 border-brown-800 mr-2">
            <div className="grid grid-flow-col auto-cols-min grid-rows-5 gap-3 justify-center">
              {IMGS.map((img) => (
                <div className="border-2 border-brown-300 p-1 bg-brown-700">
                  <button
                    className="aspect-w-1 aspect-h-1 w-24 h-24 border-2 bg-brown-100 relative p-2 shadow-2xl hover:shadow-none"
                    onClick={() => onSelect(img)}
                  >
                    <Image src={img.src} width={96} height={96} />
                    <div className="absolute bottom-0 right-1 text-brown-300 text-sm">
                      2
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-brown-600 w-full flex flex-col border-8 border-brown-800">
            {select ? (
              <div className="flex flex-col h-full w-96 px-6">
                <div className="py-6">
                  <div className="border-2 p-1 bg-brown-800 rounded w-44 m-auto">
                    <div className="border-2 p-6 bg-brown-200 rounded flex justify-center items-center">
                      <Image src={select.src} width={160} height={160} />
                    </div>
                  </div>
                </div>
                <hr className="border-brown-800 border-2" />
                <div className="relative h-full py-6">
                  <div className="space-y-3">
                    <p className="text-brown-50 font-bold text-4xl tracking-wider">
                      {select.type.toUpperCase()}
                    </p>
                    <p className="text-brown-200 font-light text-lg">
                      A castle is a type of fortified structure built during the
                      Middle Ages predominantly by the nobility or royalty and
                      by military orders. Scholars debate the scope of the word
                      castle, but usually consider it to be the private
                      fortified residence of a lord or noble
                    </p>
                  </div>
                  <div className="absolute bottom-6 right-0">
                    <button
                      className="block w-full items-center py-3 px-4 border text-sm leading-4 font-bold rounded-sm hover:bg-brown-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500 tracking-wider shadow-md text-white"
                      // style={{
                      //   textShadow:
                      //     "#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px, #000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px",
                      //   WebkitFontSmoothing: "antialiased",
                      // }}
                    >
                      SELL
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
    // <div className="min-h-screen flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //   <div className="flex flex-wrap flex-grow">
    //     <div className="w-full">
    //       <div className="flex-shrink flex-grow absolute w-9/12 min-h-screen border-2">
    //         <div className="grid grid-cols-4">
    //           {IMGS.map((img) => (
    //             <div className="aspect-w-1 aspect-h-1 w-14 h-14 overflow-hidden flex items-center border-2">
    //               <img src={img.imgSrc} />
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //       <div className="w-3/12 bottom-0 right-0 top-0 fixed border-2">
    //         Test
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Inventory;
