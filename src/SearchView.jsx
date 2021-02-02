import React from 'react'


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

const SearchView = ({check, firstFiltered, secondFiltered, userInput}) => {

    console.log('check', check)
    console.log(' firstFiltered',  firstFiltered)
    console.log(' secondFiltered',  secondFiltered)
    console.log('userInput', userInput)
    
    let finalFiltered = check ? firstFiltered.slice(0,4).sort(compareCP) : secondFiltered
    console.log('finalFiltered', finalFiltered)
    console.log('finalFiltered===undefined', finalFiltered===undefined)
    console.log('ffinalFiltered.length > 0', finalFiltered.length > 0)

    return (
       <>
        {finalFiltered.length === 0 ? <div className="loader"></div> : ''}
        {finalFiltered.length > 0 ? 
          <ul className="suggestions">
                {finalFiltered.map(item => {
                return (
                    <li key={item.Number}>
                        <img
                            src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
                            alt="Pikachu"
                        />
                        <div className="info">
                        <h1><span className="hl">{item.Name}</span></h1>
                        <span className="type electric">{item.Types[0]}</span>
                        <span className="type normal">{item.Types[1]}</span>
                </div>
                    </li>
                )
            })
        }
          </ul> 
        : 
        <ul className="suggestions">
          <li>
               <img
                   src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
                   alt="Pikachu"
               />
               <div className="info">
                       <h1><span className="hl">Pika</span>chu</h1>
                       <span className="type electric">Electric</span>
                       <span className="type normal">Normal</span>
               </div>
           </li>
           {finalFiltered === false ? 
              <li>
                <img src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png" alt="" />
                <div className="info">
                    <h1 className="no-results">
                        No results
                    </h1>
                </div>
            </li>
            : 
            ''
           }
        </ul>
        }
      </>
    
)}

export default SearchView;