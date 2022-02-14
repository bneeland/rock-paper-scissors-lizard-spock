export default function Layout({ children }) {
  return (
    <div>
      <p className="text-2xl font-bold underline">Header</p>
      <div>{children}</div>
    </div>
  )
}
