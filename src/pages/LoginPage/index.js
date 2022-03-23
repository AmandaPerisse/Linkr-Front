import React, { useState } from 'react';
import { Button, Container, Input, LinkStyled, LogoCard, LogoWrapper, SignUpCard, SignUpWrapper, Subtitle, Title } from '../SignUpPage/styles';

// import { Container } from './styles';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [inputLoading, setInputLoading] = useState("");

    function handleLogin(e) {
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
                    <form onSubmit={handleLogin} >
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
                        <Button>
                            Log In
                        </Button>

                        <LinkStyled to="/sign-up" > First time?Create an account! </LinkStyled>
                    </form>
                </SignUpCard>

            </SignUpWrapper>

        </Container>
    )
}

export default LoginPage;