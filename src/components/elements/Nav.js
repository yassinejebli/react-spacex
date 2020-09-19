import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

export default function Nav(){
    return <Wrapper>
        <NavItem to="/">HISTORY</NavItem>
        <NavItem to="/launches">LAUNCHES</NavItem>
    </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  
`

const NavItem = styled(Link)`
  font-size: 1.15rem;
  margin-left: 32px;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  color: #000;
`
