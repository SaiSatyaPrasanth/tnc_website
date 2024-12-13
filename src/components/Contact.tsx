import React, { useState } from "react";
import axios from "axios";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await axios.post(
        "http://192.168.1.120:8012/api/resource/Contact Form Submission",
        {
          name1: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          message: formData.message,
        }
      );

      if (response.status === 200) {
        setSuccess("Your message has been sent successfully!");
        setFormData({ name: "", email: "", mobile: "", message: "" });
      } else {
        setError("Failed to send your message. Please try again later.");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to send your message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-wrap">
      <h4 className="title">Send Us Message</h4>
      <p>Your email address will not be published. Required fields are marked</p>
      <form id="contact-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-grp">
              <input
                name="name"
                type="text"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-grp">
              <input
                name="email"
                type="email"
                placeholder="E-mail"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-grp">
              <input
                name="mobile"
                type="tel"
                placeholder="Mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="form-grp">
          <textarea
            name="message"
            placeholder="Message"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-two arrow-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit Now"}
          <img
            src="/img/icons/right_arrow.svg"
            alt="img"
            className="injectable"
          />
        </button>
        {success && <p className="success-message" style={{padding:"10px"}}>{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
