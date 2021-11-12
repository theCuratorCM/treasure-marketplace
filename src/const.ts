import { ChainId } from "@yuyao17/corefork";

export const Contracts = {
  [ChainId.Rinkeby]: {
    magic: "0xFd25767f710966F8a557b236a3CaeF8F92Eb7C10",
    marketplace: "0xeadbc40f5176Fd6eAb8E63cDF55b9caBa216E682",
  },
  [ChainId.Arbitrum]: {
    magic: "0x539bdE0d7Dbd336b79148AA742883198BBF60342",
    marketplace: "0x134569A78306A0F239deaF8890d0f6DDd457Bd06",
  },
};

export const coreCollections = ["Legions", "Treasures"]; // TODO: Add smol brains later

export const collections = {
  [ChainId.Rinkeby]: [
    { name: "Legions", address: "0x6Fd12312f70fa5b04d66584600f39aBE31A99708" },
    {
      name: "Legions Genesis",
      address: "0xAC2F8732A67C15Bf81f8A6181364cE753E915037",
    },
    {
      name: "Smol Brains",
      address: "0xd72e14b8bcc89742b3f366ea80d175c3c4205b1d",
    },
    // { name: "Getting Bodied", address: "#" },
    {
      name: "Treasures",
      address: "0x61B468f85B2e50bAA0B1729ffC99eFe9EF0428f0",
    },
    {
      name: "Keys",
      address: "0x25EE208B4F8636B5cEaAfdee051bf0BFE514f5f6",
    },
    {
      name: "Extra Life",
      address: "0x5e6ae51147d1eC18EdCCAe516A59fb0A26a0b48F",
    },
    {
      name: "Seed of Life",
      address: "0x6A67fbf40142E3Db2e6a950A4D48B0EB41107cE8",
    },
    // { name: "Life", address: "#" },
  ],
  [ChainId.Arbitrum]: [
    { name: "Legions", address: "0x658365026D06F00965B5bb570727100E821e6508" },
    {
      name: "Legions Genesis",
      address: "0xE83c0200E93Cb1496054e387BDdaE590C07f0194",
    },
    // {
    //   name: "Smol Brains",
    //   address: "0xd72e14b8bcc89742b3f366ea80d175c3c4205b1d",
    // },
    // { name: "Getting Bodied", address: "#" },
    {
      name: "Treasures",
      address: "0xEBba467eCB6b21239178033189CeAE27CA12EaDf",
    },
    {
      name: "Keys",
      address: "0xf0a35bA261ECE4FC12870e5B7b9E7790202EF9B5",
    },
    {
      name: "Extra Life",
      address: "0x21e1969884D477afD2Afd4Ad668864a0EebD644c",
    },
    {
      name: "Seed of Life",
      address: "0x3956C81A51FeAed98d7A678d53F44b9166c8ed66",
    },
    // { name: "Life", address: "#" },
  ],
};

export const DAO_SHARE = 0.025;
export const CREATOR_SHARE = 0.025;
export const USER_SHARE = 1 - DAO_SHARE - CREATOR_SHARE;
