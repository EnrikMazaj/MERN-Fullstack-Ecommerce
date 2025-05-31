import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Footer.css';
import { useTheme } from '../../context/ThemeContext';
import { translations } from '../../translations';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });

  const { language } = useTheme();
  const t = translations[language].footer;

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
        toast.success(t.commentBox.success, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFormData({
          name: '',
          email: '',
          comment: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error(t.commentBox.error, {
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
        <h3>{t.commentBox.title}</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">{t.commentBox.name}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">{t.commentBox.email}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="comment">{t.commentBox.comment}</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          ></textarea>
          <input type="submit" value={t.commentBox.submit} />
        </form>
      </div>
      <div className="contact-info">
        <h3>{t.contactInfo.title}</h3>
        <p>{t.contactInfo.address1}</p>
        <p>{t.contactInfo.address2}</p>
        <p>{t.contactInfo.telephone}</p>
        <p>{t.contactInfo.email}</p>
      </div>
    </footer>
  );
};

export default Footer;
