import WishlistPage from "@/components/pages/wishlist";
import { URL } from "@/constants/url";

export default async function WishList() {
    const data = await fetch(`${URL}/api/shop`);
    const products = await data.json()
  
    return (
        <WishlistPage tractors={products.tractors} />
    )
}