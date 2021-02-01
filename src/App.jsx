import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import './App.css';

const URL_PATH = "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const App = () => {
    const [ input, setInput ] = useState([])
    const [ check, setCheck ] = useState(false)
    const [ filteredFour, setfilteredFour ] = useState([])
    const [ oldfilteredFour, setoldfilteredFour ] = useState([])

    //variables
    

    useEffect(() => {
        (async () => {
            //fetching the data
            const res = await Axios.get(URL_PATH);
            setInput(res.data)
        })();
    }, []);

    //function for sorting by Name
    function compareName(a,b){
        // converting to uppercase to have case-insensitive comparison
        const name1 = a.Name.toLowerCase();
        const name2 = b.Name.toLowerCase();

        let comparison = 0
        if(name1 > name2){
            comparison = 1
        } else if(name1 < name2){
            comparison = -1
        }
        return comparison
    }

    //function to sort by Types
    function compareTypes(a,b){
        //will only take the first value of Types
        const type1 = a.Types[0].toLowerCase();
        const type2 = b.Types[0].toLowerCase();

        let comparison = 0
        if(type1 > type2){
            comparison = 1
        } else if(type1 < type2){
            comparison = -1
        }
        return comparison
    }

    //function to sort by MaxCP
    function compareCP(a,b){
        // converting to uppercase to have case-insensitive comparison
        const cp1 = a.MaxCP;
        const cp2 = b.MaxCP;

        let comparison = 0
        if(cp1 > cp2){
            comparison = -1
        } else if(cp1 < cp2){
            comparison = 1
        }
        return comparison
    }

    

    const catchText = async event => {
        let val = (event.target.value).toLowerCase()
        //filtering when user inputs character
        let filteredObjects = input.filter(item => item.Types[1] !== undefined ? (item.Types[0].toLowerCase().includes(val) || item.Types[1].toLowerCase().includes(val) || item.Name.toLowerCase().includes(val)) : (item.Types[0].toLowerCase().includes(val) || item.Name.toLowerCase().includes(val)))
        //console.log('filteredObjects', filteredObjects)
        //reducing search results to 4
        let filteredFour = filteredObjects.length > 4 ? filteredObjects.slice(0,4) : filteredObjects 
        
        let sortedByNameorType

        filteredFour.map(item => {
            return item.Name.toLowerCase().includes(val) ?
            sortedByNameorType = filteredFour.sort(compareName) :
            sortedByNameorType = filteredFour.sort(compareTypes)
        })
        console.log('sortedByNameorType', sortedByNameorType)
        //set the state with four results
        setfilteredFour(sortedByNameorType)
        setoldfilteredFour(sortedByNameorType)
    }

      //user can toggle on/off to sort by maximum combat points (MaxCP)
        //changeOrder(filteredFour)
        console.log('check is ', check)
        console.log('filteredFour', filteredFour)
        console.log('oldfilteredFour', oldfilteredFour)
        let sortedByCP = check === true ? filteredFour.sort(compareCP) : oldfilteredFour
        console.log('sortedByCP', sortedByCP)
    
    return (
    <> 
        <label htmlFor="maxCP" className="max-cp">
            <input type="checkbox" id="maxCP" onClick={() => setCheck(!check)} />
            <small>
                Maximum Combat Points
            </small>
        </label>
        <input type="text" className="input" placeholder="Pokemon or type" onChange={catchText}/>
        <div className="loader"></div>
        <ul className="suggestions">
            <li>
                <img src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" alt="" />
                <div className="info">
                    <h1>
                        <span className="hl">Pika</span>chu</h1>
                    <span className="type electric">Electric</span>
                    <span className="type normal">Normal</span>
                </div>
            </li>
            <li>
                <img src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png" alt="" />
                <div className="info">
                    <h1 className="no-results">
                        No results
                    </h1>
                </div>
            </li>
        </ul>
    </>
    )
}
export default App;
