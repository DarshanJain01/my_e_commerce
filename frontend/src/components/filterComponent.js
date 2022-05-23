import React, {useContext, useState, useEffect} from "react"
import Slider from "@material-ui/core/Slider";
import {FaTimes} from "react-icons/fa"
import {AppContext} from "./context"
import {TiTick} from "react-icons/ti"
import InputRange from "react-input-range"
import "react-input-range/lib/css/index.css"
const FilterComponent = (props) => {
  const {
    data,
    category_data,
    setCompany,
    setColorFilter,
    setPrice,
    setFreeShipping,
    clearFilter,
    searchText,
    filters,
  } = useContext(AppContext)
  const category = ["all", ...new Set(data.map((item) => item.category))]
  const companies = ["all", ...new Set(data.map((item) => item.company))]
  const [colorArr, setColorArr] = useState([])
  const [slider, setSlider] = useState(3099)

  useEffect(() => {
    var allColors = []
    data.forEach((item) => {
      allColors = [...allColors, ...item.colors]
    })
    allColors = ["all", ...new Set(allColors)]
    var objArr = allColors.map((item) => {
      return {color: item, isChecked: item === "all" ? true : false}
    })
    setColorArr(objArr)
    window.addEventListener("onChange", function (event) {
      event.preventDefault()
    })
  }, [data])

  return (
    <div>
      <div className="myFilte">
        {" "}
        <FaTimes
          className="main-filter2 cross-icons"
          onClick={() => {
            Object.keys(filters).length !== 0 ? props.show("a") : props.show()
          }}
        />
      </div>

      <div className="filter-component">
        <div>
          <input
            type="text"
            onChange={(e) => {
              searchText(e.target.value.toLowerCase())
            }}
            className="search-input"
            placeholder="search"
          ></input>
        </div>

        <div className="myFil">
          <h3>Category</h3>
          <div className="myFilter">
            {category.map((cat, index) => (
              <button
                key={index}
                className={`filter-btns ${
                  cat === filters.category && "filter-btn"
                }`}
                onClick={() => {
                  category_data(cat)
                }}
              >
                {" "}
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="myFilters">
          <h3>Company </h3>
          <select
            onChange={(e) => {
              setCompany(e.target.value)
            }}
            className="myFiltersss"
            name="company"
            style={{
              display: "block",
              padding: "2%",
              background: "#F1F5F8",
              marginTop: "2%",
            }}
          >
            {companies.map((compName, index) => (
              <option
                selected={filters.company === compName}
                key={index}
                style={{display: "block", fontSize: "1rem"}}
              >
                {compName}
              </option>
            ))}
          </select>
        </div>
        <div className="myFilterss">
          <h3>Colors</h3>

          <div className="colorbtn-container">
            {colorArr.map((item, index) => {
              return (
                <button
                  onClick={() => {
                    setColorFilter(item.color)
                  }}
                  key={index}
                  className="myColors"
                  style={{backgroundColor: item.color}}
                >
                  {item.color === "all" ? "All" : ""}
                  {filters.color === item.color && item.color !== "all" ? (
                    <TiTick style={{color: "white"}} />
                  ) : (
                    ""
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <div className="myFiltersss">
          <h3 style={{display: "flex"}}>
            $ <span>{filters.price || slider}</span>
          </h3>
          <InputRange
            className="inpu"
            step={100}
            value={slider}
            maxValue={309999}
            minValue={3099}
            onChange={(value) => {
              setSlider(value)
              setPrice(value)
            }}
          />
            {/* <SliderN
              value={slider}
              className="inpu"
              onChange={(value) => {
                setSlider(value)
                setPrice(value)
              }}
              
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={3099}
              max={309999}
            /> */}
        </div>

        <div
          style={{
            display: "grid",
            width: "90%",
            gridTemplateColumns: "auto auto",
            alignItems: "center",
            fontSize: "1rem",
          }}
        >
          <div className="myFiltersss">
            <h3>
              Free Shipping
              <input
                checked={filters.shipping && filters.shipping}
                className="free-shipping"
                onChange={() => {
                  setFreeShipping(!filters.shipping)
                }}
                type="checkbox"
              ></input>
            </h3>
          </div>
        </div>

        <button
          className="clear-filter"
          onClick={() => {
            clearFilter()
          }}
        >
          clear filters
        </button>
      </div>
    </div>
  )
}
export default FilterComponent
