import React from "react";
import './Footer.css';

const Footer = () => {
  return (

    <footer>
      <section class="ft-main">
        <div class="ft-main-item">
          <h2 class="ft-title">About</h2>
          <ul>
            <li><a href="/intro">Intro</a></li>
            <li><a href="#">Portfolio</a></li>
            <li><a href="#">Demo</a></li>
          </ul>
        </div>
      </section>

      <section class="ft-social">
        <ul class="ft-social-list">
          <li><a href="https://lab.ssafy.com/s05-webmobile2-sub3/S05P13A504"><i class="fab fa-gitlab"></i></a></li>
          <li><a href="https://jira.ssafy.com/projects/S05P13A504/issues/S05P13A504-304?filter=allopenissues"><i class="fab fa-jira"></i></a></li>
          <li><a href="#"><i class="fab fa-youtube"></i></a></li>
        </ul>
      </section>

      <section class="ft-legal">
        <ul class="ft-legal-list">
          <li><a href="#">이용약관</a></li>
          <li><a href="#">개인정보처리방침</a></li>
          <li>Copyright © OSDS Corp. All Rights Reserved.</li>
        </ul>
      </section>
    </footer>
   
  );
};

export default Footer;