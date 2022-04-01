import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { AiOutlineComment } from 'react-icons/ai';
import { Grid } from 'react-loader-spinner'
import UserContext from '../../Providers/UserContext.js';
import Header from "../../components/Header/index.js";
import { publishPost, getTimeline, likePost, unlikePost, getTrending, getTrendingsHashtags, getCommentsById } from "../../services/api.js";
import "../../styles/reset.css";
import { Container, Main, Feed, Title, ShareBox, SharedBoxQuestion, LinkInput, DescriptionInput, PublishButton, PostBox, LeftPostContainer, LikedBy, PostWrapper } from "./styles"
import PostInfos from "../../components/PostInfos/index.js";
import TrendingsHashtags from "../../components/TrendingsHashtags/index.js";
import CommentsInfos from "../../components/CommentsInfos/index.js";
import NewPosts from "../../components/NewPosts/index.js";

export default function TimelinePage({ title, isHidden }) {
    const { token } = useContext(UserContext);

    const { hashtag } = useParams();
    if (!title) {
        title = `# ${hashtag}`;
    }

    const [timeline, setTimeline] = useState([]);
    const [likedByUserPosts, setLikedByUserPosts] = useState([]);
    const [actualLikesAmount, setActualLikesAmount] = useState([]);
    const [actualLikedByText, setActualLikedByText] = useState([]);

    const [urlToPost, setUrlToPost] = useState("")
    const [postDescription, setPostDescription] = useState("")
    const [hoveredPost, setHoveredPost] = useState(null);
    const [timesFeedUpdated, setTimesFeedUpdated] = useState(0);
    const [trendingList, setTrendingList] = useState([]);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isLoadingFeed, setIsLoadingFeed] = useState(false);
    const [isHashtagPage, setIsHashtagPage] = useState(false);

    const [isShowingComments, setIsShowingComments] = useState(false);
    const [showingCommentsPostId, setShowingCommentsPostId] = useState(null);
    const [commentsByPostId, setCommentsByPostId] = useState([]);
    const [commentsAmount, setCommentsAmount] = useState(0);

    useEffect(() => {
        setIsLoadingFeed(true);
        if (hashtag) {
            setIsHashtagPage(true);
            const promise = getTrending(hashtag, token);

            promise.then((response) => {
                setTimeline([...response.data]);

                const postsUserLiked = [];
                response.data.forEach(post => post.likedByUser && postsUserLiked.push(post.id));
                setLikedByUserPosts(postsUserLiked);

                const likesAmount = response.data.map(post => post.likesAmount);
                setActualLikesAmount(likesAmount);

                const actualLikedByText = response.data.map(post => post.likedBy);
                setActualLikedByText(actualLikedByText);

                setIsLoadingFeed(false);
            });
            
            promise.catch((error) => {
                alert('An error occured while trying to fetch the posts, please refresh the page');
                setIsLoadingFeed(false);
            });
        }
        else {
            setIsHashtagPage(false);
            const promise = getTimeline(token);

            promise.then((response) => {
                setTimeline([...response.data]);

                const postsUserLiked = [];
                response.data.forEach(post => post.likedByUser && postsUserLiked.push(post.id));
                setLikedByUserPosts(postsUserLiked);

                const likesAmount = response.data.map(post => post.likesAmount);
                setActualLikesAmount(likesAmount);

                const actualLikedByText = response.data.map(post => post.likedBy);
                setActualLikedByText(actualLikedByText);

                setIsLoadingFeed(false);
            });

            promise.catch((error) => {
                alert('An error occured while trying to fetch the posts, please refresh the page');
                setIsLoadingFeed(false);
            });
        }

        const promiseTrendings = getTrendingsHashtags(token);

        promiseTrendings.then(response => {
            if (response.data) {
                setTrendingList(response.data);
            }
        });

        promiseTrendings.catch((error) => {
            alert('An error occured while trying to fetch the trending hashtags, please refresh the page');
            setIsLoadingFeed(false);
        });
    }, [token, hashtag, timesFeedUpdated]);

    function handlePublishing(e) {
        e.preventDefault();
        setIsPublishing(true);
        setUrlToPost('');
        setPostDescription('');

        const promise = publishPost({"url": urlToPost, "description": postDescription}, token);

        promise.then(response => {
            setTimesFeedUpdated(timesFeedUpdated + 1);
            setIsPublishing(false);
        })

        promise.catch(error => {
            alert("Houve um erro ao publicar seu link");
            setIsPublishing(false);
        })
    }
    
    async function handleLikePost(type, postId) {
        if (type === 'like') {
            await likePost(postId, token);
            setLikedByUserPosts([...likedByUserPosts, postId]);
            
            const postIndex = timeline.findIndex(post => post.id === postId);
            const peopleWhoLikedArray = timeline[postIndex].likedBy.split(',');

            const newLikesAmount = timeline[postIndex].likesAmount + 1;
            actualLikesAmount[postIndex] = newLikesAmount;

            setActualLikesAmount([...actualLikesAmount]);

            let likedBy = '';
            if (newLikesAmount >= 4)
                likedBy = `You, ${peopleWhoLikedArray[0].replace(/,/g, '')} and ${newLikesAmount - 2} others`;
            
            if (newLikesAmount === 3)
                likedBy = `You, ${peopleWhoLikedArray[0].replace(/,/g, '')} and ${peopleWhoLikedArray[1]}`;
            
            if (newLikesAmount === 2)
                likedBy = `You and ${peopleWhoLikedArray[0].replace(/,/g, '')}`;

            if (newLikesAmount === 1)
                likedBy = `You`;

            actualLikedByText[postIndex] = likedBy;
            setActualLikedByText([...actualLikedByText]);
        };
        
        if (type === 'unlike') {
            await unlikePost(postId, token);
            setLikedByUserPosts(likedByUserPosts.filter(id => id !== postId));

            const postIndex = timeline.findIndex(post => post.id === postId);

            const newLikesAmount = actualLikesAmount[postIndex] - 1;
            actualLikesAmount[postIndex] = newLikesAmount;
            setActualLikesAmount([...actualLikesAmount]);

            actualLikedByText[postIndex] = timeline[postIndex].likedBy;
            setActualLikedByText([...actualLikedByText]);
        };

        return;
    }

    function handleIsShowingComments(postId) {
        if (isShowingComments == false) {
            getComments(postId)
            setIsShowingComments(true)
            setShowingCommentsPostId(postId)
        }
        else {
            setIsShowingComments(false)
            setShowingCommentsPostId(null)
        }
    }

    function getComments(postId) {
        const promise = getCommentsById(token, postId)

        promise.then(response => {
            setCommentsByPostId(response.data)
        });
        promise.catch(error => {
            if (error.response.status === 404) {
                setCommentsByPostId([])
                alert("pegou mas nao tem comentarios nesse post ainda")
            }
            else {
                alert("Não consequimos carregar os comentários")
            }
        }
        );
    }
    return (
        <Container isPublishing={isPublishing}>
            <Header />
            <Main>
                <Feed>
                    <Title>{title}</Title>

                    <ShareBox isHidden={isHidden}>
                        <form onSubmit={handlePublishing}>

                            <SharedBoxQuestion>
                                What are you going to share today?
                            </SharedBoxQuestion>

                            <LinkInput
                                placeholder="http:/..."
                                type="url"
                                onChange={(e) => setUrlToPost(e.target.value)}
                                value={urlToPost}
                                required
                            />

                            <DescriptionInput
                                placeholder="Awesome article about #javascript"
                                onChange={(e) => setPostDescription(e.target.value)}
                                value={postDescription}
                            />

                            <PublishButton isPublishing={isPublishing}>
                                {isPublishing ? 'Publishing...' : 'Publish'}
                            </PublishButton>
                        </form>
                    </ShareBox>
                    <NewPosts isHashtagPage = {isHashtagPage}/>
                    {isLoadingFeed ?
                        <>
                            <Grid height="50" width="50" color='grey' ariaLabel='loading' />
                            <h3>Loading...</h3>
                        </>
                        :
                        timeline.length === 0 ?
                            <h3>There are no posts yet</h3>
                            :
                            timeline.map(post =>
                                <>
                                    <PostWrapper>
                                        <PostBox>
                                            <LeftPostContainer>
                                                <img src={post.user.pictureUrl} alt={post.user.name} />
                                                {likedByUserPosts.includes(post.id) ?
                                                    <FaHeart
                                                        onClick={() => handleLikePost('unlike', post.id)}
                                                        size={17}
                                                        color={"#AC0000"}
                                                        onMouseEnter={() => {
                                                            setHoveredPost(timeline.indexOf(post));
                                                        }}
                                                        onMouseLeave={() => {
                                                            setHoveredPost(null)
                                                        }}
                                                    />
                                                    :
                                                    <FaRegHeart
                                                        onClick={() => handleLikePost('like', post.id)}
                                                        size={17}
                                                        color={"#FFFFFF"}
                                                        onMouseEnter={e => {
                                                            setHoveredPost(timeline.indexOf(post));
                                                        }}
                                                        onMouseLeave={e => {
                                                            setHoveredPost(null)
                                                        }}
                                                    />
                                                }

                                                <p>{`${actualLikesAmount[timeline.indexOf(post)]} ${actualLikesAmount[timeline.indexOf(post)] === 1 ? 'like' : 'likes'}`}</p>

                                                <AiOutlineComment onClick={() => handleIsShowingComments(post.id)} />
                                                <p>{`${post.commentsAmount} comments`}</p>

                                                <LikedBy style={hoveredPost === timeline.indexOf(post) && post.likedBy !== '' ? { display: 'block' } : { display: 'none' }} >
                                                    {actualLikedByText[timeline.indexOf(post)]}

                                                        <div />
                                                    </LikedBy>
                                                </LeftPostContainer>

                                            <PostInfos post={post} />

                                        </PostBox>
                                        <CommentsInfos
                                            isShowingComments={isShowingComments}
                                            showingCommentsPostId={showingCommentsPostId}
                                            post={post}
                                            commentsByPostId={commentsByPostId}
                                        />
                                        </PostWrapper>
                                    </>
                            )}
                </Feed>
                <TrendingsHashtags trendingList={trendingList} />
            </Main>
        </Container>
    )
}

