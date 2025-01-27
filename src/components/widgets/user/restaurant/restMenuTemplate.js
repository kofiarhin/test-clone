import React from "react";
import { Link } from "react-router-dom";
import "./restMenuTemplate.sass";

const RestMenuTemplate = ({ menuData, addToCart, handleDelete }) => {

    const role = sessionStorage.getItem("role");

    //  --- TODO ---
    //if role is customer display cta


    const renderCta = (menuItem) => {

        const role = sessionStorage.getItem("role");

        console.log(menuItem);

        switch (role) {

            case "customer":
                return <div className="btn-wrapper">
                    <button className="btn btn-main" onClick={() => addToCart(menuItem)}> Add To Cart  </button>
                </div>

            case "admin":

                return <div className="btn-wrapper">

                    <Link to={`/restaurant/menu/edit/${menuItem.id}`} className="btn btn-main text-center"> Edit </Link>
                    <button className="btn btn-danger">Delete</button>

                </div>
                break;
            case "rest":

                return <div className="btn-wrapper">

                    <Link to={`/restaurant/menu/edit/${menuItem.id}`} className="btn btn-main text-center"> Edit </Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(menuItem)}>Delete</button>

                </div>
                break;
            default:
                return null;
        }

    }

    const renderMenuItems = (category, menuData) => {

        return menuData.map(menuItem => {

            return menuItem.category === category ? <div className="menu-item">

                <div className="avatar" style={{
                    backgroundImage: `url(${menuItem.cover.fileUrl})`

                }}></div>

                <div className="desc">
                    <p className="item-name"> {menuItem.name} </p>
                    <p className="item-price">Price: GHC{menuItem.price} </p>
                    {renderCta(menuItem)}
                </div>


            </div> : null;
        })

    }

    const renderMenu = () => {

        const categories = getCategories(menuData);

        let template = null;

        template = categories.map(category => {

            return <div>
                <div className='menu-unit'>
                    <h2 className="cat-name">  {category}</h2>
                    <div className="menu-content">
                        <div className="content">
                            {renderMenuItems(category, menuData)}
                        </div>
                    </div>
                </div>

            </div>
        })

        return template;
    }

    const getCategories = () => {

        const category = menuData.map(data => {

            return data.category;
        })

        const data = [... new Set(category)];

        return data;

    }

    return <div className="menu-wrapper">

        <h1 className="main-title"> Menu</h1>
        {renderMenu()}

    </div>
}

export default RestMenuTemplate;