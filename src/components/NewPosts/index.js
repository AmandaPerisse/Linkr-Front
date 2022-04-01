import { useNavigate } from 'react-router';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../Providers/UserContext';
import { Button, Texto } from './styles';
import { FiRefreshCw } from 'react-icons/fi';
import { getPostsAmount } from '../../services/api';

function NewPosts({ isHashtagPage }) {
    const navigate = useNavigate();
    const { token } = useContext(UserContext);
    
    const [isHidden, setIsHidden] = useState("none");
    let prevPostsAmount = 0;
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        if(!isHashtagPage){
            try {    
                const promise = getPostsAmount(token);
                promise.then(response => {
                    if(response.data){
                        prevPostsAmount = response.data.rows[0].postsAmount;
                    }
                });
            }
            catch (e) {
                alert('Falha.');
            }
            setInterval(() => {
                try {    
                    const promise = getPostsAmount(token);
                    promise.then(response => {
                        const newPostsAmount = response.data.rows[0].postsAmount - prevPostsAmount;
                        if(response.data.rows[0].postsAmount > prevPostsAmount){
                            setAmount(newPostsAmount);
                            setIsHidden("flex");
                        }
                    });
                }
                catch (e) {
                    alert('Falha.');
                }
            }, 15000);
        }
      }, []);

    function handleClick(){
        navigate("/");
    }

    return (
        <Button onClick={handleClick} isHidden = {isHidden}>
            <Texto>{amount} new posts, load more!</Texto>
            <FiRefreshCw
                size={17}
                color={"#FFFFFF"}
            />
        </Button>
    );
}

export default NewPosts;