import Navbar from './components/Navbar'
import InputText from './components/input/inputText'
import MyForm from './components/input/myForm'
import App from './components/radio-button/App'
import { Outlet } from 'react-router-dom'
import { BreadcrumbDemo } from './components/Breadcrumb'


const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className='px-6 mt-5'>
        <BreadcrumbDemo />

      </div>
      <div>        <App />
      </div>
      <Outlet />
    </>
  )
}

export default MainLayout