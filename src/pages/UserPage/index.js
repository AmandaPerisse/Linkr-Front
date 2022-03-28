import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Grid } from 'react-loader-spinner'
import UserContext from '../../Providers/UserContext.js';
import Header from "../../components/Header/index.js";
import SearchBar from "../../components/SearchBar/search.js";
import { publishPost, getTimeline, getUserPosts, getUserId } from "../../services/api.js";
import PostLoader from "../../components/Loader/contentLoader.js";
import "../../styles/reset.css";
import { Container, Main, Feed, Title, ShareBox, SharedBoxQuestion, LinkInput, DescriptionInput, PublishButton, PostBox, LeftPostContainer, LikedBy } from "./styles"
import PostInfos from "../../components/PostInfos/index.js";
import TrendingsHashtags from "../../components/TrendingsHashtags/index.js";


export default function UserPage({ isHidden }) {
    const { userInfos, token } = useContext(UserContext);

    const { id } = useParams();

    const hashtag = "";

    const [timeline, setTimeline] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [urlToPost, setUrlToPost] = useState("")
    const [postDescription, setPostDescription] = useState("")
    const [hoveredPost, setHoveredPost] = useState(null);
    const [timesFeedUpdated, setTimesFeedUpdated] = useState(0);
    const [trendingList, setTrendingList] = useState([]);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isLoadingFeed, setIsLoadingFeed] = useState(false);
    const [idUser, setIdUser] = useState({});

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
        const promise = getUserId(id);

        promise.then((response) => {
            setIsLoadingFeed(false);
            setIdUser([...response.data]);
        });

        promise.catch((error) => {
            setIsLoadingFeed(false);
            alert('An error occured while trying to fetch users information please refresh the page');
        });
    }, [id]);

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
            <SearchBar></SearchBar>
                <Feed>
                    <Title> {idUser[0].name}'s posts </Title>
                    

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

