import React, {useRef, useContext, useState, useEffect} from "react"
import FilterComponent from "./filterComponent"
import DisplayProduct from "./displayProduct"
import {AppContext} from "./context"

const Products = () => {
  const {isLoading, clearFilter, filters} = useContext(AppContext)
  const myRef1 = useRef()
  const myRef2 = useRef()
  const myRef3 = useRef()
  const myRef4 = useRef()

  function showFilterBlock2(props) {
    myRef2.current.classList.toggle("d-none")
    myRef1.current.classList.toggle("d-none")
    myRef1.current.classList.contains("activeSlide")
      ? myRef1.current.classList.toggle("lastSlide")
      : myRef1.current.classList.toggle("activeSlide")
    !myRef3.current.classList.contains("d-none") &&
      myRef3.current.classList.toggle("d-none")
    myRef4.current.classList.toggle("d-none")
    props === "a" && myRef3.current.classList.toggle("d-none")
  }

  useEffect(() => {
    function fun() {
      if (
        Object.keys(filters).length > 0 &&
        myRef1.current.classList?.contains("d-none")
      ) {
        myRef3.current.classList.contains("d-none") &&
          myRef3.current.classList.toggle("d-none")
      } else {
        console.log(myRef3.current.classList  );
        myRef3?.current?.classList?.add("d-none")
      }
    }
    window.addEventListener("resize", fun)
  }, [filters, window.innerWidth])
  return (
    <div>
      <div className="home-navi ">
        <p>
          <a href="/" className="link">
            Home
          </a>
          /Products
        </p>
      </div>
      <div className="product-content">
        <div>
          <div className="main-filter filter-component">
            {/* {" "} */}
            <FilterComponent />
            {/* {" "} */}
          </div>
          <div className=" main-filter2">
            <div className="myStyle">
              <button
                type="submit"
                ref={myRef2}
                className="shop-now "
                onClick={() => {
                  myRef3.current.classList.contains("d-none")
                    ? showFilterBlock2()
                    : showFilterBlock2("b")
                }}
              >
                Apply Filters
              </button>
              <button
                type="submit"
                ref={myRef3}
                className={`shop-now col d-none`}
                onClick={() => {
                  myRef3.current.classList.toggle("d-none")
                  clearFilter()
                }}
              >
                Clear Filters
              </button>
            </div>
            <div ref={myRef1} className="pos d-none">
              <FilterComponent show={showFilterBlock2} />
            </div>
          </div>
        </div>
        <div ref={myRef4}>
          {isLoading ? (
            <div className="loading"></div>
          ) : (
            <div>
              <DisplayProduct />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Products

// props==='a' && myRef3.current.classList.toggle('d-none')
// props==='b' && myRef3.current.classList.toggle('d-none')
//  myRef3.current.classList.toggle('d-none')

// if(myRef.current!==0){
// if(myRef3.current.classList.contains('d-none')) myRef3.current.classList.toggle('d-none');
// myRef.current=0}
