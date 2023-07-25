import React, { useState } from "react";
import FormLabel from "./FormLabel";
import useCitySearch from "../hooks/useCitySearch";

const Home: React.FC = () => {
  const [cityOfDestinationFields, setCityOfDestinationFields] = useState<
    string[]
  >([""]);
  const [dateOfTrip, setDateOfTrip] = useState<string>("");
  const [numberOfPassengers, setNumberOfPassengers] = useState<number>(1);

  const { searchTerms, addSearchTerm, searchResults } = useCitySearch();

  const handleAddCityOfDestinationField = () => {
    setCityOfDestinationFields((prevFields) => [...prevFields, ""]);
  };

  const handleRemoveCityOfDestinationField = (index: number) => {
    setCityOfDestinationFields((prevFields) =>
      prevFields.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = () => {
    // Implement the form submission logic here
  };

  // Form validation logic (check if required fields are filled and date is in the future)
  const isFormValid =
    searchTerms[0] !== "" &&
    cityOfDestinationFields.every((field) => field !== "") &&
    new Date(dateOfTrip) > new Date() &&
    numberOfPassengers > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <form>
          {/* City of Origin */}
          <div className="mb-4">
            <FormLabel htmlFor="cityOfOrigin" label="City of Origin" />

            <input
              type="text"
              id="cityOfOrigin"
              value={searchTerms[0] || ""}
              onChange={(e) => addSearchTerm(0, e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            />

            {searchResults[0] && searchResults[0].length > 0 && (
              <ul className="border border-main-light rounded-lg p-2 mt-2">
                {searchResults[0].map((city) => (
                  <li
                    key={city}
                    className="p-2 cursor-pointer hover:bg-main-light rounded-lg"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* City of Destination Fields */}
          {cityOfDestinationFields.map((_, index) => (
            <div className="mb-4" key={index}>
              <FormLabel
                htmlFor={`cityOfDestination_${index}`}
                label="City of destination"
              />

              <input
                type="text"
                id={`cityOfDestination_${index}`}
                value={searchTerms[index + 1] || ""}
                onChange={(e) => addSearchTerm(index + 1, e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              />

              {searchResults[index + 1] &&
                searchResults[index + 1].length > 0 && (
                  <ul className="border border-main-light rounded-lg p-2 mt-2">
                    {searchResults[index + 1].map((city) => (
                      <li
                        key={city}
                        className="p-2 cursor-pointer hover:bg-main-light rounded-lg"
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCityOfDestinationField(index)}
                  className="mt-2 px-3 py-1 rounded-lg bg-red-500 text-white"
                >
                  Remove City of Destination
                </button>
              )}
            </div>
          ))}

          {/* Add Destination Button */}
          <button
            type="button"
            onClick={handleAddCityOfDestinationField}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white"
          >
            Add Destination
          </button>

          {/* Date of the Trip */}
          <div className="mb-4">
            <FormLabel htmlFor="dateOfTrip" label="Date of the Trip" />

            <input
              type="date"
              id="dateOfTrip"
              value={dateOfTrip}
              onChange={(e) => setDateOfTrip(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            />
            {/* Implement the date input field for Date of the Trip */}
            {/* ... */}
          </div>

          {/* Number of Passengers */}
          <div className="mb-4">
            <FormLabel
              htmlFor="numberOfPassengers"
              label="Number of Passengers"
            />

            <input
              type="number"
              id="numberOfPassengers"
              value={numberOfPassengers}
              onChange={(e) => setNumberOfPassengers(parseInt(e.target.value))}
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              isFormValid
                ? "bg-blue-500 text-white"
                : "bg-gray-400 text-gray-800"
            }`}
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
