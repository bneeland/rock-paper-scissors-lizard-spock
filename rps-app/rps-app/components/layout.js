export default function Layout({ children }) {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto p-6">
        <div>{children}</div>
      </div>
    </div>
  )
}
