import Link from "next/link"

export default function AuthHero({
  title,
}: {
  title: string
}) {
  return (
    <section className="bg-[#f7f9fb] py-24 text-center">
      <h1 className="text-4xl font-semibold text-[#121213]">
        {title}
      </h1>

      <p className="mt-2 text-sm text-[#616C74]">
        <Link href="/" className="hover:text-[#0073FF]">
          Nerio
        </Link>{" "}
        →{" "}
        <span className="text-[#0073FF]">{title}</span>
      </p>
    </section>
  )
}
