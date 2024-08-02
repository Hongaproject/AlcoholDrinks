import styled from "styled-components"

const Container = styled.div`
    
`
const Column = styled.div`
    
`
const Username = styled.span`
    
`
const Payload = styled.p`
    
`

export default function Text ({username, text}) {
    return(
        <Container>
            <Column>
                <Username>{username}</Username>
                <Payload>{text}</Payload>
            </Column>
        </Container>
    )
}