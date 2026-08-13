import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_for_development_only";
const secret = new TextEncoder().encode(JWT_SECRET);

export async function generateToken(admin) {
    const token = await new SignJWT({
        id: admin.id,
        email: admin.email,
        role: admin.role,
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(secret);
    
    return token;
}

export async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}
