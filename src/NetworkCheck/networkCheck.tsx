import { useNetwork } from '../Utilities/useNetwork'

const NetworkCheck: React.FunctionComponent = () => {
  const { isOnline, isSlow } = useNetwork()

  if (isOnline && !isSlow) {
    return null
  }
  if (isSlow && isOnline) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-w-lg w-1/3 fixed right-10 bottom-10"
        role="alert"
      >
        <strong className="font-bold block">Internet</strong>
        <span className="block sm:inline">You have slow internet.</span>
      </div>
    )
  }
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-w-lg w-1/3 fixed right-10 bottom-10"
      role="alert"
    >
      <strong className="font-bold block">Internet</strong>
      <span className="block sm:inline">You don't have any internet</span>
    </div>
  )
}

export default NetworkCheck
