import React, { useEffect } from "react";
import { useState } from "react";
import PokeList from "./PokeList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  //using axios to fetch data from PokeAPI
  useEffect(() => {
    setLoading(true)
    let cancel; // variable declared to set axios cancelToken for cancelling extra reqs...

    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken((c) => {cancel = c})
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    //cleanup function
    return () => cancel()
  }, [currentPageUrl])

  function goToNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }

  if(loading) return "Loading Pokemon..."
  return (
    <>
      <PokeList pokemon = { pokemon }/>
      <Pagination goToNextPage = { nextPageUrl ? goToNextPage : null } 
                  goToPrevPage = { prevPageUrl ? goToPrevPage : null }
      />
   </>
  );
}

export default App;
