import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId: userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    //set JWT as HTTP-Only Cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 1000 //30 days
    })
}

export default generateToken;