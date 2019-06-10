import React from 'react';
import StyledTable from './style';
import { TextTHead, TextTBody } from '../typo';
import { withNamespaces } from '../../i18n';

class RateTable extends React.Component {
    render() {
        const { t, stadium } = this.props;
        return (
            <StyledTable>
                <thead>
                    <tr>
                        <td><TextTHead className='text' msg='type'/></td>
                        <td><TextTHead className='text' msg='serviceRate'/></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><TextTBody className='text' msg='generalPublic'/></td>
                        <td><TextTBody className='text' >{stadium.costPublic} {t('baht/hour')}</TextTBody></td>
                    </tr>
                    <tr>
                        <td><TextTBody className='text' msg='member'/></td>
                        <td><TextTBody className='text'>{stadium.costMember} {t('baht/hour')}</TextTBody></td>
                    </tr>
                    <tr>
                        <td><TextTBody className='text' msg='staff'/></td>
                        <td><TextTBody className='text'>{stadium.costStaff} {t('baht/hour')}</TextTBody></td>
                    </tr>
                    <tr>
                        <td><TextTBody className='text' msg='student'/></td>
                        <td><TextTBody className='text'>{stadium.costStudent} {t('baht/hour')}</TextTBody></td>
                    </tr>
                </tbody>
            </StyledTable>
        )
    }
}

export default withNamespaces('common')(RateTable);