import SliderComponent from "../../Components/SliderComponent";
import CardComponent from "../../Components/CardComponents/CardComponent";
import { WrapperCartComponent } from "./style";
import { Pagination } from "antd";
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
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const productsPerPage = 15; // Number of products per page

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

  // Function to handle pagination change
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

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
        {/* Pagination component */}
        <Pagination
          style={{ marginTop: "20px", textAlign: "center" }}
          current={currentPage}
          pageSize={productsPerPage}
          total={products.length}
          onChange={handlePaginationChange}
        />
        {/* Scroll to top button */}
        <button
          style={{
            position: "fixed",
            bottom: "15px",
            right: "15px",
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
