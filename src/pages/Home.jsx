import { useEffect, useState } from "react";
import "../styles/home.css";
import AnnouncementCard from "../components/AnnouncementCard";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const announcements = [
    {
      title: "New Train Routes",
      message: "We are excited to announce new train routes starting next month.",
      date: "Mar 5, 2025"
    },
    {
      title: "System Maintenance",
      message: "Our system will be down for maintenance on March 1st from 12 AM to 3 AM.",
      date: "Feb 26, 2025"
    },
    {
      title: "Holiday Schedule",
      message: "Please check the holiday schedule for train timings during the festive season.",
      date: "Dec 20, 2024"
    },
    {
      title: "New Train Routes",
      message: "We are excited to announce new train routes starting next month.",
      date: "Mar 5, 2025"
    },
    {
      title: "System Maintenance",
      message: "Our system will be down for maintenance on March 1st from 12 AM to 3 AM.",
      date: "Feb 26, 2025"
    },
    {
      title: "Holiday Schedule",
      message: "Please check the holiday schedule for train timings during the festive season.",
      date: "Dec 20, 2024"
    }
  ];

  announcements.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="home">
      <div className="railway-background">
        <div className="track"></div>
        <div className="track-lights"></div>
        <div className="railway-gradient"></div>
      </div>
      
      <div className="animated-background">
        <div className="animated-shape shape1"></div>
        <div className="animated-shape shape2"></div>
        <div className="animated-shape shape3"></div>
        <div className="animated-shape shape4"></div>
      </div>

      <div 
        className="home-theme" 
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <h1>Welcome to RailLynk</h1>
        <p>Your modern solution for train ticketing, tracking, and travel planning</p>
      </div>
      
      <div className="home-anouncements">
        <h2>Announcements</h2>
        <div className="home-anouncement-cards">
          {announcements.map((announcement, index) => (
            <AnnouncementCard 
              key={index}
              title={announcement.title}
              message={announcement.message}
              date={announcement.date}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                opacity: scrollY > 100 ? 1 : 0,
                transform: scrollY > 100 ? 'translateY(0)' : 'translateY(20px)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;