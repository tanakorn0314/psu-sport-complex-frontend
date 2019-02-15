import React from 'react';
import Link from 'next/link';
import Head from '../components/head';
import FormWithLabel from '../components/input_with_label';
import ButtonPrimary from '../components/button_primary';
import FormSignIn from '../components/form_signin';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <Head />
                <FormSignIn/>
                <style jsx>{`
                    .container {
                        display: flex;
                        flex-direction: row;
                        flex: 1;
                        height: 100vh;
                        justify-content: center;
                        align-items: center;
                    }
                `}</style>
            </div>
        )
    }
}

export default SignIn;