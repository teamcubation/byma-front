import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { BreadcrumbDemo } from './components/Breadcrumb'
import ComboBox from './components/comboBox/ComboBox'

const MainLayout = () => {
  return (
    <>
        <Navbar />
        <div className='px-6 mt-5'>
        <BreadcrumbDemo />
        </div>
        <ComboBox />
        <Outlet/>
    </>
  )
}

export default MainLayout