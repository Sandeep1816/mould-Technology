import TopicsListing from "@/components/TopicsListing";
import type { Post } from "@/types/Post";

type Props = {
  params: {
    category: string;
  };
};

export default async function TopicCategoryPage({ params }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?category=${params.category}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  // ✅ SAFELY EXTRACT ARRAY
  const posts: Post[] = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
    ? data
    : [];

  return (
    <TopicsListing
      posts={posts}
      activeCategory={params.category}
    />
  );
}
