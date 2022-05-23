import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import {useParams, Link} from "react-router-dom"
import {BsStarFill, BsStarHalf, BsStar} from "react-icons/bs"
import {IoMdCart} from "react-icons/io"
import {TiTick} from "react-icons/ti"
import {AppContext} from "./context"
const url1 = "https://course-api.com/react-store-single-product?id="
const url2 = "http://localhost:4000/v1/"
//const url2="https://fierce-lake-70469.herokuapp.com/v1/"

const SingleProduct = () => {
  const {isLoading, setIsLoading, filters, setFilters} = useContext(AppContext)
  const {id} = useParams()
  const [singleData, setSingleData] = useState({})
  const [imageArr, setImageArr] = useState([])
  const [singleImg, setSingleImg] = useState("")
  const {
    id: idd,
    name,
    price,
    description,
    company,
    stock,
    reviews,
    category,
    shipping,
  } = singleData
  const [colorArr, setColorArr] = useState([])
  const [colorIndex, setColorIndex] = useState(0)

  const [value, setValue] = useState(0)
  const [num, setNum] = useState(1)
  const arr = [1, 2, 3, 4, 5]

  const fetch_data = async () => {
     const {data}= await axios.get(`http://localhost:4000/v1/single-product/${id}`)
    //const {data} = await axios.get(`${url2}single-product/${id}`)

    setSingleData(data)
    setImageArr(
      data.images.map((item) => {
        return {
          id: item.id,
          large: item.thumbnails.large.url,
          full: item.thumbnails.full.url,
        }
      })
    )
    setSingleImg(data.images[0].thumbnails.full.url)
    setValue(
      (data.stars * 10) % 10 === 0 ? data.stars : Math.floor(data.stars) + 0.5
    )
    setColorArr([
      ...data.colors.map((c, index) => ({
        id: index,
        color: c,
        isChecked: index === 0 ? true : false,
      })),
    ])
    setIsLoading(false)
  }
  useEffect(() => {
    fetch_data()
  }, [])

  const findImg = async(id) => {
    document.getElementsByClassName('large-div').addClass='loading'
   await setSingleImg(imageArr.filter((item) => item.id === id)[0].full)
    document.getElementsByClassName('large-div').removeClass='loading'

  }
  const setStar = (index) => {
    if (index < value - 1) {
      return <BsStarFill className="star-icon" />
    }
    if (index < value && (value * 10) % 10 !== 0) {
      return <BsStarHalf className="star-icon" />
    }

    if (5 - Math.ceil(value - 1) !== 0) {
      return <BsStar className="star-icon" />
    }
  }

  const toggle = (indexx) => {
    const arr = colorArr.map((item, index) => {
      if (index === indexx) {
        item.isChecked = true
        setColorIndex(index)
      } else {
        item.isChecked = false
      }
      return item
    })
    setColorArr(arr)
  }

  const setTolocal = async () => {
    try {
      const {data} = await axios.get(url2)
      let cart = data.find((item) => item.id === idd)
      let scolor = colorArr[colorIndex].color
      if (cart) {
        let objFound = cart.color.find((item) => item.singleColor === scolor)
        await axios.patch(
          `${url2 + cart._id}`,
          objFound ? {color: scolor} : {singleColor: scolor, count: 1}
        )
      } else {
        await axios.post(`${url2}createTask`, {
          id: idd,
          name,
          price,
          category,
          image: imageArr[0].large,
          color: [{singleColor: colorArr[colorIndex].color, count: 1}],
          company,
          shipping,
          description,
          totalCount: 1,
          totalPrice: price,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (isLoading) {
    return <div className="loading"></div>
  }

  return (
    <div className="single-pro">
      <div className="home-navi ">
        <p>
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/products" className="link">
            /Products/
          </Link>
          {name}
        </p>
      </div>
      <form className="back-products" method="get" action="/products">
        <button type="submit" className="shop-now">
          Back To Products
        </button>
      </form>
      <section className="singleImg-display">
        <div className="img-div">
          <div className="large-div">
            <img src={singleImg} alt="Loading" />
          </div>
          <div className="preview-img">
            {imageArr.map((img, index) => (
              <img
                key={index}
                src={img.large}
                alt="not loaded"
                onClick={() => {findImg(img.id)}}
                className="img-item"
              />
            ))}
          </div>
        </div>

        <div className="articl">
          <div>
            <h3>
              {name}
              <section className="star">
                {" "}
                {arr.map((item, index) => (
                  <span key={index}>{setStar(index)}</span>
                ))}
                <span style={{justifyContent: "center", textAlign: "center"}}>
                  ({reviews}customer reviews)
                </span>
              </section>
              <span style={{color: "goldenrod"}}>
                ${parseInt(price).toLocaleString("en-US")}
              </span>
            </h3>
          </div>
          <span>{description}</span>
          <div className="descriptions">
            <p>
              Available:
              <span>{stock === 0 ? "Not Available" : "In Stock"}</span>
            </p>

            <p>
              Category: <span>{category}</span>
            </p>

            <p>
              Brand:<span>{company}</span>
            </p>

            <div className="under"></div>

            <div className="colo-disp">
              <p>Colors:</p>
              <div className="colr-display">
                {colorArr.map((item, index) => (
                  <button
                    className="single-color"
                    key={index}
                    style={{backgroundColor: item.color}}
                    onClick={() => toggle(index)}
                  >
                    {item.isChecked ? (
                      <TiTick style={{color: "white", fontSize: "1rem"}} />
                    ) : (
                      ""
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "5fr 3fr",
              columnGap: "0.1rem",
              paddingTop: "1rem",
            }}
          >
            <button className="shop-now" onClick={() => setTolocal()}>
              Add To Cart
            </button>

            <div style={{display: "flex", marginBottom: "1rem"}}>
              <button
                className="incre-decre"
                onClick={() => setNum((prev) => (prev < 2 ? prev : prev - 1))}
              >
                -
              </button>
              <h2 style={{margin: "1rem 1rem", alignText: "center"}}>{num}</h2>
              <button
                className="incre-decre"
                onClick={() => setNum((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
          {/* <a href='/cart' ><IoMdCart className='cart-icon' style={{color:'black'}}/></a> */}
          {/* <form className='back-products' method="get" action="/products">
                <button type="submit" className='shop-now' >Back To Products</button>
        </form> */}
        </div>
      </section>
    </div>
  )
}
export default SingleProduct
