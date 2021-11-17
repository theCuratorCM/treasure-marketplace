// TODO: will manually run this on local machine until I get more quota approval
import { GoogleSpreadsheet } from "google-spreadsheet";
import { formatPrice } from "../../utils";

const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_ACCOUNT_EMAIL as string,
      private_key: (process.env.GOOGLE_PRIVATE_KEY as string).replace(
        /\\n/gm,
        "\n"
      ),
    });

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];

    const getLatestTime = sheet.title;

    const query = `
      query getActivity($time: String!) {
        listings(
          where: { status: Sold, blockTimestamp_gt: $time }
          orderBy: blockTimestamp
          orderDirection: asc
        ) {
          blockTimestamp
          buyer {
            id
          }
          id
          pricePerItem
          quantity
          seller: user {
            id
          }
          token {
            metadata {
              description
              image
            }
            name
          }
          transactionLink
          collection {
            creator {
              name
              fee
            }
          }
        }
      }
    `;

    const { data } = await fetch(
      "https://api.thegraph.com/subgraphs/name/wyze/treasure-marketplace",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: { time: getLatestTime } }),
      }
    ).then((res) => res.json());

    const listings = data.listings;

    for (let i = 0; i < listings.length; i++) {
      const listing = listings[i];

      const row = {
        BlockTimestamp: listing.blockTimestamp,
        Buyer: listing.buyer.id,
        Seller: listing.seller.id,
        PricePerItem: formatPrice(listing.pricePerItem),
        Quantity: listing.quantity,
        "Token Name": listing.token.name,
        "Token Collection": listing.token.metadata.description,
        TransactionLink: listing.transactionLink,
        Creator: listing.collection.creator.name,
      };

      await sheet.addRow(row);
    }

    if (listings.length > 0) {
      await sheet.updateProperties({
        title: listings[listings.length - 1].blockTimestamp,
      });
    }

    res.status(200);
    res.json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: e.message });
  }
};
