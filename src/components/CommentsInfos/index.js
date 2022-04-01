import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { FiSend } from 'react-icons/fi';
import {
    CommentsWrapper, CommentBox, CommentImg, CommentUserInfos,
    CommentBody, KinshipBox, Dot, KinshipInfo, Username, HorizontalBar, InputWrapper, UserImg, Input
} from './styles';
import { getUser, sendComment } from '../../services/api';
import UserContext from '../../Providers/UserContext';
import axios from 'axios';
import { DescriptionInput } from '../../pages/TimelinePage/styles';

function CommentsInfos({ isShowingComments, showingCommentsPostId, post, commentsByPostId }) {
    const [commentValue, setCommentValue] = useState("");
    const { token } = useContext(UserContext);
    const [userInfos, setUserInfos] = useState([]);
    const [newComment, setNewComment] = useState([])
    const [isThereNewComment, setIsThereNewComment] = useState(false);

    useEffect(() => {
        const promise = getUser(token)
        promise.then(response => {
            setUserInfos(response.data);
        });
        promise.catch(error => alert("erro#1-Token is not valid", error.response));

        if (isShowingComments === false) {
            setCommentValue("")
        }


    }, [])


    function handleKeyDownCommentingPost(e, postId) {
        if (e.keyCode === 13) {
            handleSendComment(postId);
        }
    }

    function handleSendComment(postId) {
        handleShowingNewInput(post.id)

        const promise = sendComment({
            postId: postId,
            comment: commentValue,
        }, token)
        promise.then((response) => {
        });

        promise.catch((error) => {
            alert("Não foi possível enviar esse comentario ");
        });

    }
    function handleKinshipInfo(authorId) {
        if (userInfos.id === authorId)
            return "post's author"
        else {
            return "restezin"
        }
    }
    function handleShowingNewInput(postId) {
        setNewComment([...newComment, {
            postId: postId,
            comment: commentValue
        }])

    }
    return (
        <CommentsWrapper>
            <AnimatePresence>
                {isShowingComments === true && showingCommentsPostId === post.id ? (

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 20,
                            damping: 20,
                            duration: 1
                        }}>


                        {commentsByPostId !== [] ? (

                            <>
                                {commentsByPostId.map((info) => (
                                    <>
                                        <CommentBox>
                                            <span>
                                                <CommentImg src={info.authorImg} alt="user img" />
                                                <div>
                                                    <CommentUserInfos>
                                                        <Username>{info.authorName}</Username>
                                                        <KinshipBox>
                                                            <Dot />
                                                            <KinshipInfo> {handleKinshipInfo(info.userId)} </KinshipInfo>
                                                        </KinshipBox>
                                                    </CommentUserInfos>
                                                    <CommentBody> {info.comment}</CommentBody>
                                                </div>
                                            </span>
                                        </CommentBox>
                                        <HorizontalBar />
                                    </>
                                ))}


                                {newComment.map(info => (
                                    <>
                                        {info.postId === post.id ? (
                                            <>
                                                <CommentBox>
                                                    <span>
                                                        <CommentImg src={userInfos.pictureUrl} alt="user img" />
                                                        <div>
                                                            <CommentUserInfos>
                                                                <Username>{userInfos.name}</Username>
                                                                <KinshipBox>
                                                                    <Dot />
                                                                    <KinshipInfo> post's author </KinshipInfo>
                                                                </KinshipBox>
                                                            </CommentUserInfos>
                                                            <CommentBody> {info.comment}</CommentBody>
                                                        </div>
                                                    </span>
                                                </CommentBox>
                                                <HorizontalBar />
                                            </>
                                        ) : ("")}
                                    </>

                                ))}

                            </>

                        ) : ("")}



                        <InputWrapper>
                            <UserImg src={userInfos.pictureUrl} alt="img user" />
                            <Input
                                type="text"
                                placeholder="write a comment..."
                                value={commentValue}
                                onKeyDown={(e) => handleKeyDownCommentingPost(e, post.id)}
                                onChange={(e) => setCommentValue(e.target.value)}
                            />
                            <FiSend onClick={() => { handleSendComment(post.id) }} />
                        </InputWrapper>

                    </motion.p>
                ) : ("")}
            </AnimatePresence>
        </CommentsWrapper >

    );
}

export default CommentsInfos;