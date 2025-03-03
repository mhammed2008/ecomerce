
export interface CartResponse {
  status?: string
  numOfCartItems: number
  cartId: string
  message:string
  data: Data | null
}

interface Data {
  _id: string
  cartOwner: string
  products: Product[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

interface Product {
  count: number
  _id: string
  product: Product2
  price: number
}

interface Product2 {
  subcategory: Subcategory[]
  _id: string
  title: string
  quantity: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  id: string
}

interface Subcategory {
  _id: string
  name: string
  slug: string
  category: string
}

interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

interface Brand {
  _id: string
  name: string
  slug: string
  image: string
}
