import "../styles/home.css";
import AnnouncementCard from "../components/AnnouncementCard";

const Home = () => {

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
      <div className="home-theme">
      <div className="overlay">
        <h1>Welcome to the Railway Ticketing System</h1>
        <p>Book tickets, track trains, and reserve seats with ease.</p>
        </div>
        <div className="custom-wave">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,192 C480,320 960,64 1440,192 L1440,320 L0,320 Z" fill="white"></path>
          </svg>
        </div>

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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
