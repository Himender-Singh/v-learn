import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  console.log("url" , url);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const token = localStorage.getItem("token"); 
      console.log(token ,"token found");
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message || "Something went wrong");
        }

        console.log(result , "data will be");
        setData(result.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
