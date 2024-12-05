import Navbar from './components/Navbar'
import InputText from './components/input/input'
import MyForm from './components/input/myForm'
import ParentComponent from './components/switch/App'
import { Outlet } from 'react-router-dom'
import { BreadcrumbDemo } from './components/Breadcrumb'


const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className='px-6 mt-5'>
        <BreadcrumbDemo />

      </div>
      <div>        <MyForm />
      </div>
      <Outlet />
    </>
  )
}

export default MainLayout