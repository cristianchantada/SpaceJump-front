import { formatDate, formatDateTime } from "../utils/formatDateFunctions";
import { useTranslation } from "react-i18next";
import { deleteTravel, closeOpenTravel } from "../../redux/actions";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getSendEmail, getTravel } from "../../api/serviceTravels";
import { useSelector, useDispatch } from "react-redux";
import FavoriteHeart from "../utils/FavoriteHeart";
import React, { useEffect, useState } from "react";
import Loading from "../utils/spinner/Loading";
import IconMsg from "../chat/IconMsg";
import "./css/travelDescription.css";
import Layout from "../Layout";
import {
  getIsLogged,
  getUserId,
  getTravelById,
  getUi,
} from "../../redux/selectors";

const TravelDescription = () => {
  const { id } = useParams();
  const [travel, setTravel] = useState(null);
  const isLogged = useSelector(getIsLogged);
  const userId = useSelector(getUserId);
  const { isLoading, error } = useSelector(getUi);
  const travelById = useSelector(getTravelById(id));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteProcess, setDeleteProcess] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [email, setEmail] = useState({
    name: "",
    surnames: "",
    companyName: "",
    textEmail: "",
    user: "",
  });

  useEffect(() => {
    if (!travelById) {
      getTravel(id)
        .then((response) => {
          setTravel(response);
        })
        .catch((error) => {
          console.error("Error fetching travel details:", error);
        });
    } else {
      setTravel(travelById);
    }
  }, [id, travelById]);
  const { t } = useTranslation();

  if (!travel) {
    return <p>Loading...</p>;
  }

  const handleEdit = () => {
    navigate(`/travel-edit/${travel.topic}/${id}`);
  };

  const HandleDeleteProcess = (value) => () => {
    setDeleteProcess(value);
  };

  const handleDelete = () => {
    dispatch(deleteTravel(id));
    navigate("/travels");
  };

  const handleReturn = () => {
    return navigate("/travels");
  };

  const handleCloseTravel = () => {
    dispatch(closeOpenTravel(travel._id, !travel.active));
    setTravel({ ...travel, active: !travel.active });
  };

  const handleBuy = (event) => {
    event.preventDefault();
    return navigate(`/travelBuy/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleEmail = (event) => {
    setSendEmail(true);
  };

  const handleEmailReturn = (event) => {
    setSendEmail(false);
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setEmail({ ...email, [name]: value });

      return;
    }
    if (name === "surnames") {
      setEmail({ ...email, [name]: value });
      return;
    }
    if (name === "companyName") {
      setEmail({ ...email, [name]: value });
      return;
    }
    if (name === "textEmail") {
      setEmail({ ...email, [name]: value, user: travel.userName });
      return;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    getSendEmail(email).then((response) => alert(response.msg));
  };

  const isDisabled =
    !email.name || !email.surnames || !email.companyName || !email.textEmail;

  return (
    <Layout>
      <section className="travel-description-page">
        <div id="container-travel-description">
          <div className="product-details-travel-description">
            <h1>{travel.topic}</h1>
            <p>
              {t("travel_description.published")}{" "}
              {formatDate(travel.datetimeCreation)}
            </p>
            <p className="information">"{travel.remarks}"</p>
            <div className="contact-buttons">
              {travel.active && isLogged && travel.forSale ? (
                <>
                  {userId === travel.userId ? (
                    <p>{t("travel_description.own-property")}</p>
                  ) : (
                    <button
                      onClick={handleBuy}
                      className="btn-travel-description"
                    >
                      <span className="price-travel-description">
                        {travel.price}€
                      </span>
                      <span className="shopping-cart-travel-description">
                        <i
                          className="fa fa-shopping-cart"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <span className="buy-travel-description">
                        {t("travel_description.buy-button")}
                      </span>
                    </button>
                  )}
                </>
              ) : travel.active && isLogged && !travel.forSale ? (
                sendEmail ? (
                  <form onSubmit={handleSubmit} className="new-email-form">
                    <label htmlFor="name">
                      {t("travel_description.form-name")}
                    </label>
                    <br></br>
                    <input
                      value={email.name}
                      onChange={handleChange}
                      type="text"
                      name="name"
                      id="name"
                      required
                    />
                    <br></br>
                    <label htmlFor="surnames" className="surnames">
                      {t("travel_description.form-second-name")}
                    </label>
                    <br></br>
                    <input
                      value={email.surname}
                      onChange={handleChange}
                      type="text"
                      name="surnames"
                      id="surnames"
                      required
                    />
                    <br></br>
                    <label htmlFor="companyName" className="companyName">
                      {t("travel_description.company")}
                    </label>
                    <br></br>
                    <input
                      value={email.companyName}
                      onChange={handleChange}
                      type="text"
                      name="companyName"
                      id="companyName"
                      required
                    />
                    <hr></hr>
                    <label htmlFor="textEmail">
                      {t("travel_description.remarks")}
                    </label>
                    <br></br>
                    <textarea
                      value={email.textEmail}
                      onChange={handleChange}
                      name="textEmail"
                      id="textEmail"
                    ></textarea>
                    <br></br>
                    <button type="submit" disabled={isDisabled}>
                      {t("travel_description.send-mail")}
                    </button>
                    <br></br>
                    <button type="submit" onClick={handleEmailReturn}>
                      {t("travel_description.back")}
                    </button>

                    {error ? (
                      <div className="error">
                        <p> {error}</p>
                      </div>
                    ) : null}
                  </form>
                ) : (
                  <>
                    <NavLink
                      className="bi bi-whatsapp "
                      to={`https://api.whatsapp.com/send?phone=${process.env.REACT_APP_API_TELEFONO_WHATSAPP}`}
                    >
                      <button className="p-3 mb-2 bg-success text-white">
                        {t("travel_description.whatsapp")}
                        <svg
                          width="26"
                          height="26"
                          fill="currentColor"
                          className="bi bi-whatsapp"
                          viewBox="0 0 16 16"
                        >
                          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                        </svg>
                      </button>
                    </NavLink>
                    <form method="get">
                      <button
                        className="p-3 mb-2 bg-info text-white"
                        onClick={handleEmail}
                      >
                        {t("travel_description.send-mail-user")}
                      </button>
                    </form>
                  </>
                )
              ) : null}
            </div>

            <div id="open-close-travel">
              {isLogged && userId === travel.userId ? (
                travel.active ? (
                  <>
                    <p>{t("travel_description.close-travel")}</p>
                    <p>{t("travel_description.close-travel-info")}</p>
                    <button
                      className="btn-travel-description p-3 m-2"
                      onClick={handleCloseTravel}
                    >
                      {t("travel_description.close-travel-button")}
                    </button>
                  </>
                ) : (
                  <>
                    <p>{t("travel_description.open-travel")}</p>
                    <button
                      className="btn-travel-description p-3 m-2"
                      onClick={handleCloseTravel}
                    >
                      {t("travel_description.open-travel-button")}
                    </button>
                  </>
                )
              ) : null}
            </div>

            {isLogged && userId !== travel.userId ? (
              <div className="product-compare-icon">
                <FavoriteHeart
                  travelId={travel._id}
                  checked={travel.favorite}
                />
                <IconMsg travelId={travel._id} />
              </div>
            ) : null}
          </div>
          <div className="product-image-travel-description">
            {travel.photo ? (
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${travel.photo}`}
                alt={travel.topic}
              />
            ) : null}
            <div className="info-overlay">
              <p className="overlay-text">
                {t("travel_description.more-details")}
              </p>
            </div>
            <div className="info-travel-description">
              <h2>{t("travel_description.description")}</h2>
              <ul>
                <li>
                  <strong>{t("travel_description.origin")}</strong>
                  {travel.origin}
                </li>
                <li>
                  <strong>{t("travel_description.destination")}</strong>
                  {travel.destination}
                </li>
                <li>
                  <strong>{t("travel_description.remarks-description")}</strong>
                  {travel.remarks}
                </li>
                <li>
                  <strong>{t("travel_description.travel-departure")}</strong>
                  {formatDateTime(travel.datetimeDeparture)}
                </li>
                <li>
                  <strong>{t("travel_description.capacity")}</strong>
                  {travel.availableSeats}
                </li>
                <li>
                  <strong>{t("travel_description.available-seats")}</strong>
                  {travel.availableSeats - travel.soldSeats}
                </li>
              </ul>
            </div>
          </div>
          {error ? (
            <div className="error">
              <p> {error}</p>
            </div>
          ) : null}
        </div>
        <div className="travel-buttons">
          {isLogged && userId === travel.userId ? (
            <>
              <button
                onClick={handleEdit}
                className="btn-travel-description btn-edit p-3 m-2"
              >
                {t("travel_description.edit-travel")}
              </button>
              {!deleteProcess ? (
                <button
                  onClick={HandleDeleteProcess(true)}
                  className="btn-travel-description btn-delete p-3 m-2"
                >
                  {t("travel_description.delete-travel")}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleDelete}
                    className="btn-travel-description btn-danger p-3 m-2"
                  >
                    {t("travel_description.confirm-delete")}
                  </button>
                  <button
                    onClick={HandleDeleteProcess(false)}
                    className="btn-travel-description btn-cancel p-3 m-2"
                  >
                    {t("travel_description.cancel-delete")}
                  </button>
                </>
              )}
            </>
          ) : null}
          <button
            className="btn-travel-description p-3 m-2"
            onClick={handleReturn}
          >
            {t("travel_description.back")}
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default TravelDescription;
