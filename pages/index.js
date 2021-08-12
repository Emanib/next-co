import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import SearchInput from '../components/searchInput/searchInput'
import CountriesTable from '../components/CountriesTable/CountriesTable'
import { useState } from 'react'


export default function Home( {countries} )
{
const [keyword,setKeyword] = useState("")
  const filterCountries =
    countries.filter((country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
    
    )
  
  const onChangeInput = (e) =>
  {
    e.preventDefault();
    setKeyword(e.target.value )
   }
  return (
    <Layout >
      <div className={styles["input-container"]}>
        <div className={styles.counts}> Found {countries.length} Countries   </div>
        <div className = {styles.input}>
            <SearchInput placeholder="filter by  Name, region, subregion" onChange={onChangeInput} />
        </div>
      
         </div>
      <CountriesTable countries={filterCountries} />
      
   </Layout>
  )
}
export async function getStaticProps() {
  const res = await fetch(`https://restcountries.eu/rest/v2/all`)
  const countries = await res.json()

  
  return {
    props: {countries }, // will be passed to the page component as props
  }
}