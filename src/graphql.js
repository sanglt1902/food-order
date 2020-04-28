import gql from "graphql-tag";

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $productName: String!
    $categoryId: String!
    $idBreakfast: Boolean!
    $isTodayFood: Boolean!
    $price: Int!
    $description: String
    $image: Upload!
  ) {
    addProduct(
      productName: $productName
      categoryId: $categoryId
      idBreakfast: $idBreakfast
      isTodayFood: $isTodayFood
      price: $price
      description: $description
      image: $image
    )
  }
`;

export const GET_PRODUCTS = gql`
  query products {
    getAllProducts {
      id
      idBreakfast
      isTodayFood
      imageURL
      price
      categoryId
      description
      productName
    }
  }
`;

export const GET_CATEGORIES = gql`
  query categories {
    getAllCategories {
      id
      categoryName
    }
  }
`;
