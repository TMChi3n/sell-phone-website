import SliderComponent from "../../Components/SliderComponent";
import CardComponent from "../../Components/CardComponents/CardComponent";
import { WrapperCartComponent } from "./style";
import ProductFilter from "../../Components/ProductFilter/ProductFilter";
import { useEffect, useState } from "react";
import {
  getAllProductRequest,
  filterRequest,
} from "../../apiService/apiService";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import IconScroll from "../../assets/images/ScrollDownToUp.png";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [hasFilteredProducts, setHasFilteredProducts] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllProductRequest();
      setProducts(result.data);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    if (!searchParams.toString()) {
      const fetchApi = async () => {
        const result = await getAllProductRequest();
        setProducts(result.data);
        setHasFilteredProducts(true);
      };
      fetchApi();
    } else {
      let paramsObject = {};
      for (let [key, value] of searchParams.entries()) {
        paramsObject[key] = value;
      }
      if (
        Object.keys(paramsObject).length === 0 &&
        paramsObject.constructor === Object
      ) {
        return;
      }
      console.log(paramsObject);
      const fetchApi = async () => {
        try {
          const result = await filterRequest(paramsObject);
          setProducts(result.products);
          setHasFilteredProducts(result.products.length > 0);
        } catch (e) {
          console.error("Error when fetching filtered products:", e);
          setHasFilteredProducts(false);
        }
      };
      fetchApi();
    }
  }, [searchParams]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll animation
    });
  };

  // Function to handle navigation to the previous page
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Function to handle navigation to the next page
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, products.length);

  return (
    <div style={{ position: "relative", height: "1500px" }}>
      <SliderComponent />
      <ProductFilter />
      <div
        style={{
          width: "100%",
          minHeight: "80%",
          background: "#f5f5fa",
          borderRadius: "40px",
          position: "relative", // Add relative positioning to the parent container
        }}
      >
        <WrapperCartComponent>
          {hasFilteredProducts ? (
            // Display products for the current page
            products.slice(startIndex, endIndex).map((item) => (
              <Link key={item.id_product} to={`/product/${item.id_product}`}>
                <CardComponent data={item}></CardComponent>
              </Link>
            ))
          ) : (
            <p style={{ textAlign: "center", padding: "20px" }}>
              Products not found
            </p>
          )}
        </WrapperCartComponent>
        {/* Pagination */}
        <div
          style={{
            position: "absolute",
            bottom: "0%",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            {"<"}
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            {">"}
          </button>
        </div>
        {/* Scroll to top button */}
        <button
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "9999",
            cursor: "pointer",
            border: "none",
            background: "none",
          }}
          onClick={scrollToTop}
        >
          <img src={IconScroll} alt="Scroll to top" />
        </button>
      </div>
    </div>
  );
}

export default HomePage;
