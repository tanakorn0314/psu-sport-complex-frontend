import styled from 'styled-components';
import withText from '../../hocs/withText';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';

const pageTitle = styled.h1`
    font-size: 2em;
    font-family: ${fonts.psuStidti};
    font-weight: 600;
`

const h1 = styled.h1`
    font-size: 1.6em;
    font-family: ${fonts.psuStidti};
    font-weight: 600;
    padding: 0;
    margin: 0;
`

const h2 = styled.h2`
    font-size: 1.2em;
    font-family: ${fonts.psuStidti};
    font-weight: 600;
    padding: 0;
    margin: 0;
`

const h3 = styled.h3`
    font-size: 1em;
    font-family: ${fonts.psuStidti};
    font-weight: 600;
    padding: 0;
    margin: 0;
`

const h4 = styled.h4`
    font-size: 1em;
    font-family: ${fonts.psuStidti};
    font-weight: 300;
    padding: 0;
    margin: 0;
`

const h5 = styled.h5`
    
`

const text = styled.p`
    padding: 0;
    margin: 0;
    font-size: 1.4em;
    font-family: ${fonts.dbChuanPim};
    ${props => props.light && `
        color: ${colors.light1}
    `}
`

const p = styled.p`
    padding: 0;
    margin: 0;
    font-size: 1.2em;
    font-family: ${fonts.dbChuanPim};
    ${props => props.light && `
        color: ${colors.light1}
    `}
`

const menuItem = styled.span`
    font-size: 16px;
    font-family: ${fonts.psuStidti};
`

const btn = styled.span`
    font-size: 14px;
    font-family: ${fonts.psuStidti};
`

const label = styled.label`
    font-size: 13px;
    font-family: ${fonts.psuStidti};
`

const link = styled.span`
    font-size: 14px;
    font-family: ${fonts.psuStidti};
    color: ${colors.main3};
    cursor: pointer;
`

export const PageTitle = withText(pageTitle);
export const H1 = withText(h1);
export const H2 = withText(h2);
export const H3 = withText(h3);
export const H4 = withText(h4);
export const H5 = withText(h5);
export const P = withText(p);
export const TextMenuItem = withText(menuItem);
export const TextButton = withText(btn);
export const Label = withText(label);
export const Text = withText(text);
export const TextLink = withText(link);