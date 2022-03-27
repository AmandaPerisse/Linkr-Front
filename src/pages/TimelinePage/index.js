import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Grid } from 'react-loader-spinner'
import UserContext from '../../Providers/UserContext.js';
import Header from "../../components/Header/index.js";
import { publishPost, getTimeline } from "../../services/api.js";
import PostLoader from "../../components/Loader/contentLoader.js";
import "../../styles/reset.css";
import { Container, Main, Feed, Title, ShareBox, SharedBoxQuestion, LinkInput, DescriptionInput, PublishButton, PostBox, LeftPostContainer, LikedBy } from "./styles"
import PostInfos from "../../components/PostInfos/index.js";
import TrendingsHashtags from "../../components/TrendingsHashtags/index.js";


export default function TimelinePage({ title, isHidden }) {
    const { userInfos, token } = useContext(UserContext);

    const { hashtag } = useParams();
    if (!title) {
        title = `# ${hashtag}`;
    }

    const [timeline, setTimeline] = useState([]);
    const [urlToPost, setUrlToPost] = useState("")
    const [postDescription, setPostDescription] = useState("")
    const [hoveredPost, setHoveredPost] = useState(null);
    const [timesFeedUpdated, setTimesFeedUpdated] = useState(0);
    const [trendingList, setTrendingList] = useState([]);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isLoadingFeed, setIsLoadingFeed] = useState(false);

    useEffect(() => {
        setIsLoadingFeed(true);
        const promise = getTimeline(token);

        promise.then((response) => {
            setIsLoadingFeed(false);
            setTimeline([...response.data]);
        });

        promise.catch((error) => {
            alert('An error occured while trying to fetch the posts, please refresh the page');
            setIsLoadingFeed(false);
        });
    }, [token, timesFeedUpdated]);

    useEffect(() => {
        try {
            if (hashtag) {
                const promiseTrendingPosts = axios.get(`https://top-linkr.herokuapp.com/hashtag/${hashtag}`, {
                    /*headers: {
                        "Authorization": `Bearer ${token}`
                    }*/
                });
                promiseTrendingPosts.then(response => {
                    if (response.data) {
                        /*Colocar o mesmo que os posts da timeline*/
                    }
                });
            }
            const promiseTrendings = axios.get('https://top-linkr.herokuapp.com/hashtag', {
                /*headers: {
                    "Authorization": `Bearer ${token}`
                }*/
            });
            promiseTrendings.then(response => {
                if (response.data) {
                    setTrendingList(response.data);
                }
            });
        }
        catch (e) {
            alert('Falha.');
        }
    }, [hashtag]);

    function handlePublishing(e) {
        e.preventDefault();
        setIsPublishing(true);

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


    return (
        <Container isPublishing={isPublishing}>
            <Header />
            <Main>
                <Feed>
                    <Title to={"/timeline"}> timeline </Title>

                    <ShareBox>
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
                            <PostBox><PostLoader /></PostBox>
                        </>
                        :
                        timeline.length === 0 ?
                            <h3>There are no posts yet</h3>
                            :
                            timeline.map(post =>
                                <PostBox>
                                    <LeftPostContainer>
                                        <img src={post.user.pictureUrl} alt={post.user.name} />
                                        {post.likedByUser ?
                                            <FaHeart
                                                size={17}
                                                color={"#AC0000"}
                                                onMouseEnter={e => {
                                                    setHoveredPost(timeline.indexOf(post));
                                                }}
                                                onMouseLeave={e => {
                                                    setHoveredPost(null)
                                                }}
                                            />
                                            :
                                            <FaRegHeart
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

                                        <LikedBy style={hoveredPost === timeline.indexOf(post) ? { display: 'block' } : { display: 'none' }} >
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

