import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { AiOutlineComment } from 'react-icons/ai';

import { Grid } from 'react-loader-spinner'
import UserContext from '../../Providers/UserContext.js';
import Header from "../../components/Header/index.js";
import { publishPost, getTimeline, likePost, unlikePost, getTrending, getTrendingsHashtags, getUserFriends, getUserName, getUserPosts } from "../../services/api.js";
import "../../styles/reset.css";
import { Container, Main, Feed, Title, ShareBox, SharedBoxQuestion, LinkInput, DescriptionInput, PublishButton, PostBox, LeftPostContainer, LikedBy, PostWrapper } from "./styles"
import PostInfos from "../../components/PostInfos/index.js";
import TrendingsHashtags from "../../components/TrendingsHashtags/index.js";
import CommentsInfos from "../../components/CommentsInfos/index.js";

export default function TimelinePage({ title, isHidden }) {
    const {  userInfos, token } = useContext(UserContext);
    const { userName } = userInfos;

    const { hashtag } = useParams();
    if (!title) {
        title = `# ${hashtag}`;
    }

    const [timeline, setTimeline] = useState([]);
    const [friendPosts, setFriendPosts] = useState([]);
    const [urlToPost, setUrlToPost] = useState("")
    const [postDescription, setPostDescription] = useState("")
    const [hoveredPost, setHoveredPost] = useState(null);
    const [timesFeedUpdated, setTimesFeedUpdated] = useState(0);
    const [trendingList, setTrendingList] = useState([]);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isLoadingFeed, setIsLoadingFeed] = useState(false);
    const [userId, setUserId] = useState([]);
    const [userFriends, setUserFriends] = useState([]);

    const [isShowingComments, setIsShowingComments] = useState(false);
    const [showingCommentsPostId, setShowingCommentsPostId] = useState(null);

    useEffect(() => {

        const promise = getUserName(userName);

        promise.then((response) => {
            setUserId(response.data[0].id);
        });

        promise.catch((error) => {
            console.log(error);
        });
    }, [userName]);

    useEffect(() => {

        const promise = getUserFriends(userId);

        promise.then((response) => {
            setUserFriends(response.data);
        });

        promise.catch((error) => {
            console.log(error);
        });
    }, [userId]);

    useEffect(async () => {
        let aux = [];
        try
        {

        
        setIsLoadingFeed(true);
        
        for (let i=0; i<userFriends.length; i++)
        {
            const response = await getUserPosts(userFriends[i].friendId, token);
                console.log("postatual", userFriends[i].friendId, response.data);
                if ( response.data.length !== 0)
                {
                    console.log("entrou no if")
                    aux.push(...response.data);    
                }
        } 
        }
        catch(error) {
                alert('An error occured while trying to fetch the posts, please refresh the page');
                setIsLoadingFeed(false);
            };

            setFriendPosts([...aux]);
            setIsLoadingFeed(false);

        }
    , [userFriends, token]);
    

    useEffect(() => {
        setIsLoadingFeed(true);
        if (hashtag) {
            const promise = getTrending(hashtag, token);

            promise.then((response) => {
                setIsLoadingFeed(false);
                setTimeline([...response.data]);
            });

            promise.catch((error) => {
                alert('An error occured while trying to fetch the posts, please refresh the page');
                setIsLoadingFeed(false);
            });
        }
        else {
            const promise = getTimeline(token);

            promise.then((response) => {
                setIsLoadingFeed(false);
                setTimeline([...response.data]);
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
    }, [token, timesFeedUpdated, hashtag]);

    function handlePublishing(e) {
        e.preventDefault();
        setIsPublishing(true);
        setUrlToPost('');
        setPostDescription('');

        const promise = publishPost(
            {
                "url": urlToPost,
                "description": postDescription
            }, token
        );

        promise.then(response => {
            setTimesFeedUpdated(timesFeedUpdated + 1);
            setIsPublishing(false);
        })

        promise.catch(error => {
            alert("Houve um erro ao publicar seu link");
            console.log(error.response.status)
            setIsPublishing(false);
        })
    }

    async function handleLikePost(type, postId) {
        if (type === 'like') {
            await likePost(postId, token);
        };

        if (type === 'unlike') {
            await unlikePost(postId, token);
        };

        setTimesFeedUpdated(timesFeedUpdated + 1);
        return;
    }

    function handleIsShowingComments(postId) {
        if (isShowingComments === false) {
            setIsShowingComments(true)
            setShowingCommentsPostId(postId)
        }
        else {
            setIsShowingComments(false)
            setShowingCommentsPostId(null)
        }
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

                    {isLoadingFeed ?
                        <>
                            <Grid height="50" width="50" color='grey' ariaLabel='loading' />
                            <h3>Loading...</h3>
                        </>
                        :
                        timeline.length === 0 ?
                            <h3>There are no posts yet</h3>
                            :
                            friendPosts.map(post =>
                                <>
                                    <PostWrapper>
                                        <PostBox>
                                            <LeftPostContainer>
                                                <img src={post.user.pictureUrl} alt={post.user.name} />
                                                {post.likedByUser ?
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

                                                <p>{`${post.likesAmount} likes`}</p>

                                                <AiOutlineComment onClick={() => handleIsShowingComments(post.id)} />
                                                <p>{` 23 Comments`}</p>

                                                <LikedBy style={hoveredPost === timeline.indexOf(post) && post.likedBy !== '' ? { display: 'block' } : { display: 'none' }} >
                                                    {post.likedBy}

                                                    <div />
                                                </LikedBy>
                                            </LeftPostContainer>

                                            <PostInfos post={post} />

                                        </PostBox>
                                        <CommentsInfos
                                            isShowingComments={isShowingComments}
                                            showingCommentsPostId={showingCommentsPostId}
                                            post={post}
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

