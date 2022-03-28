import { useNavigate } from 'react-router';
import React, { useRef, useContext, useEffect, useState } from 'react';
import { IoMdTrash } from 'react-icons/io'
import { TiPencil } from 'react-icons/ti'
import UserContext from '../../Providers/UserContext';
import { PostContainer, LinkPreview, LinkData, LinkImage, UsernameWrapper, IconsWrapper, ConfirmBox, ConfirmCard, CheckAnswer, GoBackButton, ConfirmButton, InputEditingPost } from './styles';
import { deletePost, getUser, updatePost } from '../../services/api';
import { Grid } from 'react-loader-spinner'

function PostInfos({ post }) {
    const navigate = useNavigate();

    const [userInfos, setUserInfos] = useState([]);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newDescription, setNewDescription] = useState(post.description);
    const [inputLoading, setInputLoading] = useState("");
    const inputRef = useRef();

    const { token } = useContext(UserContext);

    useEffect(() => {
        const promise = getUser(token)
        promise.then(response => {
            setUserInfos(response.data);
        });
        promise.catch(error => alert("erro#1-Token is not valid", error.response));
        if (isEditing === true)
            inputRef.current.focus()
    }, [token, isEditing])


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
                setIsLoading(false);
                setIsConfirmingDelete(false)
                navigate('/');
            });

            promise.catch((error) => {
                alert("Não foi possivel excluir este post ");
                console.log(error.response);
            });
        }, 3000);
    }

    function handleIsEditing() {
        if (isEditing === false) {
            setIsEditing(true);
        }
        else {
            setIsEditing(false)
            setNewDescription(post.description)
        }
    }

    function handleEditionValue(e) {
        setNewDescription(e.target.value)
    }

    function handleKeyDownEditingPost(e) {
        if (e.keyCode === 27) {
            setIsEditing(false)
            setNewDescription(post.description)
        }
        if (e.keyCode === 13) {
            handleEditPost();
        }
    }

    function handleEditPost() {
        setInputLoading("disabled");

        const promise = updatePost({
            description: newDescription,
            userId: userInfos.id
        }, post.id)

        promise.then((response) => {
            setInputLoading("");
            setIsEditing(false);
            navigate('/');
        });

        promise.catch((error) => {
            alert("Não foi possivel excluir este post ");
            setInputLoading("");
        });
    }

    return (
        <>
            {isConfirmingDelete ?
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
                                        <GoBackButton onClick={() => { setIsConfirmingDelete(false) }}> No, go back</GoBackButton>
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

                ) : ("")
            }


            <PostContainer>
                
                <UsernameWrapper onClick={() => navigate(`/user/${post.user.id}`, { replace: true })}>
                    <h1>{post.user.name}</h1>
                    <IconsWrapper>
                        {post.user.id === userInfos.id ? (
                            <>
                                <TiPencil onClick={() => { handleIsEditing() }} ></TiPencil>
                                <IoMdTrash onClick={() => { setIsConfirmingDelete(true) }} ></IoMdTrash>
                            </>
                        )
                            : <></>}

                    </IconsWrapper>
                </UsernameWrapper>
                {isEditing ?
                    <>
                        {post.user.id === userInfos.id ? (
                            <InputEditingPost
                                ref={inputRef}
                                type="text"
                                value={newDescription}
                                onKeyDown={(e) => handleKeyDownEditingPost(e)}
                                onChange={(e) => handleEditionValue(e)}
                                disabled={inputLoading}
                            ></InputEditingPost>
                        ) : <></>
                        }
                    </>

                    :

                    <article>
                        <p>{highlightHashtags(post.description)}</p>
                    </article>
                }

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