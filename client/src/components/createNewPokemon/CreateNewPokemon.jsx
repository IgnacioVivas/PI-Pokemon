import Form from "./form/Form";
import "./createNewPokemon.scss";
import { Link } from "react-router-dom";
import imgGoBack from "../../images/arrow-go-back-line.svg";
function CreateNewPokemon() {
  return (
    <div id="section-form">
      <div id="section-form-container">
        <div id="arrow-container">
          <Link to={`/home`}>
            <img src={imgGoBack} alt="" />
          </Link>
        </div>
        <h1>create new pokemon</h1>
        <Form />
      </div>
    </div>
  );
}
export default CreateNewPokemon;
