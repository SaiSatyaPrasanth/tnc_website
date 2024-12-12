import React, { useState, useEffect } from 'react';

type Event = {
  date: string;
  title: string;
  image: string;
  link: string;
};

const EventSection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.120:8012/api/resource/Website Events?fields=[\"name\",\"event_date\",\"title\",\"thumbnail\",\"link\"]"
        );
        const data = await response.json();

        // Map the API response to match the Event type
        const fetchedEvents: Event[] = data.data.map((item: any) => ({
          date: item.event_date, // You may need to adjust this if you have a date field in the API response
          title: item.title,
          image: item.thumbnail, // Assuming "thumbnail" is the image URL
          link: item.link,
        }));

        setEvents(fetchedEvents); // Update the state with fetched events
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section
      className="event__area section-pt-120 section-pb-60"
      data-background="/img/bg/courses_bg.jpg"
    >
      <div className="container">
        <div className="event__inner-wrap">
          <div className="row">
            <div
              className="col-30"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="event__content">
                <div className="section__title mb-20">
                  <span className="sub-title">Upcoming Events</span>
                  <h2 className="title">
                    Latest News and Important Announcements
                  </h2>
                </div>
                <p>
                  Stay up-to-date with the latest news and announcements on exam
                  applications, result dates, and crucial updates for all nursing
                  examinations, sourced directly from official channels.
                </p>
                {/* <div className="tg-button-wrap">
                  <a href="events.html" className="btn arrow-btn">
                    See All Events
                    <img
                      src="/img/icons/right_arrow.svg"
                      alt="img"
                      className="injectable"
                    />
                  </a>
                </div> */}
              </div>
            </div>

            <div
              className="col-70"
              data-aos="fade-left"
              data-aos-delay="280"
            >
              <div className="event__item-wrap">
                <div className="row justify-content-center">
                  {events.map((event, index) => (
                    <div
                      key={index}
                      className="col-lg-4 col-md-6"
                    >
                      <div className="event__item shine__animate-item">
                        <div className="event__item-thumb">
                          <a
                            href={event.link}
                            className="shine__animate-link"
                          >
                            <img
                              src={`http://192.168.1.120:8012/${event.image}`}
                              alt="img"
                            />
                          </a>
                        </div>
                        <div className="event__item-content">
                          <span className="date">{formatDate(event.date)}</span>
                          <h2 className="title">
                            <a href={event.link} target="_blank">{event.title}</a>
                          </h2>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="event__shape">
        <img
          src="/img/events/event_shape.png"
          alt="img"
          className="alltuchtopdown"
        />
      </div>
    </section>
  );
};

export default EventSection;
