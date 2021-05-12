import React, { useState, useEffect } from 'react'
//import banana from './Pictures/banana.jpg'
import { displayProducts, findOneProduct, addProduct, deleteProduct, updateProduct, findUser, deleteUser, updateUser } from '../AxiosLink'

const Admin = ({ prodList, setProdList, user }) => {

    let token = 0
    if (user) {
        token = user.token
    }

    ////////////////////////////// TO DISPLAY ALL PRODUCTS //////////////////////////////

    useEffect(async () => {
        let prodList = await displayProducts()
        setProdList(prodList)
    }, [])

    let renderProductNames = (arr) => (
        arr.map((ele, idx) => {
            return <div className='prod-admin-line' key={idx}>
                <div className="box-admin">
                    <img className='prod-img-admin' src={ele.image} alt={ele.name} />
                    <div className='prod-btns'>
                        <button id={ele._id} onClick={deleteOneProduct}>DEL</button>
                    </div>
                </div>
                
                <div className='prod-bottom-admin'>
                    <div>
                        <p>Name: {ele.name}</p>
                        <p>Price: {ele.price}€</p>
                        <p>Id: {ele._id}</p>
                    </div>
                </div>
            </div>
        })
    )

    ////////////////////////////// TO FIND ONE PRODUCT //////////////////////////////

    let defaultPic = "https://cdn.pixabay.com/photo/2018/12/06/16/12/bird-3860034__340.jpg"
    const [inputProduct, setInputProduct] = useState("")
    const [foundProd, setFoundProd] = useState([]);
    const [oldId, setOldId] = useState();
    const [hiddenInfo, setHiddenInfo] = useState("hide")
    const [findImage, setFindImage] = useState(defaultPic)

    let handleFindChange = (e) => {
        setInputProduct(e.target.value)
    }

    let searchProduct = async (e) => {
        e.preventDefault();
        let found = await findOneProduct(inputProduct, token);
        if (found === undefined || found === "") {
            setInputProduct("");
        }
        else {
            let oldName = found.name
            let oldPrice = found.price
            let oldCategory = found.category
            let oldOnSale = found.onSale
            let oldStock = found.stock
            let oldImage = found.image
            let oldId = found._id

            setFoundProd(found);
            setHiddenInfo("")
            //to clear input
            setInputProduct("");
            //to show old data in input
            setFindImage(found.image)
            setnewName(oldName)
            setnewPrice(oldPrice)
            setnewCategory(oldCategory)
            setnewOnSale(oldOnSale)
            setnewStock(oldStock)
            setnewImage(oldImage)
            setOldId(oldId)
        }
    }

    let renderFound = (ele) => {
        return <div>
            <div class="box-admin">
                <img className='prod-img-admin' src={findImage} alt={ele.name} />
            </div>
            <div className='prod-bottom'>
                <div>
                    <p>{ele.name}</p>
                    <p className={hiddenInfo} >{ele.price}€</p>
                </div>
                <div className='prod-btns'>
                    <button className={hiddenInfo} id={ele._id} onClick={deleteOneProduct}>DEL</button>
                    <button className={hiddenInfo} id={ele._id} onClick={updateOneProduct}>UPD</button>
                </div>
            </div>
        </div>
    }

    ////////////////////////////// TO ADD ONE PRODUCT //////////////////////////////

    const quantity = 1
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [category, setCategory] = useState()
    const [onSale, setOnSale] = useState(false)
    const [inputOnSale, setInputOnSale] = useState()
    const [stock, setStock] = useState(0)
    const [inputStock, setInputStock] = useState()
    const [addImage, setAddImage] = useState(defaultPic)
    const [inputAddImage, setInputAddImage] = useState("")



    let handleNameChange = (e) => {
        setName(e.target.value)
    }
    let handlePriceChange = (e) => {
        setPrice(e.target.value)
    }
    let handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }
    let handleOnSaleChange = (e) => {
        setInputOnSale(e.target.value)
        setOnSale(e.target.value)
    }
    let handleStockChange = (e) => {
        setInputStock(e.target.value)
        setStock(e.target.value)
    }
    let handleImageChange = (e) => {
        setAddImage(e.target.value)
        setInputAddImage(e.target.value)
    }

    let addOneProduct = async (e) => {
        e.preventDefault()
        let response = await addProduct(name, price, category, onSale, quantity, addImage, stock, token)
        if (response === false || name === "") {
            console.log("product already exists")
        }
        else {
            //to make newProd appear in screen
            setProdList([...prodList, response])
            console.log("from admin add", response)
        }
        //to clear input
        setName("")
        setPrice("")
        setCategory("")
        setOnSale(false)
        setInputStock("")
        setStock(0)
        setAddImage(defaultPic)
        setInputAddImage("")
        setInputOnSale("")
    }
    ////////////////////////////// TO UPDATE ONE PRODUCT //////////////////////////////
    const [newName, setnewName] = useState()
    const [newPrice, setnewPrice] = useState()
    const [newCategory, setnewCategory] = useState()
    const [newOnSale, setnewOnSale] = useState()
    const [newStock, setnewStock] = useState()
    const [newImage, setnewImage] = useState()


    let handlenewName = (e) => {
        console.log(e.target.value)
        setnewName(e.target.value)
    }
    let handlenewPrice = (e) => {
        console.log(e.target.value)
        setnewPrice(e.target.value)
    }
    let handlenewCategory = (e) => {
        console.log(e.target.value)
        setnewCategory(e.target.value)
    }
    let handlenewOnSale = (e) => {
        console.log(e.target.value)
        setnewOnSale(e.target.value)
    }
    let handlenewStock = (e) => {
        console.log(e.target.value)
        setnewStock(e.target.value)
    }
    let handlenewImage = (e) => {
        setFindImage(e.target.value)
        console.log(e.target.value)
        setnewImage(e.target.value)
    }

    let updateOneProduct = async (e) => {
        e.preventDefault()
        let id = e.target.id
        let copyProdList = [...prodList]
        let updProd = await updateProduct(oldId, newName, newPrice, newCategory, newOnSale, newStock, newImage, token)
        console.log("from admin page", updProd.updated)
        //to make oldProd disappear from screen
        copyProdList = copyProdList.filter(deleteProd => deleteProd._id !== id)
        //to make updProd appear on screen
        copyProdList = [...copyProdList, updProd.updated]
        setProdList(copyProdList)
        //to clear input
        setFoundProd([])
        setHiddenInfo("hide")
        setnewName("")
        setnewPrice("")
        setnewCategory("")
        setnewOnSale("")
        setnewStock("")
        setnewImage("")
        setFindImage(defaultPic)
    }

    ////////////////////////////// TO DELETE ONE PRODUCT //////////////////////////////

    let deleteOneProduct = async (e) => {
        e.preventDefault()
        let delID = e.target.id
        console.log(delID)
        await deleteProduct(delID, token)
        //to make Prod disappear from screen
        setProdList(prodList.filter(deletedProd => deletedProd._id !== delID))
        //to make foundProd disappear from screen
        setFoundProd([])
        setHiddenInfo("hide")
        setnewName("")
        setnewPrice("")
        setnewCategory("")
        setnewOnSale("")
        setnewStock("")
        setnewImage("")
        setFindImage(defaultPic)
    }

    ////////////////////////////// TO FIND ONE USER //////////////////////////////
    const [inputUser, setInputUser] = useState("")
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userisAdmin, setUserisAdmin] = useState();
    const [userID, setUserID] = useState();

    let handleFindUser = (e) => {
        setInputUser(e.target.value)
    }

    let searchUser = async (e) => {
        e.preventDefault();
        console.log("from admin before await", inputUser)
        let found = await findUser(inputUser, token);
        console.log("from admin once response recieved", found)
        if (found === undefined || found === "") {
            setInputUser("");
        }
        else {
            let userName = found.name
            let userLastName = found.lastName
            let userEmail = found.email
            let userisAdmin = found.isAdmin
            setUserID(found.id)
            //to clear input
            setInputUser("");
            //to show old data in input
            setUserName(userName)
            setUserLastName(userLastName)
            setUserEmail(userEmail)
            setUserisAdmin(userisAdmin)
        }
    }

    ////////////////////////////// TO DELETE ONE USER //////////////////////////////
    let deleteOneUser = async (e) => {
        console.log("e", e)
        e.preventDefault()
        console.log("from admin id:", userID)
        await deleteUser(userID, token)

        setUserName("")
        setUserLastName("")
        setUserEmail("")
        setUserisAdmin("")
        setUserID("")
    }

    ////////////////////////////// TO UPDATE USER//////////////////////////////

    let handleAdminChange = (e) => {
        setUserisAdmin(e.target.value)
        console.log("after change", userisAdmin)
    }

    let updateOneUser = async (e) => {
        console.log("e", e)
        e.preventDefault()
        console.log("from admin update isAdmin:", userisAdmin)
        await updateUser(userID, userisAdmin, token)

        setUserName("")
        setUserLastName("")
        setUserEmail("")
        setUserisAdmin("")
        setUserID("")
    }

    return (
        <div id="products" className='products-admin'>
            <div className='prod-admin'>
                <h2>FIND/UPD/DEL USER</h2>
                <form className="margin-left" onSubmit={searchUser}>
                    <button type="submit" className='find-btn'>FIND</button>
                    <input className='find-btn' value={inputUser} onChange={handleFindUser} type='text' placeholder='User e-mail'></input>
                </form>
            </div>
            <div className="margin-left">
                <div className='add-prod-bottom'>
                    <p>User name:</p><input value={userName} type='text' placeholder=""></input>
                    <p>User last name:</p><input value={userLastName} type='text' placeholder=""></input>
                    <p>User e-mail:</p><input value={userEmail} type='email' placeholder=""></input>
                    <p>User is admin: (True/False):</p><input onChange={handleAdminChange} value={userisAdmin} type='boolean' placeholder=""></input>
                    <div className='prod-btns'>
                        <button id={userID} onClick={deleteOneUser}>DEL</button>
                        <button id={userID} onClick={updateOneUser}>UPD</button>
                    </div>
                </div>
            </div>
            <hr className="hr-admin"></hr>
            <div className="add-prod-columns">
                <div>
                    
                    <div className='add-product'>
                        <h2>ADD PRODUCT</h2>
                        <div className="box-admin">
                            <img className='prod-img-admin' src={addImage} alt="NEW IMG" />
                            <button onClick={addOneProduct} className='btn-admin'>+</button>
                        </div>
                        <div className='add-prod-bottom'>
                            <p>Name:</p><input onChange={handleNameChange} value={name} type='text' placeholder=""></input>
                            <p>Price:</p><input onChange={handlePriceChange} value={price} type='text' placeholder=""></input>
                            <p>Category:</p><input onChange={handleCategoryChange} value={category} type='text' placeholder=""></input>
                            <p>On sale: (True/False) </p><input onChange={handleOnSaleChange} value={inputOnSale} type='text' placeholder=""></input>
                            <p>Stock:</p><input onChange={handleStockChange} value={inputStock} type='text' placeholder=""></input>
                            <p>Image Link:</p><input onChange={handleImageChange} value={inputAddImage} type='text' placeholder=""></input>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='prod-admin'>
                        <h2>FIND/UPDATE PRODUCT</h2>
                        <form className="margin-left" onSubmit={searchProduct}>
                            <button type="submit" className='find-btn'>FIND</button>
                            <input className='find-btn' value={inputProduct} onChange={handleFindChange} type='text' placeholder='Product Name'></input>
                        </form>
                    </div>
                    <div className='add-product'>
                        <div className="box-admin">{renderFound(foundProd)}</div>
                        <div className='add-prod-bottom'>
                            <p>Name:</p><input onChange={handlenewName} value={newName} type='text' placeholder=""></input>
                            <p>Price:</p><input onChange={handlenewPrice} value={newPrice} type='text' placeholder=""></input>
                            <p>Category:</p><input onChange={handlenewCategory} value={newCategory} type='text' placeholder=""></input>
                            <p>On sale: (True/False)</p><input onChange={handlenewOnSale} value={newOnSale} type='text' placeholder=""></input>
                            <p>Stock:</p><input onChange={handlenewStock} value={newStock} type='text' placeholder=""></input>
                            <p>Image Link:</p><input onChange={handlenewImage} value={newImage} type='text' placeholder=""></input>
                        </div>
                    </div>
                </div>

            </div>
            <hr className="hr-admin"></hr>
            <h2>ALL PRODUCTS</h2>
            <div className="prod-box-admin">{renderProductNames(prodList)}</div>
        </div>
    )
}
export default Admin
