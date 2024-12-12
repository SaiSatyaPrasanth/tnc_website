import React, { useState, useEffect } from 'react';

type Notification = {
  id: string;
  text: string;
  isNew: boolean;
};

type Props = {};

const Banner: React.FC<Props> = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // List of video URLs (unchanged)
  const videoUrls = [
    "https://www.youtube.com/embed/0PgqYFf__u8?si=nTKOYNepoLEbbi5x",
    "https://www.youtube.com/embed/HSVAaxyAA7I?si=J8BF3c0UPyeuLNAd",
    "https://www.youtube.com/embed/i8qYzYOHsiU?si=tnswfUlgXzRiT-hs",
    "https://www.youtube.com/embed/LtYzz73fjTQ?si=G44-ItQEdRoGR5aJ"
  ];

  // Fetch notifications from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.120:8012/api/resource/Website Latest News?fields=[\"name\",\"title\",\"isnew\"]"
        );
        const data = await response.json();

        // Map the API response to match the existing Notification type
        const fetchedNotifications: Notification[] = data.data.map((item: any, index: number) => ({
          id: item.name, // Using "name" as the unique identifier
          text: item.title, // Using "title" as the notification text
          isNew: item.isnew, // Using "isnew" to determine if the notification is new
        }));

        // Update state with fetched notifications
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <section className="custom-section">
      <div className="custom-section-grid">
        {/* Video Slider Section */}
        <div className="custom-video-slider">
          <div className="custom-swiper-container">
            <div className="swiper-wrapper">
              {/* Loop over the video URLs */}
              {videoUrls.map((url, index) => (
                <div className="swiper-slide" key={index}>
                  <iframe
                    src={url}
                    title={`YouTube video ${index + 1}`}
                    className="custom-video-iframe"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notification Section */}
        <div className="custom-notifications">
          <h3 className="custom-notifications-title">Notification</h3>
          <ul className="custom-notifications-list">
            {/* Loop over the notifications */}
            {notifications.map((notification) => (
              <li className="custom-notification-item" key={notification.id}>
                <a href="#" className="custom-notification-link">
                  {notification.text}
                  {notification.isNew && <span className="custom-badge">new</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Banner;
