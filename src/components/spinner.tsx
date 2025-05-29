const Spinner = ({
  small
}: {
  small?: boolean
}) => {
  return (
    <div className={`${small ? "h-6 w-6" : "h-12 w-12"} border-4 border-t-transparent rounded-full animate-spin`} />
  )
}
export default Spinner;