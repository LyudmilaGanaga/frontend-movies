import React from "react";

function FilterCheckbox({ checked, onChange, name }) {
  return (
    <div className="filterCheckbox">
      <label className="filterCheckbox__box">
        <input
          className="filterCheckbox__input"
          name={name}
          checked={checked}
          onChange={onChange}
          id="idCheckbox"
          type="checkbox"
        ></input>
        <span className="filterCheckbox__span"></span>
      </label>
      <p className="filterCheckbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
