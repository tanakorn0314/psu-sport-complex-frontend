import React from 'react';
import Link from 'next/link';
import InputWithLabel from './input_with_label';
import ButtonPrimary from './button_primary';

const FormSignIn = () => (
    <div className='container'>
        <h1 className='title'>Sign in</h1>
        <form>
            <InputWithLabel label='Username' type='text' />
            <InputWithLabel label='Password' type='password' />
            <div className='action-container'>
                <Link href='/signup'><a className='link'>Create account</a></Link>
                <ButtonPrimary>Login</ButtonPrimary>
            </div>
        </form>
        <style jsx>{`
            .container {
                display: flex;
                flex-direction: column;
                padding: 20px;
                border: solid 1px black;
                border-radius: 3px;
                min-width: 300px;
                max-width: 400px;
                max-height: 400px;
            }
            .title {
                text-align: center;
            }
            .action-container {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-top: 10px;
            }
            .link {
                text-decoration: none;
            }
        `}</style>
    </div>
)

export default FormSignIn;