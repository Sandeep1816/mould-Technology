import type { Post } from "@/types/Post";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ArticleDetailPage({ params }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params.slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div className="p-10">Article not found</div>;
  }

  const post: Post = await res.json();

  const getImageUrl = (url?: string | null) => {
    if (!url) return "/placeholder.svg";
    if (url.startsWith("http")) return url;
    const base = process.env.NEXT_PUBLIC_API_URL || "";
    return `${base.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
  };

  return (
    <main className="max-w-[1320px] mx-auto px-6 py-10">
      <h1 className="text-[36px] font-bold mb-6">
        {post.title}
      </h1>

      <img
        src={getImageUrl(post.imageUrl)}
        className="w-full max-h-[520px] object-cover mb-8"
        alt={post.title}
      />

      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
