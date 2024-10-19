import {
  Autocomplete,
  Button,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const FilterList = ({ productData, setProductData }) => {
  const [categoriesList, setCategoriesList] = useState(null);
  const [open, setOpen] = useState(false);
  ////////////////////////////////////////////////////////////////
  const [rating, setRating] = useState("");
  const [selectCategory, setSelectCategory] = useState([]);
  const [priceRange, setPriceRange] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const getCategoryList = (value) => {
    const values = Object.values(value).map((item) => item.title);
    setSelectCategory(values);
  };
  const handleChange = (event) => {
    setRating(event.target.value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/category-list"
        );
        const dataWithTitle = response?.data?.map((category) => ({
          title: category,
        }));
        setCategoriesList(dataWithTitle);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCategories();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let filterData = productData?.productData?.products;

    // Filter by category if any category is selected
    if (selectCategory.length > 0) {
      filterData = filterData?.filter((item) =>
        selectCategory.includes(item.category)
      );
    }

    // Filter by price range if priceRange is provided
    // if (priceRange) {
    //   console.log("dfsg");
    //   filterData = filterData?.filter((item) => item.price <= priceRange);
    // }

    // // Filter by rating if rating is provided
    // if (rating) {
    //   filterData = filterData?.filter((item) => item.rating <= rating);
    // }

    console.log(filterData);
    // setProductData(filterData); // Set the filtered product data
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid2 container sx={{ mt: 8 }} spacing={2} alignItems={"center"}>
        <Grid2 size={{ xs: 3 }}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={categoriesList?.map((title) => title) || []}
            getOptionLabel={(option) => option.title}
            onChange={(event, value) => getCategoryList(value)}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select category"
                  placeholder="Category"
                />
              );
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 3 }}>
          <Typography>Price Range</Typography>
          <Slider
            aria-label="Temperature"
            defaultValue={0}
            getAriaValueText={(value) => value}
            valueLabelDisplay="auto"
            onChange={({ target: { value } }) => setPriceRange(value)}
            min={0}
            max={36999.99}
          />
        </Grid2>
        <Grid2 size={{ xs: 3 }}>
          {" "}
          <FormControl sx={{ m: 1 }} fullWidth>
            <InputLabel id="demo-controlled-open-select-label">
              Rating{" "}
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={rating}
              label="Rating"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 3 }}>
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};
