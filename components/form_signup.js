import React from 'react';
import InputWithLabel from './input_with_label';
import Link from 'next/link';
import ButtonPrimary from '../components/button_primary';

const FormSignUp = () => (
    <div className='container'>
        <h1>Sign Up</h1>
        <form>
            <div className='pair-field'>
                <InputWithLabel type='text' label='Fistname' />
                <InputWithLabel type='text' label='Lastname' />
            </div>
            <InputWithLabel type='text' label='Username' />
            <div className='pair-field'>
                <InputWithLabel type='password' label='Password' />
                <InputWithLabel type='password' label='Confirm' />
            </div>
            <div className='action-container'>
                <Link href='/signin'><a className='link'>Sign in</a></Link>
                <ButtonPrimary>Create account</ButtonPrimary>
            </div>
        </form>
        <style jsx>{`
        .container {
            display: flex;
            flex-direction: column;
            max-width: 400px;
            min-width: 300px;
            border: solid 1px black;
            border-radius: 3px;
            padding: 20px;
        }
        .pair-field {
            display: flex;
            flex-direction: row;
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
);

export default FormSignUp;