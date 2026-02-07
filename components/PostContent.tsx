import DOMPurify from "isomorphic-dompurify"

export default function PostContent({ content }: { content: string }) {
  return (
    <article
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
    />
  )
}
