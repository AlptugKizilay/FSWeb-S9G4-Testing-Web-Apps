import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';
import { type } from '@testing-library/user-event/dist/type';

test('hata olmadan render ediliyor', () => {
    
    render(<IletisimFormu/>)
    
    
});

test('iletişim formu headerı render ediliyor', () => {
    //arange
    render(<IletisimFormu/>)
    //act
    const iletisimForm = screen.getByText(/İletişim Formu/i);
    screen.debug(iletisimForm);
    //assert
    expect(iletisimForm).toBeInTheDocument()
    
});

 test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    //arange
    render(<IletisimFormu/>)
    //act
    const userName = screen.getByLabelText("Ad*");
    userEvent.type(userName,"asdf");
    const userNameErr = screen.getByTestId("error");
    //assert   
    expect(userNameErr).toBeInTheDocument()

});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu/>);
    const userInput = screen.getByRole('button', {
        name: /Gönder/i
      })
    userInput.click(userInput);
    const userErr = screen.getAllByTestId("error");
    expect(userErr).toHaveLength(3);

});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu/>);
    const userName = screen.getByLabelText("Ad*");
    userEvent.type(userName,"kullaniciadi");
    const userSurame = screen.getByLabelText("Soyad*");
    userEvent.type(userSurame,"kullanicisoyadi");
    const userInput = screen.getByRole('button', {
        name: /Gönder/i
      })
    userInput.click(userInput);
    const userErr = screen.getAllByTestId("error");
    expect(userErr).toHaveLength(1);

});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    render(<IletisimFormu/>);
    const userEmail = screen.getByLabelText("Email*");
    userEvent.type(userEmail,"kullaniciemail");
    const userEmailErr = screen.getByTestId("error");
    //assert   
    expect(userEmailErr).toBeInTheDocument()

});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
render(<IletisimFormu/>);
    const userName = screen.getByLabelText("Ad*");
    userEvent.type(userName,"kullaniciadi");
    const userEmail = screen.getByLabelText("Email*");
    userEvent.type(userEmail,"kullaniciemail@kullanici.email");
    const userInput = screen.getByRole('button', {
        name: /Gönder/i
      })
    userInput.click(userInput);
    const userErr = screen.getAllByTestId("error");
    expect(userErr).toHaveLength(1);
});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    render(<IletisimFormu/>);
    const userName = screen.getByLabelText("Ad*");
    userEvent.type(userName,"kullaniciadi");
    const userEmail = screen.getByLabelText("Email*");
    const userSurame = screen.getByLabelText("Soyad*");
    userEvent.type(userSurame,"kullanicisoyadi");
    userEvent.type(userEmail,"kullaniciemail@kullanici.email");
    const userInput = screen.getByRole('button', {
        name: /Gönder/i
      })
    userInput.click(userInput);
    const userErr = screen.queryAllByTestId("error");
    expect(userErr).toHaveLength(0);
});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
    render(<IletisimFormu/>);
    const userName = screen.getByLabelText("Ad*");
    userEvent.type(userName,"kullaniciadi");
    const userSurame = screen.getByLabelText("Soyad*");
    userEvent.type(userSurame,"kullanicisoyadi");
    const userEmail = screen.getByLabelText("Email*");
    userEvent.type(userEmail,"kullaniciemail@kullanici.email");
    const userText = screen.getByLabelText("Mesaj");
    userEvent.type(userText,"kullanicitext");
    const userInput = screen.getByRole('button', {
        name: /Gönder/i
      })
    userInput.click(userInput);
    const userNameDisplay =screen.getByTestId("firstnameDisplay");
    const userSurameDisplay =screen.getByTestId("lastnameDisplay");
    const userEmailDisplay =screen.getByTestId("emailDisplay");
    const userTextDisplay =screen.getByTestId("messageDisplay");
    /* await waitFor(
        ()=>{}
    ), {timeout: 4000} */
    expect(userNameDisplay).toBeInTheDocument();
    expect(userSurameDisplay).toBeInTheDocument();
    expect(userEmailDisplay).toBeInTheDocument();
    expect(userTextDisplay).toBeInTheDocument();
}); 
