import Layout from '../../components/Layout'
import styles from './country.module.css'
import { useEffect,useState } from 'react'
const getCountry = async(id) =>
{
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)
    const country = await res.json()
    return country;
}
    
const Country = ({country}) =>
{
    console.log(country)
    const [borders,setBorders] = useState([])
    const getBorder = async () =>
    {
            const borders = await Promise.all(country.borders.map((border) => getCountry(border)))
            setBorders(borders)
    }
    useEffect(() => {
        getBorder();
       
    }, [])
    return (
        <Layout title = {country.name} >
            <div className={styles.container}>
                <div className={styles.container_left}>
                    <div className = {styles.overview_panel}>
                    <img src={country.flag} alt={country.name}  />
                    <h1 className = {styles.overview_name}>  {country.name}</h1>
                    <div className= {styles.overview_region}> {country.region} </div>
                    <div className = {styles.overview_numbers}> {/*  p */}
                        <div className = {styles.overview_population}>
                            <div className = {styles.overview_value}> {country.population} </div>
                            <div className={styles.overview_label}>population </div>
                        </div>
                        {/*  */}
                          <div className = {styles.overview_area} >
                            <div className = {styles.overview_value} > {country.area} </div>
                             <div className={styles.overview_label}> Area </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className={styles.container_right}>
                        <div className={styles.details}>
                        <h4 className={styles.details_heading}>  Details </h4>
                        <div className={styles.details_row}>
                            <div className = {styles.details_label}> capital </div>
                            <div className = {styles.details_value}> {country.capital} </div>     
                        </div>
                
                    {/* details Language */}
                        <div className={styles.details_row}>
                            <div className = {styles.details_label}> Languages </div>
                            <div className = {styles.details_value}> {country.languages.map(({name})=> name).join(",")} </div>     
                    </div>
                    {/* details Currency  */}
                        <div className={styles.details_row}>
                            <div className = {styles.details_label}> currencies </div>
                            <div className = {styles.details_value}> {country.currencies.map(({name})=> name).join(",")} </div>     
                    </div>
                        {/* details Native name  */}
                        <div className={styles.details_row}>
                            <div className = {styles.details_label}> Native Name  </div>
                            <div className = {styles.details_value}> {country.nativeName} </div>     
                    </div>
                        {/* details gini  */}
                        <div className={styles.details_row}>
                            <div className = {styles.details_label}> Gini </div>
                            <div className = {styles.details_value}> {country.gini} % </div>     
                    </div>
                    <div className={styles.borders_details}>
                        <div className = {styles.borders_details_label}> Neighbouring Countries  </div>
                        <div className={styles.borders_details_container}>
                          {borders.map(({ flag, name,index }) =>
                               <div key = {index} className = {styles.borders_details_country}>
                                <img src={flag} alt={name}></img>
                                <div className = {styles.borders_details_country_name}> {name} </div>
                        </div>)}     
                        </div>    
                    </div>
             </div>
                </div>
                {/* Panel */}
            
                {/* details captial */}
            
            </div>
        </Layout>
    )
}
export default Country

export async function getServerSideProps({ params })
{
    const country = await getCountry(params.id)
  return {
    props: {country}, // will be passed to the page component as props
  }
}