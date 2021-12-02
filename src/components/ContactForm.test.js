import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);

    const contact = screen.queryByText(/contact form/i);
    expect(contact).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name*/i);
    userEvent.type(firstName, 'sag');
    const error = screen.queryByText(/error: firstname must have at least 5 characters./i)
    expect(error).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const button = screen.queryByText(/submit/i);
    userEvent.click(button);
    
    await waitFor(() => {
        const errorFirst = screen.queryByText(/error: firstname must have at least 5 characters./i)
        const errorLast = screen.queryByText(/error: lastname is a required field./i)
        const errorEmail = screen.queryByText(/error: email must be a valid email address./i)

        expect(errorFirst).toBeInTheDocument();
        expect(errorLast).toBeInTheDocument();
        expect(errorEmail).toBeInTheDocument();

    })
    

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name*/i);
    const lastName = screen.getByLabelText(/last name*/i);
    const button = screen.queryByText(/submit/i);

    userEvent.type(firstName, 'sagun');
    userEvent.type(lastName, 'shrestha');
    userEvent.click(button);

    await waitFor(()=>{
        const error = screen.queryByText(/error: email must be a valid email address./i)
        expect(error).toBeInTheDocument();
    })
    

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, 'sagun');

    const error = screen.queryByText(/error: email must be a valid email address./i)
    expect(error).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name*/i);
    const email = screen.getByLabelText(/email*/i);
    const button = screen.queryByText(/submit/i);

    userEvent.type(firstName, 'sagun');
    userEvent.type(email, 'sagun@gmail.com');
    userEvent.click(button);

    await waitFor(()=>{
        const error = screen.queryByText(/error: lastname is a required field./i)
        expect(error).toBeInTheDocument();
    })



});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name*/i);
    const lastName = screen.getByLabelText(/last name*/i);
    const email = screen.getByLabelText(/email*/i);
    const button = screen.queryByText(/submit/i);

    userEvent.type(firstName, 'sagun');
    userEvent.type(lastName, 'sagun');
    userEvent.type(email, 'sagun@gmail.com');
    userEvent.click(button);

    await waitFor(()=>{
        const submit = screen.queryByText(/you submitted:/i)
        const submitFirst = screen.queryByText(/first name:/i)
        const submitLast = screen.queryByText(/last name:/i)
        const submitEmail = screen.queryByText(/email:/i)
        const submitMessage = screen.queryByText(/message:/i)

        expect(submit).toBeInTheDocument();
        expect(submitFirst).toBeInTheDocument();
        expect(submitLast).toBeInTheDocument();
        expect(submitEmail).toBeInTheDocument();
        expect(submitMessage).not.toBeInTheDocument();
    })
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name*/i);
    const lastName = screen.getByLabelText(/last name*/i);
    const email = screen.getByLabelText(/email*/i);
    const message = screen.getByLabelText(/message/i)
    const button = screen.queryByText(/submit/i);

    userEvent.type(firstName, 'sagun');
    userEvent.type(lastName, 'sagun');
    userEvent.type(email, 'sagun@gmail.com');
    userEvent.type(message, 'strong');
    userEvent.click(button);

    await waitFor(()=>{
        const submit = screen.queryByText(/you submitted:/i)
        const submitFirst = screen.queryByText(/first name:/i)
        const submitLast = screen.queryByText(/last name:/i)
        const submitEmail = screen.queryByText(/email:/i)
        const submitMessage = screen.queryByText(/message:/i)

        expect(submit).toBeInTheDocument();
        expect(submitFirst).toBeInTheDocument();
        expect(submitLast).toBeInTheDocument();
        expect(submitEmail).toBeInTheDocument();
        expect(submitMessage).toBeInTheDocument();
    })
});