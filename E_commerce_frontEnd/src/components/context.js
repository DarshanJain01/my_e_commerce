import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
const url = "https://course-api.com/react-store-products";
export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [page, setPage] = useState(0);
  const [layout, setLayout] = useState(JSON.parse(localStorage.getItem("lay")));
  const [id, setId] = useState({});
  const [filters, setFilters] = useState({});
  var arr = []

  useEffect(() => {
    fetch_data();
  }, [filters]);

  const fetch_data = async () => {
    setIsLoading(true);
    try {
       const { data } = await axios.get("http://localhost:4000/getData");
     // const { data } = await axios.get("https://fierce-lake-70469.herokuapp.com/getData");

      if (data) {
        filter_data(data)
        setData(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error occured");
    }
  };

  const filter_data=(data)=>{

    if (Object.keys(filters).length === 0) {
      setTempData(paginate(data));
    } else {
      var temp = data;
      if(filters.search){
        console.log(filters.search)
        temp= data.filter((item) => {
           if (item.name.includes(filters.search)) {
             return item;
            }
            return false;
          });
      }
      if (filters.category && filters.category !== "all") {
        temp = temp.filter((i) => i.category === filters.category);
      }
      if (filters.company && filters.company !== "all") {
        temp = temp.filter((i) => i.company === filters.company);
      }
      if (filters.color && filters.color !== "all") {
        temp = temp.filter((i) => i.colors.includes(filters.color));
      }
      if (filters.price) {
        temp = temp.filter((i) => i.price <= filters.price);
      }
      if (filters.shipping) {
        temp = temp.filter((i) => i.shipping <= filters.shipping);
      }
      setTempData(paginate(temp));
    }

  }

  const category_data = (props) => {
    setFilters({...filters,category:props})
  };
  const setCompany = (props) => {
     setFilters({...filters,company:props})
  };

  const setColorFilter = (colo) => {
    setFilters({ ...filters,color: colo });
  };

  const setPrice = (price) => {
    setFilters({ ...filters,price: price });
  };

  const setFreeShipping = (bool) => {
    setFilters({ ...filters,shipping: bool });
  };

  const searchText = (value) => {
    setIsLoading(true)
    setFilters({...filters,search:value})
  };

  const clearFilter = () => {
    setFilters({})
  };

  const sort = (props) => {
    let arr = nonPaginate();

    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length - i - 1; j++) {
        var temp = 0,
          boole = false;

        if (props === "Price (Lowest)") {
          if (arr[j].price > arr[j + 1].price) boole = true;
        } else if (props === "Price (Highest)") {
          if (arr[j].price < arr[j + 1].price) boole = true;
        } else if (props === "Name (A-Z)") {
          if (arr[j].name.charCodeAt(0) > arr[j + 1].name.charCodeAt(0))
            boole = true;
        } else if (props === "Name (Z-A)") {
          if (arr[j].name.charCodeAt(0) < arr[j + 1].name.charCodeAt(0))
            boole = true;
        }
        if (boole) {
          temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    setTempData(paginate(arr));
  };
  const paginate = (followers) => {
    var itemsPerPage = 10;
    var numberOfPages = Math.ceil(followers.length / itemsPerPage);
    var followersArr = Array.from({ length: numberOfPages }, (x, index) => {
      var start = index * itemsPerPage;
      return followers.slice(start, start + itemsPerPage);
    });
    return followersArr;
  };

  const nonPaginate = () => {
    arr = [];
    for (let i = 0; i < tempData.length; i++) {
      arr = [...arr, ...tempData[i]];
    }
    return arr;
  };

  return (
    <AppContext.Provider
      value={{
        layout,
        setLayout,
        sort,
        isSidebarOpen,
        setIsSidebarOpen,
        isFilterOpen,
        setIsFilterOpen,
        isLoading,
        setIsLoading,
        url,
        data,
        fetch_data,
        category_data,
        tempData,
        setTempData,
        setCompany,
        setColorFilter,
        setPrice,
        setFreeShipping,
        clearFilter,
        searchText,
        id,
        setId,
        paginate,
        page,
        setPage,
        filters,
        setFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
