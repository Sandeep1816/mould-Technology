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
  badge?: string | null
  content: string
  imageUrl?: string | null
   createdAt?: string      // ✅ ADD THIS
   updatedAt?: string      // ✅ ADD THIS
   publishedAt?: string | null
  views?: number | null
  
  author?: Author
  category?: Category 
}
