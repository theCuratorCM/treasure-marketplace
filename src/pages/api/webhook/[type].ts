import type { NextApiRequest, NextApiResponse } from "next";

import { formatDistanceToNow } from "date-fns";
import { z } from "zod";
import got from "got";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method?.toLowerCase() !== "post") {
    res.status(405);

    return;
  }

  const listWebhook = process.env.LIST_WEBHOOK;
  const soldWebhook = process.env.SOLD_WEBHOOK;

  if (!listWebhook || !soldWebhook) {
    res.status(500);

    return;
  }

  const { type } = z
    .object({ type: z.enum(["list", "sold"]) })
    .parse(req.query);

  const { address, collection, expires, name, price, quantity, user, ...body } =
    z
      .object({
        address: z.string(),
        collection: z.string(),
        expires: z.number().optional(),
        image: z.string(),
        name: z.string(),
        price: z.string(),
        quantity: z.number(),
        user: z.string(),
      })
      .parse(req.body);

  const image = body.image.replace(/ /g, "%20");

  try {
    console.log(
      "embeds.fields",
      [
        {
          name: "Name",
          value: name,
        },
        {
          name: "Collection",
          value: `[${collection}](https://marketplace.treasure.lol/collection/${address})`,
        },
        {
          name: `${type === "list" ? "Listing" : "Sale"} Price`,
          value: `${price} $MAGIC`,
        },
        { name: "Quantity", value: quantity },
        expires
          ? { name: "Expires in", value: formatDistanceToNow(expires) }
          : null,
        {
          name: type === "list" ? "Seller" : "Buyer",
          value: user,
        },
      ].filter(Boolean)
    );

    console.log("embeds", [
      {
        title: type === "list" ? "Item Listed!" : "Item Sold!",
        thumbnail: {
          url: image,
        },
        fields: [],
        footer: {
          text: `${
            type === "list" ? "Listed" : "Sold"
          } on Treasure Marketplace • ${new Date().toLocaleDateString()}`,
          icon_url: "https://marketplace.treasure.lol/favicon-32x32.png",
        },
      },
    ]);

    console.log(
      "stringify(embeds)",
      JSON.stringify(
        [
          {
            title: type === "list" ? "Item Listed!" : "Item Sold!",
            thumbnail: {
              url: image,
            },
            fields: [
              {
                name: "Name",
                value: name,
              },
              {
                name: "Collection",
                value: `[${collection}](https://marketplace.treasure.lol/collection/${address})`,
              },
              {
                name: `${type === "list" ? "Listing" : "Sale"} Price`,
                value: `${price} $MAGIC`,
              },
              { name: "Quantity", value: quantity },
              expires
                ? { name: "Expires in", value: formatDistanceToNow(expires) }
                : null,
              {
                name: type === "list" ? "Seller" : "Buyer",
                value: user,
              },
            ].filter(Boolean),
            footer: {
              text: `${
                type === "list" ? "Listed" : "Sold"
              } on Treasure Marketplace • ${new Date().toLocaleDateString()}`,
              icon_url: "https://marketplace.treasure.lol/favicon-32x32.png",
            },
          },
        ],
        null,
        2
      )
    );

    const response = await got
      .post(type === "list" ? listWebhook : soldWebhook, {
        hooks: {
          beforeError: [
            (error) => {
              console.log("beforeError", error.response);

              return error;
            },
          ],
          beforeRequest: [
            (options) => {
              console.log("json", options.json);
            },
          ],
        },
        json: {
          embeds: [
            {
              title: type === "list" ? "Item Listed!" : "Item Sold!",
              thumbnail: {
                url: encodeURIComponent(image),
              },
              fields: [
                {
                  name: "Name",
                  value: name,
                },
                {
                  name: "Collection",
                  value: `[${collection}](https://marketplace.treasure.lol/collection/${address})`,
                },
                {
                  name: `${type === "list" ? "Listing" : "Sale"} Price`,
                  value: `${price} $MAGIC`,
                },
                { name: "Quantity", value: quantity },
                expires
                  ? { name: "Expires in", value: formatDistanceToNow(expires) }
                  : null,
                {
                  name: type === "list" ? "Seller" : "Buyer",
                  value: user,
                },
              ].filter(Boolean),
              footer: {
                text: `${
                  type === "list" ? "Listed" : "Sold"
                } on Treasure Marketplace • ${new Date().toLocaleDateString()}`,
                icon_url: "https://marketplace.treasure.lol/favicon-32x32.png",
              },
            },
          ],
        },
      })
      .json();

    console.log("response", response);
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
    console.log("error.response", error.response);
  }

  res.status(200).json({ ok: true });
}
