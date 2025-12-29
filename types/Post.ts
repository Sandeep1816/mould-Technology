export type Author = {
  id: number
  name: string
  bio?: string | null
  avatarUrl?: string | null
}

export type Category = {
  id: number
  name: string
  slug: string
}

export type Post = {
  id: number
  title: string
  slug: string
  excerpt?: string | null     // ✅ correct
  content: string
  imageUrl?: string | null
  publishedAt?: string | null
  views?: number
  author?: Author
  category?: Category
}
