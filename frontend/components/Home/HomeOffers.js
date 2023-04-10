import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "../globals/Carousel";

export default function HomeOffers() {
  const [offers, setOffers] = useState([]);
  const [offerImages, setOfferImages] = useState([]);

  useEffect(() => {
    if (offers.length > 0) {
      setOfferImages(offers.map((offer) => offer.img));
    } else {
      axios
        .get(`http://localhost:5500/offers`)
        .then((response) => {
          setOffers(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch offers:", error);
        });
    }
  }, [offers]);

  return (
    <div>{offerImages.length > 0 && <Carousel images={offerImages} />}</div>
  );
}
