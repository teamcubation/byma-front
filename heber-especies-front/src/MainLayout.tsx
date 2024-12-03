import Navbar from './components/Navbar'
import InputText from './components/input/inputText'
import MyForm from './components/input/myForm'
import Form from "./components/textarea/form";
import { Outlet } from 'react-router-dom'
import { BreadcrumbDemo } from './components/Breadcrumb'


const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className='px-6 mt-5'>
        <BreadcrumbDemo />

      </div>
      <div>        <Form />
      </div>
      <Outlet />
    </>
  )
}

export default MainLayout