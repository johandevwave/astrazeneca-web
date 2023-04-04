import { Outlet } from 'react-router-dom'
import NetworkCheck from '../NetworkCheck'

const Layout: React.FunctionComponent = () => (
  <div className="pb-24 px-2">
    <NetworkCheck />
    <div>
      <Outlet />
    </div>
  </div>
)

export default Layout
