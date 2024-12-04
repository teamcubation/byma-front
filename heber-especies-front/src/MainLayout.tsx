import Navbar from './components/Navbar'
import InputText from './components/input/inputText'
import App from './components/checkbox/form'
import { Outlet } from 'react-router-dom'
import { BreadcrumbDemo } from './components/Breadcrumb'


const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className='px-6 mt-5'>
        <BreadcrumbDemo />

      </div>
      <div>        <App/>
      </div>
      <Outlet />
    </>
  )
}

export default MainLayout