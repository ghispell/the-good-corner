import { Category } from "@/components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;

const POST_AD = gql`
  mutation Mutation($data: NewAdInput!) {
    createNewAd(data: $data) {
      description
      id
      imgUrl
      owner
      price
      title
      ville
      category {
        id
      }
    }
  }
`;

const NewAd = () => {
  const {
    loading: catLoading,
    error: catError,
    data: catData,
  } = useQuery(GET_ALL_CATEGORIES);
  const [addAd, { data: adData, loading: adLoading, error: adError }] =
    useMutation(POST_AD);

  if (catLoading || adLoading) return <p>Loading...</p>;
  if (catError || adError) return <p>Error</p>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        console.log("formdata entries", formData.entries());

        const formJson = Object.fromEntries(formData.entries());

        console.log(formJson.price);
        addAd({
          variables: {
            data: { ...formJson, price: parseInt(formJson.price as string) },
          },
        });
      }}
    >
      <label>
        Titre de l&apos;annonce: <br />
        <input className="text-field" name="title" />
      </label>
      <br />
      <label>
        Description: <br />
        <input className="text-field" name="description" />
      </label>
      <br />
      <label>
        Vendeur: <br />
        <input className="text-field" name="owner" />
      </label>
      <br />
      <label>
        Prix: <br />
        <input className="text-field" type="number" name="price" />
      </label>
      <br />
      <label>
        Image: <br />
        <input className="text-field" name="imgUrl" />
      </label>
      <br />
      <label>
        Ville: <br />
        <input className="text-field" name="ville" />
      </label>
      <br />
      <select name="category">
        {catData.getAllCategories.map((el: any) => (
          <option value={el.id} key={el.id}>
            {el.name}
          </option>
        ))}
      </select>
      <button className="button">Submit</button>
    </form>
  );
};

export default NewAd;
