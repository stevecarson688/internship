import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/image/logo.png"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { allItems } from "../../constants";
import HeaderBottom from "./HeaderBottom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { userSignOut } from "../../redux/amazonSlice";



const Header = () => {
    const dispatch = useDispatch()
    const auth = getAuth();
    const useInfo = useSelector((state) => state.amazon.useInfo);
    const products = useSelector((state) => state.amazon.products);

    const ref = useRef();
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (e.target.contains(ref.current)) {
                showAll && setShowAll(false);
            }
        });
    }, [ref, showAll]);
    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log("Sign out succefully");
            dispatch(userSignOut())

            // Sign-out successful.
        }).catch((error) => {
            console.log(error);
            // An error happened.
        });
    }




    return (
        <div className="w-full sticky top-0 z-50">
            <div className='w-full bg-amazon_blue  text-white px-4 py-3 flex items-center gap-4'>

                { /* ici nous avons notre image ici */}

                <Link to="/">
                    <div className="headerHover">
                        <img className="w-24 mt-2" src={logo} alt="logo" />
                    </div>
                </Link>


                <div className="headerHover hidden mdl:inline-flex">
                    <LocationOnIcon />
                    <p className="text-sm text-lightText font-light flex flex-col">
                        Deliver to
                        <span className="text-sm font-semibold -mt-1 text-white">Tchao</span>
                    </p>
                </div>

                <div className="h-10 rounded-md hidden lgl:flex flex-grow relative">
                    <span onClick={() => setShowAll(!showAll)} className="w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-black font-titleFont flex
                    items-center justify-center rounded-tl-md rounded-bl-md">All <span>
                        </span><ArrowDropDownIcon /></span>
                    {
                        showAll && (
                            <div>
                                <ul className="absolute w-56 h-80 top-10 left-0 overflow-scroll overflow-x-hidden bg-amazon_bl border-[1px] border-white p-2 flex-col gap-1 z-50">

                                    {
                                        allItems.map((items) => (
                                            <li className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent
                                             hover:border-blue-950 cursor-pointer duration-200"
                                                key={items._id}>
                                                {items.title}
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                        )
                    }
                    <input className="h-full text-base text-black flex-grow outline-none border-none px-2" type="text" />
                    <span className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-black cursor-pointer rounded-tr-md rounded-br-md">
                        <SearchIcon />
                    </span>

                    <Link to="/signin">
                        <div className="flex flex-col items-start justify-center headerHover">
                            {
                                useInfo ? (
                                    <p className="text-sm text-gray-100 font-medium">{useInfo.userName}</p>

                                ) : (
                                    <p className="text-sm text-gray-100 font-light">Hello, sign in</p>
                                )


                            }

                            <p className="text-sm font-semibold -mt-1 text-whiteText hidden mdl:inline-flex">
                                Accounts & Lists {""}
                                <span><ArrowDropDownIcon /></span>
                            </p>

                        </div>
                    </Link>

                    <div className="hidden lgl:flex flex-col items-start justify-center headerHover">
                        <p className="text-xs text-lightText font-light">Returns</p>
                        <p className="text-sm font-semibold -mt-1 text-whiteText">& Order</p>
                    </div>


                    <Link to="/cart">
                        <div className=" flex items-start justify-center headerHover relative">
                            <ShoppingCartIcon />
                            <p className="text-xs font-semibold mt-3 text-whiteText">
                                Cart{" "}
                                <span className="absolute text-xs -top-1 left-6 
                            font-semibold p-1 h-4 bg-[#f3a847] text-yellow-200 rounded-full flex justify-center items-center">
                                    {products.length > 0 ? products.length : 0}
                                </span>
                            </p>
                        </div>
                    </Link>

                    {
                        useInfo && (
                            <div onClick={handleLogout} className="flex flex-col justify-center items-center headerHover relative">
                                <LogoutIcon />
                                <p className="hidden mdl:inline-flex text-xs font-semibold text-whiteText">Log out</p>
                            </div>
                        )
                    }


                </div>





            </div >

            <HeaderBottom />


        </div >





    );
}

export default Header;