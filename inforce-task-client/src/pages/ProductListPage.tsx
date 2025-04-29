import ProductList from "../components/ProductList.tsx";
import { Option } from "../types/filters.type.ts";

const ProductListPage: React.FC<{activeFilter: Option}> = ({activeFilter}) => {
    return <ProductList activeFilter={activeFilter} />;
};

export default ProductListPage;