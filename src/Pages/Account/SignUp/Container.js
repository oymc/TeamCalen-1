import React from 'react';
import SignUp from './View';
import {REGEX} from '../../../CONSTANT/REGEX';
import Api from '../../../Api';
import message from 'antd/lib/message/index';
import {browserHistory} from 'react-router';
import {PAGE_ID, PAGE_ID_TO_ROUTE} from '../../../Router';

class SignUpContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.usernameInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.confirmPasswordInputRef = React.createRef();
        this.emailInputRef = React.createRef();
        this.verificationCodeInputRef = React.createRef();
    }

    onGetVerificationCodeButtonClick = async () =>
    {
            const email = this.emailInputRef.current.input.value;
            if (!REGEX.EMAIL.test(email))
            {
                message.warning('邮箱不正确');
            }
            else
            {
                return await Api.sendPostSendVerificationCodeByEmailRequestAsync(email);
            }
    };

    onSubmit = async e =>
    {
        e.preventDefault();
        const username = this.usernameInputRef.current.input.value;
        const password = this.passwordInputRef.current.input.value;
        const confirmPassword = this.confirmPasswordInputRef.current.input.value;
        const email = this.emailInputRef.current.input.value;
        const verificationCode = this.verificationCodeInputRef.current.input.value;

        if (!REGEX.USERNAME.test(username))
        {
            message.warning('用户名不正确');
        }
        else if (!REGEX.PASSWORD.test(password))
        {
            message.warning('密码不正确');
        }
        else if (password !== confirmPassword)
        {
            message.warning('两次输入密码不一致');
        }
        else if (!REGEX.EMAIL.test(email))
        {
            message.warning('邮箱不正确');
        }
        else if (!REGEX.VERIFICATION_CODE.test(verificationCode))
        {
            message.warning('验证码不正确');
        }
        else
        {
            const requestIsSuccessful = await Api.sendPostSignUpRequestAsync(username, password, email, verificationCode);
            if (requestIsSuccessful)
            {
                browserHistory.push(PAGE_ID_TO_ROUTE[PAGE_ID.ACCOUNT.LOGIN]);
            }
        }
    };

    render()
    {
        return <SignUp usernameInputRef={this.usernameInputRef}
                       passwordInputRef={this.passwordInputRef}
                       confirmPasswordInputRef={this.confirmPasswordInputRef}
                       emailInputRef={this.emailInputRef}
                       verificationCodeInputRef={this.verificationCodeInputRef}
                       onGetVerificationCodeButtonClick={this.onGetVerificationCodeButtonClick}
                       onSubmit={this.onSubmit} />;
    }
}

export default SignUpContainer;