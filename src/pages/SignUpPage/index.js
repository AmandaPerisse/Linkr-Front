import React, { useState } from 'react';
import { Button, Container, Input, LinkStyled, LogoCard, LogoWrapper, SignUpCard, SignUpWrapper, Subtitle, Title } from './styles';


function SignUpPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [url, setUrl] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [inputLoading, setInputLoading] = useState("");

    function handleSignUp(e) {
        e.preventDefault();

    }

    return (
        <Container>
            <LogoWrapper>
                <LogoCard>
                    <Title>linkr</Title>
                    <Subtitle>save, share and discover</Subtitle>
                    <Subtitle>the best links on the web</Subtitle>
                </LogoCard>
            </LogoWrapper>
            <SignUpWrapper>
                <SignUpCard>
                    <form onSubmit={handleSignUp} >
                        <Input
                            type="email"
                            placeholder="e-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            disabled={inputLoading}
                        />
                        <Input
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            disabled={inputLoading}
                        />
                        <Input
                            type="username"
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            disabled={inputLoading}
                        />
                        <Input
                            type="url"
                            placeholder="picture url"
                            onChange={(e) => setUrl(e.target.value)}
                            value={url}
                            disabled={inputLoading}
                        />
                        <Button>
                            Sign Up
                        </Button>

                        <LinkStyled to="/" > Switch back to log in </LinkStyled>
                    </form>



                </SignUpCard>

            </SignUpWrapper>

        </Container>
    );
}

export default SignUpPage;