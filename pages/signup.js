import React from 'react';
import Link from 'next/link';
import Head from '../components/head';
import FormSignUp from '../components/form_signup';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <Head/>
                <FormSignUp/>
                <style jsx>{`
                    .container {
                        display: flex;
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

export default SignUp;