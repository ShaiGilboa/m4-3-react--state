import React from 'react';
import {useState} from 'react';
import styled from 'styled-components';

const StyledLi = styled.li`
    list-style-type: none;
    position:relative;
    left:0;
    width:290px;
    margin: 0 0 0 5px;
    padding: 5px 0;
    &:hover{
        background: gold;
        color: white;
        cursor: pointer;
    }
`;

const divideString = (full, part) => {
    const lowerFull = full.toLowerCase();
    const lowerPart = part.toLowerCase();
    const start = full.slice(0,lowerFull.indexOf(lowerPart))
    const end = full.slice((start.length + part.length))
    return(<>
        <span style={{fontWeight: 'bold'}}>{start}</span><span>{part}</span><span style={{fontWeight: 'bold'}}>{end}</span>
    </>)
}

const genre = (categoryId, categories) => {
    const name = categories[categoryId].name
    return(<span style={{fontSize: '.7rem'}}>
        in: <span style={{fontSize: '.6rem', fontStyle: 'italic', color:'blue'}}> {name}</span>
    </span>)
}

const List = ({list, handleSelect, term, categories, arrowInputIndex, setArrowInputIndex}) => {
    if (list.length) {
    return(
        <ul style={{position: 'absolute', margin: '2px 0 0 0', padding:'2px 0', width:'300px', boxShadow: '0px 10px 10px #8D8D92'}}>
            {list.map((thing, index)=><StyledLi key={thing.title} onClick={()=>handleSelect(thing.title)} style={arrowInputIndex===index?{background: 'red',color: 'white'}: {}} onMouseEnter={()=>setArrowInputIndex(index)}>{divideString(thing.title, term)} {genre(thing.categoryId, categories)}</StyledLi>
            )}
        </ul>
    )
    } return null
}

const Typehead = ({books, categories, handleSelect }) => {
    const [input, setInput] = useState('')
    const [list, setList] = useState([])
    const [arrowInputIndex, setArrowInputIndex] = useState(0)

    const handleFilter = (suggestion) => {
        suggestion=suggestion.toLowerCase()
        const results = books.filter(book => book.title.toLowerCase().includes(suggestion))
        return(results);            
    }
    
    const clearInput = (val) => {
        setInput('');
        setList([]);
    }
    return (<>
        <div style={{position: 'relative', width: '400px', left: 'calc(50% - 150px)', top:'100px'}}>
        <input
            type='text'
            value={input}
            onChange={ev=>{setInput(ev.target.value);(ev.target.value.length>1)?setList(handleFilter(ev.target.value)):setList([])}}
            onKeyDown={ev => {
                switch(ev.key){
                    case 'Enter':
                        if(input.length>1){handleSelect(list[arrowInputIndex].title)}
                        break;
                    case 'ArrowUp': 
                        if(arrowInputIndex>0)setArrowInputIndex(arrowInputIndex-1);
                        break;
                    case 'ArrowDown': 
                        if(arrowInputIndex<list.length-1)setArrowInputIndex(arrowInputIndex+1)
                        break;
                    case 'Escape':
                        clearInput()
                        break;
                    default:
                        break;
                };
                }
            }
            style={{position: 'relative', width: '300px'}}/>
        <button onClick={()=>clearInput()}>clear</button>
        <List
            list={list}
            handleSelect={handleSelect}
            term={input}
            categories={categories}
            arrowInputIndex={arrowInputIndex}
            setArrowInputIndex={setArrowInputIndex}/>
        </div>
    </>);
}

export default Typehead;