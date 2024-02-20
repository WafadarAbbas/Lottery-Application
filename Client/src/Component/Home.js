import { useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Header from "./Header"



function Home() {


    return (
        <div>

        <div> <Header/></div>
        {/* md:w-screen max-w-full  */}
        <div className="h-screen w-screen">
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHrTKtBZTX_ND4sl6au_5qA1h_0vAWiJaqdA&usqp=CAU"
    alt="Sample image"
    className="h-full w-full object-cover"
  />
</div>


        </div>
        
    )
}


export default Home