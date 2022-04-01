import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import {DebounceInput} from 'react-debounce-input';
import { CustomInput, SearchNode, CustomUl, UserPfp, CustomSpan,SearchIcon, InputWraper } from './styles.js';
import { getAllUsers } from '../../services/api';
import { IoMdSearch } from 'react-icons/io'
import { Grid } from 'react-loader-spinner'



function SearchBar () {
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    function filterUsers(){
        if (!query)
            setFilteredUsers([]);
        
        else
            setFilteredUsers(users.filter(user => user.name.includes(query)));
        
    }

    // useEffect (() => {

    //     try
    //     {
    //         const promise = getAllUsers();
            
    //         promise.then((response) => {
    //             setUsers(response.data);
    //         });

    //     }
    //     catch (error)
    //     {
    //         alert('Busca por usuarios falhou');
    //     }

    // });


    return (
        <div>
            <InputWraper>
            <CustomInput
            type="text"
            minLength={3}
            debounceTimeout={300}
            onKeyUp={e => {setQuery(e.target.value); filterUsers()}} 
            onChange={e => {setQuery(e.target.value); filterUsers()}} 
            onKeyDown={e => {setQuery(e.target.value); filterUsers()}}
            placeholder={'Search for people'}>
            </CustomInput>

            <SearchIcon>
                <IoMdSearch/>
            </SearchIcon>
            </InputWraper>

            <CustomUl>
            {filteredUsers.map(value => 
            <SearchNode onClick={() => navigate(`/user/${value.id}`)} key={value.name}>
                <UserPfp src={`${value.img}`}/>
                <CustomSpan>
                    {value.name}
                </CustomSpan>
            </SearchNode>)}
            </CustomUl>
        </div>
    );

}

export default SearchBar;