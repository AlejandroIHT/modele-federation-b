import React, { lazy, Suspense } from 'react';
import useRickAndMorty from './hooks/useRickAndMorty'
const CardMini = lazy(() => import('application_a/CardMini'));

const App = () => {
  const { data, isLoading, isError } = useRickAndMorty();
  const loading = <p>Loading...</p>

  return <Suspense fallback={loading}>
    <h1>Aplication B</h1>
    {isLoading && loading}
    {isError && <p>Something was wrong 🥺</p>}
    {data?.results?.map(character => 
      <CardMini 
        key={character.id} 
        name={character.name} 
        status={character.status} 
        species={character.species} 
        gender={character.gender} 
        image={character.image} 
      />
    )}
  </Suspense>
}

export default App