import Card from "@/components/Card/Card";
import CardList from "@/components/CardList/CardList";
import Hero from "@/components/Hero/Hero";
import { getFeaturedProducts } from "@/service/products";

const Page = async () => {
  const products = await getFeaturedProducts() 
  return (
    <>
    <Hero/>
      <CardList>
        {products.map((product) => (
       <Card key={product.id} {...product} />
      ))}
      </CardList>
    </>
  );
};
export default Page;
          



