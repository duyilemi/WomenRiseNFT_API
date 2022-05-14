# An NFT API with filtering, sorting, relationships, and full text search with The Graph.

A subgraph for querying NTF data from the WomenRise smart contract, implementing queries for fetching NFTs as well as their owners, building relationships between them, full text search, sorting, and filtering.

## Querying for data

### Run the following query to get a list of tokens and their metadata:

```
{
  wrtokens(first: 3) {
    id
    tokenID
    tokenURI
    ipfsURI
    image
    description
  }
  
}
```
### We can also configure the order direction:

```
{
  wrtokens(first: 3
    orderDirection: desc
    orderBy: updatedAtTimestamp
  ) {
    id
    tokenID
    tokenURI
    ipfsURI
    image
    description
  }
  
}
```

### Or choose to skip forward a certain number of results to implement some basic pagination:

```
{
  wrtokens(
    # skip: 100
    orderDirection:desc
    orderBy: updatedAtTimestamp
  ) {
    id
    tokenID
    tokenURI
    ipfsURI
    image
    description
  }
  
}

```

### query with filtering:

```
{
  wrtokens(where: {
    description_contains: "coders"
  }) {
    id
    tokenID
    tokenURI
    ipfsURI
    image
    description
  }
  
}
```

### And full text search

```
{
  wrtSearch(
    text: "'CRUSH PEARLS IN YOUR FISTS'"
  ) {
    id
    name
    description
  }
}
```
