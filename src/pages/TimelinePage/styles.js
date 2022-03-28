import styled from "styled-components";

const Container = styled.main`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #333333;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    min-height: 100vh;

    * {
        box-sizing: border-box;
    }

    ${({ isPublishing }) =>
    (isPublishing && `
            pointer-events: none !important;
        `)
    };

    @media(max-width: 700px) {
        width: 100vw;
    }
    
`;
const Main = styled.div`
    display: flex;
    justify-content: space-between; 
    margin: 72px 0;
    gap: 20px;
     @media(max-width: 700px) {
        width: fit-content;
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
     @media(max-width: 700px) {
        width: fit-content;
    }
`;

const Title = styled.h1`
    font-size: 33px;
    color: #FFF;
    font-family: Oswald;
    font-weight: 700;
    margin-top: 19px;
    align-self: flex-start;

    @media(max-width: 1280px) {
        margin-bottom: 18px;
    }
    @media(max-width: 700px) {
       padding-left: 18px ;
    }
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

     @media(max-width: 700px) {
        width: 100vw;
        border-radius: 0px;
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

    @media(max-width: 1280px) {
        margin: 30px 0;
    }
     @media(max-width: 700px) {
        width: 100vw;
        border-radius: 0px;
        margin: 16px 0;

    }
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

export {
    Container, Main, Feed, Title, ShareBox, SharedBoxQuestion, LinkInput, DescriptionInput,
    PublishButton, PostBox, LeftPostContainer, LikedBy
}
