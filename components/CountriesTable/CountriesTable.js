import { KeyboardArrowDown,KeyboardArrowUp } from '@material-ui/icons'
import styles from './CountriesTable.module.css'
import { useState } from 'react';
import Link from 'next/Link'


// const SetArrow = ({ direction }) =>
// {
//     if (!direction)
//     {
//         return <> </>
       
//     }
//     if (direction == "asc")
//     {
//         return <div className = {styles.arrow}>   <KeyboardArrowDown  /> </div> 
//     }
//    if (direction == "desc")
//     {
//         return <div className = {styles.arrow}>   <KeyboardArrowUp  /> </div> 
//         }
// }
// const Button = ({className,children, switchDirection}) =>
// {

//     return <button className={className}  onClick = {switchDirection}  >
//         <div className = {styles.heading}>  
//             {children}
//             </div>
        
//     </button>
    
// }
// const orderBy = (countries,direction,value) =>
// {
//     if (direction == "asc")
//     {
//          return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
//         // return [...countries].sort((a,b)=>(a[value] - b[value]))
//     }
//     else 
//     {
//     // return [...countries].sort((a,b)=> (b[value]- a[value]))
//     return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));

//     }
    
    
// }
const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDown  color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUp color="inherit" />
      </div>
    );
  }
};
const CountriesTable = ({ countries }) =>
{
   
    const [direction, setDirection] = useState()
    const [value, setValue] = useState()
     const orderCountries = orderBy(countries,value,direction)
    //    const switchDirection = () =>
    // {
    //     switch (direction)
    //     {
    //         case !direction: setDirection("desc");
    //         case "desc": setDirection("asc");
    //             default:setDirection(null)

    //     }
    // }
  
 const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };
      const setValueAndDirection = (value) =>
    {
        switchDirection();
        setValue(value)
        
        }
        return (
            <div>
                <div className={styles.heading}>
                          <div className={styles.heading_flag}></div>

                    {/* <Button className={styles.name}  onClick={switchDirection}   ><SetArrow direction={direction}   /> name </Button> */}
                        <button className={styles.heading_name}
                            //  className={styles.heading_name}
                        onClick={() => setValueAndDirection("name")}>
                      
                        <div >  name </div>
                    { value ==="name" && <SortArrow direction= {direction}   /> }    
                    </button>
                       <button className={styles.heading_population}
                            //  className={styles.heading_name}
                           onClick={()=> setValueAndDirection("population") }> 
                        <div>  Population </div>
                       { value ==="population" && <SortArrow direction= {direction}   /> }
                    </button>
                        <button className={styles.heading_area}
                            //  className={styles.heading_name}
                           onClick={()=> setValueAndDirection("area") }> 
                        <div>  Area (km <sup style = {{fontSize:".5rem"}}> 2  </sup>)  </div>
                       { value ==="area" && <SortArrow direction= {direction}   /> }
                        </button>
                   <button className={styles.heading_gini}
                            //  className={styles.heading_name}
                           onClick={()=> setValueAndDirection("gini") }> 
                        <div>  Gini  </div>
                       { value ==="gini" && <SortArrow direction= {direction}   /> }
                    </button>
                  
                      
                    {/* <Button className={styles.population} Children= "population" /> */}
                   
                </div>
                {orderCountries.map((country, key) => (
                  <Link href = {`/country/${country.alpha3Code}`} key={country.name}>
                    <div className={styles.row} >
                      <div className={styles.flag}>
                        <img src={country.flag} alt={ country.name}/>
                      </div>
                        <div className={styles.name}>  {country.name}  </div>
                      <div className={styles.population}>  {country.population}  </div>        
                          <div className={styles.area}>{country.area || 0}</div>
                        <div className={styles.gini}>{country.gini || 0} %</div>
                    </div>
                  </Link>
                   

                ))}
          
            
        
            </div>
        )
    }
    

export default CountriesTable; 