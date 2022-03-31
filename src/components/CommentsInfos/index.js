import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"

import {
    CommentsWrapper, CommentBox, CommentImg, CommentUserInfos,
    CommentBody, KinshipBox, Dot, KinshipInfo, Username, HorizontalBar, InputWrapper, UserImg, Input
} from './styles';

function CommentsInfos({ isShowingComments }) {

    return (
        <CommentsWrapper>
            <AnimatePresence>
                {isShowingComments && (
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
                                        <Username>Joao Avatares</Username>
                                        <KinshipBox>
                                            <Dot />
                                            <KinshipInfo> following </KinshipInfo>
                                        </KinshipBox>
                                    </CommentUserInfos>
                                    <CommentBody> Adorei esse post, ajuda muito a usar Material UI com React!</CommentBody>
                                </div>
                            </span>
                        </CommentBox>
                        <HorizontalBar />
                        <CommentBox>
                            <span>
                                <CommentImg src="https://i.imgur.com/wv7BslU.png" alt="img user" />
                                <div>
                                    <CommentUserInfos>
                                        <Username>Joao Avatares</Username>
                                        <KinshipBox>
                                            <Dot />
                                            <KinshipInfo> following </KinshipInfo>
                                        </KinshipBox>
                                    </CommentUserInfos>
                                    <CommentBody> Adorei esse post, ajuda muito a usar Material UI com React!</CommentBody>
                                </div>
                            </span>
                        </CommentBox>
                        <HorizontalBar />
                        <CommentBox>
                            <span>
                                <CommentImg src="https://i.imgur.com/wv7BslU.png" alt="img user" />
                                <div>
                                    <CommentUserInfos>
                                        <Username>Joao Avatares</Username>
                                        <KinshipBox>
                                            <Dot />
                                            <KinshipInfo> following </KinshipInfo>
                                        </KinshipBox>
                                    </CommentUserInfos>
                                    <CommentBody> Adorei esse post, ajuda muito a usar Material UI com React!</CommentBody>
                                </div>
                            </span>
                        </CommentBox>
                        <HorizontalBar />




                        <InputWrapper>
                            <UserImg src="https://i.imgur.com/rEof5QC.png" alt="img user" />
                            <Input type="text" placeholder="write a comment..." />
                        </InputWrapper>

                    </motion.p>
                )}
            </AnimatePresence>
        </CommentsWrapper >

    );
}

export default CommentsInfos;