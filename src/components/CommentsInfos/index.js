import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { FiSend } from 'react-icons/fi';
import {
    CommentsWrapper, CommentBox, CommentImg, CommentUserInfos,
    CommentBody, KinshipBox, Dot, KinshipInfo, Username, HorizontalBar, InputWrapper, UserImg, Input
} from './styles';
import { getUser } from '../../services/api';
import UserContext from '../../Providers/UserContext';
import axios from 'axios';

function CommentsInfos({ isShowingComments, showingCommentsPostId, post }) {
    const [commentValue, setCommentValue] = useState("");
    const { token } = useContext(UserContext);
    const [userInfos, setUserInfos] = useState([]);


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
        const promise = axios.post('http://localhost:5000/comments',
            {
                postId: postId,
                comment: commentValue,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        promise.then((response) => {
            alert("comentário feito. Futuramente você poderá vê-lo")
        });

        promise.catch((error) => {
            alert("Não foi possível enviar esse comentario ");
        });

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

                        <CommentBox>
                            <span>
                                <CommentImg src="https://i.imgur.com/wv7BslU.png" alt="img user" />
                                <div>
                                    <CommentUserInfos>
                                        <Username>UsernameFake</Username>
                                        <KinshipBox>
                                            <Dot />
                                            <KinshipInfo> following </KinshipInfo>
                                        </KinshipBox>
                                    </CommentUserInfos>
                                    <CommentBody> Comentário fake! EM breve funcionando!</CommentBody>
                                </div>
                            </span>
                        </CommentBox>
                        <HorizontalBar />

                        <InputWrapper>
                            <UserImg src="https://i.imgur.com/rEof5QC.png" alt="img user" />
                            <Input
                                type="text"
                                placeholder="write a comment..."
                                value={commentValue}
                                onKeyDown={(e) => handleKeyDownCommentingPost(e, post.id)}
                                onChange={(e) => setCommentValue(e.target.value)}
                            />
                            <FiSend onClick={() => handleSendComment(post.id)} />
                        </InputWrapper>

                    </motion.p>
                ) : ("")}
            </AnimatePresence>
        </CommentsWrapper >

    );
}

export default CommentsInfos;