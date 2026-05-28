import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";

const MontresDetailPage = () => {
  const { id } = useParams();
  const [montre, setMontre] = useState(null);
  const [image, setImage] = useState(0);
  const { addPanier } = useCart();

  useEffect(() => {
    api
      .get(`/montres/${id}`)
      .then((res) => setMontre(res.data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div className="container mt-5">
      {montre ? (
        <>
          <div className="row">
            {/* Colonne gauche - Images de la montre */}
            <div className="col-12 col-md-6">
              {/* Grande image principale */}
              <img
                src={montre.images[image]?.url}
                alt={montre.nom}
                className="img-fluid w-100"
                style={{ height: "500px", objectFit: "contain" }}
              />

              {/* Miniatures cliquables */}
              <div className="d-flex gap-2 mt-3">
                {montre.images.map((img, index) => (
                  <img
                    key={img.id}
                    src={img.url}
                    alt={montre.nom}
                    onClick={() => setImage(index)}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border:
                        image === index
                          ? "2px solid #DCDBD4"
                          : "2px solid transparent",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Colonne droite - Informations de la montre */}
            <div
              className="col-12 col-md-6 mt-4 mt-md-0"
              style={{ color: "#DCDBD4" }}
            >
              <h1>{montre.nom}</h1>
              <h3 className="mt-5">{montre.prix} €</h3>
              <p className="mt-3" style={{ textAlign: "justify" }}>
                {montre.description}
              </p>
              <p>Stock : {montre.stock}</p>
              <button
                className="btn mt-3 w-100"
                style={{ color: "#DCDBD4", borderColor: "#DCDBD4" }}
                onClick={() => addPanier(montre)}
              >
                Ajouter au panier
              </button>
            </div>
          </div>

          {/* Carrousel */}
          {montre.images.length > 0 && (
            <div
              id="carouselImages"
              className="carousel carousel-fade slide mt-5"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {Array.from({
                  length: Math.ceil(montre.images.length / 2),
                }).map((_, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <div className="row" style={{ margin: 0 }}>
                      
                      {/* Image gauche du slide */}
                      {montre.images[index * 2] && (
                        <div className="col-6" style={{ padding: 0 }}>
                          <img
                            src={montre.images[index * 2].url}
                            alt={montre.nom}
                            className="carousel-img img-fluid w-100"
                            onClick={() => setImage(index * 2)}
                          />
                        </div>
                      )}

                      {/* Image droite du slide */}
                      {montre.images[index * 2 + 1] && (
                        <div className="col-6" style={{ padding: 0 }}>
                          <img
                            src={montre.images[index * 2 + 1].url}
                            alt={montre.nom}
                            className="carousel-img img-fluid w-100"
                            onClick={() => setImage(index * 2 + 1)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Flèche gauche */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselImages"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" />
              </button>

              {/* Flèche droite */}
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselImages"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" />
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default MontresDetailPage;
