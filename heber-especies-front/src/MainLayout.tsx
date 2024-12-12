import Navbar from './components/Navbar'
import MyForm from './components/input/myForm'
import { Outlet } from 'react-router-dom'
import { BreadcrumbDemo } from './components/Breadcrumb'


const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className='px-6 mt-5'>
        <BreadcrumbDemo />
      </div>
      <Outlet />
    </>
  )
}

export default MainLayout