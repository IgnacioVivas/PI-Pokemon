import "./select.scss";
import { useEffect, useState } from "react";
import imgDropDown from "../../../images/arrow-drop-down-line.svg";

function Select({ title, allOptions, onSelectedValue, order }) {
  const [selectedValue, setSelectedValue] = useState(title);
  const [selectedLabel, setSelectedLabel] = useState(title);
  const [windowSize, setWindowSize] = useState(window.screen.width);
  const [options, setOptions] = useState();
  const [select, setSelect] = useState();

  const setActiveClass = () => {
    console.log("funciona", order);
    select && select[order]?.classList.toggle("active");
    options && options[order]?.classList.toggle("active");
  };

  const handleSelectedValue = (item) => {
    onSelectedValue(item, title);
    setSelectedValue(item);
  };

  window.addEventListener("resize", () => {
    setWindowSize(window.screen.width);
  })
  
  useEffect(() => {
    const nodelistSelect = document.querySelectorAll("#select");
    const nodelistSelectToArray = Array.apply(null, nodelistSelect);
    if (windowSize <= 992) {//estamso en mobile
      setSelect(nodelistSelectToArray.slice(4,9));
    } else {
      setSelect(nodelistSelectToArray.slice(0,4));
    }

    const nodelistOptions = document.querySelectorAll("#options");
    const nodelistOptionsToArray = Array.apply(null, nodelistOptions);
    if (windowSize <= 992) {//estamso en mobile
      setOptions(nodelistOptionsToArray.slice(4,9));
    } else {
      setOptions(nodelistOptionsToArray.slice(0,4));
    }
  }, [windowSize]);

  return (
    <div className="container">
      <form action="">
        <div className="selectbox">
          <div className="select" id="select" onClick={setActiveClass}>
            <div className="contents-select">
              <h1 className="title">{selectedLabel}</h1>
            </div>
            <img src={imgDropDown} alt="" />
          </div>

          <div className="options" id="options">
            {allOptions?.map((item, index) => (
              <div
                href=""
                className="option"
                key={index}
                onClick={() => {
                  handleSelectedValue(item.id ? item.id : item);
                  setSelectedLabel(item.id ? item.name : item);
                }}
              >
                <div className="content-option">
                  <span>
                    {item.name
                      ? item.name[0].toUpperCase() + item.name.slice(1)
                      : item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <input type="hidden" name="type" id="inputSelect" value="" />
      </form>
    </div>
  );
}

export default Select;
