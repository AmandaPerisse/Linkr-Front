import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import { IoMdTrash } from 'react-icons/io'
import UserContext from '../../Providers/UserContext';
import { PostContainer, LinkPreview, LinkData, LinkImage, UsernameWrapper, IconsWrapper, ConfirmBox, ConfirmCard, CheckAnswer, GoBackButton, ConfirmButton } from './styles';
import { deletePost, getUser } from '../../services/api';
import { Grid } from 'react-loader-spinner'

function PostInfos({ post }) {
    const navigate = useNavigate();

    const [userInfos, setUserInfos] = useState([]);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    console.log(post.id)
    const { token } = useContext(UserContext);

    useEffect(() => {
        // const promise = axios.get(`http://localhost:5000/users`, {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // });
        const promise = getUser(token)
        promise.then(response => {
            setUserInfos(response.data);
        });
        promise.catch(error => alert("erro#1-PlansPage: ", error.response));

    }, [token])

    function highlightHashtags(description) {
        const descriptionArray = description.split(' ');
        const newDescriptionArray = [];

        for (let i = 0; i < descriptionArray.length; i++) {
            if (descriptionArray[i][0] === "#") {
                const hashtag = descriptionArray[i].replace("#", "");

                newDescriptionArray.push(<a href={`/hashtags/${hashtag}`}><strong>{descriptionArray[i]}</strong> </a>);

                continue;
            }
            newDescriptionArray.push(`${descriptionArray[i]} `);
        }

        return newDescriptionArray;
    }


    function handleDeletePost() {
        setTimeout(() => {
            const promise = deletePost(token, post.id)

            promise.then((response) => {
                console.log("deletou : post|id ", post.id)
                setIsLoading(false);
                setIsConfirming(false)
                navigate('/');
            });

            promise.catch((error) => {
                alert("Não foi possivel excluir este post ");
                console.log(error.response);
            });
        }, 5000);
    }



    return (
        <>
            {isConfirming ?
                (
                    <ConfirmBox>
                        <ConfirmCard>

                            {isLoading ?
                                <>
                                    <p>Deleting...</p>
                                    <Grid height="30" width="30" color='grey' ariaLabel='loading' />
                                </>
                                :
                                <>
                                    <p>
                                        Are you sure you want to delete this post?
                                    </p>
                                    <CheckAnswer>
                                        <GoBackButton onClick={() => { setIsConfirming(false) }}> No, go back</GoBackButton>
                                        <ConfirmButton onClick={() => {
                                            setIsLoading(true)
                                            handleDeletePost()
                                        }}>
                                            Yes, delete it
                                        </ConfirmButton>
                                    </CheckAnswer>
                                </>
                            }
                        </ConfirmCard>

                    </ConfirmBox>

                ) : ("")}


            <PostContainer>
                
                <UsernameWrapper onClick={() => navigate(`/user/${post.user.id}`, { replace: true })}>
                    <h1>{post.user.name}</h1>
                    <IconsWrapper>
                        {post.user.id === userInfos.id ?
                            (<IoMdTrash onClick={() => { setIsConfirming(true) }} ></IoMdTrash>) : <></>}
                    </IconsWrapper>
                </UsernameWrapper>
                

                <article>
                    <p>{highlightHashtags(post.description)}</p>
                </article>

                <a href={post.url.link} target="_blank" rel="noreferrer">
                    <LinkPreview>
                        <LinkData>
                            <h1>{post.url.title}</h1>

                            <p>{post.url.description}</p>

                            <h2>{post.url.link}</h2>
                        </LinkData>

                        <LinkImage>
                            <img src={post.url.image} alt={post.url.title} />
                        </LinkImage>
                    </LinkPreview>
                </a>
            </PostContainer>
        </>
    );
}

export default PostInfos;