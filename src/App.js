import { snacks } from "./Data";
import React, { useState, useEffect } from "react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [filteredSnacks, setFilteredSnacks] = useState(snacks);
  const [snackFilter, setSnackFilter] = useState({
    nameFilter: false,
    calorieFilter: false,
    priceFilter: false,
    weightFilter: false,
  });

  useEffect(() => {
    filterSnacks();
  }, [snacks, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
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

    setFilteredSnacks(filtered);
  };

  const sortedFilter = snackFilter?.nameFilter
    ? filteredSnacks.sort((a, b) => b.product_name - a.product_name)
    : snackFilter?.weightFilter
    ? filteredSnacks.sort((a, b) => b.product_weight - a.product_weight)
    : snackFilter?.priceFilter
    ? filteredSnacks.sort((a, b) => b.price - a.price)
    : snackFilter?.calorieFilter
    ? filteredSnacks.sort((a, b) => b.calories - a.calories)
    : filteredSnacks;

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
            <th
              onClick={() =>
                setSnackFilter({
                  nameFilter: true,
                  calorieFilter: false,
                  priceFilter: false,
                  weightFilter: false,
                })
              }
            >
              Product Name
            </th>
            <th
              onClick={() =>
                setSnackFilter({
                  nameFilter: false,
                  calorieFilter: false,
                  weightFilter: true,
                  priceFilter: false,
                })
              }
            >
              Product Weight
            </th>
            <th
              onClick={() =>
                setSnackFilter({
                  nameFilter: false,
                  calorieFilter: false,
                  weightFilter: false,
                  priceFilter: true,
                })
              }
            >
              Price
            </th>
            <th
              onClick={() =>
                setSnackFilter({
                  nameFilter: false,
                  calorieFilter: true,
                  weightFilter: false,
                  priceFilter: false,
                })
              }
            >
              Calories
            </th>
            <th
              onClick={() =>
                setSnackFilter({
                  nameFilter: true,
                  calorieFilter: false,
                  weightFilter: false,
                  priceFilter: false,
                })
              }
            >
              Ingredients
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedFilter.map((snack) => (
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
