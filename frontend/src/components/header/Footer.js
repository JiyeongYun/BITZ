import React from "react";
import './Footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
  return (

    <footer>
      <section className="ft-main">
        <div className="ft-main-item">
          <h2 className="ft-title">About</h2>
          <ul>
            <li><Link to="/intro">Intro</Link></li>
            <li><Link to="#">Portfolio</Link></li>
            <li><Link to="#">Demo</Link></li>
          </ul>
        </div>
      </section>

      <section className="ft-social">
        <ul className="ft-social-list">
          <li><Link to="https://lab.ssafy.com/s05-webmobile2-sub3/S05P13A504"><i className="fab fa-gitlab"></i></Link></li>
          <li><Link to="https://jira.ssafy.com/projects/S05P13A504/issues/S05P13A504-304?filter=allopenissues"><i className="fab fa-jira"></i></Link></li>
          <li><Link to="#"><i className="fab fa-youtube"></i></Link></li>
        </ul>
      </section>

      <section className="ft-legal">
        <ul className="ft-legal-list">
          <li><Link to="#">이용약관</Link></li>
          <li><Link to="#">개인정보처리방침</Link></li>
          <li>Copyright © OSDS Corp. All Rights Reserved.</li>
        </ul>
      </section>
    </footer>
   
  );
};

export default Footer;