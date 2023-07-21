import React, { useEffect } from "react";
import { useState } from "react";
import PokeList from "./PokeList";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  //using axios to fetch data from PokeAPI
  useEffect(() => {
    setLoading(true)
    axios.get(currentPageUrl).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })
  }, [currentPageUrl])

  if(loading) return "Loading Pokemon..."
  return (
   <PokeList pokemon = { pokemon }/>
  );
}

export default App;
