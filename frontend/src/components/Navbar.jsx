import { useNavigate, Link } from "react-router-dom"
import logo from "../assets/csda.png"
function Navbar(){
  const navigate = useNavigate()
    return(
        <div className="navbar bg-base-100 w-full max-w-full">
  <div className="flex-1 ">
  <div className="flex flex-row items-center btn btn-square btn-ghost w-80" onClick={() => navigate("/")}>
  <img src={logo} className="w-12"/>
  <p className="font-bold">Canadian Simplified Data Access</p>
  </div>
  </div>
  <div className="flex-none items-center">
    <ul className="menu menu-horizontal px-1 flex flex-row items-center">
      <Link to="/about">About</Link>
      <li>
        <details>
          <summary>
            Parent
          </summary>
          <ul className="p-2 bg-base-100">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
    )
    
}

export default Navbar