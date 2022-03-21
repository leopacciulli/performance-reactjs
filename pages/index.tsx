import { FormEvent, useCallback, useState } from "react"
import SearchResults from "./components/SearchResults";

const Home = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    setResults(data)
  }

  const handleAddToWishlist = useCallback(async (id: number) => { 
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />  

        <button type="submit">
          Buscar  
        </button>
      </form>

      <SearchResults
        results={results}
        onAddToWishlist={handleAddToWishlist}
      />
    </div>
  )
}

export default Home

/**
 * Quando react da re-render
 * 1 - Criar uma nova versão do componente
 * 2 - Comparar com a versão anterior
 * 3 - Se houverem alterações, vai atualizar o que alterou
 */

/**
 * Situações para usar o memo
 * 1 - Pure Functional Components
 * 2 - Renders too ofen
 * 3 - Re-renders with same props
 * 4 - Medium to big size
 */

/**
 * useMemo
 * 1 - Calculos pesados
 * 2 - Igualdade referencial (quando a gente repassa aquela informação a um componente filho)
 */

/**
 * useCallback
 * 1 - Usar para evitar uma recriação de um componente filho, quando uma função é passada do pai a esse componente filho - (conceito de prop drillings)
 */