import styled from "styled-components";

const TrendingSubTitle = styled.div`
    background-color: #171717; 
    width: 300px;
    margin-top: 66px;
    border-radius: 16px 16px 0px 0px;
    padding: 0px 15px;
    height: 55px;
    display: flex;
    align-items: center;
     @media(max-width: 900px) {
         display: none;
    }
`;

const SubTitle = styled.h2`
    font-size: 27px;
    color: #FFF;
    font-family: Oswald;
     @media(max-width: 900px) {
         display: none;
    }
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
     @media(max-width: 900px) {
         display: none;
    }
`;
const HashtagName = styled.h3`
    font-size: 19px;
    color: #FFF;
    font-family: Oswald;
    a{
        color: white;
    }
     @media(max-width: 900px) {
         display: none;
    }
`;

export { TrendingSubTitle, SubTitle, TrendingHashtags, HashtagName }