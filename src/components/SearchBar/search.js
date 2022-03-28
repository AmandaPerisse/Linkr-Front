import { useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import {DebounceInput} from 'react-debounce-input';
import { getAllUsers } from '../../services/api';

function SearchBar () {
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    function filterUsers(){
        if (!query)
        {
            setFilteredUsers([]);
        }
        else
        {
            setFilteredUsers(users.filter(user => user.name.includes(query)));
        } 
    }

    useEffect (() => {

        try
        {
            const promise = getAllUsers();
            
            promise.then((response) => {
                setUsers(response.data);
            });

        }
        catch (error)
        {
            alert('Busca por usuarios falhou');
        }

    });

    return (
        <div>
            <DebounceInput
                type="text"
                minLength={3}
                debounceTimeout={300}
                onKeyUp={e => {setQuery(e.target.value); filterUsers()}} 
                onChange={e => {setQuery(e.target.value); filterUsers()}} 
                onKeyDown={e => {setQuery(e.target.value); filterUsers()}}
                placeholder={'Search for people'} />

            <ul>
                {filteredUsers.map(value => <h1 onClick={() => navigate(`/user/${value.id}`)} key={value.name}>{value.name}</h1>)}
            </ul>
        </div>
    );

}

export default SearchBar;