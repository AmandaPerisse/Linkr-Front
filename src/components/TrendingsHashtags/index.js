import React from 'react';

import { TrendingSubTitle, SubTitle, TrendingHashtags, HashtagName } from './styles';

function TrendingsHashtags({ trendingList }) {

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
        <div>
            <TrendingSubTitle>
                <SubTitle>Trending</SubTitle>
            </TrendingSubTitle>
            <TrendingHashtags>
                <Hashtags />
            </TrendingHashtags>
        </div>

    );
}

export default TrendingsHashtags;