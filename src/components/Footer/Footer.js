import React from "react";
import "./Footer.css"; 

const Footer = () => (
    <footer>
        <div className="comment-box">
            <h3>Leave a Comment</h3>
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="comment">Comment:</label>
                <textarea id="comment" name="comment" rows="4"></textarea>
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

export default Footer;
