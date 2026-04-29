import React from "react";
import Style from "./VerticalCardListing.module.scss";

const VerticalCardsListing = ({ items = [] }) => {
  // Default cards if no items provided
  const defaultCards = [
    {
      Title: "CREATE A LINK",
      Description: "Start by creating a payment link for an order on your merchant portal or the Pay10 Biz app. ",
      number: 1,
    },
    {
      Title: "SHARE THE LINK",
      Description: "Paste or embed unlimited links in an email or text message or use a chatbot to send it to your customers.",
      number: 2,
    },
    {
      Title: "GET NOTIFIED",
      Description: "Real time alerts every time you receive a payment.",
      number: 3,
    },
  ];

  // Use provided items or fallback to default
  const verticalCardsData = items.length > 0
    ? items.map((item, index) => ({
        title: item.Title || '',
        description: item.Description || '',
        number: index + 1,
      }))
    : defaultCards;

  return (
    <div className={Style.vertical_cards}>
      {verticalCardsData.map((card, idx) => (
        <div className={Style.card} key={idx} data-animation="opacity-up" data-anim-delay="100">
          <div className={Style.number}>
            <h3>{card.number}</h3>
          </div>
          <div className={Style.card_content}>
            <h4>{card.title}</h4>
            <p dangerouslySetInnerHTML={{ __html: card.description }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalCardsListing;
