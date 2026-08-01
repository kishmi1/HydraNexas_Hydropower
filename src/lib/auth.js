import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(admin) {
    return jwt.sign(
        {
            id: admin.id,
            email: admin.email,
            role: admin.role,
        },
        JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
}
