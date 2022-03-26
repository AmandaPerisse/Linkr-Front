import React from 'react';

import { PostContainer, LinkPreview, LinkData, LinkImage } from './styles';

function PostInfos({ post }) {

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

    return (
        <PostContainer>
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
        </PostContainer>
    );
}

export default PostInfos;