export type Company = {
  id: number
  name: string
  slug: string
  isVerified: boolean
  createdAt: string
}

export type Recruiter = {
  id: number
  username: string
  email: string
  createdAt: string
  company?: {
    name: string
  }
}

export type Directory = {
  id: number
  name: string
  slug: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  createdAt: string

  company?: {
    name: string
  }

  submittedBy?: {
    username: string
  }
}

