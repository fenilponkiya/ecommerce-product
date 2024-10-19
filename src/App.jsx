import { Card, CardContent, CardMedia, Grid2, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { FilterList } from "./components/filterList";

function App() {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://dummyjson.com/products", {
          params: { limit: 194 },
        });
        setProductData(response?.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };
    fetchdata();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h6>{error}</h6>;
  }
  return (
    <>
      <FilterList productData={productData} setProductData={setProductData} />
      <Grid2 container spacing={3}>
        {productData?.products?.map((data, index) => {
          console.log(data?.price);
          return (
            <Grid2 size={{ xs: 12, md: 3 }} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 300, objectFit: "contain" }}
                  image={data?.thumbnail}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {data?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {data?.description}
                  </Typography>
                  <Typography variant="subtitle1">
                    Price:-{data?.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
    </>
  );
}

export default App;
