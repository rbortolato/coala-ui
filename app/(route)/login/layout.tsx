export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-screen h-screen flex bg-slate-100 ">
      <div className="border-2 shadow-xl w-96 h-64 rounded-lg mx-auto my-auto bg-slate-50 ">{children}</div>
    </div>
  )
}
