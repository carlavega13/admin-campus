import { useEffect, useState } from "react";
import countries from "../../functions/countries";
import s from "../../css/CountrySelect.module.css";
import { AiOutlineArrowDown } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";

// AiOutlineArrowDown
const CountrySelect = (props) => {
  const [active, setActive] = useState(false);
  const [country, setCountry] = useState("");
  let [filteredCountries, setFilteredCountries] = useState([]);
  const handlerChange = (e) => {
    setCountry(e.target.value);
    if (e.target.value.length > 0) {
      setFilteredCountries(
        countries.filter((c) =>
          c.label.includes(
            `${e.target.value[0].toUpperCase()}${e.target.value.slice(1)}`
          )
        )
      );
    }
  };
  useEffect(() => {
    if (country.length === 0) {
      setFilteredCountries(countries);
    }
    if (country.length > 0) {
      setFilteredCountries(
        countries.filter((c) =>
          c.label.includes(`${country[0].toUpperCase()}${country.slice(1)}`)
        )
      );
    }
  }, [country]);

  return (
    <div style={{ display: "flex" }}>
      <input
        value={country}
        onChange={handlerChange}
        type="text"
        name="country"
        id=""
      />
      {country.length > 0 && (
        <button onClick={() => setCountry("")} className={s.btnDelete}>
          <RiDeleteBin2Line fontSize={"1.5rem"} />
        </button>
      )}
      <button onClick={() => setActive(!active)} className={s.btnArrow}>
        <AiOutlineArrowDown fontSize={"1.5rem"} />
      </button>
      {active && (
        <div className={s.countryList}>
          {filteredCountries.length === 0 && <div>NO SE ENCONTRO PAIS</div>}
          {filteredCountries.map((c, i) => {
            return (
              <div
                id={c.label}
                onClick={(e) => {
                  setCountry(e.target.id);
                  props.setProfile({
                    ...props.profile,
                    country: c.code,
                  });
                  setActive(!active);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: i % 2 === 0 ? "#D9D9D9" : "#EAEAEA",
                  cursor: "pointer",
                  height: "2.5rem",
                  padding: "0 12px 0 12px",
                }}
              >
                <h6 id={c.label}>{c.label}</h6>
                <img
                  id={c.label}
                  style={{ height: "fit-content" }}
                  src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CountrySelect;
