import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { prisma } from "./prisma";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "amogha-production-admin-secret-key-2026"
);

export const AUTH_COOKIE_NAME = "amogha_admin_session";

export interface AdminPayload {
  userId: string;
  email: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signAdminToken(payload: AdminPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}

export async function getAdminSessionFromCookies(): Promise<AdminPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function getAdminSessionFromRequest(
  request: NextRequest
): Promise<AdminPayload | null> {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function validateAdminCredentials(
  email: string,
  pass: string
): Promise<AdminPayload | null> {
  const defaultEmail = (
    process.env.ADMIN_DEFAULT_EMAIL || "admin@amoghadevelopers.com"
  ).toLowerCase();
  const defaultPass = process.env.ADMIN_DEFAULT_PASSWORD || "AmoghaAdmin2026!";

  // 1. Check Default Super-Admin Credentials from env
  if (email.toLowerCase().trim() === defaultEmail && pass === defaultPass) {
    return {
      userId: "root-admin-01",
      email: defaultEmail,
      role: "superadmin",
    };
  }

  // 2. Check Database User
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (user) {
      const isValid = await comparePassword(pass, user.passwordHash);
      if (isValid) {
        return {
          userId: user.id,
          email: user.email,
          role: user.role,
        };
      }
    }
  } catch (err) {
    console.warn("DB check during login bypassed:", err);
  }

  return null;
}
