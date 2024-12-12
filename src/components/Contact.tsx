import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      mobile: "",
      message: "",
    });
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
        <button type="submit" className="btn btn-two arrow-btn">
          Submit Now
          <img
            src="/img/icons/right_arrow.svg"
            alt="img"
            className="injectable"
          />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
