import { useState, useEffect } from "react";
import CardDetail from "../../cardDetail/CardDetail";
import "./form.scss";

function Form() {
  const [allTypes, setAllTypes] = useState([]);
  const getType = async () => {
    const types = await fetch("http://localhost:3001/types");
    const data = await types.json();
    setAllTypes(data);
  };

  useEffect(() => {
    getType();
  }, []);

  const validate = (inputValue) => {
    let errors = {};
    if (!inputValue.name) errors.name = "name is required";
    if (!inputValue.type) errors.type = "type is required";
    if (!inputValue.health) errors.health = "health is required";
    if (!inputValue.attack) errors.attack = "attack is required";
    if (!inputValue.defence) errors.defence = "defence is required";
    if (!inputValue.speed) errors.speed = "speed is required";
    if (!inputValue.height) errors.height = "height is required";
    if (!inputValue.weight) errors.weight = "weight is required";

    return errors;
  };

  const resetForm = (inputValue) => {
    setInputValue({
      ...inputValue,
      name: "",
      type: "",
      health: "",
      attack: "",
      defence: "",
      speed: "",
      height: "",
      weight: "",
    });
  };

  const [errors, setErrors] = useState({});
  const [inputValue, setInputValue] = useState({
    name: "",
    type: "",
    health: "",
    attack: "",
    defence: "",
    speed: "",
    height: "",
    weight: "",
  });
  console.log(inputValue);

  const handleChange = (e) => {
    if (e.target.name === "name" || e.target.name === "type") {
      setInputValue({
        ...inputValue,
        [e.target.name]: e.target.value,
      });
    } else {
      setInputValue({
        ...inputValue,
        [e.target.name]: parseInt(e.target.value),
      });
    }
  };

  const createPokemon = () => {
    const url = "http://localhost:3001/pokemons";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputValue),
    };
    fetch(url, requestOptions)
      .then((response) => console.log("Submitted successfully", response))
      .catch((error) => console.log("Form submit error", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValues = {
      ...inputValue,
      [e.target.name]: e.target.value,
    };
    setErrors(validate(formValues));

    if (Object.keys(validate(formValues)).length === 0) {
      resetForm();
      createPokemon();
    }
  };

  return (
    <div id="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="">name</label>
          <input
            className={errors.name && "danger"}
            name="name"
            type="text"
            value={inputValue.name}
            onChange={handleChange}
          />
          {errors.name && <p className="danger">{errors.name}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="">type</label>
          <select
            className={errors.type && "danger"}
            name="type"
            value={inputValue.type}
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              -Seleccione un tipo-
            </option>
            {allTypes?.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.type && <p className="danger">{errors.type}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="">health</label>
          <input
            className={errors.health && "danger"}
            name="health"
            type="number"
            value={inputValue.health}
            onChange={handleChange}
          />
          {errors.health && <p className="danger">{errors.health}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="">attack</label>
          <input
            className={errors.attack && "danger"}
            name="attack"
            type="number"
            value={inputValue.attack}
            onChange={handleChange}
          />
          {errors.attack && <p className="danger">{errors.attack}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="">defence</label>
          <input
            className={errors.defence && "danger"}
            name="defence"
            type="number"
            value={inputValue.defence}
            onChange={handleChange}
          />
          {errors.defence && <p className="danger">{errors.defence}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="">speed</label>
          <input
            className={errors.speed && "danger"}
            name="speed"
            type="number"
            value={inputValue.speed}
            onChange={handleChange}
          />
          {errors.speed && <p className="danger">{errors.speed}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="">height</label>
          <input
            className={errors.height && "danger"}
            name="height"
            type="number"
            value={inputValue.height}
            onChange={handleChange}
          />
          {errors.height && <p className="danger">{errors.height}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="">weight</label>
          <input
            className={errors.weight && "danger"}
            name="weight"
            type="number"
            value={inputValue.weight}
            onChange={handleChange}
          />
          {errors.weight && <p className="danger">{errors.weight}</p>}
        </div>
        <input id="btn-input" type="submit" value={"submit"} />
      </form>
      <CardDetail pokemon={inputValue} />
    </div>
  );
}
export default Form;
