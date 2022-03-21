import { memo, useState } from 'react'
import dynamic from 'next/dynamic' //same -> lazy from react
import { AddProductToWishlistProps } from './AddProductToWishlist'

// import AddProductToWishlist from './AddProductToWishlist';
const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist')
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  }
  onAddToWishlist: (id: number) => void;
}

const ProductItem = ({ product, onAddToWishlist }: ProductItemProps) => {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  return (
    <div>
      {product.title} - <strong> {product.price} </strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>

      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  )
}

export default memo(ProductItem, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product)
})