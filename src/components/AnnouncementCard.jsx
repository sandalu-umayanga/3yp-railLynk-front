import React from "react";
import "../styles/announcementCard.css";

export default function AnnouncementCard({ title, message, date }) {

  const handleClick = () => {
    alert(message);
  };
  
  return (
    <div className="announcement-card">
      <h2>{title}</h2>
      <p>{message}</p>
      <span>{date}</span>
      <button onClick={handleClick}>Read More</button>
    </div>
  );
}
