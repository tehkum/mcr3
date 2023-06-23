import { snacks } from "./Data";
import React, { useState, useEffect } from "react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSnacks, setFilteredSnacks] = useState(snacks);
  const [snackFilter, setSnackFilter] = useState("");

  useEffect(() => {
    filterSnacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snacks, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSort = (filter) => {
    setSnackFilter(filter);
  };

  const filterSnacks = () => {
    let filtered = [...snacks];

    if (searchQuery) {
      filtered = filtered.filter(
        (snack) =>
          snack.product_name.toLowerCase().includes(searchQuery) ||
          snack.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchQuery)
          )
      );
    }

    if (snackFilter === "name") {
      filtered.sort((a, b) => b.product_name.localeCompare(a.product_name));
    } else if (snackFilter === "weight") {
      filtered.sort((a, b) => b.product_weight - a.product_weight);
    } else if (snackFilter === "price") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (snackFilter === "calories") {
      filtered.sort((a, b) => b.calories - a.calories);
    }

    setFilteredSnacks(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by product name or ingredients"
        value={searchQuery}
        onChange={handleSearch}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={() => handleSort("name")}>Product Name</th>
            <th onClick={() => handleSort("weight")}>Product Weight</th>
            <th onClick={() => handleSort("price")}>Price</th>
            <th onClick={() => handleSort("calories")}>Calories</th>
            <th onClick={() => handleSort("name")}>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {filteredSnacks.map((snack) => (
            <tr key={snack.id}>
              <td>{snack.id}</td>
              <td>{snack.product_name}</td>
              <td>{snack.product_weight}</td>
              <td>{snack.price}</td>
              <td>{snack.calories}</td>
              <td>{snack.ingredients.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
