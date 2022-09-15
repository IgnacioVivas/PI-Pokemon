import img from "../../images/home-page.png";
import "./mainView.scss";
import { Link } from "react-router-dom";

function MainView() {
  return (
    <div id="home-page-container" style={{ background: `url(${img})` }}>
      <div id="button-container">
        <Link to={`/home`}>
          <button>go to home</button>
        </Link>
      </div>
    </div>
  );
}
export default MainView;
