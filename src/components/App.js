import React from 'react';
import Typehead from './Typehead'
import data from '../data';


function App(props) {
    
    // TODO!
    return (<>
        <Typehead
            books={data.books}
            categories={data.categories}
            handleSelect={(suggestion) => window.alert(suggestion)}
        />
    </>);
}

export default App;
