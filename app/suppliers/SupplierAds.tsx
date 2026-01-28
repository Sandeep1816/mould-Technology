import Image from "next/image"

export default function SupplierAds() {
  return (
    <div className="space-y-6 sticky top-6">

      <Ad src="/images/mmtsub.png" />
      <Ad src="/images/PTXPO26_RegNow.png" />
      <Ad src="/images/MMT-progress.png" />
      <Ad src="/images/mmtsub.png" />
      <Ad src="/images/PTXPO26_RegNow.png" />
    </div>
  )
}

function Ad({ src }: { src: string }) {
  return (
    <div className="bg-white border">
      <Image
        src={src}
        alt="Advertisement"
        width={300}
        height={600}
        className="w-full object-cover"
      />
    </div>
  )
}
