import React from "react";
import './Footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
  const toYoutube = (e) => {
    e.preventDefault()
    window.open('https://youtu.be/xx9qydfb-xw')
  }

  const toJira = (e) => {
    e.preventDefault()
    window.open('https://jira.ssafy.com/projects/S05P13A504/issues/S05P13A504-304?filter=allopenissues')
  }

  const toGit = (e) => {
    e.preventDefault()
    window.open('https://lab.ssafy.com/s05-webmobile2-sub3/S05P13A504')
  }

  const downloadPort = (e) => {
    e.preventDefault()
    window.open('https://lab.ssafy.com/s05-webmobile2-sub3/S05P13A504/-/raw/develop/exec/OSDS_BITZ_%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C.pdf?inline=false')
  }
  return (
    <footer>
      <section className="ft-main">
        <div className="ft-main-item">
          <h2 className="ft-title">About</h2>
          <ul>
            <li><Link to="/intro">Intro</Link></li>
            <li><Link to="#" onClick={downloadPort}>Portfolio</Link></li>
            <li><Link to="#" onClick={toYoutube}>Demo</Link></li>
          </ul>
        </div>
      </section>

      <section className="ft-social">
        <ul className="ft-social-list">
          <li><Link to="#" onClick={toGit}><i className="fab fa-gitlab"></i></Link></li>
          <li><Link to="#" onClick={toJira}><i className="fab fa-jira"></i></Link></li>
          <li><Link to="#" onClick={toYoutube}><i className="fab fa-youtube"></i></Link></li>
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