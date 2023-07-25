import { useState, useEffect } from "react";
import { getCitiesByKeyword } from "../api/citiesData";

const useCitySearch = () => {
  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<string[][]>([]);

  const addSearchTerm = (index: number, term: string) => {
    setSearchTerms((prevTerms) => {
      const newTerms = [...prevTerms];
      newTerms[index] = term;
      return newTerms;
    });
  };

  useEffect(() => {
    const searchCities = async (index: number) => {
      const searchTerm = searchTerms[index];

      if (searchTerm.trim() === "") {
        setSearchResults((prevResults) => {
          const newResults = [...prevResults];
          newResults[index] = [];
          return newResults;
        });
        return;
      }

      const results = await getCitiesByKeyword(searchTerm);

      setSearchResults((prevResults) => {
        const newResults = [...prevResults];
        newResults[index] = results;
        return newResults;
      });
    };

    searchTerms.forEach((_, index) => searchCities(index));
  }, [searchTerms]);

  return { searchTerms, addSearchTerm, searchResults };
};

export default useCitySearch;
