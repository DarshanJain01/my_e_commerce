import React, {useContext, useState} from "react"
import {AppContext} from "./context"
import Layout from "./layout"
import {RiSearchLine} from "react-icons/ri"
import {Link} from "react-router-dom"

const DisplayProduct = () => {
  const {tempData, layout, page, setPage} = useContext(AppContext)
  const [indexx, setIndexx] = useState(0)

  const newPage = (index) => {
    if (index !== indexx) {
      setPage(index)
      setIndexx(index)
    }
  }
  const nextPage = () => {
    if (indexx < tempData.length - 1) {
      setPage((prev) => prev + 1)
      setIndexx((prev) => prev + 1)
    } else {
      setIndexx(0)
      setPage(0)
    }
  }

  if (tempData.length === 0)
    return (
      <div style={{height: "500px"}}>
        <h1>Sorry, no products matched your search.</h1>
      </div>
    )

  return (
    <div className="display-product">
      <Layout />
      <div className="image-display">
        {tempData[page].length > 0 &&
          tempData[page].map((item) => {
            const {id, name, price, image, company, description} = item

            return (
              <div
                id="review"
                key={id}
                className={layout ? "items-detailed" : "items"}
              >
                <div className="container">
                  <img className="imge" alt="img" src={image}></img>
                  <div className="blck">
                    <Link className="search-icon" to={`/products/${id}`}>
                      <RiSearchLine />
                    </Link>
                  </div>
                </div>
                <article className="itemsDiv">
                  <h1>{name}</h1>
                  <p style={{color: "#AB7A5F"}}>
                    $ {price.toLocaleString("en-US")}
                  </p>
                </article>
                <p style={{color: "#85A0AE", paddingLeft: "1%"}}>
                  Company:{" "}
                  <span style={{color: "#AB7A5F", textTransform: "capitalize"}}>
                    {company}
                  </span>
                </p>
                {layout ? (
                  <div className="item-descri">
                    <p style={{color: "#324D67"}}>{description}</p>

                    <form
                      className="back-products"
                      method="get"
                      action={`/products/${id}`}
                    >
                      <button type="submit" className="shop-now">
                        Details
                      </button>
                    </form>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )
          })}
      </div>
      {/* {isVisible && <button type='submit' className='d-blockss' onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>scroll</button>} */}
      <div className="next-prev-btn">
        <button
          className={indexx === 0 ? " disable" : "next-prev"}
          onClick={() => (indexx !== 0 ? nextPage() : "")}
        >
          Prev
        </button>
        {tempData.map((item, index) => (
          <button
            key={index}
            className={`numeric-btn ${indexx === index && "myC"} `}
            onClick={() => {
              newPage(index)
              window.scrollTo({top: 0, behavior: "smooth"})
            }}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={indexx === tempData.length - 1 ? " disable" : "next-prev"}
          onClick={() => (indexx !== tempData.length - 1 ? nextPage() : "")}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default DisplayProduct
