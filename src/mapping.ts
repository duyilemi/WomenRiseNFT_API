import {
  Transfer as TransferEvent,
  WRToken as WRTokenContract,
} from "../generated/WRToken/WRToken";

import { WRToken, User } from "../generated/schema";

import { ipfs, json } from "@graphprotocol/graph-ts";

const ipfshash = "Qmcm7hNmHKEmMqHUwLYeMftTzk8fuE4r4xraBJ7YzMazUx";

export function handleTransfer(event: TransferEvent): void {
  let wrtoken = WRToken.load(event.params.tokenId.toString());
  if (!wrtoken) {
    wrtoken = new WRToken(event.params.tokenId.toString());
    wrtoken.tokenID = event.params.tokenId;

    wrtoken.tokenURI = "/" + event.params.tokenId.toString() + ".json";

    let metadata = ipfs.cat(ipfshash + wrtoken.tokenURI);

    if (metadata) {
      const value = json.fromBytes(metadata).toObject();
      if (value) {
        const description = value.get("description");
        const name = value.get("name");
        const image = value.get("image");
        if (description && name && image) {
          wrtoken.name = name.toString();
          wrtoken.description = description.toString();
          wrtoken.image = image.toString();
          wrtoken.ipfsURI = "ipfs.io/ipfs/" + ipfshash + wrtoken.tokenURI;
        }
      }
    }
  }
  wrtoken.updatedAtTimestamp = event.block.timestamp;
  wrtoken.owner = event.params.to.toHexString();
  wrtoken.save();

  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}
