import { Link } from "react-router-dom"

const Breadcrumb = ({text, href, className}) => {
  return (
    <>
        <div className={className}>
            <Link to={href}><h3>{text}</h3></Link>
        </div>
    </>
  )
}

export default Breadcrumb