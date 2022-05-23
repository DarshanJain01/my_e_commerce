import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {TiTick} from "react-icons/ti"
import {RiDeleteBin7Fill} from "react-icons/ri"
import axios from "axios"
const Cart = () => {
  const [value, setValue] = useState([])
  const [arr, setArr] = useState([])
  var total = 0
  const removeCartItem = async (idNum, ind) => {
    if (value.length > 1) {
      setValue(
        value.filter((item) => {
          if (item._id !== idNum) return item
          return false
        })
      )
      // console.log(value);document.getElementById('x').innerHTML='ITEM DELETED SUCCESSFULLY';setTimeout(()=>document.getElementById('c').textContent='',2000)
    } else {
      setValue([])
      console.log(value)
    }
    try {
      //  await  axios.delete(`https://fierce-lake-70469.herokuapp.com/v1/${idNum}`)
      await axios.delete(`http://localhost:4000/v1/${idNum}`)
    } catch (err) {
      console.log(err)
    }
  }

  const setCount = async (operation, ind, id) => {
    let arr1= arr.map((item, index) => {
        if (index === ind) {
          if (operation === "add") {
              total+=value.find(o => o._id === id)['price'];

              return item + 1
            }
          return item - 1
        } else {
          return item
        }
      })
    await setArr(
     arr1
    )
        
    try {
      await axios.patch(
        `http://localhost:4000/v1/${id}`,
        operation === "add" ? {increment: true} : {increment: false}
      )
    } catch (err) {
      console.log(err)
    }
  }

  // try{await axios.patch(`https://fierce-lake-70469.herokuapp.com/v1/${id}`,operation==='add'?{increment:true}:{increment:false})}
  //    catch(err){console.log(err)}}

  const getData = async () => {
    try {
      const {data} = await axios.get("http://localhost:4000/v1/")
      //const { data } = await axios.get("https://fierce-lake-70469.herokuapp.com/v1/");
      setValue(data)
      setArr(data.map((item) => item.totalCount))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <div className="home-navi ">
        <p>
          <Link to="/" className="link">
            Home
          </Link>
          /Cart
        </p>
      </div>
      <div className="cart-display">
        <div className="shop-clear-btn">
          <a href="/products" className="shop-btn">
            Continue Shopping
          </a>
          <button
            className="shop-btn"
            style={{backgroundColor: "#222222"}}
            onClick={() => {
              setValue([])
              axios.delete(
                // "https://fierce-lake-70469.herokuapp.com/v1/deleteAllTask"
                "http://localhost:4000/v1/deleteAllTask"
              )
            }}
          >
            Clear Shopping Cart
          </button>
        </div>
        <div className="headers">
          <h5>Item</h5>
          <h5 id="a">Price</h5>
          <h5>Quantity</h5>
          <h5 id="b">Subtotal</h5>
        </div>
        <article className="cart-underline"></article>
        <div className="cart-items">
          {value.length > 0 ? (
            <div>
              {value.map((item, index) => {
                total+=item.totalPrice
                return (
                  <div
                    className="headers"
                    id="1"
                    key={index}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <div className="image-name">
                      <img src={item.image} alt="hello buddy"></img>
                      <div className="name-color">
                        <h3>{item.name}</h3>
                        <div style={{display: "flex", alignItems: "center"}}>
                          <p style={{paddingRight: "10px"}}>Color:</p>
                          <div className="colr-display">
                            {item.color.map((item, index) => {
                              return (
                                <button
                                  className="single-color"
                                  key={index}
                                  style={{backgroundColor: item.singleColor}}
                                >
                                  <TiTick
                                    style={{color: "white", fontSize: "1rem"}}
                                  />
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <h1 style={{color: "#AB7A5F", fontSize: "1.4rem"}}>
                      $ {item.price.toLocaleString("en-US")}
                    </h1>
                    <div className="ince-dece">
                      <button
                        className="incre-decre"
                        onClick={() => setCount("minus", index, item._id)}
                      >
                        -
                      </button>
                      <h4 id="c">{arr[index]}</h4>
                      <button
                        className="incre-decre"
                        onClick={() => setCount("add", index, item._id)}
                      >
                        +
                      </button>
                    </div>
                    <h1 style={{fontSize: "1.4rem"}}>
                      $ {item.totalPrice.toLocaleString("en-US")}
                    </h1>

                    <RiDeleteBin7Fill
                      className="delete-btn"
                      onClick={() => removeCartItem(item._id, index)}
                    />
                  </div>
                )
              })}
              <div className="subTotal">
                <div className="subTotal-details">
                  <h4>Subtotal:</h4>
                  <span>$ {total}</span>
                </div>
                <div className="subTotal-details" style={{color: "#324D67"}}>
                  <h4>Shipping Fee:</h4>
                  <span>$ 5.34</span>
                </div>
                <div className="cart-underline" style={{margin: "0rem"}}></div>
                <div className="subTotal-details">
                  <h4>Order-Total:</h4>
                  <span>$ {total + 5.34}</span>
                </div>
              </div>
            </div>
          ) : (
            <h1 style={{margin: "10rem", textAlign: "center"}}>
              No Items In The Cart
            </h1>
          )}
        </div>{" "}
      </div>
    </div>
  )
}
export default Cart
