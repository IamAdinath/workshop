import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const titleMap: { [key: string]: string } = {
  "/": "Home - My Website",
  "/about": "About Us - My Website",
  "/contact": "Contact Us - My Website",
  "/services": "Our Services - My Website",
  "/products": "Products - My Website",
  "/blog": "Blog - My Website",
};

const DynamicTitle = () => {
  const location = useLocation();
  const title = titleMap[location.pathname] || "My Website";

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default DynamicTitle;
