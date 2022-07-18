import React, { useEffect, useState } from "react";
import "./TodoStyle.css";


// getting data from localStorage since useEffect(for getting data) is not working
const localData = () => {
    let extractedList = localStorage.getItem('list');
    if (extractedList) {
        return JSON.parse(extractedList);

    }
    else {
        return [];
    }
};

const Todo = () => {

    const [item, setItem] = useState("");
    const [list, setList] = useState(localData());
    const [idHolder, setIdHolder] = useState(null);
    const [toggleBtn, setToggleBtn] = useState(false);

    const addFunc = () => {
        if (item && toggleBtn) {
            setList( list.map((currElem) => {
                if(currElem.id === idHolder){
                    return {...currElem,name:item}
                }
                return currElem;
            }))
            setIdHolder(null);
            setItem("");
            setToggleBtn(false);
        }
        else {
            const newItem = {
                id: new Date().getTime().toString(),
                name:item
            };
            setList((oldVal) => {
                return [...oldVal, newItem];
            });
            setItem("");

        }

    }

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list]);

    const editHandler = (id) => {
        const foundVal = list.find((currElem) => {
            return currElem.id === id;
        })
        console.log(foundVal);
        setItem(foundVal.name);
        setIdHolder(id);
        setToggleBtn(true);
    }

    const deleteItem = (index) => {
        setList((oldVal) => {
            return oldVal.filter((currElem) => {
                return currElem.id != index
            })
        })
    }

    return (
        <>
            <div className="outermost">
                <div className="card">
                    <br />
                    <h1>To-Do List</h1><br />
                    <input type="text" value={item} placeholder="Add an item" onChange={(e) => { setItem(e.target.value) }} />
                    {toggleBtn ? (<button className="add-btn" onClick={addFunc}>edit</button>) : (<button className="add-btn" onClick={addFunc}>+</button>)}
                    <ol>
                        {
                            list.map((currElem, index) => {
                                return (
                                    <>
                                        <li key={currElem.id}>{currElem.name} <button onClick={() => { editHandler(currElem.id) }}>edit</button><button className="del-btn" onClick={() => deleteItem(currElem.id)}>×</button></li>
                                    </>
                                )
                            })
                        }
                    </ol>
                </div>
            </div>
        </>
    )
}

export default Todo;