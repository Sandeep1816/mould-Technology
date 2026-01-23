export type Supplier = {
  id: number
  name: string
  location: string
  description: string

  logo?: string        // image url
  featured?: boolean  // for "Featured Suppliers" toggle

  categories?: string[] // used for left filters

  socials?: {
    facebook?: string
    linkedin?: string
    twitter?: string
    youtube?: string
    website?: string
  }
}
