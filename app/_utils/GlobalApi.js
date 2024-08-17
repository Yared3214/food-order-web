import { request, gql } from 'graphql-request'

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

const getCategories = async () => {
  const query = gql`
    query GetCategories {
        categories(first: 50) {
          id
          name
          slug
          icon {
            url
          }
        }
      }	`
  const result = await request(MASTER_URL, query)
  return result;
}

const getBusiness = async (slug) => {
  const query = gql`
  query GetBusiness {
    restaurants(where: {categories_some: {slug: "`+ slug + `"}}) {
      aboutUs
      address
      banner {
        url
      }
      categories {
        name
      }
      id
      name
      slug
      restroType
      workingHours
      reviews {
        star
      }
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

const getBusinessDetail = async (businessSlug) => {
  const query = gql`
  query RestaurantDetail {
    restaurant(where: {slug: "`+ businessSlug + `"}) {
      aboutUs
      address
      banner {
        url
      }
      categories {
        name
      }
      id
      name
      restroType
      slug
      workingHours
      menu {
        ... on Menu {
          id
          category
          menuItem {
            ... on MenuItem {
              id
              name
              description
              price
              productImage {
                url
              }
            }
          }
        }
      }
      reviews {
        star
      }
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const AddToCart = async (data) => {
  const query = gql`
  mutation AddToCart {
    createUserCart(
      data: {email: "`+ data?.email + `", 
      price: `+ data?.price + `, 
      productDescription: "`+ data?.description + `", 
      productImage: "`+ data?.imageUrl + `", 
      productName: "`+ data?.productName + `",
      restaurant: {connect: {slug: "`+ data.restaurantSlug + `"}}}
    ) {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

const getUserCarts = async (email) => {
  const query = gql`
  query GetUserCarts {
    userCarts(where: {email: "`+ email + `"}, first: 50) {
      id
      price
      productDescription
      productImage
      productName
      restaurant {
        banner {
          url
        }
        name
        slug
      }
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

const disconnectRestroFromUserCartItem = async (id) => {
  const query = gql`
  mutation DisconnectRestautarantFromUserCartItem {
    updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "`+ id + `"})
    {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const removeItemFromCart = async (id) => {
  const query = gql`
  mutation RemoveItemFromCart {
    deleteUserCart(where: {id: "`+ id + `"}) {
      id
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

const addReview = async (data) => {
  const query = gql`
  mutation AddRiview {
    createReview(
      data: {email: "`+ data.email + `", 
        reviewText: "`+ data.reviewText + `", 
        star: `+ data.star + `, 
        userName: "`+ data.userName + `", 
        profileImage: "`+ data.profileImage + `", 
        restaurant: {connect: {slug: "`+ data.slug + `"}}}
    ) {
      id
    }
    publishManyReviews(to: PUBLISHED) {
      count
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

const getRestaurantReviews = async (slug) => {
  const query = gql`
  query RestaurantReviews {
    reviews(where: {restaurant: {slug: "`+ slug + `"}},orderBy: publishedAt_DESC) {
      email
      id
      profileImage
      publishedAt
      star
      userName
      reviewText
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const CreateNewOrder = async (data) => {
  const query = gql`
  mutation CreateNewOrder {
    createOrder(
      data: {address: "`+ data.address + `", 
        email: "`+ data.userEmail + `", 
        orderAmount: `+ data.amount + `, 
        phone: "`+ data.phone + `",
        restaurantName: "`+ data.restroName + `", 
        userName: "`+ data.userName + `", 
        zipCode: "`+ data.zipCode + `"}
    )
    {
      id
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

const updateOrderToAddOrderItem = async (name, price, id, email) => {
  const query = gql`
  mutation UpdateOrderWithDetail {
    updateOrder(
      data: {orderDetail: {create: {OrderItem: {data: {name: "`+ name + `", price: ` + price + `}}}}}
      where: {id: "`+ id + `"}
    ) {
      id
    }
    publishManyOrders(to: PUBLISHED) {
      count
    }
    deleteManyUserCarts(where: {email: "`+ email + `"}) {
      count
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}
const getOrders = async (email) => {
  const query = gql`
  query MyQuery {
    orders(where: {email: "`+ email + `"}) {
      address
      orderAmount
      phone
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

const getUserOrders = async (email) => {
  const query = gql`
  query UserOrders {
  orders(where: {email: "`+ email + `"}, orderBy: publishedAt_DESC) {
    address
    createdAt
    email
    id
    orderAmount
    orderDetail {
      ... on OrderItem {
        id
        name
        price
      }
    }
    phone
    restaurantName
    userName
    zipCode
  }
}`
  const result = await request(MASTER_URL, query);
  return result;
}

export default {
  getCategories,
  getBusiness,
  AddToCart,
  getBusinessDetail,
  getUserCarts,
  disconnectRestroFromUserCartItem,
  removeItemFromCart,
  addReview,
  getRestaurantReviews,
  CreateNewOrder,
  updateOrderToAddOrderItem,
  getOrders,
  getUserOrders,
}