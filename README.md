# An NFT API with filtering, sorting, relationships, and full text search with The Graph.

A subgraph for querying NTF data from the WomenRise smart contract, implementing queries for fetching NFTs as well as their owners, building relationships between them, full text search, sorting, and filtering.

# Subgraph

### https://thegraph.com/hosted-service/subgraph/duyilemi/womenrise

![Screenshot (1285)](https://user-images.githubusercontent.com/67197664/168444947-e3933799-e17a-4590-b3e5-50d856d6be2c.png)


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
    skip: 100
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
    text: "'movement celebrating and representing women scientists'"
  ) {
    id
    name
    description
  }
}
```
