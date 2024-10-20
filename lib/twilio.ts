import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const sendOtpToUser = (phoneNumber:any, otp: any) => {
    return client.messages.create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
    });
};

export const sendAppointmentConfirmation = (phoneNumber: string, appointmentDetails: string) => {
    return client.messages.create({
        body: `Your appointment has been successfully send. ${appointmentDetails}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
    });
};