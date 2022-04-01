import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Grid } from 'react-loader-spinner'
import UserContext from '../../Providers/UserContext.js';
import Header from "../../components/Header/index.js";
import { publishPost, getTimeline, likePost, unlikePost, getTrending, getTrendingsHashtags, getUserPosts, getUserId, checkIfFollows, follow, unfollow, getUserName } from "../../services/api.js";
import "../../styles/reset.css";
import { Container, Main, Feed, Title, ShareBox, SharedBoxQuestion, LinkInput, DescriptionInput, PublishButton, PostBox, LeftPostContainer, LikedBy, FollowButton, UnfollowButton} from "./styles"
import PostInfos from "../../components/PostInfos/index.js";
import TrendingsHashtags from "../../components/TrendingsHashtags/index.js";

export default function UserPage({ isHidden }) {

    const {  userInfos, token } = useContext(UserContext);
    const { userName } = userInfos;

    const { id } = useParams();

    const hashtag = "";

    const [timeline, setTimeline] = useState([]);
    const [urlToPost, setUrlToPost] = useState("")
    const [postDescription, setPostDescription] = useState("")
    const [hoveredPost, setHoveredPost] = useState(null);
    const [timesFeedUpdated, setTimesFeedUpdated] = useState(0);
    const [trendingList, setTrendingList] = useState([]);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isLoadingFeed, setIsLoadingFeed] = useState(false);
    const [isLoadingFollow, setIsLoadingFollow] = useState(false);
    const [doesFollow, setDoesFollow] = useState(false);
    const [idUser, setIdUser] = useState([]);
    const [userId, setUserId] = useState([]);
    const [followerId, setFollowerId] = useState([]);

    useEffect(() => {
        setIsLoadingFeed(true);
        const promise = getUserPosts(id, token);

        promise.then((response) => {
            setIsLoadingFeed(false);
            setTimeline([...response.data]);
        });

        promise.catch((error) => {
            alert('An error occured while trying to fetch the posts, please refresh the page');
            setIsLoadingFeed(false);
        });
    }, [id, token, timesFeedUpdated]);

    useEffect(() => {
        setIsLoadingFeed(true);
        const promise = getUserId(id, token);

        promise.then((response) => {
            setIsLoadingFeed(false);
            setIdUser([...response.data]);
            setFollowerId(response.data[0].id);
            
        });

        promise.catch((error) => {
            alert('An error occured while trying to fetch the posts, please refresh the page');
            setIsLoadingFeed(false);
        });
    }, [id, token, timesFeedUpdated]);

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

        const promise = checkIfFollows(userId, followerId);

        promise.then((response) => {
            console.log(response.data);
            setDoesFollow(response.data);
        });

        promise.catch((error) => {
            console.log(error);
        });
    }, [userId, followerId]);


    useEffect(() => {
        try {
            if (hashtag) {
                const promiseTrendingPosts = getTrending(hashtag, token);
                
                promiseTrendingPosts.then(response => {
                    if (response.data) {
                        /*Colocar o mesmo que os posts da timeline*/
                    }
                });
            }

            const promiseTrendings = getTrendingsHashtags(token);
            promiseTrendings.then(response => {
                if (response.data) {
                    setTrendingList(response.data);
                }
            });
        }
        catch (e) {
            alert('Falha.');
        }
        
    }, [hashtag, token]);

    function followUser()
    {
        follow(userId, followerId);
        setDoesFollow(true);

    }

    function unfollowUser()
    {
        unfollow(userId, followerId);
        setDoesFollow(false);
    }

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


    return (
        <Container isPublishing={isPublishing}>
            <Header />
            <Main>
                <Feed>
                   
                    <Title> {idUser[0]?.name} </Title>
                    {userId === followerId ?
                    <></>
                    :
                    <div>
                    {isLoadingFollow ?
                        <>
                        </>
                        :
                        <div>  
                            {doesFollow ?
                                <></>
                                :
                                <FollowButton onClick={() => followUser()}>Follow</FollowButton>       
                            }  
                            <UnfollowButton onClick={() => unfollowUser()}>Unfollow</UnfollowButton>                                                                            
                        </div>         
                    }
                    </div>
                    }
                    {isLoadingFeed ?
                        <>
                            <Grid height="50" width="50" color='grey' ariaLabel='loading' />
                            <h3>Loading...</h3>
                        </>
                        :
                        timeline.length === 0 ?
                            <h3>There are no posts from this user yet</h3>
                            :
                            timeline.map(post =>
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

                                        <LikedBy style={hoveredPost === timeline.indexOf(post) && post.likedBy !== '' ? { display: 'block' } : { display: 'none' }} >
                                            {post.likedBy}

                                            <div />
                                        </LikedBy>
                                    </LeftPostContainer>

                                    <PostInfos post={post} />

                                </PostBox>
                            )}

                </Feed>
                <TrendingsHashtags trendingList={trendingList} />
            </Main>
        </Container>
    )
}

