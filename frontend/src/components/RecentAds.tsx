import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

const GET_ALL_ADS = gql`
  query GetAllAds {
    getAllAds {
      id
      title
      description
      owner
      ville
      imgUrl
    }
  }
`;

const RecentAds = () => {
  const [total, setTotal] = useState(
    localStorage.getItem("CART_TOTAL")
      ? JSON.parse(localStorage.getItem("CART_TOTAL") as string)
      : 0
  );
  const router = useRouter();


  const { loading, error, data } = useQuery(GET_ALL_ADS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;


  return (
    <>
      <h2>Annonces récentes</h2>
      <p>Cout total: {total} €</p>
      <section className="recent-ads">
        {data.getAllAds.map((ad: any) => (
          <div key={ad.id}>
            <AdCard
              imgUrl={ad.imgUrl}
              link={`/ad/${ad.id}`}
              price={ad.price}
              title={ad.title}
            />
            <button
              className="button"
              onClick={() => {
                setTotal(total + ad.price);
                localStorage.setItem(
                  "CART_TOTAL",
                  JSON.stringify(total + ad.price)
                );
              }}
            >
              Ajouter le prix au total
            </button>
            {/*  <button
              className="button"
              onClick={async () => {
                try {
                  await axios.delete(`http://localhost:5000/ads/${ad.id}`);
                  try {
                    const result = await axios.get<AdCardProps[]>(
                      "http://localhost:5000/ads"
                    );
                    setAds(result.data);
                  } catch (err) {}
                } catch (err) {
                  console.log("err", err);
                }
              }}
            >
              Delete
            </button> */}
          </div>
        ))}
      </section>
    </>
  );
};

export default RecentAds;
