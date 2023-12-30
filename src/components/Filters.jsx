import React from "react";
import { HStack, Select, Button, CloseButton } from "@chakra-ui/react";
import FilterPopover from "./FilterPopover";
import names from "../../src/top_1000_table_data_final.json";

const Filters = ({ columnFilters, setColumnFilters }) => {
  const gender = columnFilters.find((f) => f.id === "gender")?.value || "";
  const initial = columnFilters.find((f) => f.id === "initial")?.value || ""; // Corrected to string
  const origin = columnFilters.find((f) => f.id === "origin")?.value || "";

  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );

  const clearFilter = (id) => {
    setColumnFilters((prev) => prev.filter((f) => f.id !== id));
  };

  const clearFilters = () => {
    setColumnFilters([]);
  };

  const uniqueOrigins = Array.from(
    new Set(names.map((item) => (item.origin ?? "").trim()))
  );
  const uniqueInitials = Array.from(
    new Set(names.map((item) => (item.initial ?? "").trim()))
  );
  const uniqueGenders = Array.from(
    new Set(names.map((item) => (item.gender ?? "").trim()))
  );

  return (
    <HStack mb={6} spacing={3}>
      <Select
        placeholder="Select Gender"
        size="sm"
        value={gender}
        onChange={(e) => onFilterChange("gender", e.target.value)}
      >
        {uniqueGenders.map((uniqueGender) => (
          <option key={uniqueGender} value={uniqueGender}>
            {uniqueGender}
          </option>
        ))}
      </Select>
      {gender && (
        <CloseButton size="sm" onClick={() => clearFilter("gender")} />
      )}

      <Select
        placeholder="Select Initial"
        size="sm"
        value={initial}
        onChange={(e) => onFilterChange("initial", e.target.value)}
      >
        {uniqueInitials.map((uniqueInitial) => (
          <option key={uniqueInitial} value={uniqueInitial}>
            {uniqueInitial}
          </option>
        ))}
      </Select>
      {initial && (
        <CloseButton size="sm" onClick={() => clearFilter("initial")} />
      )}

      <Select
        placeholder="Select Origin"
        size="sm"
        value={origin}
        onChange={(e) => onFilterChange("origin", e.target.value)}
      >
        {uniqueOrigins.map((uniqueOrigin) => (
          <option key={uniqueOrigin} value={uniqueOrigin}>
            {uniqueOrigin}
          </option>
        ))}
      </Select>
      {origin && (
        <CloseButton size="sm" onClick={() => clearFilter("origin")} />
      )}

      <Button colorScheme="blue" size="sm" onClick={clearFilters}>
        Clear Filters
      </Button>
    </HStack>
  );
};

export default Filters;
