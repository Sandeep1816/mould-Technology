type StatCardProps = {
  label: string
  value: number | string
}

export default function StatCard({
  label,
  value,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-sm text-gray-500 mb-2">
        {label}
      </p>
      <h3 className="text-2xl font-bold">
        {value}
      </h3>
    </div>
  )
}
