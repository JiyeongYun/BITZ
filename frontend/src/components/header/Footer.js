import './Footer.css'

const Footer = () => {

  return (
    <footer>
      <div className="contributer">
        <div className="frontend">
          <p>Front End</p>
          <div className="contributer_name">
            <p>권오우</p>
            <p>박정웅</p>
          </div>
        </div>
        <div className="backend">
          <p>Back End</p>
          <div className="contributer_name">
            <p>윤지영</p>
            <p>이소은</p>
          </div>
        </div>
        <div className="fullstack">
          <p>Full Stack</p>
          <div className="contributer_name">
            <p>장현웅</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer