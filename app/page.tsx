import { Container } from "./components/container";
import { HomeBanner } from "./components/homeBanner";
import { ProductCard } from "./components/products/productCard";
import { IProductParams, getProducts } from "@/actions/getProducts";
import { NullData } from "./components/nullData";

interface HomeProps {
  searchParams: IProductParams
}

export default async function Home({searchParams}: HomeProps) {

  const products = await getProducts(searchParams)

  if (products.length === 0) {
    return <NullData title="Oops! Produtos não encontrado. Clique em 'Todos' para limpar os filtros"/>
  }

  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]]
    }

    return array
  }

  const shuffledProducts = shuffleArray(products)

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProducts.map((product: any) => {
            return <ProductCard data={product} key={product.id}/>
          })}
        </div>
      </Container>
    </div>
  )
}