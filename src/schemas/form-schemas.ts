import * as yup from 'yup';


const usernameValidation = yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, 'Boşluk içeremez, Sadece büyük küçük harf ve sayı')
    .min(3, 'En az 3 karakter')
    .max(30, 'En fazla 30 karakter')
    .required('Zorunlu Alan');

const passwordValidation = yup
    .string()
    .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
        "Şifre en az bir harf büyük veya küçük harf, sayı içermelidir. Geçerli özel karakterler: @$!%*?&"
    )
    .min(8, 'En az 8 karakter')
    .max(25, 'En fazla 25 karakter')
    .required('Zorunlu alan');


export const registerSchema = yup.object({
    username: usernameValidation,
    email: yup
        .string()
        .matches(/^[a-zA-Z0-9ğüşöçİĞÜŞÖÇ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/, 'Email formatına uygun değil')
        .min(3, 'En az 3 karakter')
        .max(50, 'En fazla 50 karakter')
        .trim()
        .required('Zorunlu alan'),
    password: passwordValidation,
    password_again: passwordValidation,
});

export const loginSchema = yup.object({
    username: yup
        .string()
        .min(3, 'En az 3 karakter')
        .max(50, 'En fazla 50 karakter')
        .trim()
        .required('Zorunlu alan'),
    password: yup
        .string()
        .min(8, 'En az 8 karakter')
        .max(25, 'En fazla 25 karakter')
        .required('Zorunlu alan')
});

export const changePassword = yup.object({
    old_password: yup
        .string()
        .min(8, 'En az 8 karakter')
        .max(25, 'En fazla 25 karakter')
        .required('Zorunlu alan'),
    new_password: passwordValidation,
    new_password_repeat: passwordValidation,
});