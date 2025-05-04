import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Footer.css';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_FORMSPREE_URL || '', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Thank you for your comment!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Clear form fields
        setFormData({
          name: '',
          email: '',
          comment: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <footer>
      <div className="comment-box">
        <h3>Leave a Comment</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          ></textarea>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="contact-info">
        <h3>Contact Us</h3>
        <p>123 Station Liosia</p>
        <p>Dexamenis 21 , Attiki</p>
        <p>Telephone: (555) 555-1234</p>
        <p>Email: info@mywebsite.com</p>
      </div>
    </footer>
  );
};

export default Footer;
