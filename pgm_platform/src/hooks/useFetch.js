import React, { useState } from 'react'

export default function useFetch (url, options) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // useEffect(() => { geen useEffect omdat we deze hook enkel activeren vanuit de Search component
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setData(result);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
                setIsLoading(false);
            } 
        };
        // fetchData(); // we roepen de functie niet op omdat we deze willen aanroepen vanuit de component die deze hook gebruikt (zie src/pages/Search.js: handleSubmit functie)
    //}
    // , [url, options]); geen dependency array omdat we deze willen aanroepen vanuit de component die deze hook gebruikt (zie src/pages/Search.js: handleSubmit functie)

  return { data, isLoading, isError, fetchData }; // we geven de fetchData functie terug zodat we deze kunnen aanroepen vanuit de component die deze hook gebruikt (zie src/pages/Search.js: handleSubmit functie)
};
