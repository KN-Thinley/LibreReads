// import React from "react";
// import TextField from "@mui/material/TextField";
// import SearchIcon from "@mui/icons-material/Search";

// function SearchBar({ onSearch }) {
//   const handleSearch = (event) => {
//     const query = event.target.value;
//     onSearch(query);
//   };

//   return (
//     <div>
//       <TextField
//         label="Search"
//         fullWidth
//         InputProps={{
//           startAdornment: <SearchIcon color="action" />,
//         }}
//         onChange={handleSearch}
//         sx={{
//           ":focus": {
//             borderColor: "#82ca9f",
//           },
//           ":hover": {
//             borderColor: "#82ca9f",
//           },
//         }}
//       />
//     </div>
//   );
// }

// export default SearchBar;


import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ onSearch, options }) {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          fullWidth
          InputProps={{
            ...params.InputProps,
            startAdornment: <SearchIcon color="action" />,
          }}
        />
      )}
      onChange={(event, newValue) => {
        onSearch(newValue); // Call your search function with the selected value
      }}
    />
  );
}

export default SearchBar;
