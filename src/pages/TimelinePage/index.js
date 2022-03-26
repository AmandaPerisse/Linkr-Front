import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Grid } from 'react-loader-spinner'
import UserContext from '../../Providers/UserContext.js';
import Header from "../../components/Header/index.js";
import { publishPost, getTimeline } from "../../services/api.js";
import PostLoader from "../../components/Loader/contentLoader.js";
import "../../styles/reset.css";

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
        console.log(timesFeedUpdated);
    }

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


    function Hashtags() {
        return (
            trendingList.map(hashtag => {
                const id = hashtag.id;
                const name = hashtag.name;
                return (
                    <HashtagName key={id}>
                        <a href={`/hashtags/${name}`}># {name}</a>
                    </HashtagName>
                )

            })
        )
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
                            <Grid
                                height="50"
                                width="50"
                                color='grey'
                                ariaLabel='loading'
                            />
                            <h3>Loading...</h3>
                            <PostBox>
                                <PostLoader />
                            </PostBox>

                            <PostBox>
                                <PostLoader />
                            </PostBox>

                            <PostBox>
                                <PostLoader />
                            </PostBox>
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

                                    <RightPostContainer>
                                        <h1>{post.user.name}</h1>

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
                                    </RightPostContainer>
                                </PostBox>
                            )}
                </Feed>
                <div>
                    <TrendingSubTitle>
                        <SubTitle>Trending</SubTitle>
                    </TrendingSubTitle>
                    <TrendingHashtags>
                        <Hashtags />
                    </TrendingHashtags>
                </div>
            </Main>
        </Container>
    )
}

const Container = styled.main`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #333333;
    display: flex;
    justify-content: center;
    box-sizing: border-box;

    * {
        box-sizing: border-box;
    }

    ${({ isPublishing }) =>
    (isPublishing && `
            pointer-events: none !important;
        `)
    };
`;
const Main = styled.div`
    display: flex;
    justify-content: space-between; 
    margin: 72px 0;
    gap: 20px;
`;
const TrendingSubTitle = styled.div`
    background-color: #171717; 
    width: 300px;
    margin-top: 66px;
    border-radius: 16px 16px 0px 0px;
    padding: 0px 15px;
    height: 55px;
    display: flex;
    align-items: center;
`;
const TrendingHashtags = styled.div`
    background-color: #171717; 
    width: 300px;
    margin-top: 1px;
    border-radius: 0px 0px 16px 16px;
    padding: 20px 15px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
`;
const SubTitle = styled.h2`
    font-size: 27px;
    color: #FFF;
    font-family: Oswald;
`;
const HashtagName = styled.h3`
    font-size: 19px;
    color: #FFF;
    font-family: Oswald;
    a{
        color: white;
    }
`;

const Feed = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    h3 {
        font-family: Lato;
        font-size: 25px;
        color: #FFFFFF;
        font-weight: 700;
    }

    width: 615px; //Hashtag update
`;

const Title = styled.h1`
    font-size: 33px;
    color: #FFF;
    font-family: Oswald;
    font-weight: 700;
    margin-top: 19px;
    align-self: flex-start;
`;

const ShareBox = styled.div`
    border-radius: 16px;
    width: 100%;
    height: 164px;
    background-color: #FFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding: 10px 15px;
    display: ${props => props.isHidden};

    form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 5px;
    }
`;

const SharedBoxQuestion = styled.div`
    height: 20px;
    font-family: Lato;
    color: #707070;
    font-size: 17px;
    font-style: normal;
    font-weight: 300;
    text-align: center;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const LinkInput = styled.input`
    background-color: #EFEFEF;
    width: 100%;
    height: 30px;
    border: 0px solid;
    border-radius: 5px;
    padding: 6px 0 8px 11px;

    font-family: Lato;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
    line-height: 16px;
    text-align: left;

    ::placeholder {
        color: #949494;
    }

    :focus{
        outline: 2px solid #1877F2;
    }
`;

const DescriptionInput = styled.textarea`
    background-color: #EFEFEF;
    width: 100%;
    height: 47px;
    border: 0px solid;
    border-radius: 5px;
    padding: 6px 0 8px 11px;

    font-family: Lato;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
    line-height: 16px;
    text-align: left;
    resize: none;

    ::placeholder {
        color: #949494;
    }

    :focus{
        outline: 2px solid #1877F2;
    }
`;

const PublishButton = styled.button`
    min-width: 35%;
    height: 22px;
    background-color: #1877F2;
    border: 0px solid;
    border-radius: 5px;
    align-self: end;

    font-family: Lato;
    color: #FFFFFF;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    cursor: pointer;

    ${({ isPublishing }) =>
    (isPublishing && `
            opacity: 0.7 !important;
            pointer-events: none !important;
        `)
    };
`;

const PostBox = styled.div`
    border-radius: 16px;
    width: 100%;
    height: auto;
    max-height: 340px;
    background-color: #171717;
    padding: 15px;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 14px;
    font-family: Lato;
    font-weight: 400;
`;

const LeftPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #FFFFFF;
        object-fit: cover;
        margin-bottom: 17px;
        cursor: pointer;
    }

    p {
        font-size: 9px;
        text-align: center;
        color: #FFFFFF;
        margin: 12px 0;
    }

    svg {
        cursor: pointer;
    }
`;

const RightPostContainer = styled.div`
    height: auto;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;

    h1 {
        font-weight: 400;
        font-size: 17px;
        text-align: left;
        color: #FFFFFF;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
    }

    article {
        width: 100%;
        height: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        
        p {
            font-family: Lato;
            font-size: 15px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
            text-align: left;
            color: #B7B7B7;
        }

        strong {
            color: #FFFFFF;
        }
    }
`;

const LinkPreview = styled.div`
    width: 100%;
    height: auto;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    overflow: hidden;
    display: flex;
    align-items: stretch;
    cursor: pointer;
`;

const LinkData = styled.div`
    width: 68%;
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 5px;

    h1 {
        width: 100%;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
        font-size: 11px;
        font-weight: 400;
        line-height: 13px;
        text-align: left;
        color: #CECECE; 
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;       
    }

    p {
        font-size: 9px;
        font-weight: 400;
        line-height: 11px;
        text-align: left;
        color: #9B9595;
        white-space: normal;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }

    h2 {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 9px;
        font-weight: 400;
        line-height: 11px;
        text-align: left;
        color: #CECECE;
    }
`;

const LinkImage = styled.div`
    width: 32%;
    overflow: hidden;
    background-color: #FFFFFF;
    display: flex;

    img {
        width: 100%;
        object-fit: cover;
    }
`;

const LikedBy = styled.div`
    position: absolute;
    top: 110px;
    width: auto;
    height: 25px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 3px;
    white-space: nowrap;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 11px;
    color: #505050;

    div {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 8px solid rgba(255, 255, 255, 0.9);
        position: absolute;
        bottom: 84%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;