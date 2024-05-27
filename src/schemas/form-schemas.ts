import dayjs from 'dayjs';
import * as yup from 'yup';


const usernameValidation = yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, 'Boşluk içeremez, Sadece büyük küçük harf ve sayı')
    .min(3, 'En az 3 karakter')
    .max(30, 'En fazla 30 karakter')
    .required('Zorunlu Alan');

const emailValidation = yup
    .string()
    .matches(/^[a-zA-Z0-9ğüşöçİĞÜŞÖÇ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/, 'Email formatına uygun değil')
    .min(3, 'En az 3 karakter')
    .max(50, 'En fazla 50 karakter')
    .trim()
    .required('Zorunlu alan');

const passwordValidation = yup
    .string()
    .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
        "Şifre en az bir büyük veya küçük harf ve sayı içermelidir. Geçerli özel karakterler: @$!%*?&"
    )
    .min(8, 'En az 8 karakter')
    .max(25, 'En fazla 25 karakter')
    .required('Zorunlu alan');

const onlyNumberOrEmtyString = yup
    .string()
    .test('max-digit', 'En fazla 9 sayı içerebilir', (value) => {
        if (!value) return true;
        const valueWithoutDots = value.replace(/\./g, '');
        return valueWithoutDots.length <= 9;
    })
    .matches(/^([0-9.]+$)/, "Lütfen sayı giriniz")
    .min(1, 'En az bir değer girilmeli');


export const registerSchema = yup.object({
    username: usernameValidation,
    email: emailValidation,
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

export const forgotPasswordSchema = yup.object({
    email: emailValidation,
});

export const passwordResetSchema = yup.object({
    new_password: passwordValidation,
    new_password_repeat: passwordValidation,
});

export const changePasswordSchema = yup.object({
    old_password: yup
        .string()
        .min(8, 'En az 8 karakter')
        .max(25, 'En fazla 25 karakter')
        .required('Zorunlu alan'),
    new_password: passwordValidation,
    new_password_repeat: passwordValidation,
});

export const createEventSchema = yup.object({
    title: yup
        .string()
        .max(200, 'En fazla 200 karakter')
        .required('Zorunlu alan'),
    description: yup
        .string()
        .max(500, 'En fazla 500 karakter'),
    address: yup
        .string()
        .max(200, 'En fazla 200 karakter'),
    longitude: onlyNumberOrEmtyString,
    latitude: onlyNumberOrEmtyString,
    start_date: yup
        .date<dayjs.Dayjs | null | any>()
        .nullable(),
    end_date: yup
        .date<dayjs.Dayjs | null | any | undefined>()
        .nullable()
        .min(yup.ref('start_date'), 'Bitiş tarihi başlangıç tarihinden sonra olmalıdır.'),
});