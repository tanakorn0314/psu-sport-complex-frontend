import React from 'react';
import BookingAction from '../../../redux/booking/actions';
import iniData from './initData';
import StyledWrapper from './style';
import { connect } from 'react-redux';
import dataHandler from './dataHandler';
import {
    InputDate,
    SelectStadium
} from '../../BookingInputs';
import {
    Modal,
    Button,
    Typography,
    notification,
    Row,
    Col
} from 'antd';
import BillService from '../../../coreLayer/service/billService';
import BookingComponent from '../../BookingComponent';
import BottomAction from '../../../components/bottomAction';
import moment from 'moment';
import BookingService from '../../../coreLayer/service/bookingService';

const { Text } = Typography;
const { times } = iniData;

class BookOnline extends React.Component {

    interval = null;

    constructor(props) {
        super(props);
        this.state = {
            modal: {
                title: '',
                body: '',
                isOpen: '',
                action: '',
                cancel: '',
                cancelAction: null,
                minute: 0,
                second: 0,
                fee: 0,
                isOpen: false
            },
            image: '/static/Placeholder.jpg',
            file: '',
            billId: 0,
        }
    }

    render() {
        const { stadiumBooking, stadiumId, fee, bookingList } = this.props.Booking;
        const { stadiums } = this.props.Stadium;
        const { profile } = this.props.Auth;
        const { isLoading, isMobile } = this.props.Screen;
        const {
            modal
        } = this.state;

        return (
            <StyledWrapper>
                <h1 style={{ textAlign: 'center' }}>BOOKING</h1>
                <Row>
                    <Col className='select-date' xs={{order: 2, span: 24}} sm={12} md={12} lg={12} xl={12}>
                        <InputDate/>
                    </Col>
                    <Col className='select-container' xs={{order: 1, span: 24}} sm={12} md={12} lg={12} xl={12}>
                        <SelectStadium/>
                    </Col>
                </Row>
                <div>
                    <BookingComponent />
                </div>
                <BottomAction
                    visible={bookingList.length > 0}
                    fee={fee}
                    onClick={this.handleClick}
                />
                <Modal
                    visible={modal.isOpen}
                    toggle={this.toggle}
                    title={modal.title}
                    footer={[
                        (modal.action.length > 0 && <Button type="primary" onClick={this.handleUploadImage}>{modal.action}</Button>),
                        <Button type="secondary" onClick={modal.cancelAction}>{modal.cancel}</Button>
                    ]}
                >
                    {modal.body}
                </Modal>
            </StyledWrapper>
        );
    }

    renderConfirm = () => (
        <div>
            <h2>Service fee : {this.state.modal.fee} baht</h2>
            <h2>Please pay to</h2>
            <h2>
                xxx-xxxxxx-x <br />
                SCB PSU Phuket
                </h2>
            <h1>{this.state.modal.minute} : {this.state.modal.second.toString().padStart(2, '0')}</h1>
            <h3>Upload your payment slip</h3>
            <label htmlFor='upload-image'>
                <img src={this.state.image} className='img' width={200} /> <br />
                <input style={{ display: 'none' }} id='upload-image' className='input-upload' type='file' name='file' onChange={this.handleChangeImage} />
            </label>
        </div>
    )

    handleClick = async () => {
        const { bookingList, stadiumId, fee, selectedDate } = this.props.Booking;
        const { idToken, profile } = this.props.Auth;
        const { modal } = this.state;

        const bookManyDTO = dataHandler.toBookManyDto(bookingList, profile.userId, stadiumId, selectedDate);

        const result = await this.props.reserveMany(idToken, bookManyDTO);

        if (result.error) {
            return this.showErrorModal(result)
        }

        modal.fee = fee;
        modal.minute = (20 - moment(result.createAt).diff(moment(), 'minute'));
        modal.second = 0;

        this.setState({
            billId: result.billId,
            modal
        }, () => {
            this.interval = setInterval(() => {
                const { modal } = this.state;
                modal.second = modal.second - 1
                if (modal.second < 0) {
                    modal.minute = modal.minute - 1;
                    modal.second = 59;
                }
                this.setState({ modal });
                if (modal.minute < 0)
                    this.hideModal();
                else
                    this.showConfirmModal();
            }, 1000);
        });

        this.showConfirmModal();
    }

    hideModal = () => {
        const { modal } = this.state;
        modal.isOpen = false
        this.setState({
            modal,
            image: '/static/Placeholder.jpg',
            file: '',
        });

        clearInterval(this.interval);
    }

    showErrorModal = ({error}) => {
        const ErrorView = () => <div>{error}</div>

        const { modal } = this.state;
        modal.title = 'Error';
        modal.body = <ErrorView/>;
        modal.cancel = 'Cancel';
        modal.action = '';
        modal.isOpen = true;
        modal.cancelAction = this.hideModal;
        this.setState({
            modal,
        });
    }

    showConfirmModal = () => {
        const { modal } = this.state;
        modal.title = 'Confirm your booking';
        modal.body = this.renderConfirm();
        modal.cancel = 'Cancel';
        modal.action = 'Upload';
        modal.isOpen = true;
        modal.cancelAction = this.handleCancel;
        this.setState({
            modal,
        });
    }

    toggle = () => {
        const { modal } = this.state;
        modal.isOpen = !modal.isOpen;
        this.setState({
            modal
        });

        if (!modal.isOpen) {
            this.setState({
                image: '/static/Placeholder.jpg',
                file: '',
            })
            clearInterval(this.interval);
        }
    }

    showModal = (title, body, action, cancel) => {
        const { modal } = this.state;
        modal.title = title;
        modal.body = body;
        modal.cancel = cancel;
        modal.action = action;
        modal.isOpen = true;
        this.setState({
            modal,
        });
    }

    handleChangeImage = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            this.setState({
                image: reader.result,
                file
            }, () => {
                this.showConfirmModal()
            });
        }

        reader.readAsDataURL(file);
    }

    handleUploadImage = async () => {
        const { idToken } = this.props.Auth;
        const { billId } = this.state;
        const formData = new FormData();
        formData.append('file', this.state.file);
        const response = await BillService.uploadSlip(idToken, formData, billId);
        this.props.refreshData();

        if (response.error) {
            notification['error']({
                message: 'Error',
                description: response.error,
                duration: 3
            });
        } else {
            notification['success']({
                message: 'Success',
                description: 'Confirm booking success',
                duration: 3
            });
            this.hideModal();
        }
    }

    handleCancel = async () => {
        const result = await BookingService.deleteByBillId(this.props.Auth.idToken, this.state.billId);
        this.props.refreshData();
        this.hideModal();
    }
}

export default connect(state => state, BookingAction)(BookOnline);