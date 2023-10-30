import { useEffect, useState } from "react";
import countries from "../../functions/countries";

const CountrySelect=()=>{
    const [active,setActive]=useState(false)
    const [country,setCountry]=useState("")
    let [filteredCountries,setFilteredCountries]=useState([])
    const handlerChange=(e)=>{
        setCountry(e.target.value)
        if(e.target.value.length>0){
       setFilteredCountries(countries.filter(c=>c.label.includes(`${e.target.value[0].toUpperCase()}${e.target.value.slice(1)}`)))
        }
      }
      useEffect(()=>{
        if(country.length===0){
          setFilteredCountries(countries)
        }
        if(country.length>0){
        
          setFilteredCountries(countries.filter(c=>c.label.includes(`${country[0].toUpperCase()}${country.slice(1)}`)))
         
           }
        },[country])
          
        return(
          <div>
           <input value={country} onChange={handlerChange} type="text" name="country" id="" />{country.length>0&&<button onClick={()=>setCountry("")}>X</button>}<button onClick={()=>setActive(!active)}>!</button>
           {active&&<div>
            {filteredCountries.length===0&&<div>NO SE ENCONTRO PAIS</div>}
        {    filteredCountries.map(c=>{
        return(
          <div id={c.label} onClick={(e)=>setCountry(e.target.id)} style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <h6 id={c.label}>{c.label}</h6><img id={c.label} style={{height:"fit-content"}} src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`} alt="" />
          </div>
        )
            })}
           </div>}
          </div>
        )
}
export default CountrySelect