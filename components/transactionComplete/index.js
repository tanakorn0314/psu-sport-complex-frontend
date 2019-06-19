import React from 'react';
import { withNamespaces, Trans } from '../../i18n';
import fonts from '../../styles/fonts';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    font-family: ${fonts.dbChuanPim};
    font-size: 1.4em;
    p {
        margin: 0;
        padding: 0;
    }
`

class TransactionComplete extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <StyledWrapper>
                <p>{t('transactionComplete')}</p>
                <p>{t('after validation is success')}</p>
                <Trans>
                    <p>pleaseContact <a href='#'>fanpage</a> <a href='#'>phoneNumber</a></p>
                </Trans>
                <p><strong>{t('do you want to check your booking history')}</strong></p>
            </StyledWrapper>
        )
    }
}

export default withNamespaces('common')(TransactionComplete);