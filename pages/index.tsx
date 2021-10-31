import Head from "next/head";
import Image from "next/image";

import logoImg from "../public/img/logotransparent.png";

export default function Home() {
  return (
    <main className="flex justify-center items-center w-full min-h-screen landing">
      <div className="flex relative">
        <div
          className="z-10"
          style={{
            flexBasis: "70%",
          }}
        >
          <img src={logoImg.src} className="dark:filter dark:invert" />
          <p
            className="text-right font-semibold tracking-wider mt-2 text-lg"
            // style={{
            //   textShadow: "1px 3px 7px rgba(150, 150, 150, 1)",
            // }}
          >
            MARKETPLACE
          </p>
        </div>
        <div className="absolute right-0 -top-72 z-0 overflow-hidden">
          <div className="maskImage">
            <div className="grid grid-cols-6 grid-rows-3 gap-12">
              {Array.from({ length: 18 }).map((_, i) => (
                <div className="border-2 shadow-md rounded-md px-3  border-gray-300 bg-white flex flex-col items-center justify-center">
                  <div className="aspect-w-1 aspect-h-1 overflow-hidden flex items-center">
                    <img src={`/img/${i + 1}.png`} />
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm">Name</p>
                    <p className="text-gray-400 text-xs">Description</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-2">
        <div>
          <img src={logoImg.src} className="dark:filter dark:invert" />
          <p
            className="text-right font-semibold tracking-wider mt-2 text-lg"
            // style={{
            //   textShadow: "1px 3px 7px rgba(150, 150, 150, 1)",
            // }}
          >
            MARKETPLACE
          </p>
        </div>
        <div className="grid grid-cols-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div className="aspect-w-1 aspect-h-1 rounded-full w-20 h-20 overflow-hidden flex items-center">
              <img src={`/img/${i + 1}.png`} alt={name} />
            </div>
          ))}
        </div>
      </div> */}
    </main>
  );
}
