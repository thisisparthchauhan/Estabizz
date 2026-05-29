import fs from "node:fs";
import crypto from "node:crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

function loadLocalEnv() {
    for (const file of [".env.local", ".env"]) {
        if (!fs.existsSync(file)) continue;
        const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
            const index = trimmed.indexOf("=");
            const key = trimmed.slice(0, index).trim();
            const value = trimmed.slice(index + 1).trim().replace(/^['"]|['"]$/g, "");
            if (!process.env[key]) process.env[key] = value;
        }
    }
}

loadLocalEnv();

const ADMIN_EMAILS = ["estabizz@gmail.com", "info@estabizz.com"];
const generatedPassword = crypto.randomBytes(14).toString("base64url");
const bootstrapPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD || generatedPassword;
const shouldResetPassword = process.env.RESET_ADMIN_PASSWORD === "true";

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        mobile: { type: String, trim: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function main() {
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.MONGODB_URL || process.env.DATABASE_URL;

    if (!mongoUri) {
        throw new Error("MongoDB connection string is required. Set MONGODB_URI, MONGO_URI, MONGODB_URL or DATABASE_URL before running this script.");
    }

    await mongoose.connect(mongoUri);
    const passwordHash = await bcrypt.hash(bootstrapPassword, 12);
    const results = [];

    for (const email of ADMIN_EMAILS) {
        const existing = await User.findOne({ email });

        if (existing) {
            existing.role = "admin";
            existing.firstName = existing.firstName || "Estabizz";
            existing.lastName = existing.lastName || "Admin";
            if (shouldResetPassword) existing.password = passwordHash;
            await existing.save();
            results.push(`${email}: existing user updated to admin${shouldResetPassword ? " and password reset" : ""}`);
            continue;
        }

        await User.create({
            firstName: "Estabizz",
            lastName: email === "info@estabizz.com" ? "Info Admin" : "Admin",
            email,
            password: passwordHash,
            role: "admin",
        });
        results.push(`${email}: admin user created`);
    }

    await mongoose.disconnect();

    console.log("Admin user bootstrap completed:");
    for (const result of results) console.log(`- ${result}`);
    if (!process.env.ADMIN_BOOTSTRAP_PASSWORD) {
        console.log("");
        console.log("Temporary generated password for newly-created admins:");
        console.log(bootstrapPassword);
        console.log("Set RESET_ADMIN_PASSWORD=true with ADMIN_BOOTSTRAP_PASSWORD to intentionally reset existing admin passwords.");
    }
}

main().catch(async (error) => {
    console.error(error.message || error);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
});
