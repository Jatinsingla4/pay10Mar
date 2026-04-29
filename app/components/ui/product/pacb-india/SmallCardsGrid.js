import React from "react";
import Style from "./SmallCardsGrid.module.scss";
import Image from "next/image";

const SmallCardsGrid = ({ items = [], imageBase = '' }) => {
  // Default cards if no items provided
  const defaultCards = [
    {
      width: 136,
      height: 48,
      icon: "/images/icons/upi.svg",
      alt: "UPI",
    },
    {
      width: 159,
      height: 52,
      icon: "/images/icons/cards.svg",
      alt: "Cards",
    },
    {
      width: 234,
      height: 52,
      icon: "/images/icons/net_banking.svg",
      alt: "Net Banking",
    },
    {
      width: 263,
      height: 52,
      icon: "/images/icons/pay10_wallet.svg",
      alt: "Pay10 Wallet",
    },
  ];

  // Use provided items or fallback to default
  const allCards = items.length > 0 
    ? items.map((item) => ({
        width: 136,
        height: 48,
        icon: item.Image ? `${imageBase}${item.Image}` : "/images/icons/upi.svg",
        alt: item.Title || "Payment Method",
      }))
    : defaultCards;

  return (  
    <div className={Style.small_cards_container}>
      {allCards.map((card, idx) => (
        <div key={idx} className={Style.small_cards} data-animation="opacity-up">
          <Image
            width={card.width}
            height={card.height}
            src={card.icon}
            alt={card.alt}
          />
        </div>
      ))}
    </div>
  );
};

export default SmallCardsGrid;
