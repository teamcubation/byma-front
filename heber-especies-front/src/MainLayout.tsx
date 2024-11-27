import Navbar from './components/Navbar'
import InputText from './components/nuestros-componentes/input/inputText'
import { Outlet } from 'react-router-dom'
import { BreadcrumbDemo } from './components/Breadcrumb'


const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className='px-6 mt-5'>
        <BreadcrumbDemo />

      </div>
      <div>        <InputText />
      </div>
      <Outlet />
    </>
  )
}

export default MainLayout